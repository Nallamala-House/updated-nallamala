"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [councilDropdown, setCouncilDropdown] = useState(false)

  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ============================
  // AUTH STATE
  // ============================
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session)
      }
    )

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCouncilDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      listener.subscription.unsubscribe()
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // ============================
  // AUTH ACTION
  // ============================
  const handleAuthAction = async () => {
    if (isAuthenticated) {
      await supabase.auth.signOut()
      router.push("/")
    } else {
      router.push("/signin")
    }
  }

  // ============================
  // NAV ITEMS
  // ============================
  const navItemsBefore = [
    { label: "Home", href: "/" },
    { label: "Updates", href: "/updates" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
  ]

  const navItemsAfter = [
    { label: "Communities", href: "/communities" },
    { label: "Queries", href: "/queries", protected: true },
    { label: "Tools", href: "/tools", protected: true },
    { label: "Resources", href: "/resources", protected: true },
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

  // ============================
  // PROTECTED NAV HANDLER (FIXED)
  // ============================
  const handleProtectedNav = (href: string, protectedRoute?: boolean) => {
    if (protectedRoute && !isAuthenticated) {
      router.push("/signin")
      return
    }

    router.push(href)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/images/nallamala_house_iit_madras_logo.jpg"
                alt="Nallamala House Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItemsBefore.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary hover:bg-white/5 rounded-lg"
              >
                {item.label}
              </Link>
            ))}

            {/* Council Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCouncilDropdown(!councilDropdown)}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary hover:bg-white/5 rounded-lg flex items-center gap-1"
              >
                Council & Team
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    councilDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {councilDropdown && (
                <div className="absolute top-full mt-2 w-48 bg-black border border-primary/30 rounded-lg shadow-xl">
                  {councilYears.map((item) =>
                    item.external ? (
                      <a
                        key={item.year}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-sm text-white/80 hover:text-primary hover:bg-white/5"
                      >
                        {item.year}
                      </a>
                    ) : (
                      <Link
                        key={item.year}
                        href={item.href}
                        onClick={() => setCouncilDropdown(false)}
                        className="block px-4 py-3 text-sm text-white/80 hover:text-primary hover:bg-white/5"
                      >
                        {item.year}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {navItemsAfter.map((item) => (
              <button
                key={item.label}
                onClick={() => handleProtectedNav(item.href, item.protected)}
                className="px-4 py-2 text-sm text-white/80 hover:text-primary hover:bg-white/5 rounded-lg"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleAuthAction}
              className="hidden sm:flex bg-primary text-black font-semibold"
            >
              {isAuthenticated ? "Sign Out" : "Sign In"}
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-black/50 border-t border-primary/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[...navItemsBefore, ...navItemsAfter].map((item: any) => (
                <button
                  key={item.label}
                  onClick={() => {
                    handleProtectedNav(item.href, item.protected)
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg"
                >
                  {item.label}
                </button>
              ))}

              <Button
                onClick={() => {
                  handleAuthAction()
                  setIsOpen(false)
                }}
                className="w-full mt-4 bg-primary text-black font-semibold"
              >
                {isAuthenticated ? "Sign Out" : "Sign In"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
