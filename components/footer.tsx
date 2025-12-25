"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/95 backdrop-blur-lg border-t border-primary/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
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
                { label: "Home", href: "#" },
                { label: "Events", href: "#events" },
                { label: "Blogs", href: "#blogs" },
                { label: "Council", href: "#council" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-primary transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "#" },
                { label: "Clubs", href: "#clubs" },
                { label: "Alumni", href: "#" },
                { label: "Contact", href: "#" },
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
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
              ].map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center transition"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mt-8">
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
