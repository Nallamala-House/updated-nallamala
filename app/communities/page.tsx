"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Zap, Trophy, MessageCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function CommunitiesPage() {
  const router = useRouter()
  const [selectedCommunity, setSelectedCommunity] = useState(null)

  const communities = [
    {
      id: 1,
      name: "Chapters & Verses",
      slug: "chapters-verses",
      category: "Literary",
      icon: MessageCircle,
      description: "Celebrating literature, writing, and creative expression.",
      color: "from-pink-600 to-pink-400",
      image: "/images/communities/chapters_verses.png",
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
      id: 2,
      name: "AIDW",
      slug: "aidw",
      category: "AI-ML",
      icon: Zap,
      description: "Exploring artificial intelligence and machine learning frontiers.",
      color: "from-green-600 to-green-400",
      image: "/images/communities/ai_dw.png",
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
      id: 3,
      name: "Shunya",
      slug: "shunya",
      category: "Coding",
      icon: Zap,
      description: "Empowering developers through collaborative coding and innovation.",
      color: "from-blue-600 to-blue-400",
      image: "/images/communities/shunya.png",
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
      id: 4,
      name: "Grandmaster's Guild",
      slug: "grandmasters-guild",
      category: "Chess",
      icon: Trophy,
      description: "Mastering the game of chess and strategic thinking.",
      color: "from-purple-600 to-purple-400",
      image: "/images/communities/chess.png",
      fullDescription:
        "Grandmaster's Guild - Nallamala houses the official chess community.",
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
      id: 5,
      name: "CIFER",
      slug: "cifer",
      category: "Finance",
      icon: Zap,
      description: "Building strong financial awareness and leadership among students.",
      color: "from-yellow-600 to-yellow-400",
      image: "/images/communities/cifer.png",
      fullDescription:
        "CIFER (Nallamala Finance Community) is a student-led initiative dedicated to building strong financial awareness, practical understanding, and leadership among students.",
      members: 200,
      foundedYear: 2023,
      achievements: [
        "Growing network of 200+ active members",
        "Focus on practical financial education",
        "Supporting aspiring entrepreneurs",
        "Market analysis and investment workshops",
      ],
      events: [
        { title: "Inaugural Session", date: "Oct 2023" },
        { title: "Investment Basics Workshop", date: "Feb 2025" },
        { title: "Startup Finance Seminar", date: "Mar 2025" },
      ],
      leads: ["Finance Team"],
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
              const handleClick = () => {
                if (community.slug) {
                  router.push(`/communities/${community.slug}`)
                } else {
                  setSelectedCommunity(community)
                }
              }
              
              return (
                <button
                  key={community.id}
                  onClick={handleClick}
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

                  {/* Icon - Use actual image for Chapters & Verses, AIDW, Shunya, Grandmaster's Guild, and CIFER */}
                  {community.slug === "chapters-verses" || community.slug === "aidw" || community.slug === "shunya" || community.slug === "grandmasters-guild" || community.slug === "cifer" ? (
                    <div className="w-12 h-12 rounded-full mb-4 overflow-hidden border-2 border-primary/50">
                      <img
                        src={community.image}
                        alt={`${community.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${community.color} mb-4 opacity-80 group-hover:opacity-100 transition flex items-center justify-center`}
                    >
                      <IconComponent size={24} className="text-white" />
                    </div>
                  )}

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
