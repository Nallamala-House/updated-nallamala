import { supabase } from "@/lib/supabase/client"

export async function signInWithGoogle(nextPath?: string) {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback${
        nextPath ? `?next=${nextPath}` : ""
      }`,
      queryParams: {
        hd: "ds.study.iitm.ac.in", // IITM domain hint
      },
    },
  })
}