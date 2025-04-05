"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ChatBot from "@/components/ChatBot";

// Dynamically import the CesiumGlobe component with no SSR
const CesiumGlobe = dynamic(() => import("@/components/CesiumGlobe"), {
  ssr: false,
});

// Dynamically import the RouteFinder component with no SSR
const RouteFinder = dynamic(() => import("@/components/RouteFinder"), {
  ssr: false,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("globe");

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        </div>
      </div>

      {/* Main content area */}
      <div className="relative flex-1">
        {/* Globe or Route Finder content */}
        {isClient && activeTab === "globe" && <CesiumGlobe />}
        {isClient && activeTab === "route" && <RouteFinder />}

        {/* Chatbot overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md px-4">
            <ChatBot />
          </div>
        </div>
      </div>
    </main>
  );
}
