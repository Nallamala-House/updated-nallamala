"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [councilDropdown, setCouncilDropdown] = useState(false)

  // 🔹 added (ESSENTIAL ONLY)
  const [avatarDropdown, setAvatarDropdown] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [userInitial, setUserInitial] = useState("U")

  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  // ✅ AUTH STATE (Supabase)
  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        const user = data.session.user
        setIsAuthenticated(true)
        setAvatarUrl(user.user_metadata?.avatar_url || null)
        setUserInitial(
          (user.user_metadata?.full_name ||
            user.email ||
            "U")[0].toUpperCase()
        )
      }
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const user = session.user
        setIsAuthenticated(true)
        setAvatarUrl(user.user_metadata?.avatar_url || null)
        setUserInitial(
          (user.user_metadata?.full_name ||
            user.email ||
            "U")[0].toUpperCase()
        )
      } else {
        setIsAuthenticated(false)
        setAvatarUrl(null)
        setAvatarDropdown(false)
      }
    })

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) setCouncilDropdown(false)

      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) setAvatarDropdown(false)
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      subscription.unsubscribe()
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // ✅ AUTH ACTION (unchanged)
  const handleAuthAction = async () => {
    if (isAuthenticated) {
      await supabase.auth.signOut()
      router.push("/")
    } else {
      router.push("/signin")
    }
  }

  const navItemsBefore = [
    { label: "Home", href: "/" },
    { label: "Updates", href: "/updates" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
  ]

  const navItemsAfter = [
    { label: "Communities", href: "/communities" },
    { label: "Queries", href: "/queries" },
    { label: "Tools", href: "/tools" },
    { label: "Resources", href: "/resources" },
  ]

  const councilYears = [
    { year: "Present", href: "/council?year=2025-26", external: false },
    { year: "2024-25", href: "/council?year=2024-25", external: false },
    {
      year: "2023-24",
      href: "https://sites.google.com/student.onlinedegree.iitm.ac.in/nallamala/house-council/2023-24",
      external: true,
    },
    {
      year: "2022-23",
      href: "https://sites.google.com/student.onlinedegree.iitm.ac.in/nallamala/house-council/2022-23",
      external: true,
    },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-lg border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/images/nallamala_house_iit_madras_logo.jpg"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation (UNCHANGED) */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItemsBefore.map(item => (
              <Link key={item.label} href={item.href}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary rounded-lg hover:bg-white/5">
                {item.label}
              </Link>
            ))}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCouncilDropdown(!councilDropdown)}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary rounded-lg hover:bg-white/5 flex items-center gap-1"
              >
                Council & Team
                <ChevronDown size={16} />
              </button>

              {councilDropdown && (
                <div className="absolute top-full mt-2 w-48 glass-dark rounded-lg border border-primary/30">
                  {councilYears.map(item =>
                    item.external ? (
                      <a key={item.year} href={item.href} target="_blank"
                        className="block px-4 py-3 text-sm text-white/80 hover:text-primary hover:bg-white/5">
                        {item.year}
                      </a>
                    ) : (
                      <Link key={item.year} href={item.href}
                        className="block px-4 py-3 text-sm text-white/80 hover:text-primary hover:bg-white/5">
                        {item.year}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {navItemsAfter.map(item => (
              <Link key={item.label} href={item.href}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary rounded-lg hover:bg-white/5">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section (ONLY PART TO CHANGE) */}
          <div className="flex items-center space-x-4 relative" ref={avatarRef}>
            {!isAuthenticated ? (
              <Button
                onClick={handleAuthAction}
                className="hidden sm:flex bg-primary text-black font-semibold"
              >
                Sign In
              </Button>
            ) : (
              <>
                {/* Avatar */}
                <button
                  onClick={() => setAvatarDropdown(!avatarDropdown)}
                  className="hidden sm:flex w-9 h-9 rounded-full bg-primary text-black font-bold items-center justify-center"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    userInitial
                  )}
                </button>

                {/* Avatar Dropdown */}
                {avatarDropdown && (
                  <div className="absolute right-0 top-12 w-40 glass-dark rounded-lg border border-primary/30">
                    <Link
                      href="/profile"
                      onClick={() => setAvatarDropdown(false)}
                      className="block px-4 py-3 text-sm text-white/80 hover:text-primary hover:bg-white/5"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleAuthAction}
                      className="w-full text-left px-4 py-3 text-sm text-white/80 hover:text-red-400 hover:bg-white/5"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
