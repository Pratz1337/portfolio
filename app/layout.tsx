import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client"

export const metadata: Metadata = {
  title: "Prathmesh Sayal | Computer Science Student & Developer",
  description:
    "Portfolio of Prathmesh Sayal, a Computer Science Engineering student specializing in Cybersecurity, with expertise in Python, JavaScript, and AI/ML technologies.",
  keywords: [
    "Prathmesh Sayal",
    "Computer Science",
    "Cybersecurity",
    "Full Stack Developer",
    "AI/ML",
    "Python",
    "JavaScript",
    "React",
  ],
  authors: [{ name: "Prathmesh Sayal" }],
  creator: "Prathmesh Sayal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prathmeshsayal.com",
    title: "Prathmesh Sayal | Computer Science Student & Developer",
    description:
      "Portfolio of Prathmesh Sayal, a Computer Science Engineering student specializing in Cybersecurity, with expertise in Python, JavaScript, and AI/ML technologies.",
    siteName: "Prathmesh Sayal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathmesh Sayal | Computer Science Student & Developer",
    description:
      "Portfolio of Prathmesh Sayal, a Computer Science Engineering student specializing in Cybersecurity, with expertise in Python, JavaScript, and AI/ML technologies.",
    creator: "@prathmeshsayal",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
