"use client"

import { useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Props {
  user: any
}

export default function UserAvatar({ user }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const avatarUrl = user?.user_metadata?.avatar_url
  const fullName = user?.user_metadata?.full_name || user?.email
  const initials = fullName?.[0]?.toUpperCase()

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex items-center justify-center bg-black"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        ) : (
          <span className="text-primary font-bold">{initials}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 glass-dark border border-primary/30 rounded-xl shadow-xl overflow-hidden">
          <button
            onClick={() => router.push("/profile")}
            className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/5"
          >
            Profile
          </button>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 text-red-400 hover:bg-white/5"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}