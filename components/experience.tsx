"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export default function Experience() {
  const experiences = [
    {
      title: "Intern Trainee",
      company: "ISRO-Leos Bangalore",
      period: "August’25 – September’25",
      location: "Bangalore, India",
      achievements: [
        "Computed an AI pipeline to process and interpret satellite imagery, achieving 98.3% object recognition accuracy and reducing false positives by 31%, directly enabling sub-meter precision in autonomous navigation control systems.",
        "Designed and prototyped novel ML algorithms for spacecraft simulation environments, sustaining >99.9% reliability across 1,000+ zero-failure test runs and ensuring latency under 200ms for real-time autonomous maneuvering.",
      ],
    },
    {
      title: "Project Intern",
      company: "Hewlett Packard Enterprise (HPE)",
      period: "April 2025 - Present",
      location: "Remote",
      achievements: [
        "Working on industry-relevant projects involving Confidential Computing",
        "Collaborating with professionals to bridge academic knowledge with real-world industry practices",
        "Selected for a competitive early-career development program aimed at nurturing tech talent",
      ],
    },
    {
      title: "Core Member",
      company: "Google Developer Group (GDG) – RIT Chapter",
      period: "December 2024 - Present",
      location: "Bangalore, India",
      achievements: [
        "Lead Student Co-ordinator Organising Smart India Hackathon'25",
        "Collaborating with other GDG members to organize Capture the Flag and Other Flagship Events",
        "Contributing to the developer community at RIT",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My professional journey and key roles
            </p>
          </div>

          <div className="space-y-8 mt-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="hidden md:block mt-1">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{experience.title}</h3>
                          <p className="text-muted-foreground">{experience.company}</p>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                        <Badge variant="outline" className="mb-1 md:mb-0">
                          {experience.period}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{experience.location}</span>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 * i + 0.3 }}
                        >
                          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
