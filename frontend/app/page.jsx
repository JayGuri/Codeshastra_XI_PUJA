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
      {/* Globe container */}
      <div id="cesiumContainer" className="absolute top-0 left-0 w-full h-full z-0">
        {isGlobeLoaded && <CesiumGlobe />}
      </div>

      {/* Overlay content */}
      <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center pointer-events-none">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-6 pointer-events-auto">
              <h1 className="text-4xl font-bold text-center mb-6 text-indigo-900">Discover Your Perfect Journey</h1>
              <p className="text-lg text-center mb-8 text-gray-700">
                Plan personalized trips with our intelligent travel planner
              </p>
              <ChatBot />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
