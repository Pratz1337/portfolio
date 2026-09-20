"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

type Row = string[]
type Props = { projects: Row[]; career: Row[]; research: Row[]; recognition: string[] }

const sections = ["home", "about", "projects", "career", "research", "achievements", "writing", "contact"]

export default function PortfolioSections({ projects, career, research, recognition }: Props) {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const sync = () => setActive(window.location.hash.slice(1) || "home")
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  const show = (section: string) => active === section

  return <div className="portfolio-page">
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy"><h1>Prathmesh Sayal</h1><p>21 · Bengaluru, India</p></div>
        <div className="portrait-frame"><Image src="/images/pratz.jpg" alt="Prathmesh Sayal" fill priority sizes="80px" className="portrait-image" /></div>
      </div>
      <div className="hero-links"><a href="https://github.com/pratz1337" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><a href="https://linkedin.com/in/prathmesh-sayal" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a><a href="mailto:sayalprathmesh8@gmail.com"><Mail size={15} /> Email</a><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15} /></a></div>
    </section>

    <nav className="section-nav" aria-label="Portfolio sections">
      {sections.map((section) => <a className={active === section ? "active" : ""} href={`#${section}`} key={section}>{section === "achievements" ? "Achievements" : section[0].toUpperCase() + section.slice(1)}</a>)}
    </nav>

    <main className="profile-content">
      {show("home") && <section className="content-section active-section"><h2>Home</h2><div className="section-content"><p className="about-lead">I build and study systems at the intersection of AI, security, and applied computer science.</p><p>Explore the sections above for selected work, research, experience, achievements, and writing.</p></div></section>}
      {show("about") && <section className="content-section active-section"><h2>About</h2><div className="section-content"><p className="about-lead">I became interested in computer science by building my first custom PC in 10th grade. That curiosity grew through projects, internships at ISRO, HPE, and Fidelity, and competitive technical work.</p><p>My interests include trustworthy and interpretable AI, AI safety, deep learning, computer vision, and AI security.</p><dl className="facts"><div><dt>Education</dt><dd>Ramaiah Institute of Technology</dd></div><div><dt>Degree</dt><dd>B.E. Computer Science · Cybersecurity</dd></div><div><dt>CGPA</dt><dd>9.52 / 10.00</dd></div></dl></div></section>}
      {show("projects") && <section className="content-section active-section"><h2>Projects</h2><div className="section-content row-list">{projects.map(([name, description, stack, href]) => <a className="project-row" href={href} target="_blank" rel="noreferrer" key={name}><span className="row-main"><strong>{name}</strong><small>{description}</small><em>{stack}</em></span><ArrowUpRight size={16} /></a>)}</div></section>}
      {show("career") && <section className="content-section active-section"><h2>Career</h2><div className="section-content row-list">{career.map(([company, role, year, detail, proof]) => <div className="career-row" key={`${company}-${year}`}><span className="career-year">{year}</span><span className="row-main"><strong>{company}{proof && <a className="proof-link" href={proof} target="_blank" rel="noreferrer" aria-label={`${company} certificate`}><ArrowUpRight size={14} /></a>}</strong><small>{role} · {detail}</small></span></div>)}</div></section>}
      {show("research") && <section className="content-section active-section"><h2>Research</h2><div className="section-content row-list">{research.map(([title, venue, href]) => <a className="research-row" href={href} target="_blank" rel="noreferrer" key={title}><span className="row-main"><strong>{title}</strong><small>{venue}</small></span><ArrowUpRight size={16} /></a>)}</div></section>}
      {show("achievements") && <section className="content-section active-section"><h2>Achievements</h2><div className="section-content recognition-list">{recognition.map((item) => <p key={item}>{item}</p>)}</div></section>}
      {show("writing") && <section className="content-section active-section"><h2>Writing</h2><div className="section-content row-list"><a className="project-row" href="https://medium.com/@sayalprathmesh8/impressive-but-still-reactive-why-current-ai-isnt-close-to-agi-yet-430c778e9a77" target="_blank" rel="noreferrer"><span className="row-main"><strong>Impressive, but Still Reactive: Why Current AI Isn’t Close to AGI Yet</strong><small>Medium · Essay on the limits of current AI systems and the gap between impressive capability and general intelligence.</small></span><ArrowUpRight size={16} /></a></div></section>}
      {show("contact") && <section className="contact-section active-section"><h2>Contact</h2><p>If you would like to discuss research, systems, or a project, reach out here.</p><a href="mailto:sayalprathmesh8@gmail.com">sayalprathmesh8@gmail.com <ArrowUpRight size={16} /></a></section>}
    </main>
  </div>
}
