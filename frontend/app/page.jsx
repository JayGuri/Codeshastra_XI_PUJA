"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import ChatBot from "@/components/ChatBot";
import { motion } from "framer-motion";

// Dynamically import the components with no SSR
const CesiumGlobe = dynamic(() => import("@/components/CesiumGlobe"), {
  ssr: false,
});
const GoogleEarthGlobe = dynamic(
  () => import("@/components/GoogleEarthGlobe"),
  {
    ssr: false,
  }
);
const RouteFinder = dynamic(() => import("@/components/RouteFinder"), {
  ssr: false,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("globe");
  const [globeType, setGlobeType] = useState("cesium"); // "cesium" or "google"
  const [showChat, setShowChat] = useState(false);

  const mapInstanceRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    // Expose map instance to window for the chatbot to access
    if (typeof window !== "undefined") {
      window.mapInstance = mapInstanceRef.current;
    }
  }, []);

  // Store map instance when it's created
  const handleMapCreated = (mapInstance) => {
    mapInstanceRef.current = mapInstance;
    if (typeof window !== "undefined") {
      window.mapInstance = mapInstance;
    }
  };

  return (
    <main className="w-full h-screen overflow-hidden flex flex-col">
      {/* Navbar */}
      

      {/* Tab navigation positioned below the navbar
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
        </div>
      </div> */}

      {/* Main content area */}
      <div className="relative flex-1">
        {/* Globe or Route Finder content */}
        <motion.div
          className="h-full"
          animate={{
            width: showChat ? "60vw" : "100vw",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {isClient && activeTab === "globe" && globeType === "cesium" && (
            <CesiumGlobe onMapCreated={handleMapCreated} />
          )}
          {isClient && activeTab === "globe" && globeType === "google" && (
            <GoogleEarthGlobe onMapCreated={handleMapCreated} />
          )}
          {isClient && activeTab === "route" && (
            <RouteFinder setShowChat={setShowChat} />
          )}
        </motion.div>
        {/* Chatbot overlay - centered in form mode */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md px-4">
            <ChatBot />
          </div>
        </div>
      </div>
    </main>
  );
}
