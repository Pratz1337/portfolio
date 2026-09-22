export const siteUrl = "https://portfolio-pratz.vercel.app"

export const sections = ["about", "projects", "career", "research", "achievements", "writing", "contact"] as const
export type Section = (typeof sections)[number]

export const sectionDetails: Record<Section, { label: string; description: string }> = {
  about: { label: "About", description: "About Prathmesh Sayal: computer science, AI, cybersecurity, and research interests." },
  projects: { label: "Projects", description: "Selected AI, security, and software projects by Prathmesh Sayal, including KAI, CortexMD, and Fence.AI." },
  career: { label: "Career", description: "Internship experience at ISRO, Fidelity Investments, and Hewlett Packard Enterprise." },
  research: { label: "Research", description: "Publications and manuscripts on learned indexes, medical AI, IoMT security, quantum data analysis, and drug discovery." },
  achievements: { label: "Achievements", description: "Hackathon, cybersecurity competition, and technical community highlights." },
  writing: { label: "Writing", description: "Essays by Prathmesh Sayal on artificial intelligence and its limitations." },
  contact: { label: "Contact", description: "Contact Prathmesh Sayal about research, software projects, and technical collaboration." },
}

export const projects = [
  {
    name: "CortexMD",
    description: "A clinical AI project combining medical imaging, 3D anatomical reconstruction, and explanations that help people inspect a model's conclusions.",
    detail: "Led the work on a multimodal diagnosis workflow using NVIDIA Clara, knowledge graphs, and confidence checks.",
    tags: "Medical AI · Computer vision",
  },
  {
    name: "KAI",
    description: "A Windows agent that reads the screen with Claude Vision and carries out keyboard actions from a user goal.",
    detail: "Includes a step history, dry-run mode, kill switch, and optional kernel driver support.",
    tags: "Python · Windows · AI agents",
    href: "https://github.com/Pratz1337/KAI",
  },
  {
    name: "HeritEdge",
    description: "A cultural tourism platform with a retrieval-based chatbot, AR experiences, and IPFS storage for content.",
    detail: "Built with a four-person team to make local heritage easier to explore and preserve.",
    tags: "Next.js · Retrieval · AR",
  },
  {
    name: "Fence.AI",
    description: "A deepfake detection and image-protection project that pairs adversarial perturbations with explanations of model decisions.",
    detail: "The detection workflow uses LIME to show which image features influenced a result.",
    tags: "Python · AI security · Explainability",
    href: "https://github.com/Pratz1337/deep-defend",
  },
  {
    name: "Symptom Sage",
    description: "A medical imaging application for pneumonia screening, reports, and doctor–patient workflows.",
    detail: "Connects the model output to a usable reporting flow rather than leaving the prediction on its own.",
    tags: "TensorFlow · Flask · Medical imaging",
    href: "https://github.com/Pratz1337/Symptom_Sage",
  },
]

export const career = [
  { company: "Indian Space Research Organisation · LEOS", role: "Trainee", period: "Jul–Aug 2026", detail: "Co-developed native C17 object detection for constrained hardware and evaluated FP8 arithmetic for FPGA-oriented execution.", proof: "/isro-internship-certificate.pdf" },
  { company: "Fidelity Investments", role: "Summer Intern", period: "May–Jul 2026", detail: "Built reusable extraction and validation workflows, including checks between Azure Blob Storage data and source records.", proof: "/fidelity-training-certificate.pdf" },
  { company: "Hewlett Packard Enterprise", role: "Project Intern", period: "Apr 2025–Jan 2026", detail: "Worked on confidential-computing telemetry and continuous TPM remote attestation with centralized verification." },
  { company: "Indian Space Research Organisation", role: "Trainee", period: "Aug–Sep 2025", detail: "Developed a satellite-imagery pipeline for object recognition and autonomous navigation research." },
]

export const research = [
  { title: "HRT-LI: Certified Rank Transport for Dynamic Learned Index over Hierarchical String Keys", venue: "Journal of Big Data · 2026", detail: "A learned index that keeps rank-error certificates valid as hierarchical string keys are inserted and deleted.", href: "https://www.researchgate.net/publication/414342336_HRT-LI_Certified_Rank_Transport_for_Dynamic_Learned_Index_over_Hierarchical_String_Keys" },
  { title: "Smart Honeypot for Threat Detection and Classification in IoMT Networks", venue: "Discover Internet of Things · 2026", detail: "A medical-device honeypot that captures protocol interactions and classifies suspicious activity for analyst review.", href: "https://www.researchgate.net/publication/414199107_Smart_Honeypot_for_Threat_Detection_and_Classification_in_IoMt_Networks" },
  { title: "Quantum Powered Data Analysis", venue: "ICEMTEC · 2024", detail: "A survey of quantum approaches to data analysis, their possible advantages, and practical limits of current hardware.", href: "https://www.researchgate.net/publication/386019659_Quantum_Powered_Data_Analysis" },
  { title: "BrainMD: Explainable Hybrid Liquid AI for Robust Neurodiagnostics in Low-Resource Areas", venue: "Computer Science and Information Technologies · 2026", detail: "A neuroimaging workflow that routes uncertain scans to specialist models and keeps evidence available for review.", href: "/brainmd-revised.pdf" },
  { title: "Generative AI Framework for Expediting the Search for New Therapeutics Using Generative Adversarial Networks", venue: "Journal of Communications Software and Systems · 2026", detail: "Combines molecular generation with graph-based drug repurposing to narrow the search for therapeutic candidates.", href: "/generative-ai-therapeutics.pdf" },
]

export const achievements = [
  { title: "CIDECODE PES 2025", result: "Winner", detail: "Fence.AI was recognised in the data-security challenge." },
  { title: "Smart India Hackathon 2024", result: "Runner-up", detail: "Part of the team behind a solution that later entered production." },
  { title: "HPE Think-a-Thon 2025", result: "Winner", detail: "Won a time-constrained technical ideation challenge." },
  { title: "CTF competitions", result: "Six wins", detail: "Includes a second-place finish at PragyanCTF and a top-70 result among 10,000+ picoCTF teams." },
]

export const article = {
  title: "Impressive, but Still Reactive: Why Current AI Isn't Close to AGI Yet",
  description: "An essay on the gap between today's capable AI systems and more general, self-directed intelligence.",
  href: "https://medium.com/@sayalprathmesh8/impressive-but-still-reactive-why-current-ai-isnt-close-to-agi-yet-430c778e9a77",
}
