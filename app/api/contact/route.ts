import { type NextRequest, NextResponse } from "next/server"
import { checkFormSubmissionLimit, logSuspiciousActivity, blockIdentifier } from "@/lib/redis"
import {
  analyzeBehavior,
  isSuspiciousFingerprint,
  type DeviceFingerprint,
  type BehavioralData,
} from "@/lib/fingerprint"

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return request.ip || "unknown"
}

// Send email (placeholder - replace with your email service)
async function sendEmail(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  // TODO: Replace with your email service (SendGrid, Resend, etc.)
  console.log("[v0] Email would be sent:", data)

  // For now, just log the email data
  // In production, integrate with your preferred email service
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const userAgent = request.headers.get("user-agent") || "unknown"

    const body = await request.json()
    const {
      formData,
      fingerprint,
      deviceFingerprint,
      behavioralData,
      captchaAnswer,
    }: {
      formData: { name: string; email: string; subject: string; message: string }
      fingerprint: string | null
      deviceFingerprint: DeviceFingerprint | null
      behavioralData: BehavioralData
      captchaAnswer: string | null
    } = body

    console.log("[v0] Contact form submission from IP:", ip)

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Analyze behavioral patterns
    const behaviorAnalysis = analyzeBehavior(behavioralData)
    let suspiciousScore = behaviorAnalysis.suspiciousScore
    const suspiciousReasons = [...behaviorAnalysis.reasons]

    // Analyze device fingerprint
    if (deviceFingerprint) {
      const fingerprintAnalysis = isSuspiciousFingerprint(deviceFingerprint)
      if (fingerprintAnalysis.suspicious) {
        suspiciousScore += 25
        suspiciousReasons.push(...fingerprintAnalysis.reasons)
      }
    }

    // Check for common spam patterns in content
    const spamKeywords = [
      "seo",
      "backlinks",
      "ranking",
      "traffic",
      "bitcoin",
      "crypto",
      "investment",
      "loan",
      "casino",
      "pharmacy",
      "viagra",
      "cialis",
      "weight loss",
      "make money",
      "work from home",
      "click here",
    ]

    const contentToCheck = `${formData.subject} ${formData.message}`.toLowerCase()
    const spamKeywordCount = spamKeywords.filter((keyword) => contentToCheck.includes(keyword)).length

    if (spamKeywordCount > 0) {
      suspiciousScore += spamKeywordCount * 15
      suspiciousReasons.push(`Contains ${spamKeywordCount} spam keywords`)
    }

    // Check email domain patterns
    const suspiciousDomains = [
      "tempmail",
      "guerrillamail",
      "10minutemail",
      "mailinator",
      "throwaway",
      "temp-mail",
      "yopmail",
    ]

    const emailDomain = formData.email.split("@")[1]?.toLowerCase()
    if (emailDomain && suspiciousDomains.some((domain) => emailDomain.includes(domain))) {
      suspiciousScore += 30
      suspiciousReasons.push("Temporary email domain")
    }

    console.log("[v0] Suspicious score:", suspiciousScore, "Reasons:", suspiciousReasons)

    // Determine if this is suspicious
    const isSuspicious = suspiciousScore >= 50
    const isHighlysuspicious = suspiciousScore >= 80

    // Check rate limits
    const identifier = fingerprint || ip
    const rateLimitResult = await checkFormSubmissionLimit(identifier, isSuspicious)

    if (!rateLimitResult.allowed) {
      console.log("[v0] Rate limit exceeded for", identifier)

      await logSuspiciousActivity({
        ip,
        fingerprint,
        userAgent,
        reason: `Rate limit exceeded: ${rateLimitResult.reason}`,
        formData,
        metadata: {
          suspiciousScore,
          suspiciousReasons,
          behavioralData,
          deviceFingerprint,
        },
      })

      return NextResponse.json(
        {
          error: "Too many submissions. Please try again later.",
          code: "RATE_LIMITED",
        },
        { status: 429 },
      )
    }

    // If highly suspicious, block immediately
    if (isHighlysuspicious) {
      console.log("[v0] Blocking highly suspicious submission from", identifier)

      await blockIdentifier(
        identifier,
        `Highly suspicious activity (score: ${suspiciousScore})`,
        24 * 60 * 60 * 1000, // 24 hours
      )

      await logSuspiciousActivity({
        ip,
        fingerprint,
        userAgent,
        reason: `Blocked for highly suspicious activity (score: ${suspiciousScore})`,
        formData,
        metadata: {
          suspiciousScore,
          suspiciousReasons,
          behavioralData,
          deviceFingerprint,
        },
      })

      return NextResponse.json({ error: "Submission blocked", code: "BLOCKED" }, { status: 403 })
    }

    // If moderately suspicious, require CAPTCHA
    if (isSuspicious && !captchaAnswer) {
      console.log("[v0] Requiring CAPTCHA for suspicious submission from", identifier)

      await logSuspiciousActivity({
        ip,
        fingerprint,
        userAgent,
        reason: `Suspicious activity detected (score: ${suspiciousScore}) - CAPTCHA required`,
        formData,
        metadata: {
          suspiciousScore,
          suspiciousReasons,
          behavioralData,
          deviceFingerprint,
        },
      })

      return NextResponse.json(
        {
          error: "Please complete the security verification",
          requiresCaptcha: true,
          code: "CAPTCHA_REQUIRED",
        },
        { status: 400 },
      )
    }

    // Log all submissions for monitoring
    await logSuspiciousActivity({
      ip,
      fingerprint,
      userAgent,
      reason: isSuspicious ? `Suspicious but allowed (score: ${suspiciousScore})` : "Normal submission",
      formData,
      metadata: {
        suspiciousScore,
        suspiciousReasons,
        behavioralData,
        deviceFingerprint,
        status: "processed",
      },
    })

    // Send the email
    const emailSent = await sendEmail(formData)

    if (!emailSent) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    console.log("[v0] Contact form submitted successfully from", identifier)

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        metadata: {
          suspiciousScore: isSuspicious ? suspiciousScore : undefined,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
