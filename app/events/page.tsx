"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Calendar, Share2, X } from "lucide-react"

type EventTab = "current" | "upcoming" | "past"

type EventItem = {
  id: number
  title: string
  description: JSX.Element | string
  date: string
  location?: string
  image: string
  status?: string
  category?: string
  attendees?: string
  links?: { label: string; url: string }[]
}

export default function Events() {
  const [activeTab, setActiveTab] = useState<EventTab>("current")
  const [search, setSearch] = useState("")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  /* ---------------- CURRENT EVENTS ---------------- */
  const currentEvents: EventItem[] = [
    {
      id: 1,
      title: "Winter Fest 2025",
      description:
        "Ongoing celebration with cultural performances, music, and fun activities for the entire house community.",
      date: "Dec 23–27, 2025",
      location: "House Common Area",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1200&fit=crop",
      status: "Live Now",
    },
    {
      id: 2,
      title: "Chess Tournament Finals",
      description:
        "The final matches of our inter-house chess championship are being played this week.",
      date: "Dec 25–26, 2025",
      location: "Games Room",
      image:
        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=1200&fit=crop",
      status: "In Progress",
    },
  ]

  /* ---------------- UPCOMING EVENTS ---------------- */
  const upcomingEvents: EventItem[] = [
    {
      id: 3,
      title: "New Year Gala 2026",
      description:
        "Ring in the new year with an elegant gala featuring live music, dinner, and dancing.",
      date: "Dec 31, 2025",
      location: "Main Hall",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1200&fit=crop",
      category: "Cultural",
    },
    {
      id: 4,
      title: "AI/ML Workshop",
      description:
        "Hands-on workshop on latest AI developments and machine learning techniques.",
      date: "Jan 8, 2026",
      location: "Tech Lab",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1200&fit=crop",
      category: "Academic",
    },
  ]

  /* ---------------- PAST EVENTS ---------------- */
  const pastEvents: EventItem[] = [
    // All previous past events (id: 23 to 5) go here, unchanged
    {
      id: 23,
      title: "AES Full Syllabus Revision",
      date: "17 December 2025",
      image: "/images/events/19.png",
      description: (
        <>
          A complete revision session for Analog Electronic Systems (AES) was successfully conducted.
          A full-syllabus revision session for Analog Electronic Systems (AES) was successfully conducted to help students strengthen their conceptual understanding and reinforce key topics. Held on Wednesday, 17th December, the session was led by Venkata Subhash, who guided participants through the entire syllabus with structured explanations and focused discussions.
          The session addressed commonly challenging areas, clarified important concepts, and provided targeted problem-solving insights. Students also benefited from dedicated doubt-resolution segments, where pre-submitted questions and conceptual difficulties were discussed in detail.
          Overall, the revision session proved to be highly effective in consolidating learning, improving confidence, and helping students prepare more strategically for AES assessments.
        </>
      ),
    },
    {
      id: 22,
      title: "AI GENESIS – Careers in Agentic AI",
      date: "15 November 2025",
      image: "/images/events/18.png",
      description: (
        <>
          Career-focused session on opportunities in Agentic AI. The session provided participants with clarity and direction, helping them align their technical learning with real-world opportunities. As the final chapter of the AI GENESIS series, the event served as a fitting conclusion, inspiring learners to explore meaningful and future-ready careers in intelligent systems and AI innovation.
          <br />
          Recording Link:{" "}
          <a
            href="https://youtu.be/VL454gd-obw?si=TjRnbUo6ng_H51Zd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Watch Here
          </a>
        </>
      ),
    },
    // Continue copying all previous pastEvents from id 21 to 5
     {
    id: 21,
    title: "Nostalgia Night",
    date: "14 November 2025",
    image: "/images/events/17.png",
    description: (
      <>
        A fun interactive night revisiting childhood memories. The nostalgic interactive session organized by Nallamala House in collaboration with Veritas Oratory Society took participants on a joyful trip down memory lane. Held on 14th November, the event brought together students for an evening filled with laughter, shared memories, and light-hearted conversations about childhood and school days.
        Through engaging activities such as Never Have I Ever, Truth or Dare, rapid-fire nostalgic debates, and open storytelling, participants relived their funniest classroom moments, embarrassing mishaps, and unforgettable school experiences. The session created a relaxed and inclusive space where stories flowed freely and laughter echoed throughout the virtual room.
        More than just a fun gathering, the event fostered connection, camaraderie, and shared joy, reminding everyone of the simple moments that shaped their early years. The session concluded on a cheerful note, leaving participants smiling, bonded by memories, and warmed by a sense of collective nostalgia.

      </>
    ),
  },
  {
    id: 20,
    title: "AI GENESIS – Agentic AI Framework",
    date: "12 November 2025",
    image: "/images/events/16.png",
    description: (
      <>
        Hands-on session on building Agentic AI frameworks.AI GENESIS, an initiative by Nallamala , Nilgiri, and Sundarbans Houses in collaboration with CodeCrafters, successfully continued its learning journey with Session 2, following the strong response to its introductory session on AI Agents. This session shifted the focus from theory to hands-on learning, offering participants a practical deep dive into Agentic AI.
Conducted on 12th November, the session titled “Learning Agentic AI by Building an Agentic AI Framework” was led by Siddhant Pandey, an AI Research Engineer at Codebasics. Participants were guided through the core principles of agentic systems by actively building an Agentic AI framework, helping them understand how intelligent agents are designed, structured, and deployed in real-world applications.
The session proved to be highly engaging and skill-oriented, enabling learners to bridge the gap between conceptual understanding and practical implementation. As part of the AI GENESIS series, this event strengthened participants’ confidence in working with modern AI paradigms and reinforced the series’ goal of preparing learners for the next wave of artificial intelligence.
Recording Link : https://youtu.be/6kmVEGWJGJc?si=SsbTmyeDaPqs2pDp

      </>
    ),
  },
  {
    id: 19,
    title: "AI GENESIS – Intro to AI Agents",
    date: "10 November 2025",
    image: "/images/events/15.png",
    description: (
      <>
        Introductory session on AI Agents featuring Dr. Dhaval Mehta. AI GENESIS marked the beginning of an insightful learning series focused on the rapidly evolving field of AI Agents. Organized by Nilgiri, Sundarbans, and Nallamala Houses in collaboration with CodeCrafters, the inaugural session introduced participants to one of the most significant emerging trends in artificial intelligence.
        The kickoff session, titled “Intro to AI Agents”, was conducted on 10th November and featured Dr. Dhaval Mehta as the guest speaker. The session broke down the fundamental concepts of AI agents, helping participants understand their structure, capabilities, and real-world relevance. Dr. Mehta’s clear explanations and practical insights made complex ideas accessible to learners from diverse technical backgrounds.
        The event successfully set the foundation for the AI GENESIS series, sparking curiosity and enthusiasm among attendees. It empowered participants with a strong conceptual starting point to explore the future potential of AI agents and emerging intelligent systems.
        Recording link : https://youtu.be/esmuGxoiBJA?si=abaRV3rYWOJzlruq
      </>
    ),
  },
  {
    id: 18,
    title: "Python OPPE Discussion Session",
    date: "7 November 2025",
    image: "/images/events/14.png",
    description: (
      <>
        A focused discussion session clarifying Python OPPE concepts. Nallamala House successfully conducted a focused Python OPPE Discussion Session on 7th November, aimed at helping students clarify key concepts and strengthen their exam readiness. The session featured in-depth discussions on important OPPE topics along with practical insights to enhance conceptual understanding.
      Participants actively engaged by raising doubts, revisiting core Python concepts, and discussing effective problem-solving strategies. The structured format ensured efficient coverage of essential topics, while a dedicated doubt-solving segment helped address individual queries.
      The session concluded on a motivating note, emphasizing the importance of strong conceptual clarity over rote learning. Overall, the discussion proved to be a productive and confidence-boosting experience for students preparing for the Python OPPE.

      </>
    ),
  },
  {
    id: 17,
    title: "JANMANTHAN: Bihar Edition",
    date: "3 November 2025",
    image: "/images/events/13.png",
    description: (
      <>
        A youth dialogue unpacking political manifestos and governance priorities.JANMANTHAN: Bihar Edition was a thought-provoking youth dialogue organized by Nallamala House in collaboration with Veritas, creating a platform where ideas met impact and young voices led meaningful conversations on Bihar’s future. Held on 3rd November 2025, the event brought together participants for in-depth discussions on political manifestos, public promises, and governance priorities.
      Through structured debates and collaborative sessions, participants critically unpacked manifestos to understand their real-world implications, engaged in open discussions to share diverse perspectives, and collectively contributed to shaping a People’s Manifesto that reflected youth aspirations. The event encouraged informed dialogue, civic awareness, and constructive engagement, empowering attendees to think critically and voice their opinions with confidence.

      </>
    ),
  },
  {
    id: 16,
    title: "Unraveling Nature’s Code through Quantum Computing",
    date: "16 October 2025",
    image: "/images/events/12.png",
    description: (
      <>
        A speaker session by Dr. Monika Aggarwal (IIT Delhi) on quantum computing and natural systems. Nallamala House, in collaboration with the Nature Nurture Society, successfully hosted an insightful speaker session titled “Unraveling Nature’s Code through Quantum Computing”, delivered by Dr. Monika Aggarwal, Professor at IIT Delhi. Conducted on 16th October 2025, the session provided participants with a deep dive into how quantum computing is transforming the understanding of natural systems and complex phenomena.
        During the session, Dr. Aggarwal shared her extensive expertise in Quantum Computing, 5G technologies, defence systems, and underwater communications, effectively bridging theoretical concepts with impactful real-world research. The discussion encouraged students to move beyond textbook learning and explore the practical applications of advanced technologies.
        A key highlight of the event was the focus on research collaboration opportunities, offering aspiring innovators a chance to engage with cutting-edge research initiatives. The session concluded as a highly enriching and motivating experience, leaving participants inspired and better equipped to explore future technological frontiers.


      </>
    ),
  },
  {
    id: 15,
    title: "Navrang 2.0",
    date: "23 Sept – 1 Oct",
    image: "/images/events/11.png",
    description: (
      <>
        A vibrant Navratri celebration across 9+ cities with garba, dandiya, and festive energy. Navrang 2.0 was a vibrant Navratri celebration curated by Boundless, bringing together music, dance, and festive traditions across 9+ cities in India. Conducted from 23rd September to 1st October, the event transformed cities into hubs of color, rhythm, and cultural energy. From energetic garba circles to the electrifying beats of dandiya, Navrang 2.0 created unforgettable festive nights filled with joy, togetherness, and celebration.
        The initiative served as a tribute to community spirit and cultural unity, celebrating the essence of Navratri through shared stories, traditions, and joyful gatherings. Cities including Mumbai, Delhi, Hyderabad, Nagpur, Kolkata, Jaipur, Ahmedabad, Lucknow, and Patna came alive with festive enthusiasm. Adding to its nationwide reach, People’s Choice additions—Gorakhpur, Jamshedpur, Chennai, and Indore—made Navrang 2.0 even more inclusive and community-driven.Navrang 2.0 successfully captured the true spirit of Navratri by fostering connection, cultural pride, and collective celebration. The event left participants with lasting memories and strengthened the bond between communities through the universal language of music, dance, and tradition.

      </>
    ),
  },
  {
    id: 14,
    title: "Noor-e-Sama 2.0",
    date: "Virtual Event",
    image: "/images/events/10.png",
    description: (
      <>
        A virtual evening celebrating Shayari and spoken poetry through powerful performances.Noor-e-Sama 2.0, organized by the Literary and Oratory Community of Nallamala House, was a captivating virtual evening that celebrated the timeless beauty of Shayari and spoken poetry. The event provided a मंच (stage) where classical ghazals met contemporary expressions, creating a harmonious blend of tradition and modern thought. Poets and poetry enthusiasts from diverse backgrounds came together to share verses that resonated with emotion, reflection, and creativity.Throughout the evening, the audience was immersed in an atmosphere of rhythm, passion, and meaningful dialogue, as each performance added depth to the collective experience. Noor-e-Sama 2.0 was more than just a poetry session—it was a space where words became lanterns, emotions found expression, and silence discovered its voice. The event successfully fostered a sense of connection and artistic appreciation, leaving participants inspired and deeply moved by the power of spoken word.

      </>
    ),
  },
  {
    id: 13,
    title: "Tri-Color Trails 2.0",
    date: "6–14 August",
    image: "/images/events/9.png",
    description: (
      <>
        A nationwide cultural initiative spanning 12 cities across 11 states, celebrating unity in diversity.Tri-Color Trails 2.0 was a nationwide travel and cultural initiative that spanned 12 cities across 11 states, united by one shared spirit of India. Conducted during Independence Week from August 6 to August 14, the journey explored both iconic destinations and hidden gems, bringing people together through shared moments, memories, and cultural experiences. More than a celebration of the tricolor, the event lived its true meaning by immersing participants in the stories, streets, and traditions of diverse states. Presented by Boundless, in collaboration with Sundarbans and Nallamala, Tri-Color Trails 2.0 stood as a celebration of unity in diversity and the collective spirit of the nation.

      </>
    ),
  },
  {
    id: 12,
    title: "3-Day Python OPPE Revision Bootcamp",
    date: "17–19 July",
    image: "/images/events/8.png",
    description: (
      <>
        A 3-day intensive Python OPPE revision bootcamp featuring structured sessions, hands-on practice, and expert guidance.We successfully conducted a 3-Day Python OPPE Revision Bootcamp from 17th to 19th July, aimed at helping students strengthen their coding fundamentals and build confidence for the OPPE. The bootcamp featured structured revision sessions, hands-on practice with expert guidance, and exclusive practice sheets to reinforce key concepts.Over three interactive days, participants engaged in focused learning, problem-solving, and collaborative discussions, making it a valuable and enriching experience. The event provided an excellent opportunity for learners to revise effectively, enhance their Python skills, and connect with like-minded peers in their OPPE preparation journey.

      </>
    ),
  },
  {
    id: 11,
    title: "The Science of Self: Insights from the Bhagavad Gita",
    date: "Apr 23, 2025",
    location: "Online",
    image: "/images/events/7.png",
    description: (
      <>
        A reflective speaker session exploring self-awareness, consciousness, and mind power. The speaker session on “The Science of Self: Insights from the Bhagavad Gita”, featuring Rohith Bhogadi, Founder of Sarathi Academy, was successfully conducted on April 23, 2025.
        The session offered a unique exploration of the self and consciousness by presenting the teachings of the Bhagavad Gita through a scientific and rational perspective. Participants gained valuable insights into mind power, inner clarity, and self-awareness, while understanding how ancient wisdom can be interpreted and applied in a modern context.
        By bridging spiritual philosophy with scientific thought, the session encouraged deep reflection and meaningful discussion, leaving attendees with a renewed understanding of the self and practical tools for personal growth.

        https://www.youtube.com/live/dhjsLk7hob4?si=v9l8V9A4_UqDHtCc
        https://www.youtube.com/live/KppLybJzRzw?si=c-d_Ty74e97isNZi

      </>
    ),
  },
  {
    id: 10,
    title: "DataSphere: Mastering Big Tech & GenAI",
    date: "Apr 19, 2025",
    location: "Online",
    image: "/images/events/6.png",
    description: (
      <>
        A speaker session offering deep insights into Big Data, AI, and Generative AI. The speaker session “DataSphere: Mastering Big Tech & GenAI” was successfully conducted on April 19, 2025, offering participants a deep dive into the evolving world of Big Data, Artificial Intelligence, and Generative AI.
        Led by Nishchay Agrawal, Senior Data Engineer at Walmart, the session provided valuable insights into building a successful career in top tech companies. Drawing from his extensive industry experience, the speaker discussed essential skills for data and AI roles, career transition strategies, and the real-world application of cutting-edge technologies such as Databricks, Delta Lake, and LangChain.
        Participants gained clarity on career pathways in Big Data and GenAI, understood current industry trends, and engaged actively during the interactive Q&A session, making the event both informative and engaging. The session proved to be a valuable learning experience for aspiring data professionals looking to break into leading tech organizations.

      </>
    ),
  },
  {
    id: 9,
    title: "Ethical Hacking Workshop",
    date: "Apr 15–16, 2025",
    location: "Hybrid",
    image: "/images/events/5.png",
    description: (
      <>
        An intensive 2-day hands-on workshop introducing participants to ethical hacking, penetration testing, cybersecurity, and live hacking demonstrations.
      The Ethical Hacking Workshop, organized by Nallamala House in collaboration with SparkIIT Edutech LLP, was successfully conducted as an intensive 2-day hands-on learning experience on April 15–16, 2025.
        The workshop provided participants with practical exposure to the rapidly evolving field of cybersecurity. Sessions covered essential domains such as ethical hacking, penetration testing, network and web security, cyber forensics, and live hacking demonstrations, enabling learners to understand real-world cyber threats and defensive strategies.
        With a strong focus on practical labs and real-world scenarios, the workshop allowed participants to learn directly from industry experts while actively engaging in interactive discussions and Q&A sessions. The program concluded with participants receiving certificates of completion, recognizing their newly acquired skills and knowledge in ethical hacking practices.
        For those who missed the live sessions or wish to revisit the content, the workshop recordings are available:
        Day 1 Recording: https://www.youtube.com/live/PnMSxVWJ454?si=ACHqybg4dYlS1fiC
        Day 2 Recording: https://www.youtube.com/live/eIngPdmZj1Q?si=c52zCtk7lXeh26VR

      </>
    ),
  },
  {
    id: 8,
    title: "Bio.pptx 1.0",
    date: "Mar 18 – Apr 8, 2025",
    location: "Online",
    image: "/images/events/4.png",
    description: (
      <>
        A term-wise presentation competition fostering research-driven thinking and scientific communication. Participants explored topics at the intersection of biology, space sciences, and sustainability, encouraging interdisciplinary learning and innovation.
      Bio.pptx 1.0 was successfully organized by the Nature Nurture Society, in collaboration with AVASYA: The Aero Society and Nallamala House, as a term-wise presentation competition held from March 18 to April 8, 2025.
      The event aimed to foster research-driven thinking and effective scientific communication among students by challenging participants to explore complex concepts at the intersection of biology, space sciences, and sustainability. Through well-structured PowerPoint presentations, participants analyzed critical scientific questions and presented their findings with clarity and creativity.
      Topics ranged from the origin of life and exoplanet habitability to biosignatures and the possibility of alien life, encouraging interdisciplinary learning and innovation. With a ₹1,800 prize pool, Bio.pptx 1.0 successfully motivated participants to engage deeply with scientific inquiry while enhancing their presentation and analytical skills.

      </>
    ),
  },
  {
    id: 7,
    title: "Talk-Sick Night",
    date: "Apr 4, 2025",
    location: "House Common Area",
    image: "/images/events/3.png",
    description: (
      <>
        An evening packed with laughter, stories, and unforgettable moments. Participants shared hilarious, embarrassing, and unbelievable experiences in a relaxed and inclusive storytelling space that celebrated genuine expression and connection.
      The Talk-Sick Night wrapped up as an evening full of laughter, stories, and unforgettable moments on April 4, 2025.
      From hilarious and embarrassing tales to unbelievable experiences that felt straight out of a movie, participants took the stage to speak, write, and own their stories. The event created a relaxed and inclusive space where everyone felt comfortable sharing—whether narrating their own story or having it brought to life on their behalf.
      With its fun, interactive storytelling format, zero pressure, and high entertainment value, Talk-Sick Night became a platform for genuine expression and connection. Attendees not only enjoyed a night of pure entertainment but also walked away with shared laughs, new friendships, and truly legendary moments.

      </>
    ),
  },
  {
    id: 6,
    title: "Abstract Allegory – The Final Showdown",
    date: "Mar 6, 2025",
    location: "House Auditorium",
    image: "/images/events/2.png",
    description: (
      <>
        A captivating celebration of creativity and spontaneous storytelling. Using abstract paintings as prompts, participants delivered impromptu narrations, blending visual art with expressive oration and sparking engaging discussions.
      Abstract Allegory – The Final Showdown concluded as a captivating celebration of creativity, imagination, and spontaneous storytelling on March 6, 2025.
      With abstract paintings as their only prompts, participants took part in a thrilling live impromptu narration round, crafting compelling stories on the spot and bringing visual art to life through words. The event showcased a wide range of interpretations, sparking engaging discussions and highlighting the beauty of diverse perspectives.
      The showdown stood as a unique fusion of art and oration, where visuals met narratives to create an unforgettable experience. Even the audience was drawn into the excitement, witnessing the power of instant creativity and expressive storytelling unfold live.

      </>
    ),
  },
  {
    id: 5,
    title: "Speaker Session: The Future of Digital Marketing",
    date: "Mar 21, 2025",
    location: "House Auditorium",
    image: "/images/events/1.png",
    description: (
      <>
        An insightful speaker session featuring Sujata Hansda on digital marketing trends, AI, automation, and future career opportunities.
      Nallamala House successfully organized an insightful speaker session on “The Future of Digital Marketing” featuring Sujata Hansda, Marketing Strategist and Copywriter, on March 21, 2025.
      The session provided participants with a comprehensive understanding of the rapidly evolving digital marketing landscape. Key discussions focused on emerging trends, the growing role of AI, automation, and data-driven strategies, as well as the skills and career opportunities essential for the future of marketing.
      Attendees gained valuable insights into how businesses are adapting to digital transformation and learned practical perspectives directly from industry experience. The interactive nature of the session made it highly engaging and informative, leaving participants better equipped to navigate future challenges in the digital marketing domain.

      </>
    ),
  },
  {
      id: 24,
      title: "Chapters Unlocked",
      date: "18 February 2024",
      image: "/images/events/20.png",
      description: (
        <>
          Chapters Unlocked marked the inaugural ceremony and book talk session of our literary journey, held as an engaging virtual event on Google Meet. The session featured an insightful conversation with Ms. Riya Jhamb, who shared her perspectives on storytelling, reading culture, and her latest literary work. Participants had the opportunity to dive deep into discussions on literature, exchange ideas with fellow book lovers, and engage in meaningful conversations in a warm and inclusive environment. With Ms. Riya’s vibrant Instagram community of over 20,000 readers, the event successfully brought together a diverse audience united by a love for books. The session concluded as an enriching and inspiring experience, setting the tone for many more literary conversations to come.
        </>
      ),
    },
    {
    id: 25,
    title: "Harry Potter: Watch Party",
    date: "29 March 2024 | 7:00 PM",
    image: "/images/events/21.png",
    description: (
      <>
        The Harry Potter: Watch Party was a magical movie night where participants stepped into the enchanting world of Harry Potter and the Philosopher’s Stone. The virtual screening brought together Potterheads to relive the wonder of Hogwarts School of Witchcraft and Wizardry.
        <br />
        As Harry, Ron, and Hermione embarked on their unforgettable journey, viewers experienced themes of friendship, bravery, and the enduring power of love. The event witnessed an overwhelming response, with over 172 participants tuning in, making it a memorable and highly successful community gathering.
        <br />
        Filled with nostalgia, excitement, and shared moments of magic, the watch party truly celebrated the timeless charm of the wizarding world. 🪄🍿✨
      </>
    ),
  },
  {
    id: 26,
    title: "Dastaan-e-Alfaaz",
    date: "Weekly Series 2024",
    image: "/images/events/22.png",
    description: (
      <>
        Dastaan-e-Alfaaz is a poetic Urdu phrase that translates to “Story of Words.” It represents the art of weaving emotions, experiences, and imagination into verses that resonate far beyond their surface meaning.
        <br />
        Chapters & Verses proudly presents the Dastaan-e-Alfaaz series—an ongoing literary initiative that brings soulful Urdu shayari to your Sundays. Each edition features thoughtfully crafted verses by our talented community members, celebrating the beauty and depth of expression through words.
        <br />
        Join us on Instagram as we paint a canvas of emotions with every carefully chosen line, inviting you to pause, reflect, and feel. ✨ Anticipate the magic—unfolding weekly. 💫
      </>
    ),
  },
  {
    id: 27,
    title: "Unscripted Pages",
    date: "24 November 2024 | 8:00 PM",
    image: "/images/events/23.png",
    description: (
      <>
        Unscripted Pages was a collaborative literary competition designed to celebrate creative writing, expression, and presentation. The event unfolded across two rounds, beginning with written submissions based on given themes. Shortlisted participants then advanced to a live Google Meet session, where finalists presented their work and brought their words to life.
        <br />
        The competition fostered confidence, creativity, and meaningful literary exchange, making it an engaging and memorable experience for all involved.
      </>
    ),
  },
  {
    id: 28,
    title: "Noor-e-Sama — A Night of Shayari",
    date: "5 February 2025",
    image: "/images/events/24.png",
    description: (
      <>
        Noor-e-Sama was an enchanting evening curated by Chapters & Verses, the Literary and Oratory Club of Nallamala House, celebrating the luminous art of Shayari. The event featured heartfelt recitations of both classic and contemporary Shayaris by passionate poets and poetry enthusiasts.
        <br />
        The night brought together lovers of eloquent expression, offering a space to reflect, feel, and connect through words. From seasoned Shayari connoisseurs to first-time listeners, Noor-e-Sama left the audience inspired, moved, and immersed in the timeless beauty of poetry.
      </>
    ),
  },
  {
  id: 29,
  title: "TECHTALK: AI Innovators & Data Wizards (AIDW)",
  date: "18 March 2025",
  image: "/images/events/25.png",
  description: (
    <>
      AIDW – IIT Madras successfully concluded with an engaging session on “GenAI in SEEK” featuring Prem Kumar Sharma. The session explored how generative AI is transforming learning platforms and software engineering practices.
      <br />
      Key discussions focused on AI-powered doubt resolution, automated debugging for coding assignments, and instant course support using Retrieval-Augmented Generation (RAG). The interactive nature of the session encouraged meaningful discussions and practical takeaways for participants.
      <br />
      The event was enriched by active participation from attendees and valuable insights shared by the speaker, making it both informative and impactful. AIDW looks forward to hosting more such knowledge-driven sessions in the future.
    </>
  ),
},
{
  id: 30,
  title: "DataSphere: Mastering Big Tech & GenAI",
  date: "19 April 2025",
  image: "/images/events/26.png",
  description: (
    <>
      The speaker session was successfully conducted featuring Nischay Agarwal, Senior Data Engineer at Walmart. The session provided participants with valuable insights into building careers in data engineering, AI, and big tech ecosystems.
      <br />
      Attendees gained clarity on industry expectations, essential skills required for data and AI roles, and practical guidance on navigating career paths in leading tech companies. The session also featured an engaging interactive Q&A, where participants received direct advice and real-world perspectives from the speaker.
      <br />
      The event witnessed active participation and meaningful discussions, making it an insightful and enriching experience for all attendees. AIDW Club looks forward to organizing more such industry-focused sessions in the future.
    </>
  ),
},
{
  id: 31,
  title: "From Theory to Practice: The Journey of a Data Scientist",
  date: "2 October 2024",
  image: "/images/events/27.png",
  description: (
    <>
      The session was successfully conducted featuring Mr. Manish Mazumder, an ML Engineer and Data Scientist and an IIT Kanpur alumnus. The session offered participants valuable insights into the transition from academic learning to real-world applications in the data science industry.
      <br />
      Mr. Mazumder shared his professional journey, highlighting practical challenges, industry expectations, and the skills required to succeed in machine learning and data science roles. The interactive discussion allowed learners to engage directly with the speaker, gaining clarity on career paths, real-world problem-solving, and industry best practices.
      <br />
      The session witnessed enthusiastic participation and thoughtful interactions, making it an inspiring and informative experience for all attendees. AIDW Club looks forward to hosting more such knowledge-driven sessions in the future.
    </>
  ),
},
{
  id: 32,
  title: "DSA Triathlon 2.0",
  date: "Paradox, IIT Madras BS",
  image: "/images/events/28.png",
  description: (
    <>
      DSA Triathlon 2.0 was successfully conducted in Paradox, the technical and coding ecosystem of IIT Madras BS, in collaboration with Shunya and Nallamala House.
      <br />
      Powered by Innovation Labs | FetchAI, the event followed a three-level competitive format and featured carefully curated Data Structures and Algorithms problems. The challenges were designed to assess participants’ problem-solving abilities, logical reasoning, and coding efficiency across varying difficulty levels.
      <br />
      The event witnessed active participation from students and fostered a competitive yet engaging learning environment, contributing to the growth of technical skills and competitive programming culture within Paradox.
    </>
  ),
},
{
  id: 33,
  title: "Tech Discussion Session with Vanshika Pandey",
  date: "17 March 2024",
  image: "/images/events/29.png",
  description: (
    <>
      An exclusive tech discussion session with Vanshika Pandey was successfully conducted by Shunya. The session focused on careers in technology and software development, offering valuable insights into navigating the rapidly evolving tech industry.
      <br />
      Vanshika Pandey, currently working as a Software Development Engineer at JP Morgan Chase, shared her professional journey and practical guidance for students aiming to build strong careers in tech.
      <br />
      With expertise spanning technologies such as Python, JavaScript, ReactJS, AngularJS, Git/GitHub, C++, and more, the session proved to be both informative and engaging. Participants actively interacted and gained clarity on skill development, industry expectations, and career growth strategies.
      <br />
      The event fostered meaningful learning and mentorship, reflecting Shunya’s commitment to creating impactful technical discussions and knowledge-sharing opportunities for students.
    </>
  ),
},
{
  id: 34,
  title: "Seminar Session with Akshaj Padmakar",
  date: "11th February 2024",
  image: "/images/events/30.png",
  description: (
    <>
      A seminar session featuring Akshaj Padmakar was successfully conducted by Shunya – The Coding and Developers Club.
      <br />
      Akshaj Padmakar, former Competitive Coding Head at IIT Guwahati and an upcoming Product Engineer at Sprinklr, shared valuable insights from his academic and professional journey. The session focused on competitive programming, product engineering, and navigating career paths in the tech industry.
      <br />
      The discussion catered to both beginners and experienced learners, offering practical advice, real-world perspectives, and motivation for students aspiring to grow in technology and engineering roles. Participants actively engaged during the session, making it an informative and enriching experience.
      <br />
      The event reflected Shunya’s continued efforts to bring industry-relevant knowledge and meaningful learning opportunities to students. Grandmaster's Guild - Nallamala House official chess community.
    </>
  ),
},

  ];

   /* ---------------- HELPER: Parse Dates ---------------- */
  const parseEventDate = (dateStr: string) => {
    // Try to extract a parsable date, fallback to 1970 if invalid
    const match = dateStr.match(/\d{1,2} [A-Za-z]+ \d{4}/) // e.g., "18 March 2025"
    if (match) return new Date(match[0])
    // Fallback: try year only
    const yearMatch = dateStr.match(/\d{4}/)
    return yearMatch ? new Date(Number(yearMatch[0]), 0, 1) : new Date(1970, 0, 1)
  }

  /* ---------------- SORT EVENTS NEWEST TO OLDEST ---------------- */
  const sortedCurrentEvents = [...currentEvents].sort(
    (a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime()
  )
  const sortedUpcomingEvents = [...upcomingEvents].sort(
    (a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime()
  )
  const sortedPastEvents = [...pastEvents].sort(
    (a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime()
  )

  /* ---------------- FILTERED EVENTS BASED ON TAB & SEARCH ---------------- */
  const events =
    activeTab === "current"
      ? sortedCurrentEvents
      : activeTab === "upcoming"
      ? sortedUpcomingEvents
      : sortedPastEvents

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 right-20 w-80 h-80 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-primary/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-2 pt-24 pb-20">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Our Events</p>
          <h1 className="text-5xl font-serif font-bold text-white mb-4">
            House <span className="text-primary">Events</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Discover events and activities that bring our community together
          </p>

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-14 flex-wrap">
          {(["current", "upcoming", "past"] as EventTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab
                  ? "bg-primary text-black"
                  : "text-white/70 border border-white/10 hover:border-primary/40"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="transition-all duration-300 flex flex-col rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
            >
              <div
                className="relative h-[420px] bg-black overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(event.image)}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {event.status && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-500 text-white">{event.status}</Badge>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>

                <div
                  className={`text-white/70 text-sm leading-relaxed mb-3 flex-1 transition-all ${
                    expandedId === event.id ? "" : "line-clamp-3"
                  }`}
                >
                  {event.description}
                </div>

                <div className="flex items-center gap-2 text-white/60 text-sm mb-4 pt-3 border-t border-white/10">
                  <Calendar size={16} className="text-primary" />
                  <span>{event.date}</span>
                  {event.location && (
                    <>
                      <span>•</span>
                      <span>{event.location}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    onClick={(e) => e.stopPropagation()}
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      event.title
                    )}&details=${encodeURIComponent(
                      typeof event.description === "string" ? event.description : event.title
                    )}&location=${encodeURIComponent(event.location || "")}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg text-white/70 hover:text-white transition text-sm"
                  >
                    <Calendar size={16} />
                    Add to Calendar
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigator.share?.({
                        title: event.title,
                        text:
                          typeof event.description === "string"
                            ? event.description
                            : event.title,
                      })
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg text-white/70 hover:text-white transition"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Event Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-black border border-white/10 rounded-xl max-w-2xl w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-white/60 hover:text-white text-xl"
            >
              ✕
            </button>

            <div className="relative h-[300px] bg-black">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h2>
              <div className="text-white/70 mb-4">{selectedEvent.description}</div>
              <div className="text-white/60 text-sm">
                {selectedEvent.date} {selectedEvent.location && <>• {selectedEvent.location}</>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-primary transition p-2 bg-black/50 rounded-full"
            >
              <X size={32} />
            </button>
            <Image
              src={selectedImage}
              alt="Event image"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
