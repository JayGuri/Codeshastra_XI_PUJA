"use client"

import { useEffect, useState } from "react"
import CesiumGlobe from "@/components/CesiumGlobe"
import ChatBot from "@/components/ChatBot"

export default function Home() {
  const [isGlobeLoaded, setIsGlobeLoaded] = useState(false)

  useEffect(() => {
    // Set a timeout to ensure Cesium is fully loaded
    const timer = setTimeout(() => {
      setIsGlobeLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Globe container - full screen background */}
      <div id="cesiumContainer" className="absolute top-0 left-0 w-full h-full z-0">
        {isGlobeLoaded && <CesiumGlobe />}
      </div>

      {/* Chatbot overlay - positioned in bottom right */}
      <div className="absolute bottom-8 right-8 z-10 w-full max-w-md pointer-events-auto">
        <ChatBot />
      </div>
    </main>
  )
}

