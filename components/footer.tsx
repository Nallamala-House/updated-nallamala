"use client"

import Link from "next/link"
import { Instagram, Linkedin, Database, Cpu } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/70 backdrop-blur-lg border-t border-primary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src="/images/nallamala_house_iit_madras_logo.jpg" 
                alt="Nallamala House Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Nallamala House - A beacon of excellence and community at IIT Madras
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Updates", href: "/updates" },
                { label: "Events", href: "/events" },
                { label: "Blogs", href: "/blogs" },
                { label: "Council", href: "/council?year=2025-26" },
                { label: "Communities", href: "/communities" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-primary transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Follow Us</h4>
            <div className="flex gap-3">
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
                    className="w-9 h-9 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center transition"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
              <a
                href="https://www.youtube.com/@NallamalaHouseIITMBS"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Academic Portals */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Academic Portals</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://ds.study.iitm.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-primary transition text-sm flex items-center gap-2"
                >
                  <Database size={14} className="text-primary" />
                  IITM Data Science Portal
                </a>
              </li>
              <li>
                <a 
                  href="https://es.study.iitm.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-primary transition text-sm flex items-center gap-2"
                >
                  <Cpu size={14} className="text-primary" />
                  IITM Electronics Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          {/* Developer Credits */}
          <div className="text-center mb-4">
            <p className="text-white/50 text-xs mb-2">
              Special thanks to developers of the website
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
              <a 
                href="https://www.linkedin.com/in/mukherjee-arya/?originalSubdomain=in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition"
              >
                Arya Mukherjee
              </a>
              <span className="text-white/30">•</span>
              <a 
                href="https://prodhosh-links.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition"
              >
                Prodhosh VS
              </a>
              <span className="text-white/30">•</span>
              <a 
                href="https://www.linkedin.com/in/pavithra-chakravarthy-98a940312/?originalSubdomain=in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition"
              >
                Pavithra Chakravarthy
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-white/50 text-xs text-center md:text-left">वसुधैव कुटुम्बकम् - The World is One Family</p>
            <p className="text-white/50 text-xs">
              © {currentYear} Nallamala House, IIT Madras. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
