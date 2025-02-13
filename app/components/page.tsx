"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import SpecialSection from "./components/SpecialSection"
import Contact from "./components/Contact"
import FloatingNav from "./components/FloatingNav"
import ParallaxBackground from "./components/ParallaxBackground"

export default function Home() {
  const [isSpecialUnlocked, setIsSpecialUnlocked] = useState(false)
  const [, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const containerRef = useRef(null)

  const handleImageClick = useCallback(() => {
    const currentTime = Date.now()
    if (currentTime - lastClickTime < 60000) { // Within 1 minute
      setClickCount((prevCount) => {
        const newCount = prevCount + 1
        if (newCount >= 20) {
          setIsSpecialUnlocked(true)
        }
        return newCount
      })
    } else {
      setClickCount(1)
    }
    setLastClickTime(currentTime)
  }, [lastClickTime])

  useEffect(() => {
    const handleUnlock = () => setIsSpecialUnlocked(true)
    window.addEventListener("unlockSpecialSection", handleUnlock)
    return () => window.removeEventListener("unlockSpecialSection", handleUnlock)
  }, [])

  return (
    <main ref={containerRef} className="relative bg-black text-white min-h-screen overflow-hidden">
      <ParallaxBackground />
      <FloatingNav showSpecial={isSpecialUnlocked} />
      <Hero />
      <About onImageClick={handleImageClick} />
      <Skills />
      <Projects />
      {isSpecialUnlocked && <SpecialSection />}
      <Contact />
    </main>
  )
}