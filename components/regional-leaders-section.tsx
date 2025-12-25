"use client"

import { MapPin, Users, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RegionalLeadersSection() {
  const regions = [
    {
      city: "Chandigarh",
      leader: "Simran Kaur",
      members: 45,
      eventsHosted: 8,
      coordinates: "Northern India Hub",
    },
    {
      city: "Delhi",
      leader: "Arjun Singh",
      members: 120,
      eventsHosted: 18,
      coordinates: "National Capital Region",
    },
    {
      city: "Kolkata",
      leader: "Riya Chatterjee",
      members: 35,
      eventsHosted: 6,
      coordinates: "Eastern India Hub",
    },
    {
      city: "Bangalore",
      leader: "Vikram Reddy",
      members: 95,
      eventsHosted: 14,
      coordinates: "Southern Tech Hub",
    },
    {
      city: "Chennai",
      leader: "Divya Iyer",
      members: 80,
      eventsHosted: 12,
      coordinates: "South India Base",
    },
    {
      city: "Mumbai",
      leader: "Priya Sharma",
      members: 110,
      eventsHosted: 16,
      coordinates: "Western Hub",
    },
    {
      city: "Hyderabad",
      leader: "Nikhil Bhat",
      members: 70,
      eventsHosted: 10,
      coordinates: "Central Tech Valley",
    },
  ]

  return (
    <section id="regions" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Our Network</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Regional <span className="text-primary">Leaders</span>
          </h2>
          <p className="text-white/70 text-lg mt-4">Connecting alumni and members across India</p>
        </div>

        {/* Regions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region) => (
            <div
              key={region.city}
              className="glass-dark p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-primary text-xs uppercase tracking-widest mb-2">Region</p>
                  <h3 className="text-2xl font-serif font-bold text-white">{region.city}</h3>
                </div>
                <MapPin size={24} className="text-primary" />
              </div>

              <p className="text-white/70 text-sm mb-6">{region.coordinates}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-white/80">
                  <span className="text-sm font-semibold text-primary">Leader:</span>
                  <span className="text-sm">{region.leader}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Users size={16} />
                  <span className="text-sm">{region.members}+ Active Members</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Calendar size={16} />
                  <span className="text-sm">{region.eventsHosted} Events Organized</span>
                </div>
              </div>

              <Badge className="bg-primary/20 text-primary border-primary/30">Active</Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
