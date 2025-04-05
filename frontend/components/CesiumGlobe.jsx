"use client"

import { useEffect, useRef } from "react"

export default function CesiumGlobe() {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)

  useEffect(() => {
    // Make sure we're in the browser
    if (typeof window === "undefined") {
      return
    }

    // Function to load Cesium script dynamically
    const loadCesium = () => {
      return new Promise((resolve) => {
        if (window.Cesium) {
          resolve(window.Cesium)
          return
        }

        // If Cesium is not loaded yet, create script tag
        const script = document.createElement("script")
        script.src = "https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Cesium.js"
        script.async = true
        script.onload = () => {
          // Also load CSS
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Widgets/widgets.css"
          document.head.appendChild(link)

          // Wait a bit to make sure everything is initialized
          setTimeout(() => resolve(window.Cesium), 500)
        }
        document.head.appendChild(script)
      })
    }

    // Initialize Cesium
    const initCesium = async () => {
      try {
        const Cesium = await loadCesium()

        // Set your Cesium Ion access token
        Cesium.Ion.defaultAccessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMDU5NTMxOC0zNWFlLTQzZGUtOGJiYy0wYWQwY2ZiZDljNDYiLCJpZCI6MjkxMDY2LCJpYXQiOjE3NDM4MzkyMTV9.LPvRbUhDWM-Q4w3ALnV4G74fGNiHqFVBWN8iCU1AvVA"

        // Check if viewer already exists
        if (viewerRef.current && !viewerRef.current.isDestroyed()) {
          return
        }

        // Initialize the Cesium viewer
        const cesiumViewer = new Cesium.Viewer(containerRef.current, {
          terrain: Cesium.Terrain.fromWorldTerrain(),
          animation: false,
          baseLayerPicker: false,
          fullscreenButton: false,
          geocoder: false,
          homeButton: false,
          infoBox: false,
          sceneModePicker: false,
          selectionIndicator: false,
          timeline: false,
          navigationHelpButton: false,
          navigationInstructionsInitiallyVisible: false,
          imageryProvider: new Cesium.IonImageryProvider({ assetId: 3 }), // Natural Earth II
        })

        // Remove the Cesium logo and credits container
        if (cesiumViewer.cesiumWidget) {
          cesiumViewer.cesiumWidget.creditContainer.style.display = "none"
        }

        // Set the initial camera to look at Earth
        cesiumViewer.scene.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(10.0, 45.0, 10000000.0),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
          },
        })

        // Enable globe interaction
        cesiumViewer.scene.screenSpaceCameraController.enableRotate = true
        cesiumViewer.scene.screenSpaceCameraController.enableTranslate = true
        cesiumViewer.scene.screenSpaceCameraController.enableZoom = true
        cesiumViewer.scene.screenSpaceCameraController.enableTilt = true
        cesiumViewer.scene.screenSpaceCameraController.enableLook = true

        // Store the viewer in ref
        viewerRef.current = cesiumViewer

        // Add OSM buildings after a short delay to ensure the scene is ready
        setTimeout(async () => {
          try {
            if (cesiumViewer && cesiumViewer.scene && cesiumViewer.scene.primitives) {
              const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync()
              if (osmBuildingsTileset) {
                cesiumViewer.scene.primitives.add(osmBuildingsTileset)
              }
            }
          } catch (error) {
            console.error("Error loading OSM Buildings:", error)
          }
        }, 2000)
      } catch (error) {
        console.error("Error initializing Cesium:", error)
      }
    }

    // Start initialization
    initCesium()

    // Cleanup function
    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [])

  return <div ref={containerRef} id="cesiumContainer" style={{ width: "100%", height: "100vh" }}></div>
}

