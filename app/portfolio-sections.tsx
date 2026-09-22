import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { achievements, article, career, projects, research, sectionDetails, sections, type Section } from "./portfolio-data"

function ExternalArrow() {
  return <ArrowUpRight size={15} aria-hidden="true" />
}

export default function PortfolioSections({ section }: { section: Section }) {
  return <div className="portfolio-page">
    <a className="skip-link" href="#content">Skip to content</a>
    <header className="site-header">
      <div className="identity">
        <div className="portrait-frame"><Image src="/images/pratz.jpg" alt="Portrait of Prathmesh Sayal" fill priority sizes="(max-width: 480px) 64px, 80px" className="portrait-image" /></div>
        <div><Link className="site-name" href="/">Prathmesh Sayal</Link><p>21 · Bengaluru, India</p></div>
      </div>
      <div className="header-links">
        <a href="https://github.com/Pratz1337" target="_blank" rel="noopener noreferrer"><Github size={15} aria-hidden="true" /> GitHub</a>
        <a href="https://linkedin.com/in/prathmesh-sayal" target="_blank" rel="noopener noreferrer"><Linkedin size={15} aria-hidden="true" /> LinkedIn</a>
        <a href="mailto:sayalprathmesh8@gmail.com"><Mail size={15} aria-hidden="true" /> Email</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume <ExternalArrow /></a>
        <a href="/cv-prathmesh-sayal.pdf" target="_blank" rel="noopener noreferrer">CV <ExternalArrow /></a>
      </div>
    </header>

    <nav className="section-nav" aria-label="Portfolio sections">
      {sections.map((item) => <Link href={item === "about" ? "/" : `/${item}`} aria-current={section === item ? "page" : undefined} key={item}>{sectionDetails[item].label}</Link>)}
    </nav>

    <main id="content" className="profile-content">
      {section === "about" && <section className="content-section">
        <h1>About</h1>
        <div className="intro-copy">
          <p className="lead">I’m interested in how AI systems can be made more reliable, interpretable, and secure.</p>
          <p>That curiosity began with building my first PC in 10th grade. It has grown through research projects, technical competitions, and internships at ISRO, HPE, and Fidelity.</p>
          <p>My current interests include trustworthy AI, AI safety, computer vision, machine learning, and AI security. I enjoy work that connects a clear technical idea to a system people can inspect and use.</p>
        </div>
        <dl className="facts"><div><dt>Education</dt><dd>Ramaiah Institute of Technology</dd></div><div><dt>Degree</dt><dd>B.E. Computer Science and Engineering · Cybersecurity</dd></div><div><dt>CGPA</dt><dd>9.52 / 10.00</dd></div></dl>
      </section>}

      {section === "projects" && <section className="content-section">
        <h1>Projects</h1><p className="section-intro">Selected work across AI agents, medical imaging, security, and developer tools.</p>
        <div className="entry-list">{projects.map((project) => <article className="entry" key={project.name}>
          <h2>{project.href ? <a href={project.href} target="_blank" rel="noopener noreferrer">{project.name} <ExternalArrow /></a> : project.name}</h2>
          <p>{project.description}</p><p className="entry-detail">{project.detail}</p><span className="entry-meta">{project.tags}</span>
        </article>)}</div>
      </section>}

      {section === "career" && <section className="content-section">
        <h1>Career</h1><p className="section-intro">Internship work in systems, security, and data engineering.</p>
        <div className="entry-list">{career.map((position) => <article className="entry career-entry" key={`${position.company}-${position.period}`}>
          <div className="entry-heading"><h2>{position.company}{position.proof && <a className="proof-link" href={position.proof} target="_blank" rel="noopener noreferrer" aria-label={`${position.company} internship certificate`}><ExternalArrow /></a>}</h2><span className="entry-date">{position.period}</span></div>
          <p className="entry-role">{position.role}</p><p>{position.detail}</p>
        </article>)}</div>
      </section>}

      {section === "research" && <section className="content-section">
        <h1>Research</h1><p className="section-intro">Publications and manuscripts in AI, cybersecurity, and data systems.</p>
        <div className="entry-list">{research.map((paper) => <article className="entry" key={paper.title}>
          <h2><a href={paper.href} target="_blank" rel="noopener noreferrer">{paper.title} <ExternalArrow /></a></h2>
          <span className="entry-meta">{paper.venue}</span><p>{paper.detail}</p>
        </article>)}</div>
      </section>}

      {section === "achievements" && <section className="content-section">
        <h1>Achievements</h1><p className="section-intro">Selected hackathon and cybersecurity competition results.</p>
        <div className="entry-list">{achievements.map((item) => <article className="entry" key={item.title}>
          <div className="entry-heading"><h2>{item.title}</h2><span className="entry-date">{item.result}</span></div><p>{item.detail}</p>
        </article>)}</div>
      </section>}

      {section === "writing" && <section className="content-section">
        <h1>Writing</h1><p className="section-intro">Occasional essays on AI and the questions behind its progress.</p>
        <div className="entry-list"><article className="entry"><h2><a href={article.href} target="_blank" rel="noopener noreferrer">{article.title} <ExternalArrow /></a></h2><span className="entry-meta">Medium</span><p>{article.description}</p></article></div>
      </section>}

      {section === "contact" && <section className="content-section">
        <h1>Contact</h1><p className="section-intro">For research, projects, or a conversation about the work here, email me directly.</p>
        <a className="contact-link" href="mailto:sayalprathmesh8@gmail.com">sayalprathmesh8@gmail.com <ExternalArrow /></a>
      </section>}
    </main>
  </div>
}
