
import { motion } from "framer-motion"
import Image from "next/image"

const skills = [
  { name: "React", imageURL: "/images/react.svg" },
  { name: "Python", imageURL: "/images/python.svg" },
  { name: "Next.JS", imageURL: "/images/Nextjs.svg" },
  { name: "C", imageURL: "/images/c.svg" },
  { name: "C++", imageURL: "/images/cpp.svg" },
  { name: "JavaScript", imageURL: "/images/javascript.svg" },
  { name: "Node.js", imageURL: "/images/nodejs.svg" },
  { name: "Tensorflow", imageURL: "/images/tensorflow.svg" },
  { name: "GCloud", imageURL: "/images/gcloud.svg" },
]

export default function Skills() {
  return (
    
    <section id="skills" className="py-20 relative overflow-hidden bg-gradient-to-b from-black to-purple-900">
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Tech Arsenal
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
            >
              <div className="bg-white/5 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group backdrop-blur-sm transform hover:scale-105 flex flex-col items-center justify-center h-full min-h-[200px]">
                <div className="flex items-center justify-center mb-4 relative overflow-hidden w-24 h-24">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  <Image
                    src={skill.imageURL || "/placeholder.svg"}
                    alt={skill.name}
                    width={96}
                    height={96}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white text-center">{skill.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <SkillsBackground />
    </section>
    
  )
}

function SkillsBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full"
            initial={{
              x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 0,
              y: typeof window !== "undefined" ? Math.random() * window.innerHeight : 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 0,
              y: typeof window !== "undefined" ? Math.random() * window.innerHeight : 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
