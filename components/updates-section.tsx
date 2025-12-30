"use client"
import { Badge } from "@/components/ui/badge"

const categoryColors: { [key: string]: string } = {
  Announcements: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Elections: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Sports: "bg-green-500/20 text-green-300 border-green-500/30",
  Cultural: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Academic: "bg-orange-500/20 text-orange-300 border-orange-500/30",
}

export default function UpdatesSection() {
  const updates = [
    {
      id: 1,
      category: "Announcements",
      title: "Academic Year 2025-26 Begins",
      description: "Welcoming our new batch with orientation programs, community meetings, and house traditions.",
      date: "Jan 10, 2025",
    },
    {
      id: 2,
      category: "Elections",
      title: "Council Elections 2025",
      description: "Exciting elections coming up! Nominations open for all council positions and team roles.",
      date: "Dec 28, 2024",
    },
    {
      id: 3,
      category: "Cultural",
      title: "Annual Cultural Fest Announced",
      description: "Get ready for our biggest event of the year celebrating arts, music, and talent.",
      date: "Dec 20, 2024",
    },
    {
      id: 4,
      category: "Academic",
      title: "AI Workshop Series Concludes",
      description: "Successfully completed a 3-part Agentic AI workshop series with 100+ participants.",
      date: "Dec 15, 2024",
    },
    {
      id: 5,
      category: "Sports",
      title: "Inter-House Sports Championship",
      description: "Our house teams excel in basketball, badminton, and cricket competitions.",
      date: "Dec 10, 2024",
    },
    {
      id: 6,
      category: "Announcements",
      title: "New Club Initiatives Launched",
      description: "Introduction of new interest groups and expanded community programs.",
      date: "Dec 1, 2024",
    },
  ]

  return (
    <section id="updates" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Latest Updates</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Stay <span className="text-primary">Connected</span>
          </h2>
        </div>

        {/* Updates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update) => (
            <div
              key={update.id}
              className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] group cursor-pointer"
            >
              <Badge className={`mb-4 border ${categoryColors[update.category]}`}>{update.category}</Badge>
              <h3 className="text-lg font-serif font-bold text-white mb-3 group-hover:text-primary transition">
                {update.title}
              </h3>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">{update.description}</p>
              <p className="text-white/50 text-xs">{update.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
