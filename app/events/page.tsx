"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Calendar, Share2, X } from "lucide-react"

type EventTab = "current" | "upcoming" | "past"

type EventItem = {
  id: number
  title: string
  description: string
  date: string
  location: string
  image: string
  status?: string
  category?: string
  attendees?: string
  links?: { label: string; url: string }[]
}

export default function Events() {
  const [activeTab, setActiveTab] = useState<EventTab>("current")
  const [search, setSearch] = useState("")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  /* ---------------- CURRENT EVENTS ---------------- */
  const currentEvents: EventItem[] = [
    {
      id: 1,
      title: "Winter Fest 2025",
      description:
        "Ongoing celebration with cultural performances, music, and fun activities for the entire house community.",
      date: "Dec 23–27, 2025",
      location: "House Common Area",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1200&fit=crop",
      status: "Live Now",
    },
    {
      id: 2,
      title: "Chess Tournament Finals",
      description:
        "The final matches of our inter-house chess championship are being played this week.",
      date: "Dec 25–26, 2025",
      location: "Games Room",
      image:
        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=1200&fit=crop",
      status: "In Progress",
    },
  ]

  /* ---------------- UPCOMING EVENTS ---------------- */
  const upcomingEvents: EventItem[] = [
    {
      id: 3,
      title: "New Year Gala 2026",
      description:
        "Ring in the new year with an elegant gala featuring live music, dinner, and dancing.",
      date: "Dec 31, 2025",
      location: "Main Hall",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1200&fit=crop",
      category: "Cultural",
    },
    {
      id: 4,
      title: "AI/ML Workshop",
      description:
        "Hands-on workshop on latest AI developments and machine learning techniques.",
      date: "Jan 8, 2026",
      location: "Tech Lab",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1200&fit=crop",
      category: "Academic",
    },
  ]

 /* ---------------- PAST EVENTS ---------------- */
const pastEvents: EventItem[] = [
  {
    id: 5,
    title: "Speaker Session: The Future of Digital Marketing",
    description:
      "An insightful speaker session featuring Sujata Hansda on digital marketing trends, AI, automation, and future career opportunities.",
    date: "Mar 21, 2025",
    location: "House Auditorium",
    image: "/images/events/1.png",
    attendees: "100+",
  },
  {
    id: 6,
    title: "Abstract Allegory – The Final Showdown",
    description:
      "A captivating celebration of creativity and spontaneous storytelling. Using abstract paintings as prompts, participants delivered impromptu narrations, blending visual art with expressive oration and sparking engaging discussions.",
    date: "Mar 6, 2025",
    location: "House Auditorium",
    image: "/images/events/2.png",
  },
  {
    id: 7,
    title: "Talk-Sick Night",
    description:
      "An evening packed with laughter, stories, and unforgettable moments. Participants shared hilarious, embarrassing, and unbelievable experiences in a relaxed and inclusive storytelling space that celebrated genuine expression and connection.",
    date: "Apr 4, 2025",
    location: "House Common Area",
    image: "/images/events/3.png",
  },
  {
    id: 8,
    title: "Bio.pptx 1.0",
    description:
      "A term-wise presentation competition fostering research-driven thinking and scientific communication. Participants explored topics at the intersection of biology, space sciences, and sustainability, encouraging interdisciplinary learning and innovation.",
    date: "Mar 18 – Apr 8, 2025",
    location: "Online",
    image: "/images/events/4.png",
  },
  {
    id: 9,
    title: "Ethical Hacking Workshop",
    description:
      "An intensive 2-day hands-on workshop introducing participants to ethical hacking, penetration testing, cybersecurity, and live hacking demonstrations.",
    date: "Apr 15–16, 2025",
    location: "Hybrid",
    image: "/images/events/5.png",
  },
  {
    id: 10,
    title: "DataSphere: Mastering Big Tech & GenAI",
    description:
      "A speaker session offering deep insights into Big Data, AI, and Generative AI.",
    date: "Apr 19, 2025",
    location: "Online",
    image: "/images/events/6.png",
  },
  {
    id: 11,
    title: "The Science of Self: Insights from the Bhagavad Gita",
    description:
      "A reflective speaker session exploring self-awareness, consciousness, and mind power.",
    date: "Apr 23, 2025",
    location: "Online",
    image: "/images/events/7.png",
  },
  {
    id: 12,
    title: "3-Day Python OPPE Revision Bootcamp",
    date: "17–19 July",
    image: "/images/events/8.png",
    description:
      "A 3-day intensive Python OPPE revision bootcamp featuring structured sessions, hands-on practice, and expert guidance.",
  },
  {
    id: 13,
    title: "Tri-Color Trails 2.0",
    date: "6–14 August",
    image: "/images/events/9.png",
    description:
      "A nationwide cultural initiative spanning 12 cities across 11 states, celebrating unity in diversity.",
  },
  {
    id: 14,
    title: "Noor-e-Sama 2.0",
    date: "Virtual Event",
    image: "/images/events/10.png",
    description:
      "A virtual evening celebrating Shayari and spoken poetry through powerful performances.",
  },
  {
    id: 15,
    title: "Navrang 2.0",
    date: "23 Sept – 1 Oct",
    image: "/images/events/11.png",
    description:
      "A vibrant Navratri celebration across 9+ cities with garba, dandiya, and festive energy.",
  },
  {
    id: 16,
    title: "Unraveling Nature’s Code through Quantum Computing",
    date: "16 October",
    image: "/images/events/12.png",
    description:
      "A speaker session by Dr. Monika Aggarwal (IIT Delhi) on quantum computing and natural systems.",
  },
  {
    id: 17,
    title: "JANMANTHAN: Bihar Edition",
    date: "3 November",
    image: "/images/events/13.png",
    description:
      "A youth dialogue unpacking political manifestos and governance priorities.",
  },
  {
    id: 18,
    title: "Python OPPE Discussion Session",
    date: "7 November",
    image: "/images/events/14.png",
    description:
      "A focused discussion session clarifying Python OPPE concepts.",
  },
  {
    id: 19,
    title: "AI GENESIS – Intro to AI Agents",
    date: "10 November",
    image: "/images/events/15.png",
    description:
      "Introductory session on AI Agents featuring Dr. Dhaval Mehta.",
  },
  {
    id: 20,
    title: "AI GENESIS – Agentic AI Framework",
    date: "12 November",
    image: "/images/events/16.png",
    description:
      "Hands-on session on building Agentic AI frameworks.",
  },
  {
    id: 21,
    title: "Nostalgia Night",
    date: "14 November",
    image: "/images/events/17.png",
    description:
      "A fun interactive night revisiting childhood memories.",
  },
  {
    id: 22,
    title: "AI GENESIS – Careers in Agentic AI",
    date: "15 November",
    image: "/images/events/18.png",
    description:
      "Career-focused session on opportunities in Agentic AI.",
  },
  {
    id: 23,
    title: "AES Full Syllabus Revision",
    date: "17 December",
    image: "/images/events/19.png",
    description:
      "A complete revision session for Analog Electronic Systems.",
  },
]


  const events =
    activeTab === "current"
      ? currentEvents
      : activeTab === "upcoming"
      ? upcomingEvents
      : pastEvents

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 right-20 w-80 h-80 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-primary/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-2 pt-24 pb-20">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Our Events</p>
          <h1 className="text-5xl font-serif font-bold text-white mb-4">
            House <span className="text-primary">Events</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Discover events and activities that bring our community together
          </p>

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-14 flex-wrap">
          {(["current", "upcoming", "past"] as EventTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab
                  ? "bg-primary text-black"
                  : "text-white/70 border border-white/10 hover:border-primary/40"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group rounded-xl overflow-hidden bg-white/5 border border-white/10
              hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20
              transition-all duration-300 flex flex-col"
            >
              <div 
                className="relative h-93 bg-gradient-to-br from-primary/5 to-black overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedImage(event.image)}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {event.status && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-500 text-white">
                      {event.status}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  {event.title}
                </h3>

                <p
                  className={`text-white/70 text-sm leading-relaxed mb-3 flex-1 transition-all ${
                    expandedId === event.id ? "" : "line-clamp-3"
                  }`}
                >
                  {event.description}
                </p>

                {event.description.length > 160 && (
                  <button
                    onClick={() => toggleExpand(event.id)}
                    className="text-xs font-semibold text-primary hover:underline self-start mb-3"
                  >
                    {expandedId === event.id ? "Show less" : "Read more"}
                  </button>
                )}

                <div className="flex items-center gap-2 text-white/60 text-sm mb-4 pt-3 border-t border-white/10">
                  <Calendar size={16} className="text-primary" />
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      event.title
                    )}&details=${encodeURIComponent(
                      event.description
                    )}&location=${encodeURIComponent(event.location)}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg text-white/70 hover:text-white transition text-sm"
                  >
                    <Calendar size={16} />
                    Add to Calendar
                  </a>

                  <button
                    onClick={() =>
                      navigator.share?.({
                        title: event.title,
                        text: event.description,
                      })
                    }
                    className="px-4 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg text-white/70 hover:text-white transition"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-primary transition p-2 bg-black/50 rounded-full"
            >
              <X size={32} />
            </button>
            <Image
              src={selectedImage}
              alt="Event image"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

