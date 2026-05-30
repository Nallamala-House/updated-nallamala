"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Folder, 
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  Search, 
  Download, 
  GraduationCap, 
  BookOpen,
  FolderOpen,
  Sparkles,
  Lock,
  X
} from "lucide-react"
import pyqData from "@/lib/pyqs-data.json"

interface FileItem {
  name: string
  type: "file"
  path: string
  size?: number
}

interface FolderItem {
  name: string
  type: "directory"
  path: string
  children: Array<FileItem | FolderItem>
}

interface PyqDataMap {
  Foundation: Array<FolderItem>
  Diploma: Array<FolderItem>
}

const pyqsDatabase = pyqData as PyqDataMap

export default function PYQS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Explorer states
  const [level, setLevel] = useState<"Foundation" | "Diploma">("Foundation")
  const [selectedCourse, setSelectedCourse] = useState<FolderItem | null>(null)
  const [currentFolder, setCurrentFolder] = useState<FolderItem | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ name: string; folder: FolderItem | null }>>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true"
    setIsAuthenticated(authStatus)
    setIsLoading(false)
  }, [])

  // Handle changing levels (Foundation / Diploma)
  const handleLevelChange = (newLevel: "Foundation" | "Diploma") => {
    setLevel(newLevel)
    setSelectedCourse(null)
    setCurrentFolder(null)
    setBreadcrumbs([])
    setSearchQuery("")
  }

  // Handle selecting a course
  const handleCourseSelect = (course: FolderItem) => {
    setSelectedCourse(course)
    setCurrentFolder(course)
    setBreadcrumbs([
      { name: level, folder: null },
      { name: course.name, folder: course }
    ])
    setSearchQuery("")
  }

  // Handle navigating to a subdirectory
  const handleSubdirSelect = (folder: FolderItem) => {
    setCurrentFolder(folder)
    setBreadcrumbs((prev) => [...prev, { name: folder.name, folder }])
  }

  // Handle clicking a breadcrumb to go back
  const handleBreadcrumbClick = (index: number) => {
    const target = breadcrumbs[index]
    if (index === 0) {
      // Go back to course list
      setSelectedCourse(null)
      setCurrentFolder(null)
      setBreadcrumbs([])
    } else if (target && target.folder) {
      // Go to a specific parent folder in history
      setCurrentFolder(target.folder)
      setBreadcrumbs((prev) => prev.slice(0, index + 1))
    }
    setSearchQuery("")
  }

  // Go up one level
  const handleGoUp = () => {
    if (breadcrumbs.length <= 2) {
      // Go to course list
      setSelectedCourse(null)
      setCurrentFolder(null)
      setBreadcrumbs([])
    } else {
      const parentIndex = breadcrumbs.length - 2
      const parent = breadcrumbs[parentIndex]
      if (parent && parent.folder) {
        setCurrentFolder(parent.folder)
        setBreadcrumbs((prev) => prev.slice(0, parentIndex + 1))
      }
    }
    setSearchQuery("")
  }

  // Recursive search function
  const getSearchResults = () => {
    if (!searchQuery || !selectedCourse) return []
    const results: Array<FileItem> = []
    const search = (items: Array<any>) => {
      for (const item of items) {
        if (item.type === "file") {
          if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            results.push(item)
          }
        } else if (item.type === "directory" && item.children) {
          search(item.children)
        }
      }
    }
    search(selectedCourse.children)
    return results
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white font-semibold">Loading explorer...</div>
        </div>
        <Footer />
      </main>
    )
  }

  const courses = pyqsDatabase[level] || []
  const searchResults = getSearchResults()

  return (
    <main className="min-h-screen bg-black flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              Resource Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Previous Year <span className="text-primary">Question Papers</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
              Access comprehensive, structured PYQ resources to boost your academic preparation.
            </p>
          </div>

          {!isAuthenticated ? (
            /* Unauthenticated state card */
            <div className="max-w-xl mx-auto glass-dark p-10 rounded-2xl border-2 border-primary/20 shadow-[0_0_30px_rgba(212,175,55,0.1)] text-center">
              <div className="w-16 h-16 bg-primary/15 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white mb-3">IITM Sign-in Required</h2>
              <p className="text-white/60 text-base mb-8">
                To access course-specific question papers, study guides, and resources, please sign in using your authorized IIT Madras student account.
              </p>
              <Link href="/signin">
                <Button className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-5 text-base rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Sign In to Access
                </Button>
              </Link>
            </div>
          ) : (
            /* Authenticated state: PYQs File Explorer */
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
              {/* Level Tab Selection Switcher */}
              <div className="flex justify-center">
                <div className="glass p-1.5 rounded-xl border border-primary/20 inline-flex gap-2 w-full max-w-md shadow-inner">
                  <button
                    onClick={() => handleLevelChange("Foundation")}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      level === "Foundation"
                        ? "bg-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Foundation
                  </button>
                  <button
                    onClick={() => handleLevelChange("Diploma")}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      level === "Diploma"
                        ? "bg-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    Diploma
                  </button>
                </div>
              </div>

              {selectedCourse === null ? (
                /* 1. Courses grid select state */
                <div>
                  <h3 className="text-2xl font-serif text-white mb-6 border-b border-primary/20 pb-3 flex items-center gap-2 animate-fade-in">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></span>
                    Available {level} Courses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, idx) => (
                      <button
                        key={course.name}
                        onClick={() => handleCourseSelect(course)}
                        className="group text-left p-6 rounded-2xl glass-dark border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] relative overflow-hidden animate-scale-in"
                        style={{ animationDelay: `${idx * 0.04}s` }}
                      >
                        {/* Hover internal background glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                        
                        <div className="relative z-10 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                            <Folder className="w-7 h-7" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">
                              {course.name}
                            </h4>
                            <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">
                              {level} Level
                            </p>
                          </div>
                        </div>

                        {/* View Arrow hint */}
                        <div className="mt-6 flex items-center gap-2 text-primary/60 group-hover:text-primary text-xs font-semibold transition-colors">
                          <span>Browse Materials</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* 2. Directory Folder Browser state */
                <div className="glass-dark border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden animate-scale-in">
                  
                  {/* Folder explorer top actions bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-primary/20 pb-6">
                    {/* Back Button & Breadcrumbs */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={handleGoUp}
                        className="p-2.5 rounded-lg border border-primary/30 text-white/70 hover:text-primary hover:border-primary transition-all flex items-center justify-center bg-black/20 hover:scale-105"
                        title="Go up a directory"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white/50 flex-wrap">
                        {breadcrumbs.map((crumb, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            {idx > 0 && <ChevronRight className="w-4 h-4 text-white/30" />}
                            <button
                              onClick={() => handleBreadcrumbClick(idx)}
                              className={`hover:text-primary transition-colors duration-300 ${
                                idx === breadcrumbs.length - 1 ? "text-primary font-bold cursor-default" : "cursor-pointer"
                              }`}
                              disabled={idx === breadcrumbs.length - 1}
                            >
                              {crumb.name}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Search bar inside the explorer */}
                    <div className="relative w-full md:w-72">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                        <Search className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${selectedCourse.name} files...`}
                        className="w-full pl-9 pr-8 py-2.5 rounded-lg bg-black/40 border border-primary/20 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all shadow-inner"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Browser contents list */}
                  <div className="space-y-3">
                    {searchQuery ? (
                      /* Display Search results matching */
                      searchResults.length > 0 ? (
                        searchResults.map((item) => (
                          <div
                            key={item.path}
                            className="flex items-center justify-between p-4 rounded-xl bg-black/35 border border-primary/10 hover:border-primary/40 hover:bg-black/50 transition-all duration-300 group"
                          >
                            <a
                              href={`/${item.path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 flex-1 cursor-pointer min-w-0"
                            >
                              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-white font-medium group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                                  {item.name}
                                </p>
                                <p className="text-white/40 text-xs truncate">
                                  Path: {item.path}
                                </p>
                              </div>
                            </a>
                            <a
                              href={`/${item.path}`}
                              download
                              className="p-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all flex items-center justify-center"
                              title="Download resource"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-white/40 text-lg mb-2">No documents found matching "{searchQuery}"</p>
                          <button
                            onClick={() => setSearchQuery("")}
                            className="text-primary hover:underline text-sm font-semibold"
                          >
                            Clear Search
                          </button>
                        </div>
                      )
                    ) : (
                      /* Normal explorer view listing children of current directory */
                      (() => {
                        const dirs = (currentFolder?.children || []).filter((c) => c.type === "directory") as Array<FolderItem>
                        const files = (currentFolder?.children || []).filter((c) => c.type === "file") as Array<FileItem>

                        if (dirs.length === 0 && files.length === 0) {
                          return (
                            <div className="text-center py-12">
                              <FolderOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
                              <p className="text-white/40 text-lg">This folder is empty</p>
                            </div>
                          )
                        }

                        return (
                          <>
                            {/* Render directories */}
                            {dirs.map((dir) => (
                              <button
                                key={dir.name}
                                onClick={() => handleSubdirSelect(dir)}
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-black/20 border border-primary/10 hover:border-primary/45 hover:bg-black/40 transition-all duration-300 text-left group"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                                    <Folder className="w-5 h-5" />
                                  </div>
                                  <span className="text-white font-medium group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                                    {dir.name}
                                  </span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                              </button>
                            ))}

                            {/* Render files */}
                            {files.map((file) => (
                              <div
                                key={file.name}
                                className="flex items-center justify-between p-4 rounded-xl bg-black/35 border border-primary/10 hover:border-primary/40 hover:bg-black/50 transition-all duration-300 group"
                              >
                                <a
                                  href={`/${file.path}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 flex-1 cursor-pointer min-w-0"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <span className="text-white font-medium group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                                    {file.name}
                                  </span>
                                </a>
                                <a
                                  href={`/${file.path}`}
                                  download
                                  className="p-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-black transition-all flex items-center justify-center shadow-md"
                                  title="Download resource"
                                >
                                  <Download className="w-4 h-4" />
                                </a>
                              </div>
                            ))}
                          </>
                        )
                      })()
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
