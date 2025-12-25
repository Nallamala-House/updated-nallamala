"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function BlogsSection() {
  const blogs = [
    {
      id: 1,
      title: "Classical AI vs Quantum AI: The Future Unfolds",
      author: "Tech Innovation Team",
      date: "Dec 15, 2024",
      category: "AI & Technology",
      excerpt:
        "Exploring the paradigm shift between classical machine learning approaches and emerging quantum computing applications in artificial intelligence.",
      readTime: "8 min read",
      image: "/classical-quantum-ai-technology.jpg",
    },
    {
      id: 2,
      title: "Navigating the Digital Frontier: A Deep Dive",
      author: "Security & Ethics Committee",
      date: "Dec 10, 2024",
      category: "Digital Innovation",
      excerpt:
        "Understanding modern digital landscapes, security considerations, and ethical implications of emerging technologies in today's world.",
      readTime: "10 min read",
      image: "/digital-frontier-technology-innovation.jpg",
    },
    {
      id: 3,
      title: "Building Resilient Teams: Lessons from Nallamala",
      author: "Community Leaders",
      date: "Dec 5, 2024",
      category: "Leadership",
      excerpt:
        "How our community practices foster collaboration, resilience, and collective growth among diverse members.",
      readTime: "6 min read",
      image: "/team-collaboration-community-building.jpg",
    },
    {
      id: 4,
      title: "The Art of Innovation: Creativity Meets Code",
      author: "Creative Tech Hub",
      date: "Nov 28, 2024",
      category: "Innovation",
      excerpt:
        "Bridging the gap between artistic vision and technical implementation through interdisciplinary collaboration.",
      readTime: "7 min read",
      image: "/creative-innovation-art-technology.jpg",
    },
    {
      id: 5,
      title: "Global Connections: Alumni Stories",
      author: "Alumni Network",
      date: "Nov 20, 2024",
      category: "Community",
      excerpt:
        "Inspiring stories from Nallamala alumni making impact across the globe in various fields and industries.",
      readTime: "9 min read",
      image: "/global-community-alumni-network-connections.jpg",
    },
    {
      id: 6,
      title: "Sustaining Excellence: Our 2025 Vision",
      author: "House Council",
      date: "Nov 15, 2024",
      category: "Vision & Strategy",
      excerpt:
        "A comprehensive look at Nallamala House's strategic initiatives and vision for the coming academic year.",
      readTime: "11 min read",
      image: "/vision-future-excellence-strategic-planning.jpg",
    },
  ]

  return (
    <section id="blogs" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Insights & Stories</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            From Our <span className="text-primary">Community</span>
          </h2>
          <p className="text-white/70 text-lg mt-4 max-w-2xl mx-auto">
            Discover articles, insights, and stories from Nallamala members and alumni
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="glass-dark rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col group"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary text-xs uppercase tracking-widest font-semibold">{blog.category}</span>
                  <span className="text-white/50 text-xs">{blog.readTime}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white mb-3 group-hover:text-primary transition line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-4 flex-grow">{blog.excerpt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-xs text-white/60">{blog.date}</div>
                  <Button className="h-8 w-8 p-0 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-full flex items-center justify-center">
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-black px-8 py-6 text-lg font-semibold rounded-lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
