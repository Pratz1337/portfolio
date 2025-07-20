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
  },{
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
    <section id="achievements" className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="h-full transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-2 border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-50/80 to-orange-50/80 dark:from-yellow-950/20 dark:to-orange-950/20 backdrop-blur-sm"
            >
              <CardHeader>
                <CardTitle>{achievement.title}</CardTitle>
                <CardDescription>{achievement.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
