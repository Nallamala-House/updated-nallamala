import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
    icon: "/images/nallamala_house_iit_madras_logo.jpg",
    apple: "/images/nallamala_house_iit_madras_logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${_playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
