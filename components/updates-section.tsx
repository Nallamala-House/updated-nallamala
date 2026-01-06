"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink } from "lucide-react"

export default function UpdatesSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const updates = [
    {
      slug: "data science course registration",
      title: "Data Science Course Registration",
      excerpt: "Course Registration for January term 2026",
      image: "/images/updates/iitm.jpeg",
      category: "Course Registration",
      date: "Deadline Passed",
      externalLink: ""
    },
    {
      slug: "electronics system course registration",
      title: "Electronics System Course Registration",
      excerpt: "Course Registration for January term 2026",
      image: "/images/updates/iitm.jpeg",
      category: "Course Registration",
      date: "Deadline : January 2026",
      externalLink: ""
    },
    {
      slug: "paradox in margazhi",
      title: "Paradox In Margazhi",
      excerpt: "Paradox in Margazhi, 2026",
      image: "/images/updates/magzi.jpeg",
      category: "Event",
      date: "Registration Closes Soon",
      externalLink: "https://iitmparadox.org/events"
    },
  ]

  const categoryColors: { [key: string]: string } = {
    "Course Registration": "bg-yellow-500/50 text-white border-yellow-500/30",
    "Event": "bg-purple-500/70 text-white border-purple-500/30",
  }

  const filteredUpdates = updates.filter(
    (update) =>
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section id="updates" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Latest <span className="text-primary">Updates</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full opacity-50" />
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUpdates.map((update, index) => (
            <article
              key={`${update.slug}-${index}`}
              className="glass-dark rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col group"
            >
              {/* Optimized Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-black flex items-center justify-center">
                <Image
                  src={update.image}
                  alt={update.title}
                  fill

                  className={`transition-transform duration-500 group-hover:scale-105 ${
                    update.category === "Course Registration" 
                    ? "object-contain p-2" 
                    : "object-cover"
                  }`}
                />
                <div className="absolute top-4 left-4 z-10">
                  <Badge className={`border shadow-lg ${categoryColors[update.category]}`}>
                    {update.category}
                  </Badge>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  {update.date}
                </span>

                <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {update.title}
                </h3>

                <p className="text-white/70 text-sm mb-6 flex-1 leading-relaxed">
                  {update.excerpt}
                </p>

                {/* Action Button */}
                {update.date === "Deadline Passed" ? (
                  <div className="inline-flex items-center justify-center w-full bg-white/5 text-white/30 border border-white/5 rounded-lg py-3 text-sm font-semibold cursor-not-allowed">
                    Registration Closed
                  </div>
                ) : (
                  <a
                    href={update.externalLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg py-3 transition-all text-sm font-bold"
                  >
                    Register Now
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}