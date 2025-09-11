import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Research from "@/components/research"
import Achievements from "@/components/achievements"
import AdvancedContactForm from "@/components/advanced-contact-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prathmesh Sayal | Computer Science Student & Developer",
  description:
    "Portfolio of Prathmesh Sayal, a Computer Science Engineering student specializing in Cybersecurity, with expertise in Python, JavaScript, and AI/ML technologies.",
}

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Research />
      <Achievements />
      <AdvancedContactForm />
    </div>
  )
}
