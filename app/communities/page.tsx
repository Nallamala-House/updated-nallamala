"use client"

import { useState } from "react"
import { X, Zap, Trophy, MessageCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function CommunitiesPage() {
  const [selectedCommunity, setSelectedCommunity] = useState(null)

  const communities = [
    {
      id: 1,
      name: "Shunya",
      category: "Coding",
      icon: Zap,
      description: "Empowering developers through collaborative coding and innovation.",
      color: "from-blue-600 to-blue-400",
      image: "/placeholder.svg?key=fvnud",
      fullDescription:
        "Shunya is our premier coding club dedicated to fostering programming excellence and innovation. We organize coding contests, workshops, and collaborative projects that challenge our members to push their technical boundaries.",
      members: 150,
      foundedYear: 2015,
      achievements: [
        "Hosted 50+ coding workshops",
        "Organized 10 hackathons with 500+ participants",
        "Published 20+ technical articles",
        "Mentored 200+ junior programmers",
      ],
      events: [
        { title: "Winter Coding Marathon", date: "Jan 2025" },
        { title: "AI Algorithm Workshop", date: "Feb 2025" },
        { title: "Open Source Contribution Drive", date: "Mar 2025" },
      ],
      leads: ["Isha Bhat", "Rohan Sharma", "Priya Kumar"],
    },
    {
      id: 2,
      name: "Grand Master Guild",
      category: "Chess",
      icon: Trophy,
      description: "Mastering the game of chess and strategic thinking.",
      color: "from-purple-600 to-purple-400",
      image: "/placeholder.svg?key=qzyyl",
      fullDescription:
        "The Grand Master Guild brings together chess enthusiasts of all levels. We host tournaments, analysis sessions, and friendly matches that celebrate the game's strategic depth.",
      members: 80,
      foundedYear: 2018,
      achievements: [
        "Organized annual tournament with 100+ participants",
        "Produced 3 state-level champions",
        "Weekly grandmaster analysis sessions",
        "Regional chess league champions 2023",
      ],
      events: [
        { title: "Beginner's Tournament", date: "Jan 2025" },
        { title: "Rapid Chess Championship", date: "Feb 2025" },
        { title: "Simultaneous Exhibition", date: "Mar 2025" },
      ],
      leads: ["Harsh Verma", "Deepak Iyer", "Meera Singh"],
    },
    {
      id: 3,
      name: "AIDW",
      category: "AI-ML",
      icon: Zap,
      description: "Exploring artificial intelligence and machine learning frontiers.",
      color: "from-green-600 to-green-400",
      image: "/placeholder.svg?key=wlspf",
      fullDescription:
        "AIDW (AI Development Workgroup) is at the forefront of AI and ML innovation. We explore cutting-edge technologies and develop real-world applications.",
      members: 120,
      foundedYear: 2019,
      achievements: [
        "3-part AI workshop series with 200+ attendees",
        "Published 5 research papers",
        "Developed 3 ML-based projects",
        "Partnered with industry leaders",
      ],
      events: [
        { title: "Deep Learning Fundamentals", date: "Jan 2025" },
        { title: "LLM Applications Workshop", date: "Feb 2025" },
        { title: "AI Ethics Symposium", date: "Mar 2025" },
      ],
      leads: ["Rohan Chakraborty", "Aisha Patel", "Vikram Singh"],
    },
    {
      id: 4,
      name: "Chapters & Verses",
      category: "Literary",
      icon: MessageCircle,
      description: "Celebrating literature, writing, and creative expression.",
      color: "from-pink-600 to-pink-400",
      image: "/placeholder.svg?key=wnuyp",
      fullDescription:
        "Chapters & Verses is our literary hub where writers, readers, and storytellers unite. We celebrate the power of words through readings, discussions, and creative writing events.",
      members: 95,
      foundedYear: 2016,
      achievements: [
        "Hosted 8 literary events with 300+ participants",
        "Published community anthology with 50+ stories",
        "Monthly open mics with diverse talent",
        "Writer mentorship program",
      ],
      events: [
        { title: "Poetry Night", date: "Jan 2025" },
        { title: "Short Story Workshop", date: "Feb 2025" },
        { title: "Book Club Discussion", date: "Mar 2025" },
      ],
      leads: ["Maya Singh", "Arjun Kumar", "Sneha Desai"],
    },
    {
      id: 5,
      name: "Art Canvas",
      category: "Art",
      icon: Trophy,
      description: "Unleashing creativity through visual arts and design.",
      color: "from-orange-600 to-orange-400",
      image: "/placeholder.svg?key=7wo10",
      fullDescription:
        "Art Canvas is our creative haven for visual artists and designers. We organize exhibitions, workshops, and collaborative projects that celebrate artistic expression.",
      members: 110,
      foundedYear: 2017,
      achievements: [
        "Organized 5 exhibitions with 30+ active artists",
        "3 collaborative mural projects",
        "Art classes for beginners",
        "Regional art competition winners",
      ],
      events: [
        { title: "Digital Art Workshop", date: "Jan 2025" },
        { title: "Community Art Exhibition", date: "Feb 2025" },
        { title: "Life Drawing Session", date: "Mar 2025" },
      ],
      leads: ["Arjun Kumar", "Priya Sharma", "Vikram Nair"],
    },
    {
      id: 6,
      name: "Tech Innovators",
      category: "Technology",
      icon: Zap,
      description: "Building the future through technology and entrepreneurship.",
      color: "from-cyan-600 to-cyan-400",
      image: "/placeholder.svg?key=idg4r",
      fullDescription:
        "Tech Innovators focuses on emerging technologies and entrepreneurial ventures. We incubate ideas and support members in building tech startups.",
      members: 85,
      foundedYear: 2020,
      achievements: [
        "Incubated 5 tech startups",
        "Hackathon winners in 2023 and 2024",
        "Industry mentorship program",
        "Technology talks series",
      ],
      events: [
        { title: "Startup Pitch Night", date: "Jan 2025" },
        { title: "Blockchain Workshop", date: "Feb 2025" },
        { title: "Innovation Summit", date: "Mar 2025" },
      ],
      leads: ["Dev Kapoor", "Anjali Verma", "Nikhil Bhat"],
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        {/* Background animations */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-widest mb-4">Our Clubs</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Vibrant <span className="text-primary">Communities</span>
            </h1>
            <p className="text-white/70">Discover clubs and societies that align with your passions</p>
          </div>

          {/* Communities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {communities.map((community) => {
              const IconComponent = community.icon
              return (
                <button
                  key={community.id}
                  onClick={() => setSelectedCommunity(community)}
                  className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative mb-4 overflow-hidden rounded-lg h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <img
                      src={community.image || "/placeholder.svg"}
                      alt={community.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${community.color} mb-4 opacity-80 group-hover:opacity-100 transition flex items-center justify-center`}
                  >
                    <IconComponent size={24} className="text-white" />
                  </div>

                  <p className="text-primary text-sm uppercase tracking-widest mb-2">{community.category}</p>
                  <h3 className="text-xl font-serif font-bold text-white mb-3">{community.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{community.description}</p>
                  <p className="text-primary text-xs font-semibold">Click to learn more</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Community Modal */}
      {selectedCommunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-white/10 to-white/5 border border-primary/30 rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto glass">
            {/* Header with Image */}
            <div className="relative h-64 overflow-hidden border-b border-primary/20">
              <img
                src={selectedCommunity.image || "/placeholder.svg"}
                alt={selectedCommunity.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <button
                onClick={() => setSelectedCommunity(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
              >
                <X size={24} />
              </button>
              <div className="absolute bottom-6 left-6">
                <p className="text-primary text-sm uppercase tracking-widest mb-2">{selectedCommunity.category}</p>
                <h2 className="text-4xl font-serif font-bold text-white">{selectedCommunity.name}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Full Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">About</h3>
                <p className="text-white/70 leading-relaxed">{selectedCommunity.fullDescription}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 border border-primary/20 rounded-lg p-4 text-center">
                  <p className="text-3xl font-serif font-bold text-primary">{selectedCommunity.members}</p>
                  <p className="text-white/70 text-sm mt-1">Active Members</p>
                </div>
                <div className="bg-white/5 border border-primary/20 rounded-lg p-4 text-center">
                  <p className="text-3xl font-serif font-bold text-primary">
                    {new Date().getFullYear() - selectedCommunity.foundedYear}
                  </p>
                  <p className="text-white/70 text-sm mt-1">Years Active</p>
                </div>
                <div className="bg-white/5 border border-primary/20 rounded-lg p-4 text-center">
                  <p className="text-3xl font-serif font-bold text-primary">{selectedCommunity.achievements.length}</p>
                  <p className="text-white/70 text-sm mt-1">Achievements</p>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Highlights</h3>
                <ul className="space-y-2">
                  {selectedCommunity.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-white/70">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upcoming Events */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Upcoming Events</h3>
                <div className="space-y-2">
                  {selectedCommunity.events.map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white/5 border border-primary/10 rounded-lg"
                    >
                      <span className="text-white">{event.title}</span>
                      <span className="text-primary text-sm">{event.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leads */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Club Leads</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCommunity.leads.map((lead, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded-full text-sm"
                    >
                      {lead}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setSelectedCommunity(null)}
                className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-lg py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
