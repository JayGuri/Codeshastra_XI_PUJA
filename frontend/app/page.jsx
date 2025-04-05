"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import ChatBot from "@/components/ChatBot"

// Dynamically import the CesiumGlobe component with no SSR
const CesiumGlobe = dynamic(() => import("@/components/CesiumGlobe"), { ssr: false })

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Globe container - full screen background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">{isClient && <CesiumGlobe />}</div>

      {/* Chatbot overlay - positioned in center */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none p-4">
        <div className="w-full max-w-md pointer-events-auto">
          <ChatBot />
        </div>
      </div>
    </main>
  )
}

