"use client"

import { useState } from "react"
import { Mail, Linkedin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CouncilSection() {
  const [selectedYear, setSelectedYear] = useState("2025-2026")

  const upperHouse = [
    {
      name: "Arjun Singh",
      role: "Secretary",
      message: "Leading with vision and purpose to create lasting impact.",
      email: "arjun@nallamala.house",
      linkedin: "linkedin.com/in/arjun-singh",
    },
    {
      name: "Priya Sharma",
      role: "Deputy Secretary",
      message: "Empowering our community through effective coordination.",
      email: "priya@nallamala.house",
      linkedin: "linkedin.com/in/priya-sharma",
    },
  ]

  const regionalCoordinators = [
    {
      name: "Rahul Verma",
      region: "North",
      achievements: "Organized 15+ meetups, 200+ members active",
    },
    {
      name: "Anjali Desai",
      region: "South",
      achievements: "Led 8 major events, Strong community engagement",
    },
    {
      name: "Vikram Kumar",
      region: "East",
      achievements: "Expanded network to 150+ members",
    },
    {
      name: "Sneha Patel",
      region: "West",
      achievements: "Organized quarterly tech meetups",
    },
    {
      name: "Nikhil Bhat",
      region: "Central",
      achievements: "Coordinated 5 regional workshops",
    },
  ]

  return (
    <section id="council" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Leadership</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Council & <span className="text-primary">Team</span>
          </h2>
        </div>

        {/* Year Selector */}
        <div className="flex justify-center gap-3 mb-16">
          {["2025-2026", "2024-2025", "2023-2024"].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedYear === year ? "bg-primary text-black" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Upper House */}
        <div className="mb-20">
          <h3 className="text-2xl font-serif font-bold text-white mb-8">Upper House</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {upperHouse.map((member) => (
              <div
                key={member.role}
                className="glass-dark p-8 rounded-xl border border-primary/30 hover:border-primary/60 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-primary text-sm uppercase tracking-widest mb-2">{member.role}</p>
                    <h4 className="text-2xl font-serif font-bold text-white">{member.name}</h4>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/40 to-primary/10 rounded-lg"></div>
                </div>
                <p className="text-white/80 italic mb-6">{member.message}</p>
                <div className="flex gap-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition"
                  >
                    <Mail size={16} />
                  </a>
                  <a
                    href={`https://${member.linkedin}`}
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Coordinators */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-8">Regional Coordinators</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalCoordinators.map((coordinator) => (
              <div
                key={coordinator.region}
                className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-serif font-bold text-white">{coordinator.name}</h4>
                  <Badge className="bg-primary/20 text-primary border-primary/30">{coordinator.region}</Badge>
                </div>
                <p className="text-white/70 text-sm mb-4">{coordinator.achievements}</p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center space-x-2 text-primary text-sm hover:text-primary/80 transition"
                  >
                    <Mail size={14} />
                    <span>Contact</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
