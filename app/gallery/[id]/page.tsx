"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, MapPin, Users, Calendar } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GalleryDetail() {
  const params = useParams()
  const galleryId = Number.parseInt(params.id as string)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const galleries = {
    1: {
      title: "Mumbai Meetup 2024",
      region: "West",
      date: "December 15, 2024",
      attendees: 125,
      description:
        "A vibrant gathering of Nallamala alumni and members in Mumbai, celebrating community and innovation. This event brought together professionals, students, and enthusiasts for networking, knowledge sharing, and community building.",
      images: [
        "/mumbai-meetup-event.jpg",
        "/group-photo-networking-event.jpg",
        "/conference-presentation.png",
        "/team-building-outdoor.png",
        "/celebration-dinner.jpg",
      ],
      highlights: [
        "125+ members attended from across India",
        "5 keynote speakers from industry leaders",
        "Networking sessions with 20+ companies",
        "Tech talks on emerging trends",
        "Community bonding activities",
      ],
      sponsors: ["Tech Corp", "Innovation Labs", "Creative Studios"],
    },
    2: {
      title: "Delhi Networking Event",
      region: "North",
      date: "December 10, 2024",
      attendees: 98,
      description:
        "Connect, collaborate, and celebrate at our flagship Delhi meetup with industry leaders. A comprehensive event focusing on professional development and community strengthening.",
      images: [
        "/delhi-networking-event.jpg",
        "/professional-gathering.jpg",
        "/networking-session.png",
        "/business-discussion.jpg",
      ],
      highlights: [
        "98 members participated",
        "3 major industry partners",
        "Mentorship sessions available",
        "Career guidance workshops",
        "Networking cocktail evening",
      ],
      sponsors: ["Delhi Tech Hub", "Business Solutions", "Career Boost"],
    },
    3: {
      title: "Bangalore Tech Summit",
      region: "South",
      date: "December 8, 2024",
      attendees: 156,
      description:
        "Innovation and technology at the heart of our South India chapter. A comprehensive summit featuring latest tech trends and opportunities.",
      images: ["/bangalore-tech-conference.jpg", "/technology-presentation.png", "/audience-engagement.png"],
      highlights: [
        "156 tech enthusiasts",
        "10+ tech talks",
        "Startup showcase",
        "Innovation fair",
        "Hackathon announcement",
      ],
      sponsors: ["Bangalore IT", "Tech Innovators", "Future Tech"],
    },
    4: {
      title: "Chennai Community Fest",
      region: "South",
      date: "December 5, 2024",
      attendees: 87,
      description:
        "A celebration of culture, community, and creativity in the heart of Chennai. Showcasing diverse talents and bringing the community together.",
      images: ["/chennai-festival-celebration.jpg", "/vibrant-cultural-performance.png", "/art-exhibition.png"],
      highlights: [
        "87 community members",
        "Cultural performances",
        "Art exhibitions",
        "Food festival",
        "Live music performances",
      ],
      sponsors: ["Chennai Arts", "Cultural Society", "Local Community"],
    },
    5: {
      title: "Kolkata Cultural Night",
      region: "East",
      date: "November 28, 2024",
      attendees: 76,
      description:
        "Experience the cultural richness of East India through this memorable event. A celebration of arts, literature, and community spirit.",
      images: ["/kolkata-cultural-event.jpg", "/traditional-performance.jpg"],
      highlights: [
        "76 participants",
        "Traditional performances",
        "Literary readings",
        "Art showcase",
        "Community dinner",
      ],
      sponsors: ["Kolkata Cultural Center", "Arts Foundation"],
    },
  }

  const gallery = galleries[galleryId as keyof typeof galleries]

  if (!gallery) {
    return (
      <main className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/70 text-lg mb-4">Gallery not found</p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-black">Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.images.length)
  }

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.images.length) % gallery.images.length)
  }

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Image */}
          <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden border-2 border-primary/30 mb-12 group">
            <img
              src={gallery.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${gallery.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* Navigation */}
            {gallery.images.length > 1 && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-black p-2 rounded-full transition z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-black p-2 rounded-full transition z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {gallery.images.length}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {gallery.images.length > 1 && (
            <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
              {gallery.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex ? "border-primary" : "border-primary/20 hover:border-primary/50"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <p className="text-primary text-sm uppercase tracking-widest">{gallery.region}</p>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-2 text-white/70">
                <Calendar size={16} />
                <span>{gallery.date}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{gallery.title}</h1>
            <p className="text-white/70 text-lg leading-relaxed">{gallery.description}</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-dark p-6 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-primary" size={20} />
                <p className="text-white/70">Attendees</p>
              </div>
              <p className="text-3xl font-serif font-bold text-primary">{gallery.attendees}+</p>
            </div>
            <div className="glass-dark p-6 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-primary" size={20} />
                <p className="text-white/70">Region</p>
              </div>
              <p className="text-3xl font-serif font-bold text-primary">{gallery.region}</p>
            </div>
            <div className="glass-dark p-6 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-primary" size={20} />
                <p className="text-white/70">Photos</p>
              </div>
              <p className="text-3xl font-serif font-bold text-primary">{gallery.images.length}</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Event Highlights</h2>
            <ul className="space-y-3">
              {gallery.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 glass-dark p-4 rounded-lg border border-primary/10">
                  <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-white/80">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sponsors */}
          {gallery.sponsors && gallery.sponsors.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Sponsors</h2>
              <div className="flex flex-wrap gap-4">
                {gallery.sponsors.map((sponsor, idx) => (
                  <div key={idx} className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg">
                    <p className="text-primary font-semibold">{sponsor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <Link href="/" className="inline-block mb-12">
            <Button className="bg-primary hover:bg-primary/90 text-black">Back to Home</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
