"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "sayalprathmesh8@gmail.com",
      link: "mailto:sayalprathmesh8@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location",
      value: "Bangalore, India",
      link: "https://maps.google.com/?q=Bangalore,India",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "Available on request",
      link: null,
    },
  ]

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you!
            </p>
            <div className="mx-auto max-w-[700px]">
              <div className="rounded-xl bg-gradient-to-r from-purple-500/10 to-fuchsia-400/10 p-4 border border-purple-300/20 mb-2">
                <span className="block text-lg font-semibold text-purple-700 dark:text-purple-300 mb-1">Hire Me!</span>
                <span className="text-sm text-muted-foreground">
                  Need a modern Next.js or full stack website? I&apos;m available for freelance work. Contact me for pricing, timelines, and to discuss your project needs!
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-6">
                  <form action="https://formspree.io/f/xnndpywa" method="POST" className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                          className="border-primary/20 focus:border-primary transition-colors duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          required
                          className="border-primary/20 focus:border-primary transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject of your message"
                        required
                        className="border-primary/20 focus:border-primary transition-colors duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message"
                        className="min-h-[150px] border-primary/20 focus:border-primary transition-colors duration-300"
                        required
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                      <Button type="submit" className="w-full relative overflow-hidden group">
                        <span className="relative z-10">Send Message</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </motion.div>
                    <noscript>
                      <p className="text-sm text-center text-muted-foreground mt-2">
                        Please enable JavaScript to use the form, or email me directly.
                      </p>
                    </noscript>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">{info.icon}</div>
                      <div>
                        <h3 className="font-medium">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target={info.title === "Location" ? "_blank" : undefined}
                            rel={info.title === "Location" ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="border-primary/20 hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">Connect with me</h3>
                    <p className="text-sm text-muted-foreground mb-4">Find me on these platforms</p>
                    <div className="flex gap-4">
                      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" size="icon" asChild className="rounded-full">
                          <a href="https://github.com/pratz1337" target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" size="icon" asChild className="rounded-full">
                          <a href="https://linkedin.com/in/prathmesh-sayal" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" size="icon" asChild className="rounded-full">
                          <a href="mailto:sayalprathmesh8@gmail.com">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
