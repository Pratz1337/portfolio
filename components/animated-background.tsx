"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function AnimatedBackground() {
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveBlobs = () => {
      if (blob1Ref.current && blob2Ref.current && blob3Ref.current) {
        // Random movement for blob 1
        const x1 = Math.random() * 10 - 5
        const y1 = Math.random() * 10 - 5
        blob1Ref.current.style.transform = `translate(${x1}%, ${y1}%)`

        // Random movement for blob 2
        const x2 = Math.random() * 10 - 5
        const y2 = Math.random() * 10 - 5
        blob2Ref.current.style.transform = `translate(${x2}%, ${y2}%)`

        // Random movement for blob 3
        const x3 = Math.random() * 10 - 5
        const y3 = Math.random() * 10 - 5
        blob3Ref.current.style.transform = `translate(${x3}%, ${y3}%)`
      }
    }

    const interval = setInterval(moveBlobs, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="animated-background js-only" aria-hidden="true">
      <motion.div
        className="blob blob-1"
        ref={blob1Ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      ></motion.div>
      <motion.div
        className="blob blob-2"
        ref={blob2Ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
      ></motion.div>
      <motion.div
        className="blob blob-3"
        ref={blob3Ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
      ></motion.div>
    </div>
  )
}
