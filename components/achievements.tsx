import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const achievements = [
  {
    title: "Winner, CIDECODE PES'25",
    project: "Fence.AI",
    description:
      "Won first place with a blockchain-based media verification system to combat deepfakes and ensure content authenticity.",
    category: "Hackathon",
  },
  {
    title: "Runner-Up, Smart India Hackathon 2024",
    project: "EDUMITRA",
    description:
      "Secured second place in India's biggest hackathon with an innovative educational solution, competing against thousands of teams nationwide.",
    category: "National Competition",
  },
  {
    title: "Winner, HPE Think-a-Thon 2025",

    description:
      "Solved Data Structures and Algorithms challenges for HPE's Think-a-Thon, winning first place with a project that enhances data security and efficiency.",
    category: "National Competition",
  },
  {
    title: "Winner, BIT Hack 2024",
    project: "Symptom Sage",
    description:
      "Developed an AI-powered medical diagnostic tool that won first place, demonstrating innovation in healthcare technology.",
    category: "Hackathon",
  },
  {
    title: "Winner, AIT Hack 2024",
    project: "Guard.AI",
    description:
      "Developed an AI-powered security tool that won first place, demonstrating innovation in cybersecurity technology.",
    category: "Hackathon",
  },
  {
    title: "Winner, BMSCE PhaseShift 2023 & 2024",
    project: "CTF Event",
    description:
      "Demonstrated exceptional cybersecurity skills in Capture The Flag competitions, winning consecutively for two years.",
    category: "Cybersecurity",
  },
]

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 glass-subtle" />

      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="h-full floating-glass rounded-3xl border-yellow-500/30 corner-glow"
              style={{
                background: "linear-gradient(135deg, rgba(255, 251, 235, 0.1) 0%, rgba(255, 237, 213, 0.1) 100%)",
              }}
            >
              <CardHeader>
                <CardTitle className="gradient-text">{achievement.title}</CardTitle>
                <CardDescription className="glass rounded-xl px-3 py-1 inline-block w-fit">
                  {achievement.category}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
