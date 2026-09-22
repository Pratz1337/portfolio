import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client"

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-pratz.vercel.app"),
  title: {
    default: "Prathmesh Sayal",
    template: "%s | Prathmesh Sayal",
  },
  description:
    "Prathmesh Sayal is a computer science engineer working across trustworthy AI, computer vision, systems, and cybersecurity.",
  keywords: [
    "Prathmesh Sayal",
    "Computer Science",
    "Cybersecurity",
    "Artificial Intelligence",
    "Computer Vision",
    "Trustworthy AI",
    "AI Security",
    "Systems Programming",
    "Python",
    "JavaScript",
    "React",
  ],
  authors: [{ name: "Prathmesh Sayal" }],
  creator: "Prathmesh Sayal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-pratz.vercel.app",
    title: "Prathmesh Sayal",
    description:
      "Computer science, trustworthy AI, computer vision, systems, and cybersecurity work by Prathmesh Sayal.",
    siteName: "Prathmesh Sayal Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Prathmesh Sayal",
    description:
      "Computer science, trustworthy AI, computer vision, systems, and cybersecurity work by Prathmesh Sayal.",
  },
  alternates: { canonical: "https://portfolio-pratz.vercel.app" },
  category: "technology",
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
