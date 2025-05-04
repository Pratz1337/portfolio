"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export const BackgroundBoxes = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center overflow-hidden">
      <div className="relative flex h-[40rem] w-full items-center justify-center">
        <div className="absolute inset-0 z-[-1] opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-[calc(50%-11rem)] top-[calc(50%-11rem)] h-[22rem] w-[22rem] rounded-full bg-primary"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: Math.random() * 0.2 + 0.1,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: Math.random() * 0.2 + 0.1,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BackgroundBoxes
