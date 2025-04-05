"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import ChatBot from "@/components/ChatBot"

// Dynamically import the components with no SSR
const CesiumGlobe = dynamic(() => import("@/components/CesiumGlobe"), {
  ssr: false,
})

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    setIsClient(true)

    // Expose map instance to window for the chatbot to access
    if (typeof window !== "undefined") {
      window.mapInstance = mapInstanceRef.current
    }
  }, [])

  // Store map instance when it's created
  const handleMapCreated = (mapInstance) => {
    mapInstanceRef.current = mapInstance
    if (typeof window !== "undefined") {
      window.mapInstance = mapInstance
    }
  }

  return (
    <main className="w-full h-screen overflow-hidden flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">My Navbar</h1>
        </div>
      </header>

      {/* Main content area */}
      <div className="relative flex-1">
        {/* Globe content */}
        {isClient && <CesiumGlobe onMapCreated={handleMapCreated} />}

        {/* Chatbot overlay - centered in form mode */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md px-4">
            <ChatBot />
          </div>
        </div>
      </div>
    </main>
  )
}

