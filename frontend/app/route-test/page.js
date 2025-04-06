'use client'

import { useState } from 'react'
import { geocodeAddress } from '../../utils/geocodingService'
import { getRouteCoordinates } from '../../utils/routingService'
import CesiumGlobe from '../../components/CesiumGlobe'
import ChatBot from '../../components/ChatBot'
import { motion } from 'framer-motion'

export default function RouteTest() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [coordinates, setCoordinates] = useState(null)
  const [showChat, setShowChat] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const sourceCoords = await geocodeAddress(source)
    const destCoords = await geocodeAddress(destination)
    
    if (!sourceCoords || !destCoords) {
      alert('Could not find coordinates for one or both locations')
      return
    }

    setCoordinates({
      source: sourceCoords,
      destination: destCoords
    })
    setShowChat(true)
  }

  return (
    <div className="relative h-screen">
      {!showChat && (
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: showChat ? 0 : 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg"
        >
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Enter source location"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination location"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Find Route
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      <motion.div 
        className="h-full"
        animate={{
          width: showChat ? '60vw' : '100vw'
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <CesiumGlobe 
          sourceLat={coordinates?.source?.lat}
          sourceLng={coordinates?.source?.lng}
          destLat={coordinates?.destination?.lat}
          destLng={coordinates?.destination?.lng}
        />
      </motion.div>

      {showChat && <ChatBot />}
    </div>
  )
}