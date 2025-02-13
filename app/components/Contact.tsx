"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin,  Send, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Here you would typically send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setSubmitSuccess(true)
      reset()
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-slate-900 to-purple-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/5 p-8 rounded-xl shadow-lg backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
              <div className="space-y-6">
                <a
                  href="mailto:prathmeshsayal8@gmail.com"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  <Mail className="w-6 h-6 mr-3 text-blue-400" />
                  prathmeshsayal8@gmail.com
                </a>
                
                  
                
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                  Bangalore, India
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white/5 p-8 rounded-xl shadow-lg backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.name ? "border-red-500" : "border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium rounded text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.email ? "border-red-500" : "border-gray-600"
                    } focus:outline-none focus:ring-2 rounded focus:ring-blue-500 bg-white/10 text-white`}
                  />
                  {errors.email && <p className="mt-1 text-sm  rounded text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="subject" className="block rounded text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  {...register("subject")}
                  type="text"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.subject ? "border-red-500" : "border-gray-600"
                  } focus:outline-none focus:ring-2 rounded focus:ring-blue-500 bg-white/10 text-white`}
                />
                {errors.subject && <p className="mt-1 text-sm rounded text-red-500">{errors.subject.message}</p>}
              </div>
              <div className="mt-6">
                <label htmlFor="message" className="block rounded text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.message ? "border-red-500" : "border-gray-600"
                  } focus:outline-none focus:ring-2 rounded focus:ring-blue-500 bg-white/10 text-white`}    
                ></textarea>
                {errors.message && <p className="mt-1 text-sm rounded text-red-500">{errors.message.message}</p>}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              {submitSuccess && (
                <div className="mt-4 p-4 bg-green-500/20 text-green-400 rounded-md">Message sent successfully!</div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

