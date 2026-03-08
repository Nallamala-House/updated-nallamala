import { LoadingCube } from "@/components/loading-cube"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      <LoadingCube />
    </div>
  )
}
