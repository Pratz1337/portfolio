"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Github, Linkedin, Shield, CheckCircle, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { generateFingerprintHash, type DeviceFingerprint, type BehavioralData } from "@/lib/fingerprint"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string // Hidden field for spam detection
}

export default function AdvancedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "blocked">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: 0 })

  // Behavioral tracking
  const [behavioralData, setBehavioralData] = useState<BehavioralData>({
    typingCadence: [],
    backspaceCount: 0,
    timeOnPage: 0,
    mouseMovements: 0,
    scrollBehavior: { totalScrolls: 0, averageScrollSpeed: 0 },
    formFillTime: 0,
    pasteEvents: 0,
  })

  const [deviceFingerprint, setDeviceFingerprint] = useState<DeviceFingerprint | null>(null)
  const formStartTime = useRef<number>(Date.now())
  const pageLoadTime = useRef<number>(Date.now())
  const lastKeyTime = useRef<number>(0)
  const mouseMovementCount = useRef<number>(0)
  const scrollCount = useRef<number>(0)
  const scrollSpeeds = useRef<number[]>([])

  // Generate CAPTCHA question
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operations = ["+", "-", "*"]
    const operation = operations[Math.floor(Math.random() * operations.length)]

    let answer = 0
    let question = ""

    switch (operation) {
      case "+":
        answer = num1 + num2
        question = `What is ${num1} + ${num2}?`
        break
      case "-":
        answer = Math.max(num1, num2) - Math.min(num1, num2)
        question = `What is ${Math.max(num1, num2)} - ${Math.min(num1, num2)}?`
        break
      case "*":
        answer = num1 * num2
        question = `What is ${num1} × ${num2}?`
        break
    }

    setCaptchaQuestion({ question, answer })
  }

  // Collect device fingerprint
  useEffect(() => {
    const collectFingerprint = async () => {
      try {
        // Basic fingerprint data
        const fingerprint: DeviceFingerprint = {
          userAgent: navigator.userAgent,
          language: navigator.language,
          timezone: new Date().getTimezoneOffset(),
          screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth,
          },
          plugins: Array.from(navigator.plugins).map((p) => p.name),
          cookieEnabled: navigator.cookieEnabled,
          doNotTrack: navigator.doNotTrack,
        }

        // Canvas fingerprinting (optional)
        try {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.textBaseline = "top"
            ctx.font = "14px Arial"
            ctx.fillText("Device fingerprint canvas", 2, 2)
            fingerprint.canvas = canvas.toDataURL().slice(-50) // Last 50 chars
          }
        } catch (e) {
          // Canvas fingerprinting blocked
        }

        // WebGL fingerprinting (optional)
        try {
          const gl = document.createElement("canvas").getContext("webgl")
          if (gl) {
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
            if (debugInfo) {
              fingerprint.webgl = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            }
          }
        } catch (e) {
          // WebGL fingerprinting blocked
        }

        setDeviceFingerprint(fingerprint)
      } catch (error) {
        console.error("Error collecting fingerprint:", error)
      }
    }

    collectFingerprint()
    generateCaptcha()

    // Track mouse movements
    const handleMouseMove = () => {
      mouseMovementCount.current++
    }

    // Track scrolling behavior
    let lastScrollTime = Date.now()
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const now = Date.now()
      const currentScrollY = window.scrollY
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY) / (now - lastScrollTime)

      scrollCount.current++
      scrollSpeeds.current.push(scrollSpeed)

      lastScrollTime = now
      lastScrollY = currentScrollY
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Track typing behavior
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const now = Date.now()

    if (lastKeyTime.current > 0) {
      const timeDiff = now - lastKeyTime.current
      setBehavioralData((prev) => ({
        ...prev,
        typingCadence: [...prev.typingCadence.slice(-20), timeDiff], // Keep last 20 intervals
      }))
    }

    if (e.key === "Backspace") {
      setBehavioralData((prev) => ({
        ...prev,
        backspaceCount: prev.backspaceCount + 1,
      }))
    }

    lastKeyTime.current = now
  }

  // Track paste events
  const handlePaste = () => {
    setBehavioralData((prev) => ({
      ...prev,
      pasteEvents: prev.pasteEvents + 1,
    }))
  }

  // Handle form input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // If this is the first input, record form start time
    if (formStartTime.current === pageLoadTime.current) {
      formStartTime.current = Date.now()
    }
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Check honeypot
      if (formData.honeypot) {
        console.log("[v0] Honeypot triggered")
        setSubmitStatus("blocked")
        setIsSubmitting(false)
        return
      }

      // Validate CAPTCHA if shown
      if (showCaptcha && Number.parseInt(captchaAnswer) !== captchaQuestion.answer) {
        setErrorMessage("Please solve the math problem correctly")
        setIsSubmitting(false)
        return
      }

      // Compile behavioral data
      const finalBehavioralData: BehavioralData = {
        ...behavioralData,
        timeOnPage: Date.now() - pageLoadTime.current,
        formFillTime: Date.now() - formStartTime.current,
        mouseMovements: mouseMovementCount.current,
        scrollBehavior: {
          totalScrolls: scrollCount.current,
          averageScrollSpeed:
            scrollSpeeds.current.length > 0
              ? scrollSpeeds.current.reduce((a, b) => a + b, 0) / scrollSpeeds.current.length
              : 0,
        },
      }

      // Submit to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          fingerprint: deviceFingerprint ? generateFingerprintHash(deviceFingerprint) : null,
          deviceFingerprint,
          behavioralData: finalBehavioralData,
          captchaAnswer: showCaptcha ? captchaAnswer : null,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" })
        setCaptchaAnswer("")
      } else if (result.requiresCaptcha) {
        setShowCaptcha(true)
        generateCaptcha()
        setErrorMessage("Please complete the verification below")
      } else if (result.code === "BLOCKED") {
        setSubmitStatus("blocked")
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setSubmitStatus("error")
      setErrorMessage("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "prathmeshsayal8@gmail.com",
      link: "mailto:prathmeshsayal8@gmail.com",
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
                  Need a modern Next.js or full stack website? I'm available for freelance work. Contact me for pricing,
                  timelines, and to discuss your project needs!
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
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-green-800 dark:text-green-200">
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </motion.div>
                  )}

                  {submitStatus === "blocked" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
                    >
                      <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="text-red-800 dark:text-red-200">
                        Your request has been blocked. Please try again later.
                      </span>
                    </motion.div>
                  )}

                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center gap-3"
                    >
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-yellow-800 dark:text-yellow-200">{errorMessage}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users */}
                    <input
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) => handleInputChange("honeypot", e.target.value)}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          onKeyDown={handleKeyDown}
                          onPaste={handlePaste}
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
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          onKeyDown={handleKeyDown}
                          onPaste={handlePaste}
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
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
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
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        className="min-h-[150px] border-primary/20 focus:border-primary transition-colors duration-300"
                        required
                      />
                    </div>

                    {showCaptcha && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2 p-4 bg-muted/50 rounded-lg border"
                      >
                        <label htmlFor="captcha" className="text-sm font-medium flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Security Verification
                        </label>
                        <p className="text-sm text-muted-foreground">{captchaQuestion.question}</p>
                        <Input
                          id="captcha"
                          type="number"
                          placeholder="Enter your answer"
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          required
                          className="max-w-32"
                        />
                      </motion.div>
                    )}

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                      <Button type="submit" disabled={isSubmitting} className="w-full relative overflow-hidden group">
                        <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </motion.div>
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
                        <Button variant="outline" size="icon" asChild className="rounded-full bg-transparent">
                          <a href="https://github.com/pratz1337" target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" size="icon" asChild className="rounded-full bg-transparent">
                          <a href="https://linkedin.com/in/prathmesh-sayal" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="outline" size="icon" asChild className="rounded-full bg-transparent">
                          <a href="mailto:prathmeshsayal8@gmail.com">
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
