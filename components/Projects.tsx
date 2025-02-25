"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "./ProjectCard"

export default function Projects() {
  const projects = [
    {
      title: "EDUMITRA",
      description:
        "Developed for the Smart India Hackathon, this chatbot utilizes LLM with custom data, multi-lingual support, and voice interaction. Built using LangChain and Gemini API.",
      technologies: ["LangChain", "Gemini API", "Python"],
      link: "https://github.com/Tostiffent/SnackOverflow-SIH",
    },
    
    {
      title: "Gender Classification Model for Indian Faces",
      description:
        "A deep learning model for gender classification trained specifically on Indian faces. Uses TensorFlow and Keras to predict male or female with high accuracy and confidence scores.",
      technologies: ["TensorFlow", "Keras", "Python"],
      link: "https://github.com/Pratz1337/Gender-Classification-Model-for-Indian-Faces",
    },
    {
      title: "CONVERSA-DIGEST",
      description:
        "A tool leveraging LLM for high-accuracy voice recognition and transcription with speaker diarization, storing both recordings and transcripts efficiently.",
      technologies: ["LLM", "Voice Recognition", "Python"],
      link: "https://github.com/Pratz1337/ConversaDigest-Voice-Recognition-using-LLM",
    },
    {
      title: "Symptom Sage",
      description:
        "An intuitive web application designed to detect pneumonia from chest X-rays, generate comprehensive reports, and connect doctors and patients. Winner of BIT INCEPTRA'24 Hackathon.",
      technologies: ["TensorFlow", "GCloud", "Python", "Flask", "JavaScript"],
      link: "https://github.com/Pratz1337/Symptom_Sage",
    },
    {
      title: "Radio Website Data Scraping",
      description:
        "This Python script scrapes radio station data from a website and saves it to a CSV file. It utilizes BeautifulSoup for web scraping and requests for making HTTP requests.",
      technologies: ["BeautifulSoup", "Python"],
      link: "https://github.com/Pratz1337/Radio-Website-Data-Scraping",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 md:px-20 relative bg-gradient-to-br from-slate-900 to-purple-900">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center text-white"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  )
}

