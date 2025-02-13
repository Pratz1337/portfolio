"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import type React from "react" // Added import for React

interface GlowingButtonProps {
  children: ReactNode
  onClick?: () => void
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, onClick }) => {
  return (
    <motion.button
      className="relative px-6 py-3 bg-transparent text-white font-bold text-lg rounded-full overflow-hidden group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"></span>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 blur-lg"></span>
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export default GlowingButton

