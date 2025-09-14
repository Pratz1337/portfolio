"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export default function Education() {
  const courses = [
    "Computer Organisation Architecture",
    "Data Communication & Networking",
    "Computational Theory",
    "Compiler Design",
    "Database Management System",
  ]

  return (
    <section id="education" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Education</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and qualifications
            </p>
          </div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-6 flex items-center gap-4">
                  <motion.div
                    className="bg-primary/20 p-3 rounded-full"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">
                      B.E. Computer Science Engineering with specialization in Cybersecurity
                    </h3>
                    <p className="text-muted-foreground">Ramaiah Institute of Technology (August 2023 - August 2027)</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="font-semibold">
                      CGPA: <span className="text-primary">9.57/10.00</span> (Till 4th Semester)
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Key Coursework:</h4>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {courses.map((course, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          <span className="text-muted-foreground">{course}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
