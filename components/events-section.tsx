"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState<"completed" | "upcoming">("completed")

  const completedEvents = [
    {
      id: 1,
      title: "12 City Meetup Series with Boundless",
      date: "Aug 6-14, 2024",
      description: "Connecting with communities across 12 major cities",
      type: "Networking",
    },
    {
      id: 2,
      title: "Noor e Sama Cultural Celebration",
      date: "Aug 21, 2024",
      description: "Grand cultural festival celebrating diversity and traditions",
      type: "Cultural",
    },
    {
      id: 3,
      title: "Meetups with Boundless",
      date: "Sep 27 - Oct 2, 2024",
      description: "Week-long collaborative sessions and knowledge sharing",
      type: "Workshop",
    },
    {
      id: 4,
      title: "Nature Nurture Society Session",
      date: "Oct 16, 2024",
      description: "Environmental awareness and sustainability initiatives",
      type: "Community",
    },
    {
      id: 5,
      title: "Mahasamvaad Dialogue",
      date: "Nov 5, 2024",
      description: "In-depth discussions on contemporary topics and ideas",
      type: "Discussion",
    },
    {
      id: 6,
      title: "Agentic AI Workshop (3-Part Series)",
      date: "Nov 11-17, 2024",
      description: "Advanced AI and machine learning technical workshops",
      type: "Technical",
    },
    {
      id: 7,
      title: "Fun Nostalgia Session",
      date: "Nov 14, 2024",
      description: "Reminiscing memories and celebrating house spirit",
      type: "Social",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Cultural Fest 2026",
      date: "January 2026",
      description: "The grandest celebration of talent, music, and arts",
      type: "Festival",
    },
    {
      id: 2,
      title: "Tech Summit 2026",
      date: "February 2026",
      description: "Showcasing innovations and cutting-edge technologies",
      type: "Conference",
    },
    {
      id: 3,
      title: "Regional Meetup Series",
      date: "March 2026",
      description: "Connecting alumni and members across all regions",
      type: "Networking",
    },
  ]

  const events = activeTab === "completed" ? completedEvents : upcomingEvents

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Events</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Unforgettable <span className="text-primary">Moments</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "completed" ? "bg-primary text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Completed Events
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "upcoming" ? "bg-primary text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Upcoming Events
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <Badge className="w-fit mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                {event.type}
              </Badge>
              <h3 className="text-lg font-serif font-bold text-white mb-2">{event.title}</h3>
              <p className="text-white/70 text-sm mb-4 flex-grow">{event.description}</p>
              <div className="flex items-center space-x-2 text-primary text-sm mb-4">
                <Calendar size={16} />
                <span>{event.date}</span>
              </div>
              <Button className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
