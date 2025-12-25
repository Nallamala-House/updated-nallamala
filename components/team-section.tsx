"use client"

import { Mail, Linkedin } from "lucide-react"

export default function TeamSection() {
  const webTeam = [
    {
      name: "Rahul Nair",
      role: "Web Admin",
      experience: "5+ years in web development and team coordination",
    },
    {
      name: "Meera Patel",
      role: "Website Manager",
      experience: "Expert in UX/UI design and content management",
    },
    {
      name: "Aditya Singh",
      role: "Video Editor",
      experience: "Professional video production and storytelling",
    },
    {
      name: "Saanya Khan",
      role: "Graphic Designer",
      experience: "Creative visual design and branding specialist",
    },
    {
      name: "Dev Kapoor",
      role: "Full Stack Developer",
      experience: "Advanced skills in React, Node.js, and databases",
    },
  ]

  const communityLeaders = [
    {
      name: "Harsh Verma",
      club: "Chess: Grandmaster Guild",
      achievements: "Organized tournament with 100+ participants",
    },
    {
      name: "Isha Bhat",
      club: "Coding: Shunya",
      achievements: "Led 12 coding workshops, mentored 50+ members",
    },
    {
      name: "Rohan Chakraborty",
      club: "AI-ML: AIDW",
      achievements: "3-part AI workshop series, 200+ attendees",
    },
    {
      name: "Maya Singh",
      club: "Chapters & Verses",
      achievements: "Hosted 8 literary events, growing community",
    },
    {
      name: "Arjun Kumar",
      club: "Art Canvas",
      achievements: "Organized 5 exhibitions, 30+ active artists",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Web Operations Team */}
        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-white mb-8">Web Operations & Tech Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webTeam.map((member) => (
              <div
                key={member.role}
                className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-primary text-xs uppercase tracking-widest mb-2">{member.role}</p>
                    <h4 className="text-lg font-serif font-bold text-white">{member.name}</h4>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg"></div>
                </div>
                <p className="text-white/70 text-sm mb-4">{member.experience}</p>
                <div className="flex gap-3">
                  <a href="#" className="text-primary hover:text-primary/80 transition">
                    <Mail size={16} />
                  </a>
                  <a href="#" className="text-primary hover:text-primary/80 transition">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Leaders */}
        <div>
          <h3 className="text-3xl font-serif font-bold text-white mb-8">Community Leaders</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityLeaders.map((leader) => (
              <div
                key={leader.club}
                className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <h4 className="text-lg font-serif font-bold text-white mb-2">{leader.name}</h4>
                <p className="text-primary text-sm uppercase tracking-widest mb-3">{leader.club}</p>
                <p className="text-white/70 text-sm">{leader.achievements}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
