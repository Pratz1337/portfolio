import { type NextRequest, NextResponse } from "next/server"
import { blockIdentifier, logSuspiciousActivity } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const { ip, reason } = await request.json()

    if (!ip || !reason) {
      return NextResponse.json({ error: "IP and reason are required" }, { status: 400 })
    }

    // Block the IP for 24 hours
    await blockIdentifier(ip, reason, 24 * 60 * 60 * 1000)

    // Log the manual block action
    await logSuspiciousActivity({
      ip,
      userAgent: "admin-dashboard",
      reason: `Manual block: ${reason}`,
      metadata: {
        action: "manual_block",
        timestamp: Date.now(),
      },
    })

    return NextResponse.json({ success: true, message: "IP blocked successfully" })
  } catch (error) {
    console.error("[v0] Block API error:", error)
    return NextResponse.json({ error: "Failed to block IP" }, { status: 500 })
  }
}
