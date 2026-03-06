"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { LoadingCube } from "@/components/loading-cube"
import { Send, User, ShieldAlert } from "lucide-react"

// Types for our local mock storage
type QueryMessage = {
  id: string
  text: string
  sender: "user" | "admin" | "system"
  timestamp: string
}

export default function Queries() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const loading = status === "loading"

  const [messages, setMessages] = useState<QueryMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isClientLoaded, setIsClientLoaded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch queries from backend
  const fetchQueries = async () => {
    try {
      const res = await fetch(`/api/queries`)
      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const json = await res.json()
        if (json.success) {
          // Map backend queries to QueryMessage format
          const msgs: QueryMessage[] = []


          json.data.forEach((queryThread: any) => {
            if (queryThread.messages && Array.isArray(queryThread.messages)) {
              queryThread.messages.forEach((msg: any) => {
                msgs.push({
                  id: msg._id || Math.random().toString(),
                  text: msg.text,
                  sender: msg.sender,
                  timestamp: msg.timestamp
                })
              })
            }
          })

          // Sort backend messages by timestamp
          msgs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

          // Only add the greeting if it's a completely new user with no history
          if (msgs.length === 0) {
            msgs.unshift({
              id: 'greeting',
              text: "Hi, how are you and how can we help you today?",
              sender: "system",
              timestamp: new Date().toISOString()
            })
          }

          setMessages(msgs)
        }
      } else {
        console.error("Failed to fetch queries: Received non-JSON response")
      }
    } catch (error) {
      console.error("Failed to fetch queries:", error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchQueries()
    }
    setIsClientLoaded(true)
  }, [isAuthenticated, session])

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !session?.user?.email) return

    const questionText = inputValue.trim()
    setInputValue("")

    // Optimistically add to UI, remove greeting if it was there
    setMessages(prev => {
      const filtered = prev.filter(m => m.id !== 'greeting');
      return [...filtered, {
        id: Date.now().toString(),
        text: questionText,
        sender: "user",
        timestamp: new Date().toISOString()
      }];
    })

    try {
      const res = await fetch(`/api/queries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: questionText })
      })

      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const json = await res.json()
        if (!json.success) {
          console.error("Failed to send query:", json.message)
        } else {
          fetchQueries()
        }
      } else {
        console.error("Failed to send query: Received non-JSON response")
      }
    } catch (error) {
      console.error("Error sending query:", error)
    }
  }

  // Prevent UI flickering while checking session
  if (loading || !isClientLoaded) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingCube />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-24 pb-8 max-w-5xl mx-auto w-full animate-in fade-in duration-700">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Student <span className="text-primary">Queries</span></h1>
          <p className="text-white/60">Ask questions and our team will get back to you.</p>
        </div>

        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center animate-in slide-in-from-bottom-8 duration-700">
            <div className="glass p-12 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-black/40 backdrop-blur-md text-center max-w-md w-full hover:border-primary/40 transition-colors">
              <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <ShieldAlert className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">Authentication Required</h2>
              <p className="text-white/70 mb-8">
                Please sign in with your IIT Madras account to ask questions.
              </p>
              <Button
                onClick={() => router.push('/signin')}
                className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-6 rounded-xl transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Sign In to Access
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 glass border border-primary/20 rounded-2xl overflow-hidden flex flex-col bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.05)]">

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent pr-2">
              {messages.map((msg, index) => {
                const isUser = msg.sender === "user"
                const isSystem = msg.sender === "system"
                const showPendingAdminBadge = isUser && index === messages.length - 1

                return (
                  <div key={msg.id} className={`flex flex-col animate-in slide-in-from-bottom-2 fade-in duration-500 fill-mode-both ${isUser ? 'items-end' : isSystem ? 'items-center' : 'items-start'}`} style={{ animationDelay: `${index * 50}ms` }}>
                    <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-lg ${isUser
                      ? 'bg-primary text-black rounded-br-sm'
                      : isSystem
                        ? 'bg-white/5 border border-white/10 text-white/80 rounded-2xl text-center text-sm italic py-3'
                        : 'glass-dark border border-primary/30 text-white rounded-bl-sm'
                      }`}>
                      {!isUser && !isSystem && (
                        <div className="flex items-center gap-2 mb-2 text-primary text-xs font-bold uppercase tracking-wider overflow-hidden">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] shrink-0">
                            🛠️
                          </div>
                          Nallamala Admin
                        </div>
                      )}

                      <p className={`text-sm sm:text-base whitespace-pre-wrap ${isUser ? 'font-medium' : isSystem ? '' : 'leading-relaxed'}`}>
                        {msg.text}
                      </p>

                      {!isSystem && (
                        <div className={`text-[10px] mt-2 ${isUser ? 'text-black/60 text-right' : 'text-white/40 text-left'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>

                    {showPendingAdminBadge && (
                      <div className="mt-2 mr-2 text-[10px] font-bold tracking-widest uppercase text-primary/70 animate-pulse flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                        Pending Admin Response
                      </div>
                    )}
                  </div>
                )
              })}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-primary/20 bg-black/60">
              <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-4 max-w-4xl mx-auto">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question here..."
                  className="flex-1 bg-white/5 border border-white/10 focus:border-primary/50 rounded-xl px-4 py-3 sm:py-4 text-white placeholder-white/40 outline-none transition-colors"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-primary hover:bg-primary/90 text-black rounded-xl px-4 sm:px-6 h-auto"
                >
                  <Send className="w-5 h-5 sm:mr-2" />
                  <span className="hidden sm:inline font-bold">Send</span>
                </Button>
              </form>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}