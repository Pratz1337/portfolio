export interface DeviceFingerprint {
  userAgent: string
  language: string
  timezone: number
  screen: {
    width: number
    height: number
    colorDepth: number
  }
  canvas?: string
  webgl?: string
  plugins: string[]
  cookieEnabled: boolean
  doNotTrack: string | null
}

export interface BehavioralData {
  typingCadence: number[] // Inter-key delays
  backspaceCount: number
  timeOnPage: number
  mouseMovements: number
  scrollBehavior: {
    totalScrolls: number
    averageScrollSpeed: number
  }
  formFillTime: number
  pasteEvents: number
}

// Generate a hash from fingerprint data
export function generateFingerprintHash(fingerprint: DeviceFingerprint): string {
  const data = JSON.stringify({
    ua: fingerprint.userAgent,
    lang: fingerprint.language,
    tz: fingerprint.timezone,
    screen: fingerprint.screen,
    canvas: fingerprint.canvas,
    webgl: fingerprint.webgl,
    plugins: fingerprint.plugins.sort(),
    cookie: fingerprint.cookieEnabled,
    dnt: fingerprint.doNotTrack,
  })

  // Simple hash function (in production, use a proper crypto hash)
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36)
}

// Analyze behavioral patterns for spam detection
export function analyzeBehavior(behavior: BehavioralData): {
  suspiciousScore: number
  reasons: string[]
} {
  const reasons: string[] = []
  let suspiciousScore = 0

  // Check typing cadence (too fast or too consistent = suspicious)
  if (behavior.typingCadence.length > 0) {
    const avgCadence = behavior.typingCadence.reduce((a, b) => a + b, 0) / behavior.typingCadence.length
    const variance =
      behavior.typingCadence.reduce((acc, val) => acc + Math.pow(val - avgCadence, 2), 0) /
      behavior.typingCadence.length

    if (avgCadence < 50) {
      // Typing too fast (less than 50ms between keys)
      suspiciousScore += 30
      reasons.push("Typing too fast")
    }

    if (variance < 10) {
      // Too consistent typing (bot-like)
      suspiciousScore += 25
      reasons.push("Robotic typing pattern")
    }
  }

  // Check form fill time (too fast = suspicious)
  if (behavior.formFillTime < 10000) {
    // Less than 10 seconds
    suspiciousScore += 40
    reasons.push("Form filled too quickly")
  }

  // Check time on page (too short = suspicious)
  if (behavior.timeOnPage < 5000) {
    // Less than 5 seconds
    suspiciousScore += 35
    reasons.push("Very short time on page")
  }

  // Check paste events (pasting everything = suspicious)
  if (behavior.pasteEvents > 2) {
    suspiciousScore += 20
    reasons.push("Multiple paste events")
  }

  // Check mouse movements (no movement = suspicious)
  if (behavior.mouseMovements === 0) {
    suspiciousScore += 30
    reasons.push("No mouse movement detected")
  }

  // Check backspace usage (no corrections = suspicious)
  if (behavior.backspaceCount === 0 && behavior.formFillTime < 30000) {
    suspiciousScore += 15
    reasons.push("No typing corrections")
  }

  return { suspiciousScore, reasons }
}

// Check if fingerprint is suspicious
export function isSuspiciousFingerprint(fingerprint: DeviceFingerprint): {
  suspicious: boolean
  reasons: string[]
} {
  const reasons: string[] = []

  // Check for headless browsers
  if (
    fingerprint.userAgent.includes("HeadlessChrome") ||
    fingerprint.userAgent.includes("PhantomJS") ||
    fingerprint.userAgent.includes("Selenium")
  ) {
    reasons.push("Headless browser detected")
  }

  // Check for suspicious screen resolutions
  if (fingerprint.screen.width === 1024 && fingerprint.screen.height === 768) {
    reasons.push("Common bot screen resolution")
  }

  // Check for missing plugins (too clean = suspicious)
  if (fingerprint.plugins.length === 0) {
    reasons.push("No browser plugins detected")
  }

  // Check timezone vs language mismatch (basic check)
  const timezoneOffset = fingerprint.timezone
  const language = fingerprint.language.toLowerCase()

  // This is a simplified check - in production, use a proper timezone/language correlation
  if (language.startsWith("en-us") && (timezoneOffset < -12 || timezoneOffset > -4)) {
    reasons.push("Timezone/language mismatch")
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  }
}
