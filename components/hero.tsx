"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpCircle, Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  
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

          {/* Right side - Image */}
          <motion.div
            className="flex-auto justify-end lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative ml-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="w-80 h-80 md:w-96 md:h-96 relative">
                {/* Geometric frame */}
                <div className="absolute inset-0 border-2 border-purple-400/30 rounded-2xl rotate-6 bg-gradient-to-br from-purple-500/10 to-violet-500/10" />
                <div className="absolute inset-2 border border-slate-600 rounded-2xl -rotate-3 bg-slate-800/50" />

                {/* Profile image */}
                <div className="absolute inset-4 rounded-xl overflow-hidden bg-slate-900">
                  <Image
                    src="/images/pratz.jpg"
                    alt="Prathmesh Sayal"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>

                {/* Floating elements */}
                <motion.div
          className="absolute -top-4 -right-4 bg-purple-500 text-white p-3 rounded-xl font-bold text-sm shadow-lg"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  CGPA: 9.72
        </motion.div>

                <motion.div
          className="absolute -bottom-4 -left-4 bg-purple-900 border border-purple-600 text-purple-300 p-3 rounded-xl font-mono text-sm shadow-lg"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
                >
                  {"<Developer />"}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

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
