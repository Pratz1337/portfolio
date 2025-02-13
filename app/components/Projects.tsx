"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "../components/ProjectCard"

export default function Projects() {
  const projects = [
    {
      title: "Gender Classification Model for Indian Faces",
      description:
        "A deep learning model for gender classification trained specifically on Indian faces. Uses TensorFlow and Keras to predict male or female with high accuracy and confidence scores.",
      technologies: ["NumPy", "Python", "TensorFlow"],
      link: "https://github.com/Pratz1337/Gender-Classification-Model-for-Indian-Faces",
    },
    {
      title: "Symptom Sage",
      description:
        "Intuitive web application designed to detect pneumonia from chest X-rays, generate comprehensive reports pinpointing affected lung areas, and seamlessly connect doctors and patients. This application was awarded first place at the BIT INCEPTRA'24 Hackathon.",
      technologies: ["Tensorflow", "GCloud", "Python", "Flask", "JavaScript"],
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
    <section id="projects" className="py-20 px-4 md:px-20 relative  bg-gradient-to-br from-slate-900 to-purple-900">
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

