"use client"

import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/95 backdrop-blur-lg border-t border-primary/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src="/images/nallamala_house_iit_madras_logo.jpg" 
                alt="Nallamala House Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white/70 text-sm">
              Nallamala House - A beacon of excellence and community at IIT Madras
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Updates", href: "/updates" },
                { label: "Events", href: "/events" },
                { label: "Blogs", href: "/blogs" },
                { label: "Council", href: "/council?year=2025-2026" },
                { label: "Communities", href: "/communities" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-primary transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/nallamala_iitm/" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/nallamala-house-iit-madras/posts/?feedView=all" },
              ].map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center transition"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
              <a
                href="https://www.youtube.com/@NallamalaHouseIITMBS"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mt-8">
          {/* Developer Credits */}
          <div className="text-center mb-6">
            <p className="text-white/60 text-sm mb-2">
              Special thanks to developers of the website
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
              <a 
                href="https://linkedin.com/in/arya-mukherjee" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition"
              >
                Arya Mukherjee
              </a>
              <span className="text-white/40">•</span>
              <a 
                href="https://linkedin.com/in/prodhosh-vs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition"
              >
                Prodhosh VS
              </a>
              <span className="text-white/40">•</span>
              <a 
                href="https://linkedin.com/in/pavithra-chakravarthy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition"
              >
                Pavithra Chakravarthy
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm text-center md:text-left">वसुधैव कुटुम्बकम् - The World is One Family</p>
            <p className="text-white/60 text-sm mt-4 md:mt-0">
              © {currentYear} Nallamala House, IIT Madras. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
