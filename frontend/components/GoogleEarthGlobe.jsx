"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

export default function GoogleEarthGlobe() {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const markersRef = useRef([])
  const pathsRef = useRef([])

  // Replace with your Google Maps API key
  const GOOGLE_MAPS_API_KEY = "AIzaSyB0eJBMaqI_lMVZXGfWpYp3wxY6VMY29Cg"

  // Define Indian cities
  const indianCities = [
    {
      name: "Mumbai",
      longitude: 72.8777,
      latitude: 19.076,
      description: "Financial capital of India and home to Bollywood",
      color: "#3498db", // Blue
    },
    {
      name: "Pune",
      longitude: 73.8567,
      latitude: 18.5204,
      description: "Cultural capital of Maharashtra and educational hub",
      color: "#2ecc71", // Green
    },
    {
      name: "Delhi",
      longitude: 77.209,
      latitude: 28.6139,
      description: "Capital of India with rich historical heritage",
      color: "#e74c3c", // Red
    },
    {
      name: "Manali",
      longitude: 77.1887,
      latitude: 32.2396,
      description: "Popular hill station in Himachal Pradesh",
      color: "#9b59b6", // Purple
    },
    {
      name: "Amritsar",
      longitude: 74.8723,
      latitude: 31.634,
      description: "Home to the Golden Temple and Punjabi culture",
      color: "#f39c12", // Orange
    },
  ]

  // Initialize Google Earth when the script is loaded
  const initGoogleEarth = () => {
    if (!mapRef.current) return

    // Check if google is defined
    if (typeof google === "undefined" || typeof google.maps === "undefined") {
      console.error("Google Maps API not loaded")
      return
    }

    // Create the Google Earth instance
    const earthMap = new google.maps.Map(mapRef.current, {
      mapTypeId: "satellite",
      center: { lat: 20.5937, lng: 78.9629 }, // Center on India
      zoom: 5,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      tilt: 0, // Start with a top-down view
    })

    // Enable the 3D Earth view
    earthMap.setTilt(45) // Set a 45-degree tilt for 3D effect

    // Store the map instance
    setMap(earthMap)

    // Add markers and paths once the map is loaded
    google.maps.event.addListenerOnce(earthMap, "tilesloaded", () => {
      addCityMarkers(earthMap)
      createRoadPaths(earthMap)
    })
  }

  // Create custom marker with pulsating effect
  const createCustomMarker = (map, city) => {
    // Create marker wrapper div
    const markerDiv = document.createElement("div")
    markerDiv.className = "custom-marker"
    markerDiv.style.position = "relative"

    // Create pin element
    const pin = document.createElement("div")
    pin.className = "pin"
    pin.style.width = "24px"
    pin.style.height = "36px"
    pin.style.borderRadius = "50% 50% 50% 0"
    pin.style.background = city.color
    pin.style.transform = "rotate(-45deg)"
    pin.style.position = "absolute"
    pin.style.top = "50%"
    pin.style.left = "50%"
    pin.style.marginTop = "-36px"
    pin.style.marginLeft = "-12px"
    pin.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)"

    // Create inner circle
    const circle = document.createElement("div")
    circle.className = "circle"
    circle.style.width = "12px"
    circle.style.height = "12px"
    circle.style.borderRadius = "50%"
    circle.style.background = "rgba(255,255,255,0.5)"
    circle.style.position = "absolute"
    circle.style.top = "50%"
    circle.style.left = "50%"
    circle.style.transform = "translate(-50%, -50%) rotate(45deg)"

    // Create pulsating circle
    const pulse = document.createElement("div")
    pulse.className = "pulse"
    pulse.style.width = "50px"
    pulse.style.height = "50px"
    pulse.style.borderRadius = "50%"
    pulse.style.backgroundColor = `${city.color}80` // 50% transparent
    pulse.style.position = "absolute"
    pulse.style.top = "50%"
    pulse.style.left = "50%"
    pulse.style.transform = "translate(-50%, -50%)"
    pulse.style.animation = "pulse 2s infinite"

    // Add CSS animation for pulsating effect
    if (!document.getElementById("marker-animations")) {
      const style = document.createElement("style")
      style.id = "marker-animations"
      style.textContent = `
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }

    // Assemble marker elements
    pin.appendChild(circle)
    markerDiv.appendChild(pulse)
    markerDiv.appendChild(pin)

    // Create the actual marker
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: city.latitude, lng: city.longitude },
      content: markerDiv,
      title: city.name,
    })

    // Add click listener
    marker.addListener("click", () => {
      // Fly to the location
      map.panTo({ lat: city.latitude, lng: city.longitude })
      map.setZoom(10)

      // Show info panel
      setSelectedLocation({
        name: city.name,
        description: city.description,
      })
    })

    // Add label
    const label = new google.maps.InfoWindow({
      content: `<div style="font-weight: bold; color: #333;">${city.name}</div>`,
      disableAutoPan: true,
    })

    label.open(map, marker)

    return { marker, label }
  }

  // Add markers for all cities
  const addCityMarkers = (map) => {
    // Clear existing markers
    markersRef.current.forEach(({ marker, label }) => {
      marker.setMap(null)
      label.close()
    })
    markersRef.current = []

    // Add new markers
    indianCities.forEach((city) => {
      try {
        const markerObj = createCustomMarker(map, city)
        markersRef.current.push(markerObj)
      } catch (error) {
        console.error(`Error creating marker for ${city.name}:`, error)
      }
    })
  }

  // Create road paths between cities
  const createRoadPaths = async (map) => {
    // Clear existing paths
    pathsRef.current.forEach((path) => path.setMap(null))
    pathsRef.current = []

    // Create Mumbai-Pune path with special styling
    const mumbai = indianCities.find((city) => city.name === "Mumbai")
    const pune = indianCities.find((city) => city.name === "Pune")

    if (mumbai && pune) {
      try {
        // Create a DirectionsService to get the route
        const directionsService = new google.maps.DirectionsService()

        const response = await directionsService.route({
          origin: { lat: mumbai.latitude, lng: mumbai.longitude },
          destination: { lat: pune.latitude, lng: pune.longitude },
          travelMode: google.maps.TravelMode.DRIVING,
        })

        // Create a styled path
        const path = new google.maps.Polyline({
          path: response.routes[0].overview_path,
          geodesic: true,
          strokeColor: "#3498db", // Blue
          strokeOpacity: 0.8,
          strokeWeight: 5,
          map: map,
        })

        pathsRef.current.push(path)

        // Create animated dots along the path
        animatePathDots(map, response.routes[0].overview_path, "#3498db")
      } catch (error) {
        console.error("Error creating Mumbai-Pune path:", error)

        // Fallback to direct path
        const directPath = new google.maps.Polyline({
          path: [
            { lat: mumbai.latitude, lng: mumbai.longitude },
            { lat: pune.latitude, lng: pune.longitude },
          ],
          geodesic: true,
          strokeColor: "#3498db", // Blue
          strokeOpacity: 0.8,
          strokeWeight: 5,
          map: map,
        })

        pathsRef.current.push(directPath)
      }
    }

    // Create paths between other consecutive cities
    for (let i = 0; i < indianCities.length - 1; i++) {
      // Skip Mumbai-Pune as we've already created it
      if (indianCities[i].name === "Mumbai" && indianCities[i + 1].name === "Pune") {
        continue
      }

      try {
        const directionsService = new google.maps.DirectionsService()

        const response = await directionsService.route({
          origin: { lat: indianCities[i].latitude, lng: indianCities[i].longitude },
          destination: { lat: indianCities[i + 1].latitude, lng: indianCities[i + 1].longitude },
          travelMode: google.maps.TravelMode.DRIVING,
        })

        const path = new google.maps.Polyline({
          path: response.routes[0].overview_path,
          geodesic: true,
          strokeColor: indianCities[i].color,
          strokeOpacity: 0.6,
          strokeWeight: 4,
          map: map,
        })

        pathsRef.current.push(path)
      } catch (error) {
        console.error(`Error creating path between ${indianCities[i].name} and ${indianCities[i + 1].name}:`, error)
      }
    }
  }

  // Animate dots along a path
  const animatePathDots = (map, pathCoordinates, color) => {
    const numDots = 5
    const dots = []

    // Create dot markers
    for (let i = 0; i < numDots; i++) {
      const dotDiv = document.createElement("div")
      dotDiv.style.width = "12px"
      dotDiv.style.height = "12px"
      dotDiv.style.borderRadius = "50%"
      dotDiv.style.backgroundColor = color
      dotDiv.style.opacity = "0.8"

      const dot = new google.maps.marker.AdvancedMarkerElement({
        map,
        content: dotDiv,
        position: pathCoordinates[0],
      })

      dots.push(dot)
    }

    // Animate dots
    let frame = 0
    const animateFrame = () => {
      frame = (frame + 1) % (100 * pathCoordinates.length)

      for (let i = 0; i < numDots; i++) {
        const dotPosition = (frame / 100 + i / numDots) % 1
        const pathIndex = Math.floor(dotPosition * (pathCoordinates.length - 1))
        const pathRatio = dotPosition * (pathCoordinates.length - 1) - pathIndex

        const start = pathCoordinates[pathIndex]
        const end = pathCoordinates[Math.min(pathIndex + 1, pathCoordinates.length - 1)]

        const lat = start.lat + pathRatio * (end.lat - start.lat)
        const lng = start.lng + pathRatio * (end.lng - start.lng)

        dots[i].position = { lat, lng }
      }

      requestAnimationFrame(animateFrame)
    }

    animateFrame()

    return dots
  }

  useEffect(() => {
    // Initialize when the Google Maps script is loaded
    if (window.google && window.google.maps) {
      initGoogleEarth()
    }

    // Cleanup function
    return () => {
      // Clear markers
      markersRef.current.forEach(({ marker, label }) => {
        marker.setMap(null)
        label.close()
      })

      // Clear paths
      pathsRef.current.forEach((path) => path.setMap(null))
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Google Maps Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker&v=beta&callback=Function.prototype`}
        onLoad={initGoogleEarth}
      />

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-screen" />

      {/* Location Info Panel */}
      {selectedLocation && (
        <div className="absolute bottom-8 left-8 bg-black/70 backdrop-blur-md p-5 rounded-xl border border-white/20 text-white max-w-xs animate-fadeIn shadow-lg">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            {selectedLocation.name}
          </h3>
          <p className="text-gray-200 leading-relaxed">{selectedLocation.description}</p>
          <button
            className="mt-4 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center w-full"
            onClick={() => setSelectedLocation(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

