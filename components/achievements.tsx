"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function Achievements() {
  const achievements = [
    {
      title: "Runner-Up, Smart India Hackathon 2024",
      project: "EDUMITRA",
      description: "Secured second place in India's biggest hackathon with an innovative educational solution.",
    },
    {
      title: "Winner, CIDECODE PES'25",
      project: "Fence.AI",
      description: "Won first place with a blockchain-based media verification system to combat deepfakes.",
    },
    {
      title: "Winner, BIT Hack 2024",
      project: "Symptom Sage",
      description: "Developed an AI-powered medical diagnostic tool that won first place.",
    },
    {
      title: "Winner, BMSCE PhaseShift 2023,2024",
      project: "CTF Event",
      description: "Demonstrated exceptional cybersecurity skills in a Capture The Flag competition.",
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
    <section id="achievements" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Achievements</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Recognition and awards for technical excellence
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                        {index < 2 ? (
                          <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{achievement.title}</h3>
                        <p className="text-sm text-primary font-medium mb-2">{achievement.project}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
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
