"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Heart } from "lucide-react"

const SpecialSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")
  const messages = [
    "You're the reason I smile every day",
    "Your love makes my world brighter",
    "Every moment with you is a treasure",
    "You're my favorite hello and my hardest goodbye",
    "With you, every day feels like Valentine's Day",
    "Since You have been around, I have been Smiling more and more",
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="special"
      className="py-20 px-4 md:px-20 relative bg-gradient-to-r from-pink-500 to-purple-500 min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto relative z-10">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Special Space</h2>
              <p className="text-2xl text-white mb-8 italic">&ldquo;{message}&rdquo;</p>
              <div className="relative w-80 h-80 mx-auto overflow-hidden rounded-full border-4 border-white shadow-lg">
                <Image
                  src="/images/us.jpg?height=320&width=320"
                  alt="Us"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-8 px-6 py-3 bg-white text-pink-500 rounded-full font-semibold text-lg shadow-lg hover:bg-pink-100 transition-colors duration-300"
                onClick={() => alert("K,I love you more than words can express!")}
              >
                Click for a Surprise
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BackgroundAnimation />
    </section>
  )
}

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Heart size={Math.random() * 30 + 10} />
        </motion.div>
      ))}
    </div>
  )
}

export default SpecialSection

