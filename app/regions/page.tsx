"use client"

import Link from "next/link"
import { regions } from "@/data/regions"

export default function RegionsPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">Regions</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {regions.map((region) => (
          <Link
            key={region.id}
            href={`/region/${region.id}`}
            className="block" // make the whole card clickable
          >
            {/* Make this a div inside Link but styled as block */}
            <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition cursor-pointer">
              <img
                src={region.image}
                alt={region.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-2xl font-bold">{region.title}</h2>
              <p className="text-gray-400">{region.region}</p>
              <p className="text-gray-400">Coordinator: {region.coordinator}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}