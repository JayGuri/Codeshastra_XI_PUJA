"use client"

import { useEffect } from "react"

export default function CesiumGlobe() {
  useEffect(() => {
    // Make sure Cesium is loaded
    if (typeof window === "undefined" || !window.Cesium) {
      console.error("Cesium is not loaded")
      return
    }

    const Cesium = window.Cesium

    // Your Cesium token should be set here
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMDU5NTMxOC0zNWFlLTQzZGUtOGJiYy0wYWQwY2ZiZDljNDYiLCJpZCI6MjkxMDY2LCJpYXQiOjE3NDM4MzkyMTV9.LPvRbUhDWM-Q4w3ALnV4G74fGNiHqFVBWN8iCU1AvVA"

    // Initialize the Cesium viewer
    const viewer = new Cesium.Viewer("cesiumContainer", {
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
    viewer.cesiumWidget.creditContainer.style.display = "none"

    // Set the initial camera to look at Earth
    viewer.scene.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(10.0, 45.0, 10000000.0),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-90),
      },
    })

    // Add Cesium OSM buildings to the scene
    async function addOsmBuildings() {
      try {
        const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync()
        viewer.scene.primitives.add(osmBuildingsTileset)
      } catch (error) {
        console.error("Error loading OSM Buildings:", error)
      }
    }

    addOsmBuildings()

    // Add auto-rotation for the globe
    viewer.clock.onTick.addEventListener(() => {
      viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.0005)
    })

    // Enable globe interaction
    viewer.scene.screenSpaceCameraController.enableRotate = true
    viewer.scene.screenSpaceCameraController.enableTranslate = true
    viewer.scene.screenSpaceCameraController.enableZoom = true
    viewer.scene.screenSpaceCameraController.enableTilt = true
    viewer.scene.screenSpaceCameraController.enableLook = true

    // Cleanup function
    return () => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy()
      }
    }
  }, [])

  return <div id="cesiumContainer" style={{ width: "100%", height: "100vh" }}></div>
}

