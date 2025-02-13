"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useScroll, useTransform } from "framer-motion"
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
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(Date.now())
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const handleImageClick = useCallback(() => {
    const currentTime = Date.now()
    if (currentTime - lastClickTime < 60000) {
      // Within 1 minute
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
      <ParallaxBackground y={backgroundY} />
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

