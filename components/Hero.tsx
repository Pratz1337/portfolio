"use client"

import { motion } from "framer-motion"
import { GithubIcon, Linkedin, Mail } from "lucide-react"
import GlowingButton from "./GlowingButton"
import { useEffect, useState } from 'react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text font-orbitron "
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Prathmesh Sayal
            </motion.h1>
          <motion.h2
            className="text-2xl md:text-4xl font-semibold mb-6 text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Lifelong Learner | CS Enthusiast
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Crafting digital experiences with Python, React, and AI. Always exploring, always learning.
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4 mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <SocialIcon href="https://github.com/pratz1337" icon={<GithubIcon />} label="GitHub" />
            <SocialIcon href="https://www.linkedin.com/in/prathmesh-sayal/" icon={<Linkedin />} label="LinkedIn" />
            <SocialIcon href="mailto:prathmeshsayal8@gmail.com" icon={<Mail />} label="Email" />
          </motion.div>
          <GlowingButton onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            Explore My World
          </GlowingButton>
        </motion.div>
      </div>
      <ParticleField />
    </section>
  )
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 transform hover:scale-110"
      aria-label={label}
    >
      {icon}
    </a>
  )
}


function ParticleField() {
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const updateParticles = () => {
        setPositions(
          Array.from({ length: 50 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }))
        );
      };
      
      updateParticles();
      window.addEventListener("resize", updateParticles);
      return () => window.removeEventListener("resize", updateParticles);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/50 rounded-full"
            initial={{
              x: mounted ? pos.x : 0,
              y: mounted ? pos.y : 0,
              scale: 0.8
            }}
            animate={{
              x: pos.x + (Math.random() - 0.5) * 100,
              y: pos.y + (Math.random() - 0.5) * 100,
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 15 + (i % 5) * 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}