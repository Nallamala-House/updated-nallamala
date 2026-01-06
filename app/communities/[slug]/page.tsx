"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Instagram, Link as LinkIcon, X, Calendar, Linkedin } from "lucide-react"
import Image from "next/image"

type CommunityEvent = {
  id: number
  title: string
  date: string
  guest?: string
  description: string
  image: string
}

const communityData: any = {
  "chapters-verses": {
    name: "Chapters & Verses",
    shortDescription: "Bringing together readers and writers to explore literature, engage in discussions, and celebrate the magic of words.",
    image: "/images/communities/chapters_verses.png",
    color: "from-pink-600 to-pink-400",
    membershipForm: "https://forms.gle/KJNB7MXu4A17hjDK7",
    instagram: "https://www.instagram.com/chaptersxverses_iitm/",
    aboutUs: `Chapters & Verses is the literary and oratory soul of Nallamala House—a vibrant community of 200+ passionate readers, writers, and storytellers. Founded in 2024, the community was born from a simple yet powerful idea: to create a shared space where words connect minds and stories bring people together.

From timeless classics to contemporary voices, Chapters & Verses invites everyone to explore literature without boundaries. It is an inclusive, welcoming haven where creativity flows freely—through discussions, performances, writing, and dialogue.

Recognized as one of the most active communities of Nallamala House, we have proudly hosted signature events such as Dastaan-e-Alfaaz, Chapter Unlocked, Noor-e-Sama, Unscripted Pages, and many more—each celebrating expression in its purest form.

Through dedication, collaboration, and a shared love for words, we have nurtured a thriving literary culture. Today, Chapters & Verses stands as a living testament to our vision—a community where stories are written, voices are heard, and creativity finds its home.`,
    events: [
      {
        id: 1,
        title: "Chapters Unlocked",
        date: "18th February 2024 (Sunday) | 1:00 PM",
        guest: "Ms. Riya Jhamb (@what_riya_reads) — Renowned Bookstagrammer",
        description: `Chapters Unlocked marked the inaugural ceremony and book talk session of our literary journey, held as an engaging virtual event on Google Meet. The session featured an insightful conversation with Ms. Riya Jhamb, who shared her perspectives on storytelling, reading culture, and her latest literary work.

Participants had the opportunity to dive deep into discussions on literature, exchange ideas with fellow book lovers, and engage in meaningful conversations in a warm and inclusive environment. With Ms. Riya's vibrant Instagram community of over 20,000 readers, the event successfully brought together a diverse audience united by a love for books.

The session concluded as an enriching and inspiring experience, setting the tone for many more literary conversations to come.`,
        image: "/images/communities/events/chapters_unlocked.png"
      },
      {
        id: 2,
        title: "Harry Potter: Watch Party",
        date: "Friday, 29th March 2024 | 7:00 PM",
        guest: "Collaborators: Chapters × Verses × Pop Culture Club, IITM BS",
        description: `The Harry Potter: Watch Party was a magical movie night where participants stepped into the enchanting world of Harry Potter and the Philosopher's Stone. The virtual screening brought together Potterheads to relive the wonder of Hogwarts School of Witchcraft and Wizardry.

As Harry, Ron, and Hermione embarked on their unforgettable journey, viewers experienced themes of friendship, bravery, and the enduring power of love. The event witnessed an overwhelming response, with over 172 participants tuning in, making it a memorable and highly successful community gathering.

Filled with nostalgia, excitement, and shared moments of magic, the watch party truly celebrated the timeless charm of the wizarding world. 🪄🍿✨`,
        image: "/images/communities/events/harry_potter.png"
      },
      {
        id: 3,
        title: "Dastaan-e-Alfaaz",
        date: "Ongoing Series — Every Sunday",
        description: `Dastaan-e-Alfaaz is a poetic Urdu phrase that translates to "Story of Words." It represents the art of weaving emotions, experiences, and imagination into verses that resonate far beyond their surface meaning.

Chapters & Verses proudly presents the Dastaan-e-Alfaaz series—an ongoing literary initiative that brings soulful Urdu shayari to your Sundays. Each edition features thoughtfully crafted verses by our talented community members, celebrating the beauty and depth of expression through words.

Join us on Instagram as we paint a canvas of emotions with every carefully chosen line, inviting you to pause, reflect, and feel.

✨ Anticipate the magic—unfolding weekly. 💫`,
        image: "/images/communities/events/dastaan.png"
      },
      {
        id: 4,
        title: "Unscripted Pages",
        date: "24th November 2024 | 8:00 PM",
        guest: "Collaborators: Pichavaram House × Chapters & Verses, Nallamala House",
        description: `Unscripted Pages was a collaborative literary competition designed to celebrate creative writing, expression, and presentation. The event unfolded across two rounds, beginning with written submissions based on given themes. Shortlisted participants then advanced to a live Google Meet session, where finalists presented their work and brought their words to life.

The competition fostered confidence, creativity, and meaningful literary exchange, making it an engaging and memorable experience for all involved.`,
        image: "/images/communities/events/unscripted.png"
      },
      {
        id: 5,
        title: "Noor-e-Sama — A Night of Shayari",
        date: "5th February 2025",
        description: `Noor-e-Sama was an enchanting evening curated by Chapters & Verses, the Literary and Oratory Club of Nallamala House, celebrating the luminous art of Shayari. The event featured heartfelt recitations of both classic and contemporary Shayaris by passionate poets and poetry enthusiasts.

The night brought together lovers of eloquent expression, offering a space to reflect, feel, and connect through words. From seasoned Shayari connoisseurs to first-time listeners, Noor-e-Sama left the audience inspired, moved, and immersed in the timeless beauty of poetry.`,
        image: "/images/communities/events/noor.png"
      }
    ]
  },
  "aidw": {
    name: "AIDW",
    shortDescription: "A student-driven community dedicated to nurturing interest and excellence in AI and Data Science.",
    image: "/images/communities/ai_dw.png",
    color: "from-green-600 to-green-400",
    membershipForm: "https://docs.google.com/forms/d/e/1FAIpQLSfBnfqxe1-qQLNQ7RM0EOHuLMzuo4Ip2F-_-mWDe8hwPA92Pw/viewform",
    linkedin: "https://www.linkedin.com/company/ai-innovators-data-wizards-aidw-iit-madras/",
    aboutUs: `AIDW is a student-driven community dedicated to nurturing interest and excellence in Artificial Intelligence and Data Science. The club serves as a platform for students who are curious about emerging technologies and eager to transform theoretical knowledge into practical skills. By fostering an environment of collaboration and experimentation, AIDW enables learners from diverse backgrounds to explore AI concepts without barriers related to prior experience or expertise.

Through a mix of hands-on projects, workshops, speaker sessions, competitions, and peer-driven learning, AIDW encourages students to actively engage with real-world problem solving. The community emphasizes skill development, critical thinking, and innovation, helping members gain exposure to industry-relevant tools, research methodologies, and modern AI applications. Students are supported in building confidence, technical proficiency, and a strong foundation for future academic and professional pursuits.

Vision: To grow into a leading student hub for AI and Data Science, empowering learners to collaborate, innovate, and create impactful solutions. AIDW aims to bridge the gap between learning and application, inspiring students to drive technological advancements and make meaningful contributions in the field of artificial intelligence and data science.`,
    events: [
      {
        id: 1,
        title: "TECHTALK: GenAI in SEEK",
        date: "18th March 2025",
        guest: "Prem Kumar Sharma",
        description: `AI Innovators & Data Wizards (AIDW) – IIT Madras successfully concluded with an engaging session on "GenAI in SEEK" featuring Prem Kumar Sharma on 18th March 2025. The session explored how generative AI is transforming learning platforms and software engineering practices.

Key discussions focused on AI-powered doubt resolution, automated debugging for coding assignments, and instant course support using Retrieval-Augmented Generation (RAG). The interactive nature of the session encouraged meaningful discussions and practical takeaways for participants.

The event was enriched by active participation from attendees and valuable insights shared by the speaker, making it both informative and impactful. AIDW looks forward to hosting more such knowledge-driven sessions in the future.`,
        image: "/images/communities/events/tech_talk.jpg"
      },
      {
        id: 2,
        title: "DataSphere: Mastering Big Tech & GenAI",
        date: "April 19, 2025",
        guest: "Nischay Agarwal, Senior Data Engineer at Walmart",
        description: `DataSphere: Mastering Big Tech & GenAI speaker session was successfully conducted on April 19, 2025, featuring Nischay Agarwal, Senior Data Engineer at Walmart. The session provided participants with valuable insights into building careers in data engineering, AI, and big tech ecosystems.

Attendees gained clarity on industry expectations, essential skills required for data and AI roles, and practical guidance on navigating career paths in leading tech companies. The session also featured an engaging interactive Q&A, where participants received direct advice and real-world perspectives from the speaker.

The event witnessed active participation and meaningful discussions, making it an insightful and enriching experience for all attendees. AIDW Club looks forward to organizing more such industry-focused sessions in the future.`,
        image: "/images/communities/events/data_sphere.jpg"
      },
      {
        id: 3,
        title: "From Theory to Practice: The Journey of a Data Scientist",
        date: "October 2, 2024",
        guest: "Mr. Manish Mazumder, ML Engineer and Data Scientist, IIT Kanpur Alumnus",
        description: `The session "From Theory to Practice: The Journey of a Data Scientist" was successfully conducted on October 2, 2024, featuring Mr. Manish Mazumder, an ML Engineer and Data Scientist and an IIT Kanpur alumnus. The session offered participants valuable insights into the transition from academic learning to real-world applications in the data science industry.

Mr. Mazumder shared his professional journey, highlighting practical challenges, industry expectations, and the skills required to succeed in machine learning and data science roles. The interactive discussion allowed learners to engage directly with the speaker, gaining clarity on career paths, real-world problem-solving, and industry best practices.

The session witnessed enthusiastic participation and thoughtful interactions, making it an inspiring and informative experience for all attendees. AIDW Club looks forward to hosting more such knowledge-driven sessions in the future.`,
        image: "/images/communities/events/journey.jpg"
      },
      {
        id: 4,
        title: "Blackstraw Namma Singara Chennai Challenge",
        date: "2024",
        description: `The Blackstraw Namma Singara Chennai Challenge was successfully conducted, providing students with a platform to showcase their creativity and problem-solving abilities while addressing real-world challenges relevant to Chennai. Participants collaborated on innovative ideas and solutions aimed at creating a positive social and technological impact.

The challenge encouraged out-of-the-box thinking, teamwork, and practical application of skills, offering students valuable exposure to industry-driven problem statements. With an impressive ₹50 Lakhs prize pool, the event motivated participants to push boundaries and present impactful solutions, making it a rewarding and enriching experience for all involved.`,
        image: "/images/communities/events/blackstraw.jpeg"
      }
    ]
  },
  "shunya": {
    name: "Shunya",
    shortDescription: "The coding and developer community empowering students to explore, build, and innovate through technology.",
    image: "/images/communities/shunya.png",
    color: "from-blue-600 to-blue-400",
    membershipForm: "https://forms.gle/KJNB7MXu4A17hjDK7",
    instagram: "https://www.instagram.com/shunya_iitm?igsh=aHFtNW83ZHJldHE=",
    linkedin: "https://www.linkedin.com/company/sunya-developers-club/",
    aboutUs: `Shunya is the coding and developer community of Nallamala House, created to empower IIT Madras BS students to explore, build, and innovate through technology. Guided by the belief that "Nothing Seems Difficult," Shunya brings together curious minds, problem-solvers, and creators under one collaborative platform.

The community serves as a space to dive into cutting-edge technological discussions, sharpen coding skills through interactive speaker sessions, and work on meaningful open-source projects with real-world impact. From beginners taking their first steps into coding to experienced developers refining their craft, Shunya welcomes everyone with equal enthusiasm.

Recognized as one of the most active student communities, Shunya thrives on collaboration, continuous learning, and peer-to-peer growth. By connecting tech enthusiasts and fostering hands-on experiences, the community inspires its members to push boundaries, turn ideas into reality, and write the code of tomorrow—together.`,
    events: [
      {
        id: 1,
        title: "DSA Triathlon 2.0",
        date: "2025",
        guest: "Powered by Innovation Labs | FetchAI",
        description: `DSA Triathlon 2.0 was successfully conducted in Paradox, the technical and coding ecosystem of IIT Madras BS, in collaboration with Shunya and Nallamala House.

Powered by Innovation Labs | FetchAI, a global pioneer in AI × Blockchain innovation, the event followed a three-level competitive format and featured carefully curated Data Structures and Algorithms problems. The challenges were designed to assess participants' problem-solving abilities, logical reasoning, and coding efficiency across varying difficulty levels.

The event witnessed active participation from students and fostered a competitive yet engaging learning environment, contributing to the growth of technical skills and competitive programming culture within Paradox.`,
        image: "/images/communities/events/triathlon.png"
      },
      {
        id: 2,
        title: "Tech Discussion Session with Vanshika Pandey",
        date: "2025",
        guest: "Vanshika Pandey, Software Development Engineer at JP Morgan Chase",
        description: `An exclusive tech discussion session with Vanshika Pandey was successfully conducted by Shunya.

The session focused on careers in technology and software development, offering valuable insights into navigating the rapidly evolving tech industry. Vanshika Pandey, currently working as a Software Development Engineer at JP Morgan Chase, shared her professional journey and practical guidance for students aiming to build strong careers in tech.

With expertise spanning technologies such as Python, JavaScript, ReactJS, AngularJS, Git/GitHub, C++, and more, the session proved to be both informative and engaging. Participants actively interacted and gained clarity on skill development, industry expectations, and career growth strategies.

The event fostered meaningful learning and mentorship, reflecting Shunya's commitment to creating impactful technical discussions and knowledge-sharing opportunities for students.`,
        image: "/images/communities/events/guest_talk.png"
      },
      {
        id: 3,
        title: "Seminar Session with Akshaj Padmakar",
        date: "2025",
        guest: "Akshaj Padmakar, Former Competitive Coding Head at IIT Guwahati, Product Engineer at Sprinklr",
        description: `A seminar session featuring Akshaj Padmakar was successfully conducted by Shunya – The Coding and Developers Club.

Akshaj Padmakar, former Competitive Coding Head at IIT Guwahati and an upcoming Product Engineer at Sprinklr, shared valuable insights from his academic and professional journey. The session focused on competitive programming, product engineering, and navigating career paths in the tech industry.

The discussion catered to both beginners and experienced learners, offering practical advice, real-world perspectives, and motivation for students aspiring to grow in technology and engineering roles. Participants actively engaged during the session, making it an informative and enriching experience.

The event reflected Shunya's continued efforts to bring industry-relevant knowledge and meaningful learning opportunities to students.`,
        image: "/images/communities/events/seminar.jpg"
      }
    ]
  },
  "grandmasters-guild": {
    name: "Grandmaster's Guild",
    shortDescription: "Nallamala houses the official chess community.",
    image: "/images/communities/chess.png",
    color: "from-purple-600 to-purple-400",
    membershipForm: "https://docs.google.com/forms/d/e/1FAIpQLSeoYlVvpI7QmmNOknWcJiUrmKKpR3r0zl33Fc9ILKjRQ1psRg/viewform",
    instagram: "https://www.instagram.com/grandmastersguild/",
    linkedin: "https://www.linkedin.com/company/grandmastersguild/",
    aboutUs: `Grandmaster's Guild is the official chess community of Nallamala House, bringing together chess enthusiasts of all skill levels. Whether you're a beginner learning the basics or an experienced player looking to refine your strategies, the guild provides a welcoming space for everyone passionate about the game.

The community is dedicated to promoting chess as a strategic and intellectual pursuit, hosting tournaments, analysis sessions, and friendly matches that foster competitive spirit and camaraderie. Through regular events and collaborative learning, members develop their tactical thinking, strategic planning, and competitive skills.

Recognized as a hub for chess culture within IIT Madras BS, Grandmaster's Guild celebrates the timeless game while creating opportunities for players to grow, compete, and connect with fellow chess lovers.`,
    events: []
  },
  "cifer": {
    name: "CIFER",
    shortDescription: "Building strong financial awareness, practical understanding, and leadership among students.",
    image: "/images/communities/cifer.png",
    color: "from-yellow-600 to-yellow-400",
    membershipForm: "https://docs.google.com/forms/d/e/1FAIpQLSfCge_fE_cl-QVgdxbS2choNkcxXnenN2FIl9dptT5SE5Fl2w/viewform",
    instagram: "https://www.instagram.com/cifer.iitm/",
    aboutUs: `CIFER (Nallamala Finance Community) is a student-led initiative dedicated to building strong financial awareness, practical understanding, and leadership among students. With a growing network of 200+ active members, the community serves as a collaborative space for individuals interested in financial markets, corporate finance, entrepreneurship, and real-world money management.

CIFER focuses on developing a practical perspective on finance by exposing students to market dynamics, business finance, investment principles, financial decision-making, and economic trends. The community encourages discussions around how financial strategies influence businesses, startups, and long-term growth, helping members connect financial concepts with real-life scenarios.

A core pillar of CIFER is fostering an entrepreneurial and startup-driven mindset. The community actively supports aspiring founders by guiding them through the financial aspects of building a venture from understanding capital requirements and budgeting to funding strategies, investor readiness, and scaling businesses sustainably. Members gain insight into how financial planning and discipline play a critical role in startup success.`,
    events: [
      {
        id: 1,
        title: "Inaugural Session of Cifer",
        date: "30th October 2023",
        guest: "Prof. M. Thenmozhi, Head of the Department of Management Studies (DOMS), IIT Madras",
        description: `The Inaugural Session of Cifer was successfully conducted on 30th October 2023, marking the beginning of a new platform focused on finance, investments, and financial markets.

The session featured Prof. M. Thenmozhi, Head of the Department of Management Studies (DOMS), IIT Madras, as the distinguished speaker. She shared valuable insights drawn from her extensive experience in finance and analysis, offering participants a deeper understanding of financial markets and analytical thinking.

The session provided students with an enriching learning experience and set a strong foundation for Cifer's future initiatives. Participants gained meaningful perspectives on finance and investment, making the inaugural event both informative and impactful.`,
        image: "/images/communities/events/session.jpg"
      }
    ]
  }
}

export default function CommunityDetail() {
  const params = useParams()
  const slug = params.slug as string
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const community = communityData[slug]

  if (!community) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Community Not Found</h1>
            <p className="text-white/70">The community you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 pb-16">
        {/* Background animations */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-16 rounded-2xl overflow-hidden border border-primary/30">
            <div className="relative h-96">
              <Image
                src={community.image}
                alt={community.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-5xl font-serif font-bold text-white mb-4">{community.name}</h1>
                <p className="text-xl text-white/80 mb-6">{community.shortDescription}</p>
                <div className="flex gap-4">
                  <a
                    href={community.membershipForm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-black font-semibold rounded-lg transition"
                  >
                    <LinkIcon size={18} />
                    Join Us
                  </a>
                  {community.instagram && (
                    <a
                      href={community.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition border border-white/20"
                    >
                      <Instagram size={18} />
                      Follow
                    </a>
                  )}
                  {community.linkedin && (
                    <a
                      href={community.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition border border-white/20"
                    >
                      <Linkedin size={18} />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              About <span className="text-primary">Us</span>
            </h2>
            <div className="glass-dark p-8 rounded-xl border border-primary/20">
              {community.aboutUs.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-white/70 leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Featured <span className="text-primary">Events</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {community.events.map((event: CommunityEvent) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="group rounded-xl overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  </div>
                  <div className="p-6 glass-dark">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-primary transition">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary text-sm mb-3">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    {event.guest && (
                      <p className="text-white/60 text-sm mb-3">{event.guest}</p>
                    )}
                    <p className="text-primary text-sm font-semibold">Click to learn more</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-gradient-to-b from-white/10 to-white/5 border border-primary/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header with Image */}
            <div className="relative h-80 overflow-hidden">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
              >
                <X size={24} />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-4xl font-serif font-bold text-white mb-3">{selectedEvent.title}</h2>
                <div className="flex items-center gap-2 text-primary text-lg">
                  <Calendar size={20} />
                  <span>{selectedEvent.date}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-4">
              {selectedEvent.guest && (
                <div className="glass-dark p-4 rounded-lg border border-primary/20">
                  <p className="text-white font-semibold">{selectedEvent.guest}</p>
                </div>
              )}
              
              {selectedEvent.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-white/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
