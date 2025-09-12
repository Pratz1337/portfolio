import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    // Get all suspicious activity
    const keys = await redis.keys("suspicious:*")
    const activities = []

    for (const key of keys) {
      const data = await redis.get(key)
      if (data) {
        activities.push(JSON.parse(data as string))
      }
    }

    // Sort by timestamp
    activities.sort((a, b) => b.timestamp - a.timestamp)

    // Generate CSV
    const headers = ["Timestamp", "IP", "User Agent", "Reason", "Risk Score", "Form Data"]
    const csvRows = [headers.join(",")]

    activities.forEach((activity) => {
      const row = [
        new Date(activity.timestamp).toISOString(),
        activity.ip,
        `"${activity.userAgent.replace(/"/g, '""')}"`, // Escape quotes
        `"${activity.reason.replace(/"/g, '""')}"`,
        activity.metadata?.suspiciousScore || "N/A",
        activity.formData ? `"${JSON.stringify(activity.formData).replace(/"/g, '""')}"` : "N/A",
      ]
      csvRows.push(row.join(","))
    })

    const csv = csvRows.join("\n")

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="spam-report-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("[v0] Export API error:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}
