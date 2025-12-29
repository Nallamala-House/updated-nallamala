"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { X, Mail, Linkedin, Phone } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function CouncilPage() {
  const searchParams = useSearchParams()
  const yearParam = searchParams.get('year')
  const [selectedYear, setSelectedYear] = useState(yearParam || "2025-26")
  const [selectedTeam, setSelectedTeam] = useState(yearParam === "2024-25" ? "COUNCIL" : "UHC")
  const [selectedSubTeam, setSelectedSubTeam] = useState("WEBOPS") // For 2024-25 Team sub-sections
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    if (yearParam) {
      setSelectedYear(yearParam)
      // Update selectedTeam based on the year
      if (yearParam === "2024-25") {
        setSelectedTeam("COUNCIL")
        setSelectedSubTeam("WEBOPS")
      } else {
        setSelectedTeam("UHC")
        setSelectedSubTeam("")
      }
    }
  }, [yearParam])

  const yearData = {
    "2025-26": {
      UHC: [
        {
          id: 1,
          name: "Nikhil Kumar",
          role: "Secretary",
          message: "Leading with vision and purpose to create lasting impact.",
          email: "nikhil@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/nikhil-kumar",
          image: "/images/2025-26/sec.png", 
          bio: "With exceptional leadership skills, Nikhil has successfully coordinated multiple large-scale initiatives and fostered a culture of excellence within the community.",
        },
        {
          id: 2,
          name: "Jitesh Kumar",
          role: "Deputy Secretary",
          message: "Empowering our community through effective coordination.",
          email: "jitesh@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/jitesh-kumar",
          image: "/images/2025-26/deputy_sec.jpg",
          bio: "Jitesh brings strategic thinking and organizational excellence to his role, ensuring seamless coordination across all departments.",
          objectPosition: "center 99%",
        },
      ],
      LHC: [
        {
          id: 3,
          name: "Aditya Hrudaya",
          role: "Regional Coordinator - Kolkata",
          message: "Building bridges between residents and leadership.",
          email: "aditya@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/aditya-hrudaya",
          image: "/images/2025-26/rc_kolkata.webp",
          bio: "Aditya focuses on grassroots engagement and community welfare in the Kolkata region, ensuring every voice is heard.",
        },
        {
          id: 4,
          name: "Gopal Krishna",
          role: "Regional Coordinator - Patna",
          message: "Fostering inclusivity and belonging for all.",
          email: "gopal@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/gopal-krishna",
          image: "/images/2025-26/rc_patna.png",
          bio: "Gopal dedicates himself to creating an inclusive environment in the Patna region where every member feels valued and heard.",
        },
        {
          id: 13,
          name: "Esha Hinde",
          role: "Regional Coordinator - Mumbai",
          message: "Connecting communities across Mumbai.",
          email: "esha@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/esha-hinde",
          image: "/images/2025-26/rc_mumbai.png",
          bio: "Esha brings energy and enthusiasm to coordinate activities and foster community engagement in the Mumbai region.",
        },
        {
          id: 14,
          name: "Chandra",
          role: "Regional Coordinator - Hyderabad",
          message: "Strengthening bonds in the Hyderabad region.",
          email: "chandra@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/chandra",
          image: "/images/2025-26/rc_hydrebad.jpg",
          bio: "Chandra works tirelessly to ensure seamless coordination and engagement among members in the Hyderabad region.",
        },
        {
          id: 15,
          name: "Aaryan Sahu",
          role: "Regional Coordinator - Chandigarh",
          message: "Empowering the Chandigarh community.",
          email: "aaryan@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/aaryan-sahu",
          image: "/images/2025-26/rc_chandigarh.jpg",
          bio: "Aaryan is dedicated to building a strong, connected community in the Chandigarh region through active engagement and leadership.",
        },
        {
          id: 16,
          name: "Aravindhaa V",
          role: "Regional Coordinator - Chennai",
          message: "Leading with passion in Chennai.",
          email: "aravindhaa@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/aravindhaa-v",
          image: "/images/2025-26/rc_chennai.jpg",
          bio: "Aravindhaa brings dedication and leadership to coordinate activities and strengthen community bonds in the Chennai region.",
        },
      ],
      WEBOPS: [
        {
          id: 5,
          name: "Arya Mukherjee",
          role: "Web Admin",
          message: "Managing and maintaining our digital presence.",
          email: "arya@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/arya-mukherjee",
          image: "/images/2025-26/web_admin.jpeg",
          objectPosition: "center 80%",
          bio: "Responsible for overall website administration, security, and technical infrastructure that keeps our digital platforms running smoothly.",
        },
        {
          id: 6,
          name: "Prodhosh VS",
          role: "Website Manager",
          message: "Crafting seamless digital experiences.",
          email: "prodhosh@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/prodhosh-vs",
          image: "/images/2025-26/website_manager.jpg",
          objectPosition: "center 40%",
          bio: "Oversees content management, user experience, and ensures our website reflects the vibrant spirit of Nallamala House.",
        },
        {
          id: 9,
          name: "Pavithra Chakravarthy",
          role: "Website Manager",
          message: "Crafting seamless digital experiences.",
          email: "pavithra@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/pavithra-chakravarthy",
          image: "/images/2025-26/website_manager_2.jpeg",
          bio: "Oversees content management, user experience, and ensures our website reflects the vibrant spirit of Nallamala House.",
        },
        {
          id: 7,
          name: "Tanmay Sharma",
          role: "Video Editor",
          message: "Bringing moments to life through visuals.",
          email: "tanmay@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/tanmay-sharma",
          image: "/images/2025-26/video_editor.jpg",
          bio: "Creates compelling video content that captures our events, stories, and the essence of our community.",
        },
        {
          id: 8,
          name: "Prithibe Majumder",
          role: "Graphic Designer",
          message: "Designing the visual identity of our house.",
          email: "prithibe@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/prithibe-majumder",
          image: "/images/2025-26/graphic_designer.jpg",
          bio: "Designs stunning graphics, posters, and visual content that represents our house's creativity and excellence.",
        },
        {
          id: 17,
          name: "Muskan Jha",
          role: "Content Writer",
          message: "Crafting compelling narratives and content.",
          email: "muskan@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/muskan-jha",
          image:"/images/2025-26/content_writing.png", 
          bio: "Muskan creates engaging written content, articles, and communications that capture the essence of our community and its initiatives.",
        },
      ],
      COMMUNITY: [
        {
          id: 10,
          name: "Kratika",
          role: "Secretary - Literary & Oratory Community",
          message: "Fostering creativity through words and expression.",
          email: "kratika@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/kratika",
          image: "/images/2025-26/lo_club.jpg",
          bio: "Kratika leads the Literary & Oratory Community, organizing engaging events and activities that celebrate the power of language, literature, and public speaking.",
        },
        {
          id: 11,
          name: "Shashi Kumar Singh",
          role: "Secretary - Shunya-IITM BS Developers Club",
          message: "Building the future through code and innovation.",
          email: "shashi@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/shashi-kumar-singh",
          image: null, // TODO: Add photo when available
          bio: "Shashi Kumar Singh heads the Shunya-IITM BS Developers Club, driving technical excellence and fostering a culture of innovation among aspiring developers.",
        },
        {
          id: 12,
          name: "Harsh Kumar",
          role: "Secretary - AI-ML : AIDW",
          message: "Pioneering artificial intelligence and machine learning.",
          email: "harsh@nallamala.house",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/harsh-kumar",
          image: "/images/2025-26/aidw_club.jpg",
          bio: "Harsh Kumar leads AI-ML : AIDW community, organizing workshops and projects that explore the cutting-edge world of artificial intelligence and machine learning.",
        },
      ],
    },
    "2024-25": {
      COUNCIL: [
        {
          id: 9,
          name: "Naman Shyamsukha",
          role: "Secretary",
          message: "Building on our legacy of excellence.",
          email: "nallamala-sec@ds.study.iitm.ac.in",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/naman-shyamsukha",
          image: "/images/2024-25/sec.png",
          bio: "Naman led innovative initiatives that strengthened community bonds and enhanced member experiences.",
        },
        {
          id: 10,
          name: "Abhay Kumar",
          role: "Deputy Secretary",
          message: "Empowering our community through effective coordination.",
          email: "nallamala-ds@ds.study.iitm.ac.in",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/abhay-kumar",
          image: "/images/2024-25/dep_sec.jpg",
          bio: "Abhay brings strategic thinking and organizational excellence to his role, ensuring seamless coordination across all departments.",
        },
        {
          id: 11,
          name: "Krishnan Lakshmi Narayana",
          role: "Web Admin",
          message: "Managing and maintaining our digital presence.",
          email: "nallamala-webad@ds.study.iitm.ac.in",
          phone: "+91-XXXXXXXXXX",
          linkedin: "linkedin.com/in/krishnan-lakshmi-narayana",
          image: "/images/2024-25/web_admin.png",
          bio: "Responsible for overall website administration, security, and technical infrastructure that keeps our digital platforms running smoothly.",
        },
      ],
      TEAM: {
        WEBOPS: [
          {
            id: 20,
            name: "Vishal Singh Baraiya",
            role: "WebDev",
            email: "vishal@nallamala.house",
            image: null, // TODO: Add photo when available
          },
        ],
        MANAGEMENT: [
          {
            id: 21,
            name: "Aishwanee Basu",
            role: "Management Member",
            email: "aishwanee@nallamala.house",
            image: "/images/2024-25/aishwanee_basu.png",
          },
          {
            id: 22,
            name: "Satyam Saurabh",
            role: "Management Member",
            email: "satyam@nallamala.house",
            image: "/images/2024-25/satyam_saurabh.png",
          },
          {
            id: 23,
            name: "Raiyan Ahmed",
            role: "Management Member",
            email: "raiyan@nallamala.house",
            image: "/images/2024-25/raiyan_ahmed.png",
          },
          {
            id: 24,
            name: "Nikhil Kumar",
            role: "Management Member",
            email: "nikhil.mgmt@nallamala.house",
            image: "/images/2024-25/nikhil_kumar.png",
          },
        ],
        CONTENT: [
          {
            id: 25,
            name: "Ashutosh Solanke",
            role: "Content Writer",
            email: "ashutosh@nallamala.house",
            image: "/images/2024-25/ashutosh_solanke.png",
          },
          {
            id: 26,
            name: "Priyanka Dalal",
            role: "Content Writer",
            email: "priyanka@nallamala.house",
            image: "/images/2024-25/priyanka_dalal.png",
          },
          {
            id: 27,
            name: "Vanshika Tiwari",
            role: "Content Writer",
            email: "vanshika@nallamala.house",
            image: "/images/2024-25/vanshika_tiwari.png",
          },
        ],
        DESIGN: [
          {
            id: 28,
            name: "Kundan Kumar",
            role: "Design Team Member",
            email: "kundan@nallamala.house",
            image: "/images/2024-25/kundan_kumar.png",
          },
          {
            id: 29,
            name: "Anindya Mukhopadhyay",
            role: "Design Team Member",
            email: "anindya@nallamala.house",
            image: "/images/2024-25/anindya_mukhopadhyay.png",
          },
        ],
      },
      REGIONAL: [
        {
          id: 30,
          name: "Harikrishnan D",
          role: "Regional Coordinator - Bengaluru",
          email: "23f3000295@ds.study.iitm.ac.in",
          image: "/images/2024-25/harikrishnan_d.jpg",
        },
        {
          id: 32,
          name: "Jitesh Kumar",
          role: "Regional Coordinator - Chennai",
          email: "23f3000519@es.study.iitm.ac.in",
          image: "/images/2024-25/jitesh_kumar.jpg",
        },
        {
          id: 33,
          name: "Lakshya Patel",
          role: "Regional Coordinator - Delhi",
          email: "23f3001274@ds.study.iitm.ac.in",
          image: "/images/2024-25/lakshya_patel.png",
        },
        {
          id: 34,
          name: "Ankala Lakshmi Prabhasini",
          role: "Regional Coordinator - Hyderabad",
          email: "24f2002884@ds.study.iitm.ac.in",
          image: "/images/2024-25/ankala_lakshmi_prabhasini.jpg",
        },
        {
          id: 37,
          name: "Pushpanjali",
          role: "Regional Coordinator - Patna",
          email: "22f3002427@ds.study.iitm.ac.in",
          image: "/images/2024-25/pushpanjali.png",
        },
        {
          id: 31,
          name: "Vishal Singh Baraiya",
          role: "Regional Coordinator - Chandigarh",
          email: "23f2000558@ds.study.iitm.ac.in",
          image: null,
        },
        {
          id: 35,
          name: "Priti Ghosh",
          role: "Regional Coordinator - Kolkata",
          email: "24f2001576@ds.study.iitm.ac.in",
          image: null,
        },
        {
          id: 36,
          name: "Shashwat Upadhyay",
          role: "Regional Coordinator - Mumbai",
          email: "23f3002413@ds.study.iitm.ac.in",
          image: null,
        },
      ],
    },
    "2023-24": {
      UHC: [],
      LHC: [],
      WEBOPS: [],
      COMMUNITY: [],
    },
  }

  const teamLabels = selectedYear === "2024-25" ? {
    COUNCIL: "Council",
    TEAM: "Team",
    REGIONAL: "Regional Leaders",
  } : {
    UHC: "UHC",
    LHC: "LHC",
    WEBOPS: "Web Operations",
    COMMUNITY: "Community Leaders",
  }

  const subTeamLabels = {
    WEBOPS: "WebOps",
    MANAGEMENT: "Management",
    CONTENT: "Content",
    DESIGN: "Design",
  }

  const teamDescriptions = selectedYear === "2024-25" ? {
    COUNCIL: "The Council comprises the Secretary, Deputy Secretary, and Web Admin. They form the core leadership of Nallamala House, responsible for overall governance, strategic planning, and ensuring a thriving, inclusive environment for all members.",
    TEAM: "The Team includes our WebOps, Management, Content, and Design members. They work together to manage digital operations, coordinate activities, create engaging content, and design visual materials that represent our house's identity and values.",
    REGIONAL: "Regional Leaders serve as key points of contact between house members across different regions. They coordinate regional meetups, events, and ensure that every member's voice is heard regardless of their location.",
  } : {
    UHC: "The House Council, often referred to as the Upper House Council (UHC), is an integral part of our student governing body. It comprises the Secretary and Deputy Secretary of the house. The Council acts as the governing body of our community, organizing events, upholding traditions, and ensuring a thriving, inclusive environment for all residents. Our members are committed to fostering a vibrant and engaging atmosphere within the house.",
    LHC: "The Regional Coordinators, often referred to as the Lower House Council (LHC), are an essential part of our student governing body. The Lower House Council serves as the key point of contact between house members and the governing bodies. They are the driving force behind the successful execution of meetups and events, addressing member queries, and ensuring that every member's voice is heard.",
    WEBOPS: "The WebOps team, led by the Web Admin, comprises five dedicated members working under their supervision. The team includes a Website Manager, Video Editor, Graphic Designers, and Developers. They form the core technical team responsible for managing and maintaining all digital and technical aspects of our house, ensuring smooth operation and high-quality output.",
    COMMUNITY: "These are the leaders of our official communities. They are the ones who frequently organize events within the houses to enhance engagement and foster a stronger sense of community among members.",
  }

  // Get members based on year and team selection
  const members = (() => {
    if (selectedYear === "2024-25" && selectedTeam === "TEAM") {
      return yearData[selectedYear]?.TEAM?.[selectedSubTeam] || []
    }
    return yearData[selectedYear]?.[selectedTeam] || []
  })()

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        {/* Background animations */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-primary text-sm uppercase tracking-widest mb-4">Leadership</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Council & <span className="text-primary">Team</span>
            </h1>
            <p className="text-white/70 mb-6">Meet the dedicated leaders driving Nallamala House forward</p>
            <p className="text-primary text-xl font-semibold">{selectedYear}</p>
          </div>

          {/* Team Tabs - Now at the Top */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {Object.entries(teamLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedTeam(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedTeam === key
                    ? "bg-primary text-black"
                    : "glass-dark text-white/70 hover:text-white border border-white/10 hover:border-primary/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sub-Team Tabs for 2024-25 Team */}
          {selectedYear === "2024-25" && selectedTeam === "TEAM" && (
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {Object.entries(subTeamLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedSubTeam(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedSubTeam === key
                      ? "bg-primary/80 text-black"
                      : "glass-dark text-white/60 hover:text-white border border-white/10 hover:border-primary/20"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Team Description */}
          {teamDescriptions[selectedTeam] && (
            <div className="mb-12 max-w-5xl mx-auto">
              <div className="glass-dark p-8 rounded-2xl border-2 border-primary/30 shadow-xl">
                <p className="text-white/90 leading-relaxed text-center text-base">
                  {teamDescriptions[selectedTeam]}
                </p>
              </div>
            </div>
          )}

          {/* Members Grid */}
          {members.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {members.map((member) => {
                // For 2024-25 only, show simplified cards (no popup, no about/bio)
                const isSimplified = selectedYear === "2024-25"
                const isRegional = selectedTeam === "REGIONAL"

                if (isSimplified) {
                  return (
                    <div
                      key={member.id}
                      className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="mb-4 overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            style={{ objectPosition: member.objectPosition || 'center' }}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-24 h-24 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-primary text-xs uppercase tracking-widest mb-2">{member.role}</p>
                      <h3 className="text-lg font-serif font-bold text-white mb-2">{member.name}</h3>
                      {/* Show email for all members */}
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center space-x-2 text-white/70 hover:text-primary transition text-sm mt-3"
                      >
                        <Mail size={16} className="text-primary" />
                        <span className="text-xs break-all">{member.email}</span>
                      </a>
                    </div>
                  )
                }

                // For 2025-26 and older years, show full cards with popup
                return (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer group"
                  >
                    <div className="mb-4 overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ objectPosition: member.objectPosition || 'center' }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <svg className="w-24 h-24 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-primary text-xs uppercase tracking-widest mb-2">{member.role}</p>
                    <h3 className="text-lg font-serif font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-white/70 text-sm italic">{member.message}</p>
                    <p className="text-primary text-xs mt-4">Click to view details</p>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">
                No data available for {teamLabels[selectedTeam]} in {selectedYear}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-gradient-to-b from-white/10 to-white/5 border border-primary/30 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto glass shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-8 border-b border-primary/20 bg-black/50 backdrop-blur">
              <h2 className="text-3xl font-serif font-bold text-white">{selectedMember.name}</h2>
              <button onClick={() => setSelectedMember(null)} className="text-white/70 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Image */}
              <div className="w-full max-w-md mx-auto">
                {selectedMember.image ? (
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-[600px] object-cover object-center rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg shadow-2xl flex items-center justify-center">
                    <svg className="w-48 h-48 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Role & Message */}
              <div>
                <p className="text-primary text-sm uppercase tracking-widest mb-2">{selectedMember.role}</p>
                <p className="text-white/80 text-lg italic">{selectedMember.message}</p>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                <p className="text-white/70 leading-relaxed">{selectedMember.bio}</p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
                <div className="space-y-2">
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="flex items-center space-x-3 text-white/70 hover:text-primary transition"
                  >
                    <Mail size={20} className="text-primary" />
                    <span>{selectedMember.email}</span>
                  </a>
                  <a
                    href={`tel:${selectedMember.phone}`}
                    className="flex items-center space-x-3 text-white/70 hover:text-primary transition"
                  >
                    <Phone size={20} className="text-primary" />
                    <span>{selectedMember.phone}</span>
                  </a>
                  <a
                    href={`https://${selectedMember.linkedin}`}
                    className="flex items-center space-x-3 text-white/70 hover:text-primary transition"
                  >
                    <Linkedin size={20} className="text-primary" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setSelectedMember(null)}
                className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-lg py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
