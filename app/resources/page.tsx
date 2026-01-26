"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Search, FileText, Book, ClipboardList, ExternalLink, Filter, BookOpen, GraduationCap, FileCheck, Sparkles, ChevronDown } from "lucide-react"

// Official Documents - Categorized
const officialDocuments = {
  academic: [
    { name: "2026 Grading Document", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vSUvKzH7yIXNVwUgRYSIT8M0x1jhFSkslEtj9UPo3dtWI_sJ38Hh_PzbBygpF0vIOo8K7lTy-uYkqdu/pub?urp=gmail_link", description: "Official grading policy and criteria", icon: "📊" },
    { name: "Score Checker", url: "https://score-checker-379619009600.asia-south1.run.app/course_wise", description: "Check your course scores online", icon: "🎯" },
    { name: "Course Syllabus", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vSWW4TMd2ujKYOeSay5iCIyTGLtJgM1KWC-Ernu_JdhugLtB0dXV9i966Z-ZaPZ9qAAI1_QtWa3o3br/pub#h.64f8davxbp1d", description: "Complete course syllabus details", icon: "📚" },
    { name: "Course Playlist", url: "https://discourse.onlinedegree.iitm.ac.in/t/course-yt-channel-list-data-science-and-applications/115619", description: "YouTube course video playlists", icon: "📺" },
  ],
  policies: [
    { name: "Academic Malpractice Policy", url: "https://docs.google.com/document/d/e/2PACX-1vTt6ndMAI1-Y7Okm3HXmv0OFhFliUJPzkrUkQuX4InovMYewy_CWmFzmE4mUOAl_TjWlSrZNYWUOnG7/pub", description: "Academic integrity guidelines", icon: "⚖️" },
    { name: "Non-Academic Malpractice Policy", url: "https://docs.google.com/document/d/e/2PACX-1vS3kG688sVzBil9uEFa9mXrnpuMAqE0LU1FpH1-TMDCHZF0XjC1265GmhVePdYvrc0_5qyq8OXwIZUb/pub", description: "Code of conduct and discipline", icon: "📋" },
  ],
  programs: [
    { name: "Foundation Announcement", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vT3tXeBI5EnNRbfuJL595x44HL47l-UIVFhQ8A0u5pWZWwuQZf6AovUgpbfOL4FEdgoxB86R83E_b3g/pub#h.srdh0vy92h9g", description: "Foundation level program details", icon: "🎓" },
    { name: "Diploma Announcement", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vS5AqaruazbgknMp9pPDXO1YVDFliSpsF0oZdEPp_vMGaX9pPTm_Jpid2OvecYr6AYo1cleixIlzoxq/pub#h.l8xwua84njlp", description: "Diploma level program details", icon: "📜" },
    { name: "Degree Announcement", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vQh79CJlzQiP0KXhVR6Rp1vwMOJA-OXY1hrOjvWk6ypBDYFVbsZOzycc4OHMA7xEK5ezjDEDD0B44QD/pub#h.krgvmoow3xb", description: "Degree level program details", icon: "🎖️" },
    { name: "M.Tech Pathway", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vRrtiiHlurfHtFnJnDwtNZ0NHAci8PQ7pHsiX3V3SZKmbSmALDk4whCO5La6efs4MSmBLVTH2ZfGJNL/pub", description: "Master's program pathway options", icon: "🚀" },
  ],
  transfers: [
    { name: "NPTEL Credit Transfer", url: "https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vSJXV0JECyoQvgWvBlVxO13G0KRm5a1qNCRBa7rAw8GDY4e0cfm1KiVCwIgs_ed80ObtzQ1rfx_JWIR/pubhtml?gid=399341609&single=true", description: "Free elective credit transfer", icon: "🔄" },
    { name: "HS NPTEL Transfer", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vRrtiiHlurfHtFnJnDwtNZ0NHAci8PQ7pHsiX3V3SZKmbSmALDk4whCO5La6efs4MSmBLVTH2ZfGJNL/pub", description: "Humanities credit transfer", icon: "🔄" },
    { name: "SCT Information", url: "https://docs.google.com/document/d/e/2PACX-1vS4Hhh4MsKD2WL8_D26Vw2WJKw0CBtPihZyKrnEM_kefRXm_O75GqTcJA6lR0X_xCiVL5gUi5y6_bjw/pub", description: "Special credit transfer details", icon: "📑" },
    { name: "SCT Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSfgPEfiNK0bTqXj8F5g2nRFJaugfm7Q6Ykkf6lNy0UsnvO7Jw/closedform", description: "Apply for credit transfer", icon: "📝" },
  ],
  opportunities: [
    { name: "Course Mentorship", url: "https://docs.google.com/document/d/1-KokspC_tpcZUkr_A_qepK6bp9j-1pQTskI9WmAhc6I/edit?tab=t.0#heading=h.8maoib1anf", description: "Become a course mentor", icon: "👨‍🏫" },
    { name: "TAship Information", url: "https://docs.google.com/document/d/1T7BJwyFs6otHAWiSXFQ8SvhpYRlm9PPOGZmtKvj_C4U/edit?tab=t.0#heading=h.cxy8jmc2wo04", description: "Teaching assistant positions", icon: "🎯" },
  ],
  resources: [
    { name: "Document Archive", url: "https://study.iitm.ac.in/ds/archive.html", description: "All official documents archive", icon: "🗄️" },
    { name: "Official Git Organization", url: "https://github.com/bsc-iitm", description: "GitHub organization repository", icon: "💻" },
    { name: "Official WhatsApp", url: "https://api.whatsapp.com/message/IVROM2UN7XIJL1?autoload=1&app_absent=0", description: "Connect via WhatsApp", icon: "💬" },
    { name: "Document Application Process", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vQnn2cFan5BqTTAByCoqtue-0XSmFXQPT91bADDL_i33tHMh8C0ZJepvFBwze4E5zJbGiBMdQa59VeT/pub", description: "How to apply for documents", icon: "📄" },
  ],
}

// Study Materials (placeholder structure - you can add actual Google Drive links)
const studyMaterials = [
  // Data Science - Foundation
  { name: "Python Notes", stream: "Data Science", level: "Foundation", subject: "Python", type: "notes", url: "#" },
  { name: "Python PYQs", stream: "Data Science", level: "Foundation", subject: "Python", type: "pyqs", url: "#" },
  { name: "Statistics Notes", stream: "Data Science", level: "Foundation", subject: "Statistics", type: "notes", url: "#" },
  { name: "Maths Notes", stream: "Data Science", level: "Foundation", subject: "Mathematics", type: "notes", url: "#" },
  { name: "CT Notes", stream: "Data Science", level: "Foundation", subject: "Computational Thinking", type: "notes", url: "#" },
  { name: "English 1 Notes", stream: "Data Science", level: "Foundation", subject: "English 1", type: "notes", url: "#" },
  { name: "English 2 Notes", stream: "Data Science", level: "Foundation", subject: "English 2", type: "notes", url: "#" },
  
  // Data Science - Diploma
  { name: "Java Notes", stream: "Data Science", level: "Diploma", subject: "Java", type: "notes", url: "#" },
  { name: "DBMS Notes", stream: "Data Science", level: "Diploma", subject: "DBMS", type: "notes", url: "#" },
  { name: "AppDev 1 Notes", stream: "Data Science", level: "Diploma", subject: "AppDev 1", type: "notes", url: "#" },
  { name: "AppDev 2 Notes", stream: "Data Science", level: "Diploma", subject: "AppDev 2", type: "notes", url: "#" },
  { name: "PDSA Notes", stream: "Data Science", level: "Diploma", subject: "PDSA", type: "notes", url: "#" },
  { name: "Maths 2 Notes", stream: "Data Science", level: "Diploma", subject: "Mathematics 2", type: "notes", url: "#" },
  { name: "Stats 2 Notes", stream: "Data Science", level: "Diploma", subject: "Statistics 2", type: "notes", url: "#" },
  
  // Data Science - Degree
  { name: "Machine Learning Notes", stream: "Data Science", level: "Degree", subject: "Machine Learning", type: "notes", url: "#" },
  { name: "Business Data Management Notes", stream: "Data Science", level: "Degree", subject: "BDM", type: "notes", url: "#" },
  { name: "Business Analytics Notes", stream: "Data Science", level: "Degree", subject: "BA", type: "notes", url: "#" },
  { name: "Tools in Data Science Notes", stream: "Data Science", level: "Degree", subject: "TDS", type: "notes", url: "#" },
  { name: "System Commands Notes", stream: "Data Science", level: "Degree", subject: "System Commands", type: "notes", url: "#" },
  
  // Electronics - Foundation
  { name: "Python Notes", stream: "Electronics", level: "Foundation", subject: "Python", type: "notes", url: "#" },
  { name: "Statistics Notes", stream: "Electronics", level: "Foundation", subject: "Statistics", type: "notes", url: "#" },
  { name: "Maths Notes", stream: "Electronics", level: "Foundation", subject: "Mathematics", type: "notes", url: "#" },
  { name: "CT Notes", stream: "Electronics", level: "Foundation", subject: "Computational Thinking", type: "notes", url: "#" },
  
  // Electronics - Diploma
  { name: "Digital Circuits Notes", stream: "Electronics", level: "Diploma", subject: "Digital Circuits", type: "notes", url: "#" },
  { name: "Analog Circuits Notes", stream: "Electronics", level: "Diploma", subject: "Analog Circuits", type: "notes", url: "#" },
  
  // Add some books
  { name: "Python Programming Book", stream: "Data Science", level: "Foundation", subject: "Python", type: "books", url: "#" },
  { name: "Data Structures Book", stream: "Data Science", level: "Diploma", subject: "PDSA", type: "books", url: "#" },
]

export default function ResourcesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<"notes" | "pyqs" | "books" | "documents">("documents")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStream, setSelectedStream] = useState<"all" | "Data Science" | "Electronics">("all")
  const [selectedLevel, setSelectedLevel] = useState<"all" | "Foundation" | "Diploma" | "Degree">("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      // Expand first category by default for documents
      setExpandedCategory("academic")
    }
  }, [])

  // Get available subjects based on selected stream and level
  const availableSubjects = Array.from(
    new Set(
      studyMaterials
        .filter(
          (m) =>
            (selectedStream === "all" || m.stream === selectedStream) &&
            (selectedLevel === "all" || m.level === selectedLevel)
        )
        .map((m) => m.subject)
    )
  ).sort()

  // Filter study materials
  const filteredMaterials = studyMaterials.filter((material) => {
    const matchesType = material.type === activeTab
    const matchesStream = selectedStream === "all" || material.stream === selectedStream
    const matchesLevel = selectedLevel === "all" || material.level === selectedLevel
    const matchesSubject = selectedSubject === "all" || material.subject === selectedSubject
    const matchesSearch =
      searchQuery === "" ||
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesType && matchesStream && matchesLevel && matchesSubject && matchesSearch
  })

  // Filter documents for search
  const allDocuments = Object.values(officialDocuments).flat()
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

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
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
              { id: "books", label: "Books", icon: Book },
              { id: "documents", label: "Documents", icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
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

        {/* Filters for Notes/PYQs/Books */}
        {activeTab !== "documents" && (
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
              {Object.entries(officialDocuments).map(([category, docs], idx) => (
                <div key={category} className="animate-fade-in" style={{ animationDelay: `${0.6 + idx * 0.1}s` }}>
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                    className="w-full flex items-center justify-between p-5 glass rounded-2xl border border-primary/20 hover:border-primary/40 transition-all mb-4 group"
                  >
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 group-hover:text-primary transition">
                      <span className="text-3xl">{docs[0].icon}</span>
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
                          <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all text-2xl">
                            {doc.icon}
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
          ) : (
            <div className="grid md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material, index) => (
                  <a
                    key={index}
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass p-6 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(212,175,55,0.2)] animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all">
                        {activeTab === "notes" && <BookOpen className="text-primary" size={24} />}
                        {activeTab === "pyqs" && <FileCheck className="text-primary" size={24} />}
                        {activeTab === "books" && <Book className="text-primary" size={24} />}
                      </div>
                      <ExternalLink className="text-white/30 group-hover:text-primary transition opacity-0 group-hover:opacity-100" size={18} />
                    </div>
                    
                    <h3 className="text-white font-bold mb-3 group-hover:text-primary transition text-lg">
                      {material.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-lg text-primary text-xs font-semibold">
                        {material.stream}
                      </span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-semibold">
                        {material.level}
                      </span>
                    </div>
                    
                    <p className="text-white/60 text-sm font-medium">{material.subject}</p>
                  </a>
                ))
              ) : (
                <div className="col-span-3 glass p-16 rounded-2xl border border-primary/20 text-center">
                  <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ClipboardList className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">No {activeTab} found</h3>
                  <p className="text-white/60">Try adjusting your filters or search query</p>
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
