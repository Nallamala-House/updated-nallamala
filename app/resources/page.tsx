"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Search, FileText, Book, ClipboardList, ExternalLink, Filter, BookOpen, GraduationCap, FileCheck, Sparkles, ChevronDown } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

// Type definitions
type SubjectItem = {
  subject: string
  url: string
}

type ExamTypes = {
  "Quiz 1": SubjectItem[]
  "Quiz 2": SubjectItem[]
  "End Term": SubjectItem[]
  "All Exams"?: SubjectItem[]
}

type Terms = {
  "Term 1": ExamTypes
  "Term 2": ExamTypes
  "Term 3": ExamTypes
  "All Terms"?: ExamTypes
}

type YearData = {
  [year: string]: Terms
}

type PYQsDataType = {
  [streamLevel: string]: YearData
}

// Official Documents - Categorized
const officialDocuments = {
  academic: [
    { name: "2026 Grading Document", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vSUvKzH7yIXNVwUgRYSIT8M0x1jhFSkslEtj9UPo3dtWI_sJ38Hh_PzbBygpF0vIOo8K7lTy-uYkqdu/pub?urp=gmail_link", description: "Official grading policy and criteria" },
    { name: "Score Checker", url: "https://score-checker-379619009600.asia-south1.run.app/course_wise", description: "Check your course scores online" },
    { name: "Course Syllabus", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vSWW4TMd2ujKYOeSay5iCIyTGLtJgM1KWC-Ernu_JdhugLtB0dXV9i966Z-ZaPZ9qAAI1_QtWa3o3br/pub#h.64f8davxbp1d", description: "Complete course syllabus details" },
    { name: "Course Playlist", url: "https://discourse.onlinedegree.iitm.ac.in/t/course-yt-channel-list-data-science-and-applications/115619", description: "YouTube course video playlists" },
  ],
  policies: [
    { name: "Academic Malpractice Policy", url: "https://docs.google.com/document/d/e/2PACX-1vTt6ndMAI1-Y7Okm3HXmv0OFhFliUJPzkrUkQuX4InovMYewy_CWmFzmE4mUOAl_TjWlSrZNYWUOnG7/pub", description: "Academic integrity guidelines" },
    { name: "Non-Academic Malpractice Policy", url: "https://docs.google.com/document/d/e/2PACX-1vS3kG688sVzBil9uEFa9mXrnpuMAqE0LU1FpH1-TMDCHZF0XjC1265GmhVePdYvrc0_5qyq8OXwIZUb/pub", description: "Code of conduct and discipline" },
  ],
  programs: [
    { name: "Foundation Announcement", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vT3tXeBI5EnNRbfuJL595x44HL47l-UIVFhQ8A0u5pWZWwuQZf6AovUgpbfOL4FEdgoxB86R83E_b3g/pub#h.srdh0vy92h9g", description: "Foundation level program details" },
    { name: "Diploma Announcement", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vS5AqaruazbgknMp9pPDXO1YVDFliSpsF0oZdEPp_vMGaX9pPTm_Jpid2OvecYr6AovUgpbfOL4FEdgoxB86R83E_b3g/pub#h.l8xwua84njlp", description: "Diploma level program details" },
    { name: "Degree Announcement", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vQh79CJlzQiP0KXhVR6Rp1vwMOJA-OXY1hrOjvWk6ypBDYFVbsZOzycc4OHMA7xEK5ezjDEDD0B44QD/pub#h.krgvmoow3xb", description: "Degree level program details" },
    { name: "M.Tech Pathway", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vRrtiiHlurfHtFnJnDwtNZ0NHAci8PQ7pHsiX3V3SZKmbSmALDk4whCO5La6efs4MSmBLVTH2ZfGJNL/pub", description: "Master's program pathway options" },
  ],
  transfers: [
    { name: "NPTEL Credit Transfer", url: "https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vSJXV0JECyoQvgWvBlVxO13G0KRm5a1qNCRBa7rAw8GDY4e0cfm1KiVCwIgs_ed80ObtzQ1rfx_JWIR/pubhtml?gid=399341609&single=true", description: "Free elective credit transfer" },
    { name: "HS NPTEL Transfer", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vRrtiiHlurfHtFnJnDwtNZ0NHAci8PQ7pHsiX3V3SZKmbSmALDk4whCO5La6efs4MSmBLVTH2ZfGJNL/pub", description: "Humanities credit transfer" },
    { name: "SCT Information", url: "https://docs.google.com/document/d/e/2PACX-1vS4Hhh4MsKD2WL8_D26Vw2WJKw0CBtPihZyKrnEM_kefRXm_O75GqTcJA6lR0X_xCiVL5gUi5y6_bjw/pub", description: "Special credit transfer details" },
    { name: "SCT Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSfgPEfiNK0bTqXj8F5g2nRFJaugfm7Q6Ykkf6lNy0UsnvO7Jw/closedform", description: "Apply for credit transfer" },
  ],
  opportunities: [
    { name: "Course Mentorship", url: "https://docs.google.com/document/d/1-KokspC_tpcZUkr_A_qepK6bp9j-1pQTskI9WmAhc6I/edit?tab=t.0#heading=h.8maoib1anf", description: "Become a course mentor" },
    { name: "TAship Information", url: "https://docs.google.com/document/d/1T7BJwyFs6otHAWiSXFQ8SvhpYRlm9PPOGZmtKvj_C4U/edit?tab=t.0#heading=h.cxy8jmc2wo04", description: "Teaching assistant positions" },
  ],
  resources: [
    { name: "Document Archive", url: "https://study.iitm.ac.in/ds/archive.html", description: "All official documents archive" },
    { name: "Official Git Organization", url: "https://github.com/bsc-iitm", description: "GitHub organization repository" },
    { name: "Official WhatsApp", url: "https://api.whatsapp.com/message/IVROM2UN7XIJL1?autoload=1&app_absent=0", description: "Connect via WhatsApp" },
    { name: "Document Application Process", url: "https://docs.google.com/document/u/1/d/e/2PACX-1vQnn2cFan5BqTTAByCoqtue-0XSmFXQPT91bADDL_i33tHMh8C0ZJepvFBwze4E5zJbGiBMdQa59VeT/pub", description: "How to apply for documents" },
  ],
}

// PYQs Structure: Stream/Level → Year → Term → Exam Type → Subjects
const pyqsData: PYQsDataType = {
  "Data Science - Foundation": {
    "All Years": {
      "All Terms": {
        "All Exams": [
          { subject: "Mathematics 1", url: "https://drive.google.com/drive/u/4/folders/1ZJXWfY8EmKjkhfSnEJmH7FiU9DvnEKI0" },
          { subject: "Mathematics 2", url: "https://drive.google.com/drive/u/4/folders/1yZbNvo3kEHphcKkevjDrYCypFqmu2PUN" },
          { subject: "Statistics 1", url: "https://drive.google.com/drive/u/4/folders/1OmBV-wD1nSxRKX1o2XdYzk2loVHbyf-B" },
          { subject: "Statistics 2", url: "https://drive.google.com/drive/u/4/folders/1WXB2z3JkGO2DPiNOx55Me9DA9bUv2cp5" },
          { subject: "English 1", url: "https://drive.google.com/drive/u/4/folders/1CG60t1EWSAizNFexbYLMAx66BBixIphk" },
          { subject: "English 2", url: "https://drive.google.com/drive/u/4/folders/1V-6aHRVxuLgQbCeQhLzw5unCkgnEaYkT" },
          { subject: "Python Programming", url: "https://drive.google.com/drive/u/4/folders/1QLLTJJ3pfCaWaBS_dAlkOBZfie46J_fO" },
          { subject: "Computational Thinking", url: "https://drive.google.com/drive/u/4/folders/1ZvRQBptAVmYe6CHKAwLTFn49LhAua9dD" },
        ],
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      },
      "Term 1": {
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      },
      "Term 2": {
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      },
      "Term 3": {
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      }
    }
  },
  "Data Science - Diploma": {
    "All Years": {
      "All Terms": {
        "All Exams": [
          { subject: "Business Analytics", url: "https://drive.google.com/drive/u/4/folders/18-loHm9slKTamKSwQscUhisgBJykn5Qr" },
          { subject: "Business Data Management", url: "https://drive.google.com/drive/u/4/folders/1GfciRRUs7GhDnvbboyCCQW0Sq41As_JC" },
          { subject: "DBMS", url: "https://drive.google.com/drive/u/4/folders/1paQBp9oaP0mNrvH-elbPOTKyxup18b9Q" },
          { subject: "Deep Learning - GenAI", url: "https://drive.google.com/drive/u/4/folders/1GHS2gE9lEn6HTKxMtnAfNj-1eWvUK0kC" },
          { subject: "Java Programming", url: "https://drive.google.com/drive/u/4/folders/1zfV9JEsWONBULzG2dsHieuz2oAwdX9jz" },
          { subject: "MAD-1", url: "https://drive.google.com/drive/u/4/folders/1BaqVsrc3c16Pi9bzDtxXk_i4X2jeblQU" },
          { subject: "MAD-2", url: "https://drive.google.com/drive/u/4/folders/11ZbagqRNZCuSd38cYwSy6pYAYy0RSdGK" },
          { subject: "Machine Learning Foundations", url: "https://drive.google.com/drive/u/4/folders/1PSnu-AOGCtQcQSnRQJguVwl3mlpVnNGE" },
          { subject: "Machine Learning Practice", url: "https://drive.google.com/drive/u/4/folders/1BnE2LKCxZoFxV4iRJB3QRSWBK9FnFOFl" },
          { subject: "Machine Learning Techniques", url: "https://drive.google.com/drive/u/4/folders/1eqiYI1EKu4I6SGZDZADrHNOleGm5pQWP" },
          { subject: "PDSA", url: "https://drive.google.com/drive/u/4/folders/1XO3PFSn6kgkoS9zlg_JxxtsdNqsQ9dXp" },
          { subject: "System Commands", url: "https://drive.google.com/drive/u/4/folders/1tRbkd_xA2U6qfTi3tokBQK-1af4EQpzn" },
          { subject: "Tools in Data Science", url: "https://drive.google.com/drive/u/4/folders/14TtF6HAH1ctkySwQe6lK13jm3ftIroNe" },
        ],
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      },
      "Term 1": {
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      },
      "Term 2": {
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      },
      "Term 3": {
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      }
    }
  },
  "Data Science - Degree": {
    // Add your Degree data here
  },
  "Electronics - Degree": {
    "2025": {
      "Term 3": {
        "Quiz 1": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1VCCKghozA487u39CQ9ojTkcuTNQ2rHhs" },
        ],
        "Quiz 2": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1qMX6s2mOAHuSygqSNpe55Gs5YpliRqQ7" },
        ],
        "End Term": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1OTIOpzmAe9O5Q4dFDcHN5qXSfzFNgtoE" },
        ]
      },
      "Term 2": {
        "Quiz 1": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1vrx9lKNHny1KN-VsgGh5K08pqCOusbwn" },
        ],
        "Quiz 2": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1a6Hov44hZMsx__BIoDgOB4zffve2BkuN" },
        ],
        "End Term": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1TN6WLSpq4t3JHK9qs7iivvyN0VZ5DUAw" },
        ]
      },
      "Term 1": {
        "Quiz 1": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1j0Q78VaIe58WHYAKSBMcYSokpw_yarGV" },
        ],
        "Quiz 2": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1qwgWjgGL1Ih4gbreB5nqnFFFu0vqHISa" },
        ],
        "End Term": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1vesFi_eGGF7E6yyrcQeUdu5a4ovY2Oyn" },
        ]
      }
    },
    "2024": {
      "Term 3": {
        "Quiz 1": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/16f6lSZONphR-oue3rMmZpFGp07k0oElp" },
        ],
        "Quiz 2": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/13WuRMBOaomZjnJy_7FvyH2_ejVCncKlp" },
        ],
        "End Term": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1w5k7v3cbb5sI3bnq3xkiV7b9K4vchqei" },
        ]
      },
      "Term 2": {
        "Quiz 1": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1Hp6hohfWKecS1KoCdBIWtoqiclD1TaQh" },
        ],
        "Quiz 2": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/18nnVkdKw7_zdr1DupRBq9nHP6tusTp63" },
        ],
        "End Term": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1XdK9v72_yc2Q5y1BqcuI-VOgNgqnF5TB" },
        ]
      },
      "Term 1": {
        "Quiz 1": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1K7IblhxVMSDxJ0oQMMGQlF65jPzwQd6g" },
        ],
        "Quiz 2": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1MDWnEOtmLU5QnjsfSWpEBc5i9C9d1oPe" },
        ],
        "End Term": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1ZD3U_CZLMllUUVSCZCnhT0IoOn00T7Pq" },
        ]
      }
    },
    "2023": {
      "Term 3": {
        "Quiz 1": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1rr3fXFjm8zjexTzpyTljkR2LawUqTO1x" },
        ],
        "Quiz 2": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1rH5h8lCe6E2Y99isyoJZCRfUNmTJFZ5d" },
        ],
        "End Term": [
          { subject: "All Subjects", url: "https://drive.google.com/drive/folders/1QMVzteWgSd5021wfo1XN00BsUuMUcWpy" },
        ]
      },
      "Term 2": {
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      },
      "Term 1": {
        "Quiz 1": [],
        "Quiz 2": [],
        "End Term": []
      }
    }
  }
}

// Study Materials (Notes and Books)
const studyMaterials = [
  // Data Science - Foundation
  { name: "Python Notes", stream: "Data Science", level: "Foundation", subject: "Python", type: "notes", url: "#" },
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
  const [activeTab, setActiveTab] = useState<"notes" | "pyqs" | "documents">("documents")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filters for Notes
  const [selectedStream, setSelectedStream] = useState<"all" | "Data Science" | "Electronics">("all")
  const [selectedLevel, setSelectedLevel] = useState<"all" | "Foundation" | "Diploma" | "Degree">("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  
  // Filters for PYQs
  const [selectedPyqStream, setSelectedPyqStream] = useState<string>("Data Science - Foundation")
  const [selectedYear, setSelectedYear] = useState<string>("All Years")
  const [selectedTerm, setSelectedTerm] = useState<string>("All Terms")
  const [selectedExamType, setSelectedExamType] = useState<string>("All Exams")
  
  const router = useRouter()

useEffect(() => {
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      setIsAuthenticated(true)
      setExpandedCategory("academic")
    } else {
      setIsAuthenticated(false)
    }
  }

  checkSession()
}, [])

  // useEffect(() => {
  //   const authStatus = localStorage.getItem("isAuthenticated")
  //   if (authStatus === "true") {
  //     setIsAuthenticated(true)
  //     // Expand first category by default for documents
  //     setExpandedCategory("academic")
  //   }
  // }, [])

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

  // Filter study materials for Notes & Books
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

  // Get PYQs data based on selected filters
  const getPYQsData = (): SubjectItem[] => {
    if (!pyqsData[selectedPyqStream]) return []
    if (!pyqsData[selectedPyqStream][selectedYear]) return []
    const termData = pyqsData[selectedPyqStream][selectedYear][selectedTerm as keyof Terms]
    if (!termData) return []
    const subjects = termData[selectedExamType as keyof ExamTypes] || []
    
    // Apply search filter
    if (searchQuery) {
      return subjects.filter((item: SubjectItem) => 
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return subjects
  }

  const filteredPYQs = getPYQsData()

  // Get available options for dropdowns
  const availableStreamLevels = Object.keys(pyqsData)
  const availableYears = selectedPyqStream && pyqsData[selectedPyqStream]
    ? Object.keys(pyqsData[selectedPyqStream]).sort().reverse()
    : []
  const availableTerms = selectedPyqStream && selectedYear && pyqsData[selectedPyqStream]?.[selectedYear] 
    ? Object.keys(pyqsData[selectedPyqStream][selectedYear]) 
    : []
  const availableExamTypes = selectedPyqStream && selectedYear && selectedTerm && pyqsData[selectedPyqStream]?.[selectedYear]?.[selectedTerm as keyof Terms]
    ? Object.keys(pyqsData[selectedPyqStream][selectedYear][selectedTerm as keyof Terms] || {})
    : []

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

        {/* Filters for PYQs */}
        {activeTab === "pyqs" && (
          <div className="max-w-6xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="glass p-6 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="text-primary" size={18} />
                <span className="text-white font-semibold">Filter PYQs</span>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                {/* Stream/Level Dropdown */}
                <div className="relative group">
                  <label className="text-white/60 text-sm mb-2 block">Program</label>
                  <select
                    value={selectedPyqStream}
                    onChange={(e) => {
                      const newStream = e.target.value
                      setSelectedPyqStream(newStream)
                      
                      // Set defaults based on stream
                      if (newStream === "Data Science - Foundation" || newStream === "Data Science - Diploma" || newStream === "Data Science - Degree") {
                        setSelectedYear("All Years")
                        setSelectedTerm("All Terms")
                        setSelectedExamType("All Exams")
                      } else if (newStream === "Electronics - Degree") {
                        setSelectedYear("2025")
                        setSelectedTerm("Term 3")
                        setSelectedExamType("Quiz 1")
                      }
                    }}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all hover:border-primary/40"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23d4af37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                  >
                    {availableStreamLevels.map(stream => (
                      <option key={stream} value={stream} className="bg-black">{stream}</option>
                    ))}
                  </select>
                </div>

                {/* Year Dropdown */}
                <div className="relative group">
                  <label className="text-white/60 text-sm mb-2 block">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all hover:border-primary/40"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23d4af37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                  >
                    {availableYears.map(year => (
                      <option key={year} value={year} className="bg-black">{year}</option>
                    ))}
                  </select>
                </div>

                {/* Term Dropdown */}
                <div className="relative">
                  <label className="text-white/60 text-sm mb-2 block">Term</label>
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all hover:border-primary/40"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23d4af37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                  >
                    {availableTerms.map(term => (
                      <option key={term} value={term} className="bg-black">{term}</option>
                    ))}
                  </select>
                </div>

                {/* Exam Type Dropdown */}
                <div className="relative">
                  <label className="text-white/60 text-sm mb-2 block">Exam Type</label>
                  <select
                    value={selectedExamType}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all hover:border-primary/40"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23d4af37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
                  >
                    {availableExamTypes.map(examType => (
                      <option key={examType} value={examType} className="bg-black">{examType}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedPyqStream("Data Science - Foundation")
                    setSelectedYear("All Years")
                    setSelectedTerm("All Terms")
                    setSelectedExamType("All Exams")
                  }}
                  className="px-6 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl text-primary font-medium transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                >
                  Reset Filters
                </button>
                <div className="flex-1"></div>
                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-xl text-primary font-medium">
                  {filteredPYQs.length} Subject{filteredPYQs.length !== 1 ? 's' : ''} Found
                </div>
              </div>
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
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {/* PYQs Header */}
              <div className="glass p-6 rounded-2xl border border-primary/20 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-4 py-1.5 bg-primary/20 border border-primary/40 rounded-lg text-primary text-sm font-bold">
                    {selectedPyqStream}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedYear === "All Years" && selectedTerm === "All Terms" && selectedExamType === "All Exams" 
                    ? "All Subjects - Previous Year Questions"
                    : `${selectedYear} - ${selectedTerm} - ${selectedExamType}`
                  }
                </h2>
                <p className="text-white/60">
                  {selectedYear === "All Years" 
                    ? "Subject-wise organized PYQ folders"
                    : "Previous Year Question Papers for all subjects"
                  }
                </p>
              </div>

              {/* PYQs Grid */}
              {filteredPYQs.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {filteredPYQs.map((item: SubjectItem, index: number) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group glass p-6 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(212,175,55,0.2)] animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all">
                          <FileCheck className="text-primary" size={24} />
                        </div>
                        <ExternalLink className="text-white/30 group-hover:text-primary transition opacity-0 group-hover:opacity-100" size={18} />
                      </div>
                      
                      <h3 className="text-white font-bold mb-3 group-hover:text-primary transition text-lg">
                        {item.subject}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-lg text-primary text-xs font-semibold">
                          {selectedPyqStream}
                        </span>
                        {selectedYear !== "All Years" && (
                          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-semibold">
                            {selectedYear}
                          </span>
                        )}
                        {selectedTerm !== "All Terms" && (
                          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-semibold">
                            {selectedTerm}
                          </span>
                        )}
                        {selectedExamType !== "All Exams" && (
                          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-semibold">
                            {selectedExamType}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="glass p-16 rounded-2xl border border-primary/20 text-center">
                  <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ClipboardList className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">No PYQs Available</h3>
                  <p className="text-white/60">
                    No question papers found for {selectedPyqStream}
                  </p>
                  <p className="text-white/60">
                    {selectedYear} - {selectedTerm} - {selectedExamType}
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    Try selecting a different program, year, term, or exam type
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="glass p-16 rounded-2xl border border-primary/20 text-center">
                <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Coming Soon</h3>
                <p className="text-white/60 text-lg">Course notes and study materials will be available here shortly.</p>
                <p className="text-white/50 text-sm mt-2">We're working hard to bring you the best study resources</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
