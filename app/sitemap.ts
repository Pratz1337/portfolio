import type { MetadataRoute } from "next"
import { sections, siteUrl } from "./portfolio-data"

export default function sitemap(): MetadataRoute.Sitemap {
  return sections.map((section) => ({
    url: section === "about" ? siteUrl : `${siteUrl}/${section}`,
    changeFrequency: "monthly",
    priority: section === "about" ? 1 : 0.7,
  }))
}
