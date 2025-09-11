import { type NextRequest, NextResponse } from "next/server"
import { checkIPRateLimit, isBlocked, logSuspiciousActivity } from "./lib/redis"

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only apply middleware to API routes and form submissions
  if (!pathname.startsWith("/api/") && !pathname.includes("contact")) {
    return NextResponse.next()
  }

  const ip = getClientIP(request)
  const userAgent = request.headers.get("user-agent") || "unknown"

  try {
    // Check if IP is blocked
    const blockStatus = await isBlocked(ip)
    if (blockStatus.blocked) {
      console.log(`[v0] Blocked request from ${ip}: ${blockStatus.reason}`)

      return new NextResponse(
        JSON.stringify({
          error: "Access denied",
          code: "BLOCKED",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Check rate limits for API routes
    if (pathname.startsWith("/api/")) {
      const rateLimitResult = await checkIPRateLimit(ip)

      if (!rateLimitResult.allowed) {
        console.log(`[v0] Rate limit exceeded for ${ip}: ${rateLimitResult.reason}`)

        // Log as suspicious activity
        await logSuspiciousActivity({
          ip,
          userAgent,
          reason: `Rate limit exceeded: ${rateLimitResult.reason}`,
          metadata: {
            path: pathname,
            method: request.method,
          },
        })

        return new NextResponse(
          JSON.stringify({
            error: "Too many requests",
            retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            },
          },
        )
      }
    }

    // Add security headers
    const response = NextResponse.next()
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-XSS-Protection", "1; mode=block")

    return response
  } catch (error) {
    console.error("[v0] Middleware error:", error)
    // In case of Redis errors, allow the request but log the issue
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
}
