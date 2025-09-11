import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

export async function GET() {
  try {
    // Get all suspicious activity keys
    const keys = await redis.keys("suspicious:*")
    const activities = []

    // Fetch all activities
    for (const key of keys.slice(0, 100)) {
      // Limit to last 100 for performance
      const data = await redis.get(key)
      if (data) {
        try {
          const parsed = JSON.parse(data as string)
          activities.push({
            id: key,
            ...parsed,
            status: "pending", // Default status
          })
        } catch (parseError) {
          console.error(`Error parsing JSON for key ${key}:`, parseError)
          // Optionally, you can choose to push a fallback object or skip this record
        }
      }
    }

    // Sort by timestamp (newest first)
    activities.sort((a, b) => b.timestamp - a.timestamp)

    // Calculate stats
    const totalSubmissions = activities.length
    const blockedSubmissions = activities.filter((a) => a.reason.includes("Blocked")).length
    const suspiciousSubmissions = activities.filter((a) => !a.reason.includes("Normal")).length

    // Get unique IPs
    const uniqueIPs = new Set(activities.map((a) => a.ip)).size

    // Count spam reasons
    const reasonCounts: Record<string, number> = {}
    activities.forEach((activity) => {
      const reason = activity.reason.split(":")[0] // Get main reason
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1
    })

    const topSpamReasons = Object.entries(reasonCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([reason, count]) => ({ reason, count }))

    const stats = {
      totalSubmissions,
      blockedSubmissions,
      suspiciousSubmissions,
      uniqueIPs,
      topSpamReasons,
    }

    return NextResponse.json({
      stats,
      activities: activities.slice(0, 50), // Return last 50 activities
    })
  } catch (error) {
    console.error("[v0] Dashboard API error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
