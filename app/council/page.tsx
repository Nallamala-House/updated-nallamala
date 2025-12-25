"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { X, Mail, Linkedin, Phone } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function CouncilPage() {
  const searchParams = useSearchParams()
  const yearParam = searchParams.get('year')
  const [selectedYear, setSelectedYear] = useState(yearParam || "2025-2026")
  const [selectedTeam, setSelectedTeam] = useState("UHC")
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    if (yearParam) {
      setSelectedYear(yearParam)
    }
  }, [yearParam])

  const yearData = {
    "2025-2026": {
      UHC: [
        {
          id: 1,
          name: "Arjun Singh",
          role: "Secretary",
          message: "Leading with vision and purpose to create lasting impact.",
          email: "arjun@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/arjun-singh",
          image: "/professional-portrait-arjun.jpg",
          bio: "With 4 years of experience in student leadership, Arjun has successfully coordinated multiple large-scale initiatives and fostered a culture of excellence within the community.",
        },
        {
          id: 2,
          name: "Priya Sharma",
          role: "Deputy Secretary",
          message: "Empowering our community through effective coordination.",
          email: "priya@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/priya-sharma",
          image: "/professional-portrait-priya.jpg",
          bio: "Priya brings strategic thinking and organizational excellence to her role, ensuring seamless coordination across all departments.",
        },
      ],
      LHC: [
        {
          id: 3,
          name: "Rahul Verma",
          role: "Lower House Coordinator",
          message: "Building bridges between residents and leadership.",
          email: "rahul@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/rahul-verma",
          image: "/professional-portrait-rahul.jpg",
          bio: "Rahul focuses on grassroots engagement and community welfare, ensuring every voice is heard.",
        },
        {
          id: 4,
          name: "Anjali Desai",
          role: "Community Manager",
          message: "Fostering inclusivity and belonging for all.",
          email: "anjali@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/anjali-desai",
          image: "/professional-portrait-anjali.jpg",
          bio: "Anjali dedicates herself to creating an inclusive environment where every member feels valued and heard.",
        },
      ],
      WEBOPS: [
        {
          id: 5,
          name: "Vikram Kumar",
          role: "Web Operations Lead",
          message: "Digitizing the future of our community.",
          email: "vikram@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/vikram-kumar",
          image: "/professional-portrait-vikram-tech.jpg",
          bio: "Vikram leads the technical infrastructure and digital initiatives that keep our community connected.",
        },
        {
          id: 6,
          name: "Sneha Patel",
          role: "Content Manager",
          message: "Sharing stories that inspire and connect.",
          email: "sneha@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/sneha-patel",
          image: "/professional-portrait-sneha.jpg",
          bio: "Sneha crafts compelling narratives that bring our community to life across all platforms.",
        },
      ],
      REGIONAL: [
        {
          id: 7,
          name: "Nikhil Bhat",
          role: "North Regional Lead",
          message: "Expanding our presence across the nation.",
          email: "nikhil.north@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/nikhil-bhat",
          image: "/professional-portrait-nikhil-regional.jpg",
          bio: "Nikhil manages regional operations and ensures seamless coordination across all zones.",
        },
        {
          id: 8,
          name: "Pooja Singh",
          role: "South Regional Lead",
          message: "Connecting communities across regions.",
          email: "pooja.south@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/pooja-singh",
          image: "/professional-portrait-pooja-regional.jpg",
          bio: "Pooja oversees Southern region operations and drives regional engagement initiatives.",
        },
      ],
    },
    "2024-2025": {
      UHC: [
        {
          id: 9,
          name: "Aditya Singh",
          role: "Secretary",
          message: "Building on our legacy of excellence.",
          email: "aditya.prev@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/aditya-singh",
          image: "/professional-portrait-aditya.jpg",
          bio: "Aditya led innovative initiatives that strengthened community bonds and enhanced member experiences.",
        },
      ],
      LHC: [],
      WEBOPS: [],
      REGIONAL: [],
    },
    "2023-2024": {
      UHC: [],
      LHC: [],
      WEBOPS: [],
      REGIONAL: [],
    },
  }

  const teamLabels = {
    UHC: "Upper House Council",
    LHC: "Lower House Council",
    WEBOPS: "Web Operations",
    REGIONAL: "Regional Leaders",
  }

  const members = yearData[selectedYear]?.[selectedTeam] || []

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        {/* Background animations */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-primary text-sm uppercase tracking-widest mb-4">Leadership</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Council & <span className="text-primary">Team</span>
            </h1>
            <p className="text-white/70 mb-6">Meet the dedicated leaders driving Nallamala House forward</p>
            <p className="text-primary text-xl font-semibold">{selectedYear}</p>
          </div>

          {/* Team Tabs - Now at the Top */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {Object.entries(teamLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedTeam(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedTeam === key
                    ? "bg-primary text-black"
                    : "glass-dark text-white/70 hover:text-white border border-white/10 hover:border-primary/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Members Grid */}
          {members.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer group"
                >
                  <div className="mb-4 overflow-hidden rounded-lg h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-primary text-xs uppercase tracking-widest mb-2">{member.role}</p>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-white/70 text-sm italic">{member.message}</p>
                  <p className="text-primary text-xs mt-4">Click to view details</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">
                No data available for {teamLabels[selectedTeam]} in {selectedYear}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-white/10 to-white/5 border border-primary/30 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto glass">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-primary/20 bg-black/50 backdrop-blur">
              <h2 className="text-2xl font-serif font-bold text-white">{selectedMember.name}</h2>
              <button onClick={() => setSelectedMember(null)} className="text-white/70 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              <img
                src={selectedMember.image || "/placeholder.svg"}
                alt={selectedMember.name}
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Role & Message */}
              <div>
                <p className="text-primary text-sm uppercase tracking-widest mb-2">{selectedMember.role}</p>
                <p className="text-white/80 text-lg italic">{selectedMember.message}</p>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                <p className="text-white/70 leading-relaxed">{selectedMember.bio}</p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
                <div className="space-y-2">
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="flex items-center space-x-3 text-white/70 hover:text-primary transition"
                  >
                    <Mail size={20} className="text-primary" />
                    <span>{selectedMember.email}</span>
                  </a>
                  <a
                    href={`tel:${selectedMember.phone}`}
                    className="flex items-center space-x-3 text-white/70 hover:text-primary transition"
                  >
                    <Phone size={20} className="text-primary" />
                    <span>{selectedMember.phone}</span>
                  </a>
                  <a
                    href={`https://${selectedMember.linkedin}`}
                    className="flex items-center space-x-3 text-white/70 hover:text-primary transition"
                  >
                    <Linkedin size={20} className="text-primary" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setSelectedMember(null)}
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
