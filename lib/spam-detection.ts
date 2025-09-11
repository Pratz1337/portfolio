import { redis } from "./redis"

// Advanced spam detection patterns
export interface SpamSignature {
  id: string
  name: string
  pattern: RegExp | string
  weight: number
  category: "content" | "behavior" | "technical" | "network"
}

// Comprehensive spam detection signatures
export const SPAM_SIGNATURES: SpamSignature[] = [
  // Content-based signatures
  {
    id: "seo_spam",
    name: "SEO Spam Keywords",
    pattern: /\b(seo|backlinks?|link building|page rank|google ranking|traffic boost)\b/i,
    weight: 25,
    category: "content",
  },
  {
    id: "crypto_spam",
    name: "Cryptocurrency Spam",
    pattern: /\b(bitcoin|crypto|blockchain|mining|investment|trading|forex)\b/i,
    weight: 30,
    category: "content",
  },
  {
    id: "pharma_spam",
    name: "Pharmaceutical Spam",
    pattern: /\b(viagra|cialis|pharmacy|pills|medication|prescription)\b/i,
    weight: 35,
    category: "content",
  },
  {
    id: "casino_spam",
    name: "Casino/Gambling Spam",
    pattern: /\b(casino|gambling|poker|slots|betting|lottery)\b/i,
    weight: 30,
    category: "content",
  },
  {
    id: "loan_spam",
    name: "Loan/Financial Spam",
    pattern: /\b(loan|credit|debt|mortgage|finance|money|cash)\b/i,
    weight: 20,
    category: "content",
  },
  {
    id: "weight_loss_spam",
    name: "Weight Loss Spam",
    pattern: /\b(weight loss|diet|fat burn|slim|lose weight)\b/i,
    weight: 25,
    category: "content",
  },
  {
    id: "work_from_home",
    name: "Work From Home Scams",
    pattern: /\b(work from home|make money|earn money|easy money|passive income)\b/i,
    weight: 25,
    category: "content",
  },
  {
    id: "urgent_action",
    name: "Urgent Action Required",
    pattern: /\b(urgent|immediate|act now|limited time|expires|deadline)\b/i,
    weight: 15,
    category: "content",
  },
  {
    id: "click_here",
    name: "Click Here Patterns",
    pattern: /\b(click here|visit|check out|see more|learn more)\b/i,
    weight: 10,
    category: "content",
  },
  {
    id: "excessive_caps",
    name: "Excessive Capitalization",
    pattern: /[A-Z]{5,}/,
    weight: 15,
    category: "content",
  },
  {
    id: "excessive_punctuation",
    name: "Excessive Punctuation",
    pattern: /[!?]{3,}|\.{4,}/,
    weight: 10,
    category: "content",
  },
  {
    id: "url_shorteners",
    name: "URL Shorteners",
    pattern: /\b(bit\.ly|tinyurl|t\.co|goo\.gl|short\.link)\b/i,
    weight: 20,
    category: "content",
  },
]

// Suspicious email domains
export const SUSPICIOUS_EMAIL_DOMAINS = [
  "tempmail.org",
  "guerrillamail.com",
  "10minutemail.com",
  "mailinator.com",
  "throwaway.email",
  "temp-mail.org",
  "yopmail.com",
  "maildrop.cc",
  "sharklasers.com",
  "guerrillamail.info",
  "grr.la",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamailblock.com",
  "pokemail.net",
  "spam4.me",
  "bccto.me",
  "chacuo.net",
  "dispostable.com",
  "fake-mail.ml",
]

// Suspicious user agents (bots, scrapers, etc.)
export const SUSPICIOUS_USER_AGENTS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /webdriver/i,
  /puppeteer/i,
  /playwright/i,
]

// Network-based detection
export interface NetworkAnalysis {
  isVPN: boolean
  isProxy: boolean
  isTor: boolean
  isDataCenter: boolean
  country: string
  asn: string
  riskScore: number
}

// Analyze content for spam signatures
export function analyzeContent(content: string): {
  spamScore: number
  matchedSignatures: SpamSignature[]
  details: string[]
} {
  let spamScore = 0
  const matchedSignatures: SpamSignature[] = []
  const details: string[] = []

  for (const signature of SPAM_SIGNATURES) {
    if (signature.category === "content") {
      const matches = content.match(signature.pattern)
      if (matches) {
        spamScore += signature.weight
        matchedSignatures.push(signature)
        details.push(`${signature.name}: ${matches.length} matches`)
      }
    }
  }

  // Additional content analysis
  const wordCount = content.split(/\s+/).length
  const linkCount = (content.match(/https?:\/\/[^\s]+/g) || []).length

  // Too many links relative to content
  if (linkCount > 0 && wordCount / linkCount < 10) {
    spamScore += 20
    details.push(`High link-to-content ratio: ${linkCount} links in ${wordCount} words`)
  }

  // Very short messages with links
  if (wordCount < 20 && linkCount > 0) {
    spamScore += 15
    details.push("Short message with links")
  }

  // Excessive repetition
  const words = content.toLowerCase().split(/\s+/)
  const uniqueWords = new Set(words)
  const repetitionRatio = words.length / uniqueWords.size

  if (repetitionRatio > 2) {
    spamScore += 10
    details.push(`High word repetition ratio: ${repetitionRatio.toFixed(2)}`)
  }

  return { spamScore, matchedSignatures, details }
}

// Analyze email for suspicious patterns
export function analyzeEmail(email: string): {
  suspicious: boolean
  reasons: string[]
  riskScore: number
} {
  const reasons: string[] = []
  let riskScore = 0

  const [localPart, domain] = email.toLowerCase().split("@")

  if (!domain) {
    return { suspicious: true, reasons: ["Invalid email format"], riskScore: 100 }
  }

  // Check against suspicious domains
  if (SUSPICIOUS_EMAIL_DOMAINS.includes(domain)) {
    reasons.push("Temporary/disposable email domain")
    riskScore += 40
  }

  // Check for suspicious domain patterns
  if (domain.includes("temp") || domain.includes("disposable") || domain.includes("throwaway")) {
    reasons.push("Suspicious domain keywords")
    riskScore += 30
  }

  // Check local part patterns
  if (localPart.length < 3) {
    reasons.push("Very short email local part")
    riskScore += 15
  }

  if (/^\d+$/.test(localPart)) {
    reasons.push("Numeric-only local part")
    riskScore += 20
  }

  if (/^[a-z]+\d{4,}$/.test(localPart)) {
    reasons.push("Generated email pattern (letters + many numbers)")
    riskScore += 25
  }

  // Check for excessive dots or special characters
  if ((localPart.match(/\./g) || []).length > 2) {
    reasons.push("Excessive dots in local part")
    riskScore += 10
  }

  return {
    suspicious: riskScore >= 30,
    reasons,
    riskScore,
  }
}

// Analyze user agent for suspicious patterns
export function analyzeUserAgent(userAgent: string): {
  suspicious: boolean
  reasons: string[]
  riskScore: number
} {
  const reasons: string[] = []
  let riskScore = 0

  // Check against known bot patterns
  for (const pattern of SUSPICIOUS_USER_AGENTS) {
    if (pattern.test(userAgent)) {
      reasons.push(`Matches bot pattern: ${pattern.source}`)
      riskScore += 30
    }
  }

  // Check for missing or minimal user agent
  if (!userAgent || userAgent.length < 20) {
    reasons.push("Missing or minimal user agent")
    riskScore += 25
  }

  // Check for outdated browsers (potential bots)
  if (userAgent.includes("Chrome/") && !userAgent.includes("Chrome/1")) {
    const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1]
    if (chromeVersion && Number.parseInt(chromeVersion) < 100) {
      reasons.push("Outdated Chrome version")
      riskScore += 15
    }
  }

  return {
    suspicious: riskScore >= 25,
    reasons,
    riskScore,
  }
}

// Comprehensive spam analysis
export async function performSpamAnalysis(data: {
  content: string
  email: string
  userAgent: string
  ip: string
  fingerprint?: string
  behavioralData?: any
}): Promise<{
  isSpam: boolean
  confidence: number
  totalScore: number
  analysis: {
    content: ReturnType<typeof analyzeContent>
    email: ReturnType<typeof analyzeEmail>
    userAgent: ReturnType<typeof analyzeUserAgent>
    reputation: { score: number; reasons: string[] }
  }
  recommendation: "allow" | "captcha" | "block"
}> {
  // Analyze different aspects
  const contentAnalysis = analyzeContent(data.content)
  const emailAnalysis = analyzeEmail(data.email)
  const userAgentAnalysis = analyzeUserAgent(data.userAgent)

  // Check IP reputation
  const reputationAnalysis = await analyzeIPReputation(data.ip)

  // Calculate total score
  const totalScore =
    contentAnalysis.spamScore + emailAnalysis.riskScore + userAgentAnalysis.riskScore + reputationAnalysis.score

  // Determine confidence based on multiple factors
  let confidence = 0
  if (contentAnalysis.matchedSignatures.length > 0) confidence += 20
  if (emailAnalysis.suspicious) confidence += 25
  if (userAgentAnalysis.suspicious) confidence += 20
  if (reputationAnalysis.score > 20) confidence += 35

  // Determine recommendation
  let recommendation: "allow" | "captcha" | "block" = "allow"
  if (totalScore >= 80) {
    recommendation = "block"
  } else if (totalScore >= 40) {
    recommendation = "captcha"
  }

  return {
    isSpam: totalScore >= 50,
    confidence: Math.min(confidence, 100),
    totalScore,
    analysis: {
      content: contentAnalysis,
      email: emailAnalysis,
      userAgent: userAgentAnalysis,
      reputation: reputationAnalysis,
    },
    recommendation,
  }
}

// IP reputation analysis
async function analyzeIPReputation(ip: string): Promise<{ score: number; reasons: string[] }> {
  const reasons: string[] = []
  let score = 0

  try {
    // Check if IP has been flagged before
    const flaggedCount = ((await redis.get(`ip_flags:${ip}`)) as number) || 0
    if (flaggedCount > 0) {
      score += flaggedCount * 10
      reasons.push(`Previously flagged ${flaggedCount} times`)
    }

    // Check recent suspicious activity
    const recentActivity = await redis.get(`suspicious_count:${ip}`)
    if (recentActivity && Number(recentActivity) > 3) {
      score += 25
      reasons.push("High recent suspicious activity")
    }

    // Simple IP range checks (you can enhance this with external services)
    const ipParts = ip.split(".")
    if (ipParts.length === 4) {
      // Check for common VPN/proxy ranges (simplified)
      const firstOctet = Number.parseInt(ipParts[0])
      if (
        firstOctet === 10 ||
        (firstOctet === 172 && Number.parseInt(ipParts[1]) >= 16 && Number.parseInt(ipParts[1]) <= 31) ||
        (firstOctet === 192 && Number.parseInt(ipParts[1]) === 168)
      ) {
        // Private IP ranges - might be behind proxy
        score += 5
        reasons.push("Private IP range")
      }
    }
  } catch (error) {
    console.error("[v0] Error analyzing IP reputation:", error)
  }

  return { score, reasons }
}

// Update IP reputation based on confirmed spam
export async function updateIPReputation(ip: string, isSpam: boolean, severity: "low" | "medium" | "high" = "medium") {
  try {
    if (isSpam) {
      const increment = severity === "high" ? 3 : severity === "medium" ? 2 : 1
      await redis.incr(`ip_flags:${ip}`)
      await redis.expire(`ip_flags:${ip}`, 30 * 24 * 60 * 60) // Keep for 30 days

      // Also update recent activity counter
      await redis.incr(`suspicious_count:${ip}`)
      await redis.expire(`suspicious_count:${ip}`, 24 * 60 * 60) // Reset daily
    }
  } catch (error) {
    console.error("[v0] Error updating IP reputation:", error)
  }
}

// Machine learning-like pattern detection
export async function detectPatterns(submissions: any[]): Promise<{
  suspiciousPatterns: string[]
  recommendations: string[]
}> {
  const patterns: string[] = []
  const recommendations: string[] = []

  // Analyze submission timing patterns
  const timestamps = submissions.map((s) => s.timestamp).sort()
  if (timestamps.length >= 3) {
    const intervals = []
    for (let i = 1; i < timestamps.length; i++) {
      intervals.push(timestamps[i] - timestamps[i - 1])
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
    const variance = intervals.reduce((acc, val) => acc + Math.pow(val - avgInterval, 2), 0) / intervals.length

    if (variance < 1000 && avgInterval < 60000) {
      // Very consistent timing under 1 minute
      patterns.push("Robotic submission timing detected")
      recommendations.push("Implement variable delay requirements")
    }
  }

  // Analyze content similarity
  const contents = submissions.map((s) => s.formData?.message || "").filter(Boolean)
  if (contents.length >= 2) {
    let similarityCount = 0
    for (let i = 0; i < contents.length - 1; i++) {
      for (let j = i + 1; j < contents.length; j++) {
        const similarity = calculateSimilarity(contents[i], contents[j])
        if (similarity > 0.8) {
          similarityCount++
        }
      }
    }

    if (similarityCount > 0) {
      patterns.push(`${similarityCount} highly similar messages detected`)
      recommendations.push("Implement content similarity checking")
    }
  }

  return { suspiciousPatterns: patterns, recommendations }
}

// Simple text similarity calculation
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/))
  const words2 = new Set(text2.toLowerCase().split(/\s+/))

  const intersection = new Set([...words1].filter((x) => words2.has(x)))
  const union = new Set([...words1, ...words2])

  return intersection.size / union.size
}
