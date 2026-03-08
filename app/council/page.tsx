import { Suspense } from "react"
import CouncilClient from "./CouncilClient"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading council…
        </div>
      }
    >
      <CouncilClient />
    </Suspense>
  )
}
