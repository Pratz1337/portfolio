import { motion } from "framer-motion"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    technologies: string[]
    link: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-white/5  rounded-xl rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
      whileHover={{ y: -5 }}
    >
      <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
      >
        View Project →
      </a>
    </motion.div>
  )
}

