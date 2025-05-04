"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const projects = [
    {
      title: "Hertiedge",
      description:
        "A one-stop solution for boosting Tourism and Preserving Indian Culture. Provides access to Smart Travel Planner, MCP-RAG Based Chatbot with Gamified AR Experience, Conversational Bot with secure storage using OQS and IPFS.",
      technologies: ["Python", "LangChain", "Groq API", "Next.js", "Google Maps API", "Twilio", "OQS", "IPFS"],
      link: "https://github.com/pratz1337",
      award: "Runner-Up, Smart India Hackathon 2024 (EDUMITRA)",
      role: "Team Lead, Full Stack Developer",
    },
    {
      title: "Fence.AI - Deepfake Detection and Media Verification",
      description:
        "Provides blockchain-based verification for media authenticity before upload on social media platforms. Includes community-driven voting system for content authenticity.",
      technologies: ["Blockchain", "Python", "Web3.js"],
      link: "https://github.com/pratz1337",
      award: "Winner, CIDECODE PES'25",
      role: "Backend Developer",
    },
    {
      title: "Symptom Sage",
      description:
        "Intuitive web application designed to detect pneumonia from chest X-rays, generate comprehensive reports pinpointing affected lung areas, and seamlessly connect doctors and patients.",
      technologies: ["TensorFlow", "GCloud", "Python", "Flask", "JavaScript"],
      link: "https://github.com/Pratz1337/Symptom_Sage",
      award: "Winner, BIT INCEPTRA'24 Hackathon",
      role: "ML Engineer",
    },
    {
      title: "Gender Classification Model for Indian Faces",
      description:
        "A deep learning model for gender classification trained specifically on Indian faces. Uses TensorFlow and Keras to predict male or female with high accuracy and confidence scores.",
      technologies: ["NumPy", "Python", "TensorFlow"],
      link: "https://github.com/Pratz1337/Gender-Classification-Model-for-Indian-Faces",
      award: null,
      role: "ML Engineer",
    },
    {
      title: "Radio Website Data Scraping",
      description:
        "This Python script scrapes radio station data from a website and saves it to a CSV file. It utilizes BeautifulSoup for web scraping and requests for making HTTP requests.",
      technologies: ["BeautifulSoup", "Python"],
      link: "https://github.com/Pratz1337/Radio-Website-Data-Scraping",
      award: null,
      role: "Developer",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="projects" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my technical projects and hackathon wins
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                variants={item}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/50">
                  <CardContent className="project-content flex-1 flex flex-col p-5">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground italic">{project.role}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 flex-1">{project.description}</p>

                    {project.award && (
                      <div className="my-3 flex items-center">
                        <Award className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                          {project.award}
                        </span>
                      </div>
                    )}

                    <div className="project-tags mt-3 mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="project-links mt-auto flex gap-2">
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1 h-4 w-4" /> View Code
                        </Link>
                      </Button>
                      {project.link.includes("github.com") && (
                        <Button size="sm" variant="outline" asChild className="w-10 p-0">
                          <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Visit Project</span>
                          </Link>
                        </Button>
                      )}
                    </div>
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
