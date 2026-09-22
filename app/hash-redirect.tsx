"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { sections } from "./portfolio-data"

export default function HashRedirect() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && hash !== "about" && sections.some((section) => section === hash)) {
      router.replace(`/${hash}`)
    }
  }, [router])

  return null
}
