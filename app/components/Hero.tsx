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

const ParticleField = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
