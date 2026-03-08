import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
// import Beams from "@/components/Beams"
// import { GlobalLoader } from "@/components/global-loader"
import { Providers } from "@/components/providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Nallamala House | IIT Madras",
  description:
    "Nallamala House - A prestigious student housing community at IIT Madras fostering excellence, innovation, and community spirit.",
  generator: "v0.app",
  icons: {
    icon: "/images/loading_nallamala.jpg",
    apple: "/images/loading_nallamala.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${_playfair.variable} font-sans antialiased bg-black`}
        style={{ background: "#000" }}
      >

        {/* <GlobalLoader /> */}

        {/*
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
            pointerEvents: "none",
            opacity: 0.5,
          }}
        >
          <Beams
            beamWidth={3.3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#ffd700"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
        */}

        <Providers>
          {children}
        </Providers>

        <Analytics />
      </body>
    </html>
  )
}