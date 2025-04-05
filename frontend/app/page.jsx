"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import ChatBot from "@/components/ChatBot"

// Dynamically import the components with no SSR
const CesiumGlobe = dynamic(() => import("@/components/CesiumGlobe"), {
  ssr: false,
})
const GoogleEarthGlobe = dynamic(() => import("@/components/GoogleEarthGlobe"), {
  ssr: false,
})
const RouteFinder = dynamic(() => import("@/components/RouteFinder"), {
  ssr: false,
})

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState("globe")
  const [globeType, setGlobeType] = useState("cesium") // "cesium" or "google"
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

      {/* Tab navigation positioned below the navbar */}
      <div className="bg-gray-800 text-white p-2 z-20">
        <div className="container mx-auto flex gap-4">
          <button
            className={`py-1 px-3 rounded transition-colors ${
              activeTab === "globe" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("globe")}
          >
            Globe View
          </button>
          <button
            className={`py-1 px-3 rounded transition-colors ${
              activeTab === "route" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("route")}
          >
            Route Finder
          </button>

          {/* Globe type selector - only visible when globe tab is active */}
          {activeTab === "globe" && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-gray-300">Globe Type:</span>
              <select
                value={globeType}
                onChange={(e) => setGlobeType(e.target.value)}
                className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600"
              >
                <option value="cesium">Cesium</option>
                <option value="google">Google Earth</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="relative flex-1">
        {/* Globe or Route Finder content */}
        {isClient && activeTab === "globe" && globeType === "cesium" && <CesiumGlobe onMapCreated={handleMapCreated} />}
        {isClient && activeTab === "globe" && globeType === "google" && (
          <GoogleEarthGlobe onMapCreated={handleMapCreated} />
        )}
        {isClient && activeTab === "route" && <RouteFinder />}

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
