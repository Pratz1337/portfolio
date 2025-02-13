import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "sonner"

// In your layout component
<Toaster position="top-center" richColors />
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Prathmesh Sayal - Student",
  description: "Portfolio of Prathmesh Sayal, a Student with interests in Computer Science and Engineering.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed top-4 right-4 z-50">
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

