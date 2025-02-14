"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"

interface ImageHoverCreditsProps {
  src: string
  alt: string
  credits: string
  width: number
  height: number
}

const ImageHoverCredits: React.FC<ImageHoverCreditsProps> = ({ src, alt, credits, width, height }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative"
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className="rounded-full" />
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full transition-opacity duration-300">
          <span className="text-white text-lg font-semibold select-none">{credits}</span>
        </div>
      )}
    </div>
  )
}

export default ImageHoverCredits
