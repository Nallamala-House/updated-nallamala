"use client"

import { useState } from "react"
import { X, Users, Zap, Trophy, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommunitiesSection() {
  const [selectedCommunity, setSelectedCommunity] = useState(null)

  const communities = [
    {
      id: 1,
      name: "Shunya",
      category: "Coding",
      icon: Zap,
      description: "Empowering developers through collaborative coding and innovation.",
      color: "from-blue-600 to-blue-400",
      image: "/placeholder.svg?key=58ph4",
      fullDescription:
        "Shunya is our premier coding club dedicated to fostering programming excellence and innovation. We organize coding contests, workshops, and collaborative projects.",
      members: 150,
    },
    {
      id: 2,
      name: "Grand Master Guild",
      category: "Chess",
      icon: Trophy,
      description: "Mastering the game of chess and strategic thinking.",
      color: "from-purple-600 to-purple-400",
      image: "/placeholder.svg?key=dh9im",
      fullDescription:
        "The Grand Master Guild brings together chess enthusiasts of all levels. We host tournaments and analysis sessions.",
      members: 80,
    },
    {
      id: 3,
      name: "AIDW",
      category: "AI-ML",
      icon: Zap,
      description: "Exploring artificial intelligence and machine learning frontiers.",
      color: "from-green-600 to-green-400",
      image: "/placeholder.svg?key=4k4qc",
      fullDescription:
        "AIDW is at the forefront of AI and ML innovation. We explore cutting-edge technologies and develop real-world applications.",
      members: 120,
    },
    {
      id: 4,
      name: "Chapters & Verses",
      category: "Literary",
      icon: MessageCircle,
      description: "Celebrating literature, writing, and creative expression.",
      color: "from-pink-600 to-pink-400",
      image: "/placeholder.svg?key=7on48",
      fullDescription:
        "Our literary hub where writers, readers, and storytellers unite. We celebrate the power of words through readings and creative writing.",
      members: 95,
    },
    {
      id: 5,
      name: "Art Canvas",
      category: "Art",
      icon: Trophy,
      description: "Unleashing creativity through visual arts and design.",
      color: "from-orange-600 to-orange-400",
      image: "/placeholder.svg?key=hkoq8",
      fullDescription:
        "Our creative haven for visual artists and designers. We organize exhibitions, workshops, and collaborative art projects.",
      members: 110,
    },
  ]

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-black">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-widest mb-4">Our Communities</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Vibrant Communities & <span className="text-primary">Clubs</span>
            </h2>
          </div>

          {/* Communities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => {
              const IconComponent = community.icon
              return (
                <button
                  key={community.id}
                  onClick={() => setSelectedCommunity(community)}
                  className="glass-dark p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 group text-left"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${community.color} mb-4 opacity-80 group-hover:opacity-100 transition flex items-center justify-center`}
                  >
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <p className="text-primary text-sm uppercase tracking-widest mb-2">{community.category}</p>
                  <h3 className="text-xl font-serif font-bold text-white mb-3">{community.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{community.description}</p>
                  <p className="text-primary text-xs mt-4 font-semibold">Click to learn more</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Community Modal */}
      {selectedCommunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-white/10 to-white/5 border border-primary/30 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto glass">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-primary/20 bg-black/50 backdrop-blur">
              <h2 className="text-2xl font-serif font-bold text-white">{selectedCommunity.name}</h2>
              <button onClick={() => setSelectedCommunity(null)} className="text-white/70 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              <img
                src={selectedCommunity.image || "/placeholder.svg"}
                alt={selectedCommunity.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              {/* Category & Description */}
              <div>
                <p className="text-primary text-sm uppercase tracking-widest mb-2">{selectedCommunity.category}</p>
                <p className="text-white/80 text-lg italic mb-4">{selectedCommunity.description}</p>
                <p className="text-white/70">{selectedCommunity.fullDescription}</p>
              </div>

              {/* Members */}
              <div className="flex items-center gap-3 bg-white/5 border border-primary/20 rounded-lg p-4">
                <Users className="text-primary" size={20} />
                <div>
                  <p className="text-white/70 text-sm">Active Members</p>
                  <p className="text-2xl font-serif font-bold text-primary">{selectedCommunity.members}+</p>
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
    </>
  )
}
