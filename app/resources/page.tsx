"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  FileText, 
  Book, 
  ClipboardList, 
  ExternalLink, 
  Filter, 
  BookOpen, 
  GraduationCap, 
  FileCheck, 
  Sparkles, 
  ChevronDown,
  ChevronRight,
  Folder,
  ArrowLeft,
  Download,
  FolderOpen,
  X
} from "lucide-react"
import { useSession } from "next-auth/react"
interface FileItem {
  name: string
  type: "file"
  path: string
  size?: number
  url: string
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

// Function to dynamically build the folder tree from database resources
const buildFolderTree = (resources: any[]): PyqDataMap => {
  const tree: PyqDataMap = {
    Foundation: [],
    Diploma: []
  }

  const pyqResources = resources.filter((r: any) => r.section === "pyqs" && r.path)

  pyqResources.forEach((r: any) => {
    const parts = r.path.split('/')
    if (parts.length < 2) return // Expecting Level/Course/.../File
    const level = parts[0] as "Foundation" | "Diploma"
    if (level !== "Foundation" && level !== "Diploma") return

    let currentChildren: Array<FileItem | FolderItem> = tree[level] as any
    let currentPath: string = level

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i]
      const isLast = i === parts.length - 1
      currentPath = `${currentPath}/${part}`

      if (isLast) {
        // It's a file
        const fileUrl = r.fileId ? `/api/files/${r.fileId._id || r.fileId}` : r.url || "#"
        const fileItem: FileItem = {
          name: part,
          type: "file",
          path: r.path,
          url: fileUrl
        }
        currentChildren.push(fileItem as any)
      } else {
        // It's a directory
        let folder = currentChildren.find((c: any) => c.type === "directory" && c.name === part) as FolderItem | undefined
        if (!folder) {
          folder = {
            name: part,
            type: "directory",
            path: currentPath,
            children: []
          }
          currentChildren.push(folder as any)
        }
        currentChildren = folder.children
      }
    }
  })

  // Sort courses alphabetically for clean presentation
  tree.Foundation.sort((a, b) => a.name.localeCompare(b.name))
  tree.Diploma.sort((a, b) => a.name.localeCompare(b.name))

  return tree
}

export default function ResourcesPage() {
  const [selectedBranch, setSelectedBranch] = useState<"es" | "data-science" | null>(null)
  const [activeTab, setActiveTab] = useState<"notes" | "pyqs" | "documents">("documents")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [dbResources, setDbResources] = useState<any[]>([])

  // Filters for Notes
  const [selectedStream, setSelectedStream] = useState<"all" | "Data Science" | "Electronics">("all")
  const [selectedLevel, setSelectedLevel] = useState<"all" | "Foundation" | "Diploma" | "Degree">("all")
  const [selectedSubject, setSelectedSubject] = useState("all")

  // Local Explorer states
  const [pyqsDatabase, setPyqsDatabase] = useState<PyqDataMap>({ Foundation: [], Diploma: [] })
  const [localLevel, setLocalLevel] = useState<"Foundation" | "Diploma">("Foundation")
  const [selectedCourse, setSelectedCourse] = useState<FolderItem | null>(null)
  const [currentFolder, setCurrentFolder] = useState<FolderItem | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ name: string; folder: FolderItem | null }>>([])
  const [explorerSearchQuery, setExplorerSearchQuery] = useState("")

  // Handle changing levels (Foundation / Diploma)
  const handleLevelChange = (newLevel: "Foundation" | "Diploma") => {
    setLocalLevel(newLevel)
    setSelectedCourse(null)
    setCurrentFolder(null)
    setBreadcrumbs([])
    setExplorerSearchQuery("")
  }

  // Handle selecting a course
  const handleCourseSelect = (course: FolderItem) => {
    setSelectedCourse(course)
    setCurrentFolder(course)
    setBreadcrumbs([
      { name: localLevel, folder: null },
      { name: course.name, folder: course }
    ])
    setExplorerSearchQuery("")
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
      setSelectedCourse(null)
      setCurrentFolder(null)
      setBreadcrumbs([])
    } else if (target && target.folder) {
      setCurrentFolder(target.folder)
      setBreadcrumbs((prev) => prev.slice(0, index + 1))
    }
    setExplorerSearchQuery("")
  }

  // Go up one level
  const handleGoUp = () => {
    if (breadcrumbs.length <= 2) {
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
    setExplorerSearchQuery("")
  }

  // Recursive search inside explorer
  const getExplorerSearchResults = () => {
    if (!explorerSearchQuery || !selectedCourse) return []
    const results: Array<FileItem> = []
    const search = (items: Array<any>) => {
      for (const item of items) {
        if (item.type === "file") {
          if (item.name.toLowerCase().includes(explorerSearchQuery.toLowerCase())) {
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

  const router = useRouter()
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  useEffect(() => {
    if (isAuthenticated) {
      setExpandedCategory("academic")

      // Fetch backend resources
      const fetchResources = async () => {
        try {
          const res = await fetch(`/api/resources`)
          const contentType = res.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            const json = await res.json()
            if (json.success) {
              setDbResources(json.data)
              setPyqsDatabase(buildFolderTree(json.data))
              setExpandedCategory("latest uploads")
            }
          } else {
            console.error("Failed to fetch resources: Received non-JSON response")
          }
        } catch (error) {
          console.error("Failed to fetch resources:", error)
        }
      }
      fetchResources()
    }
  }, [isAuthenticated])

  // Get available subjects based on selected stream and level
  const allNotes = dbResources
    .filter((r: any) => r.section === "notes")
    .map((r: any) => ({
      name: r.title,
      stream: r.stream || "Data Science",
      level: r.level || "Foundation",
      subject: r.subject || "General",
      type: r.resourceType || "notes",
      url: r.fileId ? `/api/files/${r.fileId._id || r.fileId}` : r.url || "#",
      description: r.description || ""
    }))

  const availableSubjects = Array.from(
    new Set(
      allNotes
        .filter(
          (m) =>
            (selectedStream === "all" || m.stream === selectedStream) &&
            (selectedLevel === "all" || m.level === selectedLevel)
        )
        .map((m) => m.subject)
    )
  ).sort()

  // Filter study materials for Notes & Books
  const filteredMaterials = allNotes.filter((material) => {
    const matchesType = material.type === "notes" || material.type === "books"
    const matchesStream = selectedStream === "all" || material.stream === selectedStream
    const matchesLevel = selectedLevel === "all" || material.level === selectedLevel
    const matchesSubject = selectedSubject === "all" || material.subject === selectedSubject
    const matchesSearch =
      searchQuery === "" ||
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesType && matchesStream && matchesLevel && matchesSubject && matchesSearch
  })

  // Get dynamic documents from MongoDB
  const getMergedDocuments = (): Record<string, any[]> => {
    const merged: Record<string, any[]> = {}
    const dbDocs = dbResources.filter((r: any) => r.section === "documents" || !r.section)
    
    dbDocs.forEach((r: any) => {
      const category = r.subCategory || "latest uploads"
      const name = r.title
      const url = r.fileId ? `/api/files/${r.fileId._id || r.fileId}` : r.url || "#"
      const description = r.description || `${r.type.toUpperCase()} File`

      if (!merged[category]) {
        merged[category] = []
      }
      const exists = merged[category].some((doc: any) => doc.name === name)
      if (!exists) {
        merged[category].push({ name, url, description })
      }
    })

    return merged
  }

  const combinedDocuments = getMergedDocuments()

  // Filter documents for search
  const allDocuments = Object.values(combinedDocuments).flat()
  const filteredDocuments =
    activeTab === "documents"
      ? allDocuments.filter(
        (doc) =>
          searchQuery === "" ||
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : []

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 min-h-screen">
          {/* Background glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
          </div>
          <div className="max-w-2xl w-full text-center relative">
            <div className="glass p-16 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="w-24 h-24 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-serif font-bold text-white mb-6">Resources Access</h1>
              <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
                Please sign in with your IIT Madras account to access exclusive study resources, notes, PYQs, and official documents
              </p>
              <Button
                onClick={() => router.push('/signin')}
                className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-10 py-6 rounded-xl"
              >
                Sign In to Access
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (selectedBranch === null) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 min-h-screen relative">
          {/* Background glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="max-w-4xl w-full text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-6 animate-fade-in">
              <Sparkles size={16} />
              Academic Resources Hub
            </div>
            <h1 className="text-5xl font-serif font-bold text-white mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Select your <span className="text-primary">Program</span>
            </h1>
            <p className="text-white/70 text-lg mb-12 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Choose your branch to access curriculum resources, notes, PYQs, and documents
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto animate-scale-in">
              {/* Electronic Systems Card */}
              <button
                onClick={() => setSelectedBranch("es")}
                className="group relative glass p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)] bg-black/20 text-center flex flex-col items-center cursor-pointer w-full"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors font-serif">
                  Electronic Systems (ES)
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Explore academic resources, lecture notes, lab manuals, and papers for the Electronic Systems branch.
                </p>
                <span className="text-primary font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1 mt-auto">
                  Explore Branch &rarr;
                </span>
              </button>

              {/* Data Science Card */}
              <button
                onClick={() => setSelectedBranch("data-science")}
                className="group relative glass p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)] bg-black/20 text-center flex flex-col items-center cursor-pointer w-full"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors font-serif">
                  Data Science (DS)
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Access notes, official textbooks, PYQs, and reference documents curated for the Data Science & Applications program.
                </p>
                <span className="text-primary font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1 mt-auto">
                  Explore Branch &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (selectedBranch === "es") {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 min-h-screen relative">
          {/* Background glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-2xl w-full text-center relative z-10">
            {/* Back to Branch Selector Button */}
            <button
              onClick={() => setSelectedBranch(null)}
              className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Branch Selector
            </button>

            <div className="glass p-12 sm:p-16 rounded-3xl border-2 border-primary/20 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-black/40 backdrop-blur-md relative overflow-hidden group">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/40 rounded-br-3xl"></div>

              <div className="w-24 h-24 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Electronic Systems <span className="text-primary italic">Coming Soon</span>
              </h1>
              
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                We are currently curating, sorting, and uploading premium study resources, notes, and manuals for the Electronic Systems (ES) branch.
              </p>

              <div className="inline-flex gap-2 items-center text-primary font-bold">
                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping"></span>
                <span>Curating Resources in Progress...</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Back to Branch Selector */}
        <button
          onClick={() => setSelectedBranch(null)}
          className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Change Program / Branch
        </button>
          {/* Background glow effects */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-4 animate-fade-in">
              <Sparkles size={16} />
              Academic Resources Hub
            </div>
            <h1 className="text-6xl font-serif font-bold text-white mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Study <span className="text-primary">Resources</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Access premium course materials, official documents, and study resources
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="max-w-4xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="glass p-2 rounded-2xl border border-primary/20 flex gap-2">
              {[
                { id: "notes", label: "Notes", icon: BookOpen },
                { id: "pyqs", label: "PYQs", icon: FileCheck },
                { id: "documents", label: "Documents", icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-primary text-black shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-10 relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-primary transition" size={22} />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'documents' ? 'documents' : 'materials'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-black/30 backdrop-blur-xl border border-primary/20 rounded-2xl text-white text-lg placeholder:text-white/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all"
              />
            </div>
          </div>

          {/* Filters for Notes */}
          {activeTab === "notes" && (
            <div className="max-w-6xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="glass p-6 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="text-primary" size={18} />
                  <span className="text-white font-semibold">Filter Resources</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Stream Dropdown */}
                  <div className="relative group">
                    <label className="text-white/60 text-sm mb-2 block">Stream</label>
                    <select
                      value={selectedStream}
                      onChange={(e) => {
                        setSelectedStream(e.target.value as any)
                        setSelectedSubject("all")
                      }}
                      className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all hover:border-primary/40"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23d4af37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                    >
                      <option value="all" className="bg-black">All Streams</option>
                      <option value="Data Science" className="bg-black">Data Science</option>
                      <option value="Electronics" className="bg-black">Electronics</option>
                    </select>
                  </div>

                  {/* Level Dropdown */}
                  <div className="relative">
                    <label className="text-white/60 text-sm mb-2 block">Level</label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => {
                        setSelectedLevel(e.target.value as any)
                        setSelectedSubject("all")
                      }}
                      className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all hover:border-primary/40"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23d4af37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                    >
                      <option value="all" className="bg-black">All Levels</option>
                      <option value="Foundation" className="bg-black">Foundation</option>
                      <option value="Diploma" className="bg-black">Diploma</option>
                      <option value="Degree" className="bg-black">Degree</option>
                    </select>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="relative">
                    <label className="text-white/60 text-sm mb-2 block">Subject</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all hover:border-primary/40"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23d4af37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                    >
                      <option value="all" className="bg-black">All Subjects</option>
                      {availableSubjects.map(subject => (
                        <option key={subject} value={subject} className="bg-black">{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedStream("all")
                    setSelectedLevel("all")
                    setSelectedSubject("all")
                  }}
                  className="mt-4 px-6 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl text-primary font-medium transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}



          {/* Content Area */}
          <div className="max-w-6xl mx-auto">
            {activeTab === "documents" ? (
              <div className="space-y-8 animate-fade-in">
                {Object.entries(combinedDocuments).map(([category, docs], idx) => (
                  <div key={category} className="animate-fade-in" style={{ animationDelay: `${0.6 + idx * 0.1}s` }}>
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                      className="w-full flex items-center justify-between p-5 glass rounded-2xl border border-primary/20 hover:border-primary/40 transition-all mb-4 group"
                    >
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3 group-hover:text-primary transition">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                        <span className="text-white/40 text-base font-normal">({docs.length})</span>
                      </h2>
                      <ChevronDown
                        className={`text-primary transition-transform duration-300 ${expandedCategory === category ? 'rotate-180' : ''}`}
                        size={24}
                      />
                    </button>

                    <div className={`grid md:grid-cols-2 gap-4 transition-all duration-500 ${expandedCategory === category ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {docs.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group glass p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(212,175,55,0.2)] animate-scale-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex gap-4">
                            <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                              <FileText className="text-primary" size={24} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold mb-2 group-hover:text-primary transition flex items-center justify-between">
                                {doc.name}
                                <ExternalLink className="text-white/30 group-hover:text-primary transition opacity-0 group-hover:opacity-100" size={18} />
                              </h3>
                              <p className="text-white/50 text-sm">{doc.description}</p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : activeTab === "pyqs" ? (
              <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
                {/* Level Tab Selection Switcher */}
                <div className="flex justify-center">
                  <div className="glass p-1.5 rounded-xl border border-primary/20 inline-flex gap-2 w-full max-w-md shadow-inner">
                    <button
                      onClick={() => handleLevelChange("Foundation")}
                      className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                        localLevel === "Foundation"
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
                        localLevel === "Diploma"
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
                      Available {localLevel} Courses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(pyqsDatabase[localLevel] || []).map((course, idx) => (
                        <button
                          key={course.name}
                          onClick={() => handleCourseSelect(course)}
                          className="group text-left p-6 rounded-2xl glass-dark border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] relative overflow-hidden animate-scale-in"
                          style={{ animationDelay: `${idx * 0.04}s` }}
                        >
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
                                {localLevel} Level
                              </p>
                            </div>
                          </div>

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
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-primary/20 pb-6">
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

                      <div className="relative w-full md:w-72">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                          <Search className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          value={explorerSearchQuery}
                          onChange={(e) => setExplorerSearchQuery(e.target.value)}
                          placeholder={`Search ${selectedCourse.name} files...`}
                          className="w-full pl-9 pr-8 py-2.5 rounded-lg bg-black/40 border border-primary/20 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all shadow-inner"
                        />
                        {explorerSearchQuery && (
                          <button
                            onClick={() => setExplorerSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {explorerSearchQuery ? (
                        getExplorerSearchResults().length > 0 ? (
                          getExplorerSearchResults().map((item) => (
                            <div
                              key={item.path}
                              className="flex items-center justify-between p-4 rounded-xl bg-black/35 border border-primary/10 hover:border-primary/40 hover:bg-black/50 transition-all duration-300 group"
                            >
                              <a
                                href={item.url}
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
                                href={item.url}
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
                            <p className="text-white/40 text-lg mb-2">No documents found matching "{explorerSearchQuery}"</p>
                            <button
                              onClick={() => setExplorerSearchQuery("")}
                              className="text-primary hover:underline text-sm font-semibold"
                            >
                              Clear Search
                            </button>
                          </div>
                        )
                      ) : (
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

                              {files.map((file) => (
                                <div
                                  key={file.name}
                                  className="flex items-center justify-between p-4 rounded-xl bg-black/35 border border-primary/10 hover:border-primary/40 hover:bg-black/50 transition-all duration-300 group"
                                >
                                  <a
                                    href={file.url}
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
                                    href={file.url}
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
            ) : (
              <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMaterials.map((material, idx) => (
                    <a
                      key={idx}
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group glass p-6 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] relative overflow-hidden animate-scale-in"
                      style={{ animationDelay: `${idx * 0.04}s` }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                      
                      <div className="relative z-10 flex gap-4">
                        <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                          <BookOpen className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-primary/60 text-[10px] font-black uppercase tracking-widest block mb-1">
                            {material.subject}
                          </span>
                          <h3 className="text-white font-bold mb-2 group-hover:text-primary transition-colors duration-300 flex items-center justify-between gap-2 text-lg">
                            <span className="truncate">{material.name}</span>
                            <ExternalLink className="text-white/30 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" size={16} />
                          </h3>
                          <p className="text-white/50 text-xs line-clamp-2 leading-relaxed">
                            {material.description || `${material.stream} • ${material.level} Level Resource`}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {filteredMaterials.length === 0 && (
                  <div className="text-center py-20 bg-black/20 border border-dashed border-primary/10 rounded-2xl">
                    <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40 text-lg">No study materials found matching selected filters.</p>
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
