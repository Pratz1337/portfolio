import type React from "react"
import type { NextRequest } from "next/server"
import { redis, logSuspiciousActivity } from "./redis"
import { updateIPReputation } from "./spam-detection"

// Advanced request analysis
export interface RequestAnalysis {
  ip: string
  userAgent: string
  fingerprint?: string
  riskScore: number
  flags: string[]
  recommendation: "allow" | "captcha" | "block" | "monitor"
}

// Analyze incoming request for suspicious patterns
export async function analyzeRequest(request: NextRequest, fingerprint?: string): Promise<RequestAnalysis> {
  const ip = getClientIP(request)
  const userAgent = request.headers.get("user-agent") || "unknown"
  const flags: string[] = []
  let riskScore = 0

  // Check request headers for suspicious patterns
  const headers = Object.fromEntries(request.headers.entries())

  // Missing common headers
  if (!headers["accept-language"]) {
    flags.push("Missing Accept-Language header")
    riskScore += 10
  }

  if (!headers["accept-encoding"]) {
    flags.push("Missing Accept-Encoding header")
    riskScore += 10
  }

  // Suspicious header values
  if (headers["accept"] === "*/*") {
    flags.push("Generic Accept header")
    riskScore += 5
  }

  // Check for automation tools in headers
  const automationHeaders = ["x-requested-with", "x-automation", "x-selenium", "x-webdriver"]
  for (const header of automationHeaders) {
    if (headers[header]) {
      flags.push(`Automation header detected: ${header}`)
      riskScore += 20
    }
  }

  // Analyze request timing patterns
  if (fingerprint) {
    const recentRequests = await getRecentRequests(fingerprint)
    if (recentRequests.length > 0) {
      const timingAnalysis = analyzeRequestTiming(recentRequests)
      if (timingAnalysis.suspicious) {
        flags.push(...timingAnalysis.reasons)
        riskScore += timingAnalysis.score
      }
    }
  }

  // Check for rapid-fire requests
  const requestCount = await redis.incr(`request_count:${ip}:${Math.floor(Date.now() / 1000)}`)
  await redis.expire(`request_count:${ip}:${Math.floor(Date.now() / 1000)}`, 1)

  if (requestCount > 5) {
    flags.push("Rapid requests detected")
    riskScore += 25
  }

  // Determine recommendation
  let recommendation: "allow" | "captcha" | "block" | "monitor" = "allow"
  if (riskScore >= 50) {
    recommendation = "block"
  } else if (riskScore >= 25) {
    recommendation = "captcha"
  } else if (riskScore >= 10) {
    recommendation = "monitor"
  }

  return {
    ip,
    userAgent,
    fingerprint,
    riskScore,
    flags,
    recommendation,
  }
}

// Get recent requests for timing analysis
async function getRecentRequests(identifier: string): Promise<number[]> {
  try {
    const key = `request_times:${identifier}`
    const times = await redis.lrange(key, 0, 9) // Get last 10 requests
    return times.map((t) => Number.parseInt(t as string)).filter(Boolean)
  } catch (error) {
    return []
  }
}

// Analyze request timing patterns
function analyzeRequestTiming(timestamps: number[]): {
  suspicious: boolean
  reasons: string[]
  score: number
} {
  const reasons: string[] = []
  let score = 0

  if (timestamps.length < 2) {
    return { suspicious: false, reasons, score }
  }

  // Calculate intervals between requests
  const intervals = []
  for (let i = 1; i < timestamps.length; i++) {
    intervals.push(timestamps[i] - timestamps[i - 1])
  }

  // Check for too-consistent timing (bot-like)
  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
  const variance = intervals.reduce((acc, val) => acc + Math.pow(val - avgInterval, 2), 0) / intervals.length

  if (variance < 100 && avgInterval < 5000) {
    // Very consistent timing under 5 seconds
    reasons.push("Robotic request timing pattern")
    score += 30
  }

  // Check for burst patterns
  const shortIntervals = intervals.filter((i) => i < 1000) // Less than 1 second
  if (shortIntervals.length > intervals.length * 0.5) {
    reasons.push("Burst request pattern detected")
    score += 25
  }

  return {
    suspicious: score > 0,
    reasons,
    score,
  }
}

// Record request timing for analysis
export async function recordRequestTiming(identifier: string) {
  try {
    const key = `request_times:${identifier}`
    const now = Date.now()

    await redis.lpush(key, now.toString())
    await redis.ltrim(key, 0, 9) // Keep only last 10 requests
    await redis.expire(key, 60 * 60) // Expire after 1 hour
  } catch (error) {
    console.error("[v0] Error recording request timing:", error)
  }
}

// Enhanced blocking with escalation
export async function handleSuspiciousRequest(
  analysis: RequestAnalysis,
  context: {
    path: string
    method: string
    formData?: any
  },
) {
  const { ip, userAgent, fingerprint, riskScore, flags } = analysis

  // Log the suspicious activity
  await logSuspiciousActivity({
    ip,
    fingerprint,
    userAgent,
    reason: `Suspicious request analysis (score: ${riskScore})`,
    formData: context.formData,
    metadata: {
      flags,
      riskScore,
      path: context.path,
      method: context.method,
      analysis,
    },
  })

  // Update IP reputation
  if (riskScore >= 30) {
    const severity = riskScore >= 50 ? "high" : riskScore >= 40 ? "medium" : "low"
    await updateIPReputation(ip, true, severity)
  }

  // Record request timing for pattern analysis
  if (fingerprint) {
    await recordRequestTiming(fingerprint)
  }
  await recordRequestTiming(ip)
}

// Get client IP with better detection
function getClientIP(request: NextRequest): string {
  // Check various headers in order of preference
  const headers = [
    "cf-connecting-ip", // Cloudflare
    "x-real-ip", // Nginx
    "x-forwarded-for", // Standard
    "x-client-ip", // Apache
    "x-forwarded", // General
    "forwarded-for", // RFC 7239
    "forwarded", // RFC 7239
  ]

  for (const header of headers) {
    const value = request.headers.get(header)
    if (value) {
      // Handle comma-separated IPs (take the first one)
      const ip = value.split(",")[0].trim()
      if (isValidIP(ip)) {
        return ip
      }
    }
  }

  return request.ip || "unknown"
}

// Validate IP address format
function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/

  if (ipv4Regex.test(ip)) {
    const parts = ip.split(".")
    return parts.every((part) => {
      const num = Number.parseInt(part)
      return num >= 0 && num <= 255
    })
  }

  return ipv6Regex.test(ip)
}

// Honeypot detection utilities
export function generateHoneypotFields(): Array<{ name: string; type: string; style: React.CSSProperties }> {
  const fields = [
    { name: "website", type: "url" },
    { name: "company", type: "text" },
    { name: "phone_number", type: "tel" },
    { name: "fax", type: "text" },
  ]

  return fields.map((field) => ({
    ...field,
    style: {
      position: "absolute",
      left: "-9999px",
      top: "-9999px",
      opacity: 0,
      pointerEvents: "none" as const,
      tabIndex: -1,
    },
  }))
}

// Check if honeypot was triggered
export function checkHoneypot(formData: Record<string, any>): {
  triggered: boolean
  triggeredFields: string[]
} {
  const honeypotFields = ["website", "company", "phone_number", "fax"]
  const triggeredFields = honeypotFields.filter((field) => formData[field] && formData[field].trim() !== "")

  return {
    triggered: triggeredFields.length > 0,
    triggeredFields,
  }
}
