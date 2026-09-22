import type { Metadata } from "next"
import PortfolioSections from "./portfolio-sections"

export const metadata: Metadata = {
  title: "Computer Science, AI, Systems, and Security",
  description: "Selected projects, research, experience, achievements, and writing by Prathmesh Sayal.",
}

const projects = [
  ["CortexMD", "Explainable multimodal clinical AI with 3D anatomical reconstruction, knowledge graphs, and confidence-based verification.", "NVIDIA Clara · Explainable AI · Computer Vision", "https://github.com/pratz1337"],
  ["KAI", "A Windows AI agent that uses Claude Vision to understand screens and execute keyboard-only automation, with optional kernel-driver support.", "Python · Claude Vision · Windows", "https://github.com/Pratz1337/KAI"],
  ["Heritedge", "Tourism and cultural preservation with an MCP-RAG chatbot, gamified AR experiences, and secure IPFS-based content storage.", "Python · LangChain · Next.js · IPFS", "https://github.com/pratz1337"],
  ["Fence.AI", "Deepfake protection and detection using adversarial perturbations and LIME-based explanations.", "Python · LIME · Adversarial ML", "https://github.com/Pratz1337/deep-defend"],
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Prathmesh Sayal",
        url: "https://portfolio-pratz.vercel.app",
        jobTitle: "Computer Science Engineer",
        alumniOf: "Ramaiah Institute of Technology",
        sameAs: ["https://github.com/Pratz1337", "https://www.linkedin.com/in/prathmesh-sayal"],
      },
      {
        "@type": "WebSite",
        name: "Prathmesh Sayal",
        url: "https://portfolio-pratz.vercel.app",
        description: "Selected projects, research, experience, achievements, and writing by Prathmesh Sayal.",
      },
      {
        "@type": "Article",
        headline: "Impressive, but Still Reactive: Why Current AI Isn’t Close to AGI Yet",
        author: { "@type": "Person", name: "Prathmesh Sayal" },
        url: "https://medium.com/@sayalprathmesh8/impressive-but-still-reactive-why-current-ai-isnt-close-to-agi-yet-430c778e9a77",
      },
    ],
  }

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <PortfolioSections projects={projects} career={career} research={research} recognition={recognition} />
  </>
}
