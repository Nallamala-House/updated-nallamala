"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink } from "lucide-react"

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const blogs = [
    {
      slug: "classical-ai-vs-quantum-ai",
      title: "Classical AI Vs Quantum AI",
      excerpt: "Blog about Classical AI vs Quantum AI vs Photonic AI",
      image: "/images/blogs/ai-quantum.jpg",
      category: "Quantum AI",
      date: "April 15, 2024",
      author: "Tech Team",
      readTime: "8 min read",
      externalLink: "https://medium.com/@vixal/classical-ai-vs-quantum-ai-vs-photonic-ai-4adfc8b99023"
    },
    {
      slug: "how-to-access-dark-web",
      title: "How To Access Dark Web?",
      excerpt: "Blog about dark web",
      image: "/images/blogs/dark-web.jpg",
      category: "Dark Web",
      date: "April 16, 2024",
      author: "Security Team",
      readTime: "10 min read"
    },
    {
      slug: "nallamala-forest",
      title: "Nallamala Forest",
      excerpt: "Blog about Nallamala Forest",
      image: "/images/blogs/nallamala-forest.jpeg",
      category: "Nature",
      date: "December 27, 2025",
      author: "Content Team",
      readTime: "7 min read",
      externalLink: "https://docs.google.com/document/d/1Lae85mICvhP0oSN1IC_dJ9WkOCIhQyaVmbfjod0spH4/edit?tab=t.0"
    }
  ]

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categoryColors: { [key: string]: string } = {
    "Quantum AI": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "Dark Web": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "Nature": "bg-green-500/20 text-green-300 border-green-500/30",
  }

  return (
    <main className="min-h-screen">
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
            Insights & <span className="text-primary">Stories</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explore stories, experiences, and insights from our vibrant community
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-dark border border-primary/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary/50 transition"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredBlogs.map((blog) => (
              <article 
                key={blog.slug}
                className="glass-dark rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 h-full flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={800}
                    height={600}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${blog.slug === "how-to-access-dark-web" ? "object-[50%_40%]" : ""}`}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={categoryColors[blog.category]}>
                      {blog.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 text-white/60 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{blog.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold text-white mb-3 transition-colors">
                    {blog.slug === "classical-ai-vs-quantum-ai" ? (
                      <>
                        Classical AI Vs <span className="text-yellow-400">Quantum AI</span>
                      </>
                    ) : blog.slug === "how-to-access-dark-web" ? (
                      <>
                        How To Access <span className="text-yellow-400">Dark Web</span>?
                      </>
                    ) : blog.slug === "nallamala-forest" ? (
                      <>
                        <span className="text-yellow-400">Nallamala</span> Forest
                      </>
                    ) : (
                      blog.title
                    )}
                  </h2>
                  <p className="text-white/70 mb-6 flex-1 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  
                  {/* Read Article Button */}
                  <a
                    href={blog.externalLink || `/blogs/${blog.slug}`}
                    target={blog.externalLink ? "_blank" : "_self"}
                    rel={blog.externalLink ? "noopener noreferrer" : ""}
                    className="inline-flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-primary/20 text-white border border-white/20 hover:border-primary/50 rounded-lg py-3 px-4 transition-all duration-300 font-medium"
                  >
                    Read Article
                    <ExternalLink size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No blogs found matching your search.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
