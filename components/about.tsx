"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code2, Shield, Server, Brain } from "lucide-react"
import { motion } from "framer-motion"

export default function About() {
  const features = [
    {
      icon: <Code2 className="h-10 w-10 text-primary" />,
      title: "Full Stack Development",
      description: "Building responsive web applications with React, Next.js, and Node.js",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Cybersecurity",
      description: "Specializing in secure coding practices and vulnerability assessment",
    },
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: "Blockchain Solutions",
      description: "Developing decentralized applications with Web3.js and Solidity",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI & Machine Learning",
      description: "Creating intelligent systems with TensorFlow, Keras, and LangChain",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 0.9,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="about" className="py-20 bg-muted/30 w-full">
      <div className="container px-4 md:px-6">
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
            
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              Currently pursuing my B.E. in Computer Science Engineering with a specialization in Cybersecurity at
              Ramaiah Institute of Technology. I&apos;m passionate about exploring the intersection of artificial
              intelligence, cybersecurity, and web development. My goal is to create innovative solutions that are not
              only technologically advanced but also secure and user-friendly.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={item} className="animate-in">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <motion.div
                      className="p-2 rounded-full bg-primary/10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
