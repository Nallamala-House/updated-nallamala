"use client"

import { Users, Trophy, Code, BookOpen, Palette, Star } from "lucide-react"

export default function ClubsSection() {
  const clubs = [
    {
      icon: Trophy,
      name: "Grandmaster Guild",
      category: "Chess",
      members: 150,
      description: "Master the game of chess with strategic analysis and tournaments.",
      color: "from-purple-600 to-purple-400",
    },
    {
      icon: Code,
      name: "Shunya",
      category: "Coding",
      members: 280,
      description: "Build innovative solutions through collaborative coding projects.",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: Star,
      name: "AIDW",
      category: "AI-ML",
      members: 200,
      description: "Explore artificial intelligence and machine learning technologies.",
      color: "from-green-600 to-green-400",
    },
    {
      icon: BookOpen,
      name: "Chapters & Verses",
      category: "Literary",
      members: 120,
      description: "Express creativity through literature, poetry, and storytelling.",
      color: "from-pink-600 to-pink-400",
    },
    {
      icon: Palette,
      name: "Art Canvas",
      category: "Art",
      members: 90,
      description: "Unleash artistic talents through visual arts and design.",
      color: "from-orange-600 to-orange-400",
    },
    {
      icon: Users,
      name: "Pop Culture Club",
      category: "Entertainment",
      members: 180,
      description: "Celebrate anime, movies, and series with fellow enthusiasts.",
      color: "from-red-600 to-red-400",
    },
  ]

  return (
    <section id="clubs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Our Clubs</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Join Our <span className="text-primary">Communities</span>
          </h2>
        </div>

        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => {
            const Icon = club.icon
            return (
              <div
                key={club.name}
                className="glass-dark p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${club.color} p-3 mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-full h-full text-white" />
                </div>

                <p className="text-primary text-xs uppercase tracking-widest mb-2">{club.category}</p>
                <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-primary transition">
                  {club.name}
                </h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{club.description}</p>

                <div className="flex items-center space-x-2 text-white/60 text-sm">
                  <Users size={14} />
                  <span>{club.members}+ Members</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
