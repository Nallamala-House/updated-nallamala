"use client"

import { useState } from "react"
import useSWR from "swr"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

type UpdateItem = {
  _id: string
  title: string
  description: string
  fileId?: {
    _id: string
    [key: string]: any
  } | string
  badgeText?: string
  statusText?: string
  secondaryTitle?: string
  buttonText?: string
  buttonLink?: string
  links?: { text: string; url: string }[]
  additionalImages?: { fileId: any; description?: string }[]
  category?: "Registration" | "Update"
  date?: string
}

const fetcher = async (url: string) => {
  try {
    const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return { success: false, data: [] }; // Return fallback instead of throwing to avoid UI crash
    }
    return await res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

export default function UpdatesSection({ showSearch = true }: { showSearch?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("")
  const apiUrl = '/api'

  const { data: json, error, isLoading } = useSWR(`${apiUrl}/updates`, fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
    errorRetryInterval: 10000,
    shouldRetryOnError: true,
  })

  const updates = json?.success ? json.data : []
  const loading = isLoading



  const categoryColors: Record<string, string> = {
    "Registration":
      "bg-yellow-500/50 text-white border-yellow-500/30",
    Update: "bg-yellow-500/50 text-white border-yellow-500/30",
  }

  // Ensure URLs always have a protocol prefix
  const normalizeUrl = (url: string) => {
    if (!url) return "#";
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('#')) {
      return url;
    }
    return `https://${url}`;
  };

  const filteredUpdates = updates.filter(
    (update: UpdateItem) =>
      update.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.description?.toLowerCase().includes(searchQuery.toLowerCase())
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

          {/* Search Bar — hidden on home page */}
          {showSearch && (
            <div className="mt-8 max-w-md mx-auto relative group">
              <input
                type="text"
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all group-hover:bg-white/10"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {error ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-white/50 py-10">
              <p className="text-red-400 font-semibold mb-2">Unable to load updates</p>
              <p className="text-xs text-white/30">Please check your connection and try again later.</p>
            </div>
          ) : loading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-white/50 py-10">
              Loading updates...
            </div>
          ) : filteredUpdates.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-white/50 py-10">
              No updates available at the moment.
            </div>
          ) : (
            filteredUpdates.map((update: UpdateItem) => (
              <article
                key={update._id}
                className="glass-dark rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col group"
              >
                {/* Image / Logo Section */}
                <div className="relative h-64 w-full bg-black flex flex-col items-center justify-center overflow-hidden">
                  <div className="relative h-32 w-32 mb-4">
                    <Image
                      src={update.fileId ? `/api/files/${typeof update.fileId === 'object' ? update.fileId._id : update.fileId}` : "/images/updates/iitm.jpeg"}
                      alt={update.title || "Update image"}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {update.secondaryTitle && (
                    <div className="text-center px-4 z-10">
                      <p className="text-white font-bold text-xs tracking-widest uppercase mb-1">
                        {update.secondaryTitle.split('\n')[0]}
                      </p>
                      {update.secondaryTitle.split('\n').slice(1).map((line: string, i: number) => (
                        <p key={i} className="text-white font-bold text-sm tracking-widest uppercase">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="absolute top-4 left-4 z-10">
                    <Badge
                      className={`border shadow-lg ${categoryColors["Update"]}`}
                    >
                      {update.badgeText || "Update"}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-col items-center mb-6">
                    {update.statusText && (
                      <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        {update.statusText}
                      </span>
                    )}
                    <h3 className="text-2xl font-serif font-bold text-white text-center leading-tight">
                      {update.title}
                    </h3>
                  </div>

                  <p className="text-white/70 text-sm mb-6 flex-1 text-center italic">
                    {update.description}
                  </p>

                  {/* Additional Images Section */}
                  {update.additionalImages && update.additionalImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {update.additionalImages.map((img: any, i: number) => (
                        <div key={i} className="group/img relative h-24 rounded-lg overflow-hidden border border-white/5">
                          <Image
                            src={`/api/files/${typeof img.fileId === 'object' ? img.fileId._id : img.fileId}`}
                            alt={img.description || "Additional image"}
                            fill
                            className="object-cover transition-transform group-hover/img:scale-110"
                          />
                          {img.description && (
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-2">
                              <span className="text-[8px] text-white text-center font-medium line-clamp-2">{img.description}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Links Section */}
                  {update.links && update.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                      {update.links.map((link: any, i: number) => (
                        <a
                          key={i}
                          href={normalizeUrl(link.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-primary hover:text-white border border-primary/30 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                        >
                          {link.text} <ExternalLink size={10} />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <a
                    href={normalizeUrl(update.buttonLink || "") !== "#" ? normalizeUrl(update.buttonLink || "") : (update.fileId ? `/api/files/${typeof update.fileId === 'object' ? update.fileId._id : update.fileId}` : "#")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl py-4 transition-all text-sm font-bold tracking-widest uppercase"
                  >
                    {update.buttonText || (update.fileId ? "View Attachment" : "Apply Now")}
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
