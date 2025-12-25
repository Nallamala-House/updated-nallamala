"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type EventTab = "current" | "upcoming" | "past"

export default function Events() {
  const [activeTab, setActiveTab] = useState<EventTab>("current")
  const currentEvents = [
    {
      id: 1,
      title: "Winter Fest 2025",
      description: "Ongoing celebration with cultural performances, music, and fun activities for the entire house community.",
      date: "Dec 23-27, 2025",
      location: "House Common Area",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
      status: "Live Now"
    },
    {
      id: 2,
      title: "Chess Tournament Finals",
      description: "The final matches of our inter-house chess championship are being played this week.",
      date: "Dec 25-26, 2025",
      location: "Games Room",
      image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=600&fit=crop",
      status: "In Progress"
    }
  ]

  const upcomingEvents = [
    {
      id: 3,
      title: "New Year Gala 2026",
      description: "Ring in the new year with an elegant gala featuring live music, dinner, and dancing.",
      date: "Dec 31, 2025",
      location: "Main Hall",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      category: "Cultural"
    },
    {
      id: 4,
      title: "AI/ML Workshop",
      description: "Hands-on workshop on latest AI developments and machine learning techniques.",
      date: "Jan 8, 2026",
      location: "Tech Lab",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      category: "Academic"
    },
    {
      id: 5,
      title: "Basketball Tournament",
      description: "Annual inter-house basketball championship. Form your teams and register now!",
      date: "Jan 15-20, 2026",
      location: "Sports Complex",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
      category: "Sports"
    },
    {
      id: 6,
      title: "Freshers Welcome Party",
      description: "Official welcome party for the new batch with fun activities and team bonding.",
      date: "Jan 25, 2026",
      location: "House Courtyard",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
      category: "Social"
    }
  ]

  const pastEvents = [
    {
      id: 7,
      title: "Diwali Celebration 2024",
      description: "Grand Diwali celebration with traditional performances, rangoli competition, and festive dinner.",
      date: "Nov 1, 2024",
      location: "House Grounds",
      image: "https://images.unsplash.com/photo-1605815719053-f5a869e00a08?w=800&h=600&fit=crop",
      attendees: "200+"
    },
    {
      id: 8,
      title: "Tech Symposium 2024",
      description: "Annual tech symposium featuring talks on AI, blockchain, and quantum computing.",
      date: "Oct 15, 2024",
      location: "Auditorium",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      attendees: "150+"
    },
    {
      id: 9,
      title: "Sports Day 2024",
      description: "House sports day with various competitions including cricket, football, and athletics.",
      date: "Sep 20, 2024",
      location: "Sports Complex",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
      attendees: "180+"
    },
    {
      id: 10,
      title: "Orientation Week 2024",
      description: "Welcome week for new students with campus tours, ice-breaking activities, and mentor meetings.",
      date: "Aug 10-15, 2024",
      location: "Campus Wide",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
      attendees: "250+"
    },
    {
      id: 11,
      title: "Summer Farewell 2024",
      description: "Emotional farewell celebration for graduating seniors with performances and memories shared.",
      date: "Jul 28, 2024",
      location: "Main Hall",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
      attendees: "300+"
    },
    {
      id: 12,
      title: "Regional Meetup - Telangana",
      description: "Regional gathering bringing together students from Telangana for networking and cultural exchange.",
      date: "Jun 15, 2024",
      location: "Community Hall",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop",
      attendees: "80+"
    }
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">
            House <span className="text-primary">Events</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Stay updated with all the exciting events, competitions, and gatherings happening in our community
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab("current")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "current"
                  ? "bg-primary text-black"
                  : "glass-dark text-white/70 hover:text-white border border-white/10 hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${activeTab === "current" ? "bg-black animate-pulse" : "bg-red-500 animate-pulse"}`}></span>
                Current Events
              </div>
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "upcoming"
                  ? "bg-primary text-black"
                  : "glass-dark text-white/70 hover:text-white border border-white/10 hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upcoming Events
              </div>
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "past"
                  ? "bg-primary text-black"
                  : "glass-dark text-white/70 hover:text-white border border-white/10 hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Past Events
              </div>
            </button>
          </div>
        </div>

        {/* Current Events */}
        {activeTab === "current" && currentEvents.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-primary rounded-full"></div>
              <h2 className="text-3xl font-bold text-white">Current Events</h2>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 animate-pulse">Live</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {currentEvents.map((event) => (
                <div key={event.id} className="glass-dark rounded-xl overflow-hidden border border-primary/30 hover:border-primary/50 transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 text-white border-red-600">
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-white/70 mb-4">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/60">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        {activeTab === "upcoming" && (
          <section className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-primary rounded-full"></div>
            <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="glass-dark rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {event.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Past Events */}
        {activeTab === "past" && (
          <section className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-primary rounded-full"></div>
            <h2 className="text-3xl font-bold text-white">Past Events</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="glass-dark rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale-[30%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{event.attendees} Attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  )
}
