"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const ParallaxBackground = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const background = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const stars = useTransform(scrollYProgress, [0, 1], ["0%", "1 0%"])
  const planets = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const meteors = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  return (
    <div ref={ref} className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-20 rounded-3xl bg-gradient-to-b from-purple-900 via-blue-900 to-black"
        style={{ y: background }}
      />
      <motion.div className="absolute inset-0" style={{ y: stars }}>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random(),
            }}
          />
        ))}
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: planets }}>
        <div
          className="absolute w-20 h-20 rounded-full bg-red-500 opacity-50 blur-md"
          style={{ top: "20%", left: "10%" }}
        />
        <div
          className="absolute w-32 h-32 rounded-full bg-blue-500 opacity-50 blur-md"
          style={{ top: "60%", right: "15%" }}
        />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: meteors }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-12 bg-gradient-to-b from-yellow-500 to-transparent transform -rotate-45"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default ParallaxBackground

