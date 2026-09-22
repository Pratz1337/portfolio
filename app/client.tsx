import type React from "react"
import { Inter as FontSans } from "next/font/google"
import "./profile.css"
import Footer from "@/components/footer"

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
    <html lang="en">
      <body className={fontSans.variable}>
        <div className="site-shell">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
