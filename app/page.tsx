import type { Metadata } from "next"
import PortfolioSections from "./portfolio-sections"
import HashRedirect from "./hash-redirect"
import { siteUrl } from "./portfolio-data"

export const metadata: Metadata = {
  title: { absolute: "Prathmesh Sayal | AI, Systems and Security" },
  description: "Prathmesh Sayal works across trustworthy AI, computer vision, systems, and cybersecurity. Explore his projects, research, experience, and writing.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Prathmesh Sayal | AI, Systems and Security",
    description: "Projects, research, experience, and writing by Prathmesh Sayal.",
    url: siteUrl,
    type: "profile",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Prathmesh Sayal",
      url: siteUrl,
      affiliation: { "@type": "CollegeOrUniversity", name: "Ramaiah Institute of Technology" },
      sameAs: ["https://github.com/Pratz1337", "https://www.linkedin.com/in/prathmesh-sayal", "https://medium.com/@sayalprathmesh8"],
    },
    { "@type": "WebSite", name: "Prathmesh Sayal", url: siteUrl },
  ],
}

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <HashRedirect />
    <PortfolioSections section="about" />
  </>
}
