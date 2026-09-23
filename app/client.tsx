"use client"

import type React from "react"
import { Inter as FontSans } from "next/font/google"
import "./profile.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import NoScriptStyles from "@/components/noscript-styles"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <NoScriptStyles />
      </head>
      <body className={cn("min-h-screen antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col overflow-hidden">
            <noscript>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 text-center text-sm">
                For the best experience, please enable JavaScript. Some features may be limited without it.
              </div>
            </noscript>
            
            <main className="flex-1 relative z-10">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
