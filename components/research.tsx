"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Research() {
  const publications = [
    {
      title: "Quantum Powered Data Analysis",
      conference: "ICEMTEC Pune, 2024",
      description: "Published a paper exploring the intersection of quantum computing and data analytics.",
      link: "#", // Replace with actual link when available
    },
  ]

  return (
    <section id="research" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Research Publications</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My contributions to academic research
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {publications.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{publication.title}</h3>
                        <p className="text-sm font-medium text-primary mb-3">{publication.conference}</p>
                        <p className="text-muted-foreground mb-4">{publication.description}</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href='/Quantum Powered Data Analysis.pdf' target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> View Publication
                          </Link>
                        </Button>
                      </div>
                    </div>
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
