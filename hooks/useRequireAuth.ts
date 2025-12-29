"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { signInWithGoogle } from "@/lib/auth"

export function useRequireAuth(nextPath: string) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        signInWithGoogle(nextPath)
      } else {
        setAuthenticated(true)
      }
      setLoading(false)
    })
  }, [nextPath])

  return { loading, authenticated }
}