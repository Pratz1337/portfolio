"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const SpecialSection = () => {
  return (
    <section id="special" className="py-20 px-4 md:px-20 relative bg-gradient-to-r from-pink-500 to-purple-500">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Special Corner</h2>
          <p className="text-xl text-white mb-8">Since You have been around, I have been Smiling more and more</p>
          <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-full">
            <Image
              src="/images/us.jpg?height=256&width=256"
              alt="Us"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110"
            />
          </div>
        </motion.div>
      </div>
      <BackgroundAnimation />
    </section>
  )
}

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: Math.random() * 40 + 10,
            height: Math.random() * 40 + 10,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

export default SpecialSection

