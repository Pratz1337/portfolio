import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PortfolioSections from "../portfolio-sections"
import { sectionDetails, sections, siteUrl, type Section } from "../portfolio-data"

type Props = { params: { section: string } }

function isSection(value: string): value is Section {
  return sections.some((section) => section === value) && value !== "about"
}

export function generateStaticParams() {
  return sections.filter((section) => section !== "about").map((section) => ({ section }))
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isSection(params.section)) return {}
  const details = sectionDetails[params.section]
  const url = `${siteUrl}/${params.section}`
  return {
    title: details.label,
    description: details.description,
    alternates: { canonical: url },
    openGraph: { title: `${details.label} | Prathmesh Sayal`, description: details.description, url, type: "website" },
  }
}

export default function SectionPage({ params }: Props) {
  if (!isSection(params.section)) notFound()
  return <PortfolioSections section={params.section} />
}
