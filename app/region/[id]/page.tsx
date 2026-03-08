import { regions } from "@/data/regions"
import Image from "next/image"

export default async function RegionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const region = regions.find((r) => r.id === id)

  if (!region) {
    return <div className="p-10 text-white">Region not found</div>
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#3b82f620,transparent_40%),radial-gradient(circle_at_80%_70%,#9333ea20,transparent_40%)]"></div>

      {/* floating glow orbs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 blur-[160px] rounded-full"></div>

      <div className="relative">

        {/* HERO */}
        <div className="relative h-[440px] w-full overflow-hidden">

          <Image
            src={region.image}
            alt={region.title}
            fill
            className="object-cover scale-105"
          />

          <div className="absolute inset-0 bg-black/70 flex items-center">
            <div className="max-w-6xl mx-auto px-6">

              <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {region.title}
              </h1>

              <p className="mt-4 text-lg text-gray-300">
                {region.region}
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Coordinator • {region.coordinator}
              </p>

            </div>
          </div>

        </div>

        {/* EVENTS */}
        <div className="max-w-6xl mx-auto px-6 py-20">

          <h2 className="text-3xl font-semibold mb-12 tracking-wide">
            Regional Events
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {region.events.map((event, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:bg-white/[0.07] transition duration-500 hover:-translate-y-2"
              >

                {/* IMAGE MOSAIC */}
                {event.images && (
                  <div className="grid grid-cols-2 grid-rows-2 gap-[2px] h-48">

                    <div className="relative row-span-2 overflow-hidden">
                      <Image
                        src={event.images[0]}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-700"
                      />
                    </div>

                    {event.images[1] && (
                      <div className="relative overflow-hidden">
                        <Image
                          src={event.images[1]}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-700"
                        />
                      </div>
                    )}

                    {event.images[2] && (
                      <div className="relative overflow-hidden">
                        <Image
                          src={event.images[2]}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-700"
                        />
                      </div>
                    )}

                  </div>
                )}

                {/* EVENT INFO */}
                <div className="p-6">

                  <h3 className="text-xl font-semibold mb-3">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-300">

                    <p>📅 {event.date}</p>

                    <p>📍 {event.venue}</p>

                    {event.type && (
                      <p className="text-blue-400">
                        🏸 {event.type}
                      </p>
                    )}

                    {event.theme && (
                      <p className="italic text-purple-300">
                        ✨ {event.theme}
                      </p>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  )
}