import { Redis } from "@upstash/redis"

// Initialize Redis client with environment variables
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Rate limiting configuration
export const RATE_LIMITS = {
  // Basic rate limits
  FORM_SUBMISSIONS_PER_HOUR: 3,
  FORM_SUBMISSIONS_PER_DAY: 10,

  // Escalated limits for suspicious behavior
  SUSPICIOUS_ATTEMPTS_PER_HOUR: 1,
  SUSPICIOUS_ATTEMPTS_PER_DAY: 2,

  // IP-based limits
  IP_REQUESTS_PER_MINUTE: 10,
  IP_REQUESTS_PER_HOUR: 60,

  // Fingerprint-based limits
  FINGERPRINT_SUBMISSIONS_PER_DAY: 5,
}

// Rate limiting functions
export async function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number,
  prefix = "rate_limit",
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const key = `${prefix}:${identifier}`
  const window = Math.floor(Date.now() / windowMs)
  const windowKey = `${key}:${window}`

  const current = ((await redis.get(windowKey)) as number) || 0

  if (current >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: (window + 1) * windowMs,
    }
  }

  // Increment counter and set expiration
  const pipeline = redis.pipeline()
  pipeline.incr(windowKey)
  pipeline.expire(windowKey, Math.ceil(windowMs / 1000))
  await pipeline.exec()

  return {
    allowed: true,
    remaining: limit - current - 1,
    resetTime: (window + 1) * windowMs,
  }
}

// IP-based rate limiting
export async function checkIPRateLimit(ip: string) {
  const minuteCheck = await checkRateLimit(
    ip,
    RATE_LIMITS.IP_REQUESTS_PER_MINUTE,
    60 * 1000, // 1 minute
    "ip_minute",
  )

  if (!minuteCheck.allowed) {
    return { ...minuteCheck, reason: "Too many requests per minute" }
  }

  const hourCheck = await checkRateLimit(
    ip,
    RATE_LIMITS.IP_REQUESTS_PER_HOUR,
    60 * 60 * 1000, // 1 hour
    "ip_hour",
  )

  return hourCheck.allowed
    ? { ...hourCheck }
    : { ...hourCheck, reason: "Too many requests per hour" }
}

// Form submission rate limiting
export async function checkFormSubmissionLimit(identifier: string, isSuspicious = false) {
  const limit = isSuspicious ? RATE_LIMITS.SUSPICIOUS_ATTEMPTS_PER_HOUR : RATE_LIMITS.FORM_SUBMISSIONS_PER_HOUR

  const hourCheck = await checkRateLimit(
    identifier,
    limit,
    60 * 60 * 1000, // 1 hour
    isSuspicious ? "suspicious_form" : "form_hour",
  )

  if (!hourCheck.allowed) {
    return { ...hourCheck, reason: "Too many form submissions per hour" }
  }

  const dailyLimit = isSuspicious ? RATE_LIMITS.SUSPICIOUS_ATTEMPTS_PER_DAY : RATE_LIMITS.FORM_SUBMISSIONS_PER_DAY

  const dayCheck = await checkRateLimit(
    identifier,
    dailyLimit,
    24 * 60 * 60 * 1000, // 24 hours
    isSuspicious ? "suspicious_form_day" : "form_day",
  )

  return dayCheck.allowed
    ? { ...dayCheck }
    : { ...dayCheck, reason: "Too many form submissions per day" }
}

// Block management
export async function blockIdentifier(identifier: string, reason: string, durationMs: number = 24 * 60 * 60 * 1000) {
  const key = `blocked:${identifier}`
  await redis.setex(
    key,
    Math.ceil(durationMs / 1000),
    JSON.stringify({
      reason,
      blockedAt: Date.now(),
      expiresAt: Date.now() + durationMs,
    }),
  )
}

export async function isBlocked(
  identifier: string,
): Promise<{ blocked: boolean; reason?: string; expiresAt?: number }> {
  const key = `blocked:${identifier}`
  const blockData = await redis.get(key)

  if (!blockData) {
    return { blocked: false }
  }

  const parsed = JSON.parse(blockData as string)
  return {
    blocked: true,
    reason: parsed.reason,
    expiresAt: parsed.expiresAt,
  }
}

// Suspicious activity tracking
export async function logSuspiciousActivity(data: {
  ip: string
  fingerprint?: string
  userAgent: string
  reason: string
  formData?: any
  metadata?: any
}) {
  const key = `suspicious:${Date.now()}:${data.ip}`
  await redis.setex(
    key,
    7 * 24 * 60 * 60,
    JSON.stringify({
      // Keep for 7 days
      ...data,
      timestamp: Date.now(),
    }),
  )

  // Also increment suspicious activity counter
  await redis.incr(`suspicious_count:${data.ip}`)
  await redis.expire(`suspicious_count:${data.ip}`, 24 * 60 * 60) // Reset daily
}

// Get suspicious activity for an IP
export async function getSuspiciousActivity(ip: string) {
  const keys = await redis.keys(`suspicious:*:${ip}`)
  const activities = []

  for (const key of keys) {
    const data = await redis.get(key)
    if (data) {
      activities.push(JSON.parse(data as string))
    }
  }

  return activities.sort((a, b) => b.timestamp - a.timestamp)
}
