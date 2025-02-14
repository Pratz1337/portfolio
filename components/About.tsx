"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Zap } from "lucide-react"
import ImageHoverCredits from "./ImageHoverCredits"

interface AboutProps {
  onImageClick: () => void
}

export default function About({ onImageClick }: AboutProps) {
  const skills = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: "Web Development",
      description: "React, Next.js, Python",
    },
    { icon: <Server className="w-8 h-8 text-green-400" />, title: "Backend", description: "Node.js, Flask" },
    { icon: <Database className="w-8 h-8 text-purple-400" />, title: "AI & ML", description: "TensorFlow, NumPy" },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Performance",
      description: "Optimization, Algorithms",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 md:px-20 relative bg-gradient-to-b from-black to-purple-900">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-10 text-center text-white"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-64 h-64 mx-auto" onClick={onImageClick}>
              <ImageHoverCredits
                src="/images/aboutjpg.jpg"
                alt="Prathmesh Sayal"
                credits="Credits-@K"
                width={256}
                height={256}
              />
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg leading-relaxed text-gray-300 mb-4">
              Hello! I&apos;m Prathmesh Sayal, a passionate learner and tech enthusiast. My journey in the world of
              computer science has been driven by an insatiable curiosity and a desire to create impactful solutions.
            </p>
            <p className="text-lg leading-relaxed text-gray-300 mb-4">
              I specialize in Python, Web Development, and AI-powered applications. The ever-evolving landscape of
              technology keeps me on my toes, always learning and adapting to new challenges.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              When I&apos;m not coding, you&apos;ll find me exploring the latest tech trends, contributing to
              open-source projects, or brainstorming innovative ideas. Let&apos;s connect and create something amazing
              together!
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl gap-6 mt-12">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-white/5 p-6 rounded-lg shadow-lg rounded-xl backdrop-blur-sm"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {skill.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2 text-white">{skill.title}</h3>
              <p className="text-gray-400">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

