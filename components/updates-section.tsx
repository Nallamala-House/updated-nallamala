"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

type UpdateItem = {
  slug: string
  title: string
  excerpt: string
  image: string
  category: "Registration" | "Update"
  date: "Deadline Passed" | "Ongoing" | "Upcoming" | "18th feb deadline"
  externalLink?: string
  buttonText?: string
}

export default function UpdatesSection() {
  const [searchQuery] = useState("")

  const updates: UpdateItem[] = [
    {
      slug: "profile-update",
      title: "Profile Update",
      excerpt: "Update your student profile",
      image: "/images/updates/iitm.jpeg",
      category: "Update",
      date: "Deadline Passed",
      externalLink:
        "https://ds.study.iitm.ac.in/student_dashboard/profile_update",
    },
    {
      slug: "SCT Registration Window 2",
      title: "SCT Registration Window 2",
      excerpt: "SCT Registration",
      image: "/images/updates/iitm.jpeg",
      category: "Registration",
      date: "Deadline Passed",
      externalLink:
        "https://exams.study.iitm.ac.in/courses/ns_26t1_sct"
    },
    {
      slug: "City Change Window",
      title: "Quiz - 1 Exam City Change",
      excerpt: "Use IITM mail to access",
      image: "/images/updates/iitm.jpeg",
      category: "Update",
      date: "18th feb deadline",
      externalLink: "https://ds.study.iitm.ac.in/student_dashboard/edit_exam_city_preference/",
      buttonText: "Change Now"
    },
  ]

  const categoryColors: Record<UpdateItem["category"], string> = {
    "Registration":
      "bg-yellow-500/50 text-white border-yellow-500/30",
    Update: "bg-yellow-500/50 text-white border-yellow-500/30",
  }

  const filteredUpdates = updates.filter(
    (update) =>
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section id="updates" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Latest <span className="text-primary">Updates</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full opacity-50" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUpdates.map((update) => (
            <article
              key={update.slug}
              className="glass-dark rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-64 w-full bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={update.image}
                  alt={update.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 z-10">
                  <Badge
                    className={`border shadow-lg ${categoryColors[update.category]}`}
                  >
                    {update.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  {update.date}
                </span>

                <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {update.title}
                </h3>

                <p className="text-white/70 text-sm mb-6 flex-1">
                  {update.excerpt}
                </p>

                {/* Action Button */}
                {update.date === "Deadline Passed" ? (
                  <div className="w-full bg-white/5 text-white/30 border border-white/5 rounded-lg py-3 text-sm font-semibold text-center cursor-not-allowed">
                    Registration Closed
                  </div>
                ) : update.date === "Upcoming" ? (
                  <div className="w-full bg-primary/10 text-primary border border-primary/30 rounded-lg py-3 text-sm font-semibold text-center">
                    Upcoming
                  </div>
                ) : (
                  <a
                    href={update.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg py-3 transition-all text-sm font-bold"
                  >
                    {update.buttonText || "Register Now"}
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
