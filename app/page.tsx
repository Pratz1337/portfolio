import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Prathmesh Sayal",
  description: "Prathmesh Sayal — computer science, AI, systems, and security.",
}

const projects = [
  ["CortexMD", "Explainable multimodal clinical AI with 3D anatomical reconstruction, knowledge graphs, and confidence-based verification.", "NVIDIA Clara · Explainable AI · Computer Vision", "https://github.com/pratz1337"],
  ["Heritedge", "Tourism and cultural preservation with an MCP-RAG chatbot, gamified AR experiences, and secure IPFS-based content storage.", "Python · LangChain · Next.js · IPFS", "https://github.com/pratz1337"],
  ["Fence.AI", "Deepfake protection and detection using adversarial perturbations and LIME-based explanations.", "Python · LIME · Adversarial ML", "https://github.com/Pratz1337/deep-defend"],
  ["HRT-LI", "Certified rank transport for dynamic learned indexes over hierarchical string keys.", "Learned indexes · Data structures · C++", "https://github.com/Pratz1337/RankTransport-Index"],
  ["Symptom Sage", "A medical imaging application for pneumonia detection, reports, and doctor–patient workflows.", "TensorFlow · Flask · GCloud", "https://github.com/Pratz1337/Symptom_Sage"],
]

const career = [
  ["Indian Space Research Organisation", "Trainee", "2026", "Native C17 object detection and FP8 evaluation for resource-constrained deployment.", "/isro-internship-certificate.pdf"],
  ["Fidelity Investments", "Summer Intern", "2026", "Reusable extraction, validation, and persistence automation across data pipelines.", "/fidelity-training-certificate.pdf"],
  ["Hewlett Packard Enterprise", "Project Intern", "2025–26", "Confidential-computing telemetry, federated learning, and continuous TPM remote attestation.", ""],
  ["Indian Space Research Organisation", "Trainee", "2025", "Satellite-image understanding and low-latency target detection for autonomous navigation.", ""],
]

const research = [
  ["HRT-LI: Certified Rank Transport for Dynamic Learned Index over Hierarchical String Keys", "Journal of Big Data · 2026", "https://www.researchgate.net/publication/414342336_HRT-LI_Certified_Rank_Transport_for_Dynamic_Learned_Index_over_Hierarchical_String_Keys"],
  ["Smart Honeypot for Threat Detection and Classification in IoMT Networks", "Discover Internet of Things · 2026", "https://www.researchgate.net/publication/414199107_Smart_Honeypot_for_Threat_Detection_and_Classification_in_IoMt_Networks"],
  ["Quantum Powered Data Analysis", "ICEMTEC 2024 · Published", "https://www.researchgate.net/publication/386019659_Quantum_Powered_Data_Analysis"],
  ["BrainMD: Explainable Hybrid Liquid AI for Robust Neurodiagnostics in Low-Resource Areas", "Computer Science and Information Technologies · 2026", "/brainmd-revised.pdf"],
  ["Generative AI Framework for Expediting the Search for New Therapeutics Using Generative Adversarial Networks", "Journal of Communications Software and Systems · 2026", "/generative-ai-therapeutics.pdf"],
]

const recognition = ["CIDECODE PES 2025 · Winner", "Smart India Hackathon 2024 · Runner-up", "HPE Think-a-Thon 2025 · Winner", "10× hackathon winner · 6× CTF winner"]

export default function Home() {
  return <div className="portfolio-page">
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy"><h1>Prathmesh Sayal</h1><p>21 · Bengaluru, India</p></div>
        <div className="portrait-frame"><Image src="/images/pratz.jpg" alt="Prathmesh Sayal" fill priority sizes="80px" className="portrait-image" /></div>
      </div>
      <div className="hero-links"><a href="https://github.com/pratz1337" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><a href="https://linkedin.com/in/prathmesh-sayal" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a><a href="mailto:sayalprathmesh8@gmail.com"><Mail size={15} /> Email</a><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15} /></a></div>
    </section>

    <div className="profile-content">
      <section id="about" className="content-section"><h2>About</h2><div className="section-content"><p className="about-lead">I became interested in computer science by building my first custom PC in 10th grade. That curiosity grew through projects, internships at ISRO, HPE, and Fidelity, and competitive technical work.</p><p>My interests include trustworthy and interpretable AI, AI safety, deep learning, computer vision, and AI security.</p><dl className="facts"><div><dt>Education</dt><dd>Ramaiah Institute of Technology</dd></div><div><dt>Degree</dt><dd>B.E. Computer Science · Cybersecurity</dd></div><div><dt>CGPA</dt><dd>9.52 / 10.00</dd></div></dl></div></section>
      <section id="projects" className="content-section"><h2>Projects</h2><div className="section-content row-list">{projects.map(([name, description, stack, href]) => <a className="project-row" href={href} target="_blank" rel="noreferrer" key={name}><span className="row-main"><strong>{name}</strong><small>{description}</small><em>{stack}</em></span><ArrowUpRight size={16} /></a>)}</div></section>
      <section id="experience" className="content-section"><h2>Career</h2><div className="section-content row-list">{career.map(([company, role, year, detail, proof]) => <div className="career-row" key={`${company}-${year}`}><span className="career-year">{year}</span><span className="row-main"><strong>{company}{proof && <a className="proof-link" href={proof} target="_blank" rel="noreferrer" aria-label={`${company} certificate`}><ArrowUpRight size={14} /></a>}</strong><small>{role} · {detail}</small></span></div>)}</div></section>
      <section id="research" className="content-section"><h2>Research</h2><div className="section-content row-list">{research.map(([title, venue, href]) => href ? <a className="research-row" href={href} target="_blank" rel="noreferrer" key={title}><span className="row-main"><strong>{title}</strong><small>{venue}</small></span><ArrowUpRight size={16} /></a> : <div className="research-row" key={title}><span className="row-main"><strong>{title}</strong><small>{venue}</small></span></div>)}</div></section>
      <section id="recognition" className="content-section"><h2>Recognition</h2><div className="section-content recognition-list">{recognition.map((item) => <p key={item}>{item}</p>)}</div></section>
      <section id="contact" className="contact-section"><h2>Contact</h2><a href="mailto:sayalprathmesh8@gmail.com">sayalprathmesh8@gmail.com <ArrowUpRight size={16} /></a></section>
    </div>
  </div>
}
