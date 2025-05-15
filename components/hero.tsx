"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpCircle, Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <section id="home" className="py-20 md:py-32 flex flex-col items-center justify-center min-h-[90vh]">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12 space-y-4 md:space-y-0 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div 
              className="relative w-64 h-64"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 rounded-full animate-pulse" />
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-background">
                <Image
                  src="/images/pratz.jpg"
                  alt="Prathmesh Sayal"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
                {isHovering && (
                  <motion.div 
                    className="absolute inset-0 bg-black/60 flex items-end justify-center p-4 text-white text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p>Credits @K</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
              Hi, I&apos;m <span className="gradient-text">Prathmesh Sayal</span>
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              <span className="js-only">
                <TypeAnimation
                  sequence={[
                    "Computer Science Student",
                    1000,
                    "Cybersecurity Enthusiast",
                    1000,
                    "Full Stack Developer",
                    1000,
                    "AI/ML Researcher",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                />
              </span>
              <noscript>
                <span>
                  Computer Science Student | Cybersecurity Enthusiast | Full Stack Developer | AI/ML Researcher
                </span>
              </noscript>
            </p>

            <p className="text-lg text-muted-foreground">
              Building innovative solutions at the intersection of AI, cybersecurity, and web development
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary"
                >
                  <Link href="#contact">Get In Touch</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" asChild className="rounded-full">
                  <Link href="https://github.com/pratz1337" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" asChild className="rounded-full">
                  <Link href="https://linkedin.com/in/prathmesh-sayal" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" asChild className="rounded-full">
                  <Link href="mailto:sayalprathmesh8@gmail.com">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Random purple blurred gradients */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-fuchsia-400 opacity-20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-violet-400 opacity-25 rounded-full blur-2xl" />
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block js-only"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <ArrowUpCircle className="h-10 w-10 text-primary animate-bounce" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
