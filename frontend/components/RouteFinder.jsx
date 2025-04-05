"use client";

import { useState, useEffect, useRef } from "react";
import { geocodeAddress } from "../utils/geocodingService";
import { getRouteCoordinates } from "../utils/routingService";

export default function RouteFinder() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [routeInfo, setRouteInfo] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  // Initialize Cesium
  useEffect(() => {
    // Make sure we're in the browser
    if (typeof window === "undefined") {
      return;
    }

    // Function to load Cesium script dynamically
    const loadCesium = () => {
      return new Promise((resolve) => {
        if (window.Cesium) {
          resolve(window.Cesium);
          return;
        }

        // If Cesium is not loaded yet, create script tag
        const script = document.createElement("script");
        script.src =
          "https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Cesium.js";
        script.async = true;
        script.onload = () => {
          // Also load CSS
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Widgets/widgets.css";
          document.head.appendChild(link);

          // Wait a bit to make sure everything is initialized
          setTimeout(() => resolve(window.Cesium), 500);
        };
        document.head.appendChild(script);
      });
    };

    // Initialize Cesium
    const initCesium = async () => {
      try {
        const Cesium = await loadCesium();

        // Set your Cesium Ion access token
        Cesium.Ion.defaultAccessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMDU5NTMxOC0zNWFlLTQzZGUtOGJiYy0wYWQwY2ZiZDljNDYiLCJpZCI6MjkxMDY2LCJpYXQiOjE3NDM4MzkyMTV9.LPvRbUhDWM-Q4w3ALnV4G74fGNiHqFVBWN8iCU1AvVA";

        // Check if viewer already exists
        if (viewerRef.current && !viewerRef.current.isDestroyed()) {
          return;
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
        });

        // Remove the Cesium logo and credits container
        if (cesiumViewer.cesiumWidget) {
          cesiumViewer.cesiumWidget.creditContainer.style.display = "none";
        }

        // Set the initial camera to look at India
        cesiumViewer.scene.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(
            78.9629,
            20.5937,
            5000000.0
          ),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
          },
        });

        // Enable globe interaction
        cesiumViewer.scene.screenSpaceCameraController.enableRotate = true;
        cesiumViewer.scene.screenSpaceCameraController.enableTranslate = true;
        cesiumViewer.scene.screenSpaceCameraController.enableZoom = true;
        cesiumViewer.scene.screenSpaceCameraController.enableTilt = true;
        cesiumViewer.scene.screenSpaceCameraController.enableLook = true;

        // Store the viewer in ref
        viewerRef.current = cesiumViewer;

        // Add OSM buildings after a short delay
        setTimeout(async () => {
          try {
            if (
              cesiumViewer &&
              cesiumViewer.scene &&
              cesiumViewer.scene.primitives
            ) {
              const osmBuildingsTileset =
                await Cesium.createOsmBuildingsAsync();
              if (osmBuildingsTileset) {
                cesiumViewer.scene.primitives.add(osmBuildingsTileset);
              }
            }
          } catch (error) {
            console.error("Error loading OSM Buildings:", error);
          }
        }, 2000);
      } catch (error) {
        console.error("Error initializing Cesium:", error);
      }
    };

    // Start initialization
    initCesium();

    // Cleanup function
    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setRouteInfo(null);

    try {
      // Geocode origin
      const originGeocode = await geocodeAddress(origin);
      if (!originGeocode) {
        throw new Error(`Could not find coordinates for "${origin}"`);
      }

      // Geocode destination
      const destinationGeocode = await geocodeAddress(destination);
      if (!destinationGeocode) {
        throw new Error(`Could not find coordinates for "${destination}"`);
      }

      // Get route between the points
      const routeCoords = await getRouteCoordinates(
        originGeocode.lat,
        originGeocode.lng,
        destinationGeocode.lat,
        destinationGeocode.lng
      );

      if (!routeCoords) {
        throw new Error("Could not find a route between these locations");
      }

      // Store route information
      setRouteInfo({
        origin: originGeocode,
        destination: destinationGeocode,
        coordinates: routeCoords,
      });

      // Display on the map
      if (window.Cesium && viewerRef.current) {
        displayRouteOnMap(
          viewerRef.current,
          window.Cesium,
          originGeocode,
          destinationGeocode,
          routeCoords
        );
      }

      // Minimize the form to show more of the map
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const displayRouteOnMap = (
    viewer,
    Cesium,
    origin,
    destination,
    routeCoords
  ) => {
    // Clear previous entities
    viewer.entities.removeAll();

    // Add origin pin
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(origin.lng, origin.lat, 100),
      billboard: {
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9ImdyZWVuIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scale: 0.5,
      },
      label: {
        text: origin.displayName.split(",")[0],
        font: "14pt sans-serif",
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -10),
      },
    });

    // Add destination pin
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(
        destination.lng,
        destination.lat,
        100
      ),
      billboard: {
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9InJlZCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scale: 0.5,
      },
      label: {
        text: destination.displayName.split(",")[0],
        font: "14pt sans-serif",
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -10),
      },
    });

    // Add illuminated path along the route
    if (routeCoords && routeCoords.length > 0) {
      const positions = routeCoords.map((coord) =>
        Cesium.Cartesian3.fromDegrees(coord[0], coord[1], 100)
      );

      viewer.entities.add({
        polyline: {
          positions: positions,
          width: 5,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2,
            color: Cesium.Color.YELLOW,
          }),
        },
      });
    }

    // Calculate bounding rectangle to view both locations
    const west = Math.min(origin.lng, destination.lng) - 0.5;
    const south = Math.min(origin.lat, destination.lat) - 0.5;
    const east = Math.max(origin.lng, destination.lng) + 0.5;
    const north = Math.max(origin.lat, destination.lat) + 0.5;

    // Set camera to view the entire route
    viewer.camera.flyTo({
      destination: Cesium.Rectangle.fromDegrees(west, south, east, north),
      duration: 3,
    });
  };

  return (
    <div className="w-full h-full relative">
      {/* Map container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Form overlay */}
      <div
        className={`absolute top-14 left-4 right-4 transition-all duration-300 ${
          showForm ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-4 max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4">
            Find Route Between Destinations
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="origin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Origin
              </label>
              <input
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g., Hampi"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Destination
              </label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Varkala"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Find Route"}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Route info and controls */}
      {routeInfo && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-4 max-w-lg mx-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Route Information</h3>
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                Search Again
              </button>
            </div>
            <div className="mt-2">
              <p>
                <strong>Origin:</strong>{" "}
                {routeInfo.origin.displayName.split(",").slice(0, 2).join(",")}
              </p>
              <p>
                <strong>Destination:</strong>{" "}
                {routeInfo.destination.displayName
                  .split(",")
                  .slice(0, 2)
                  .join(",")}
              </p>
              <p>
                <strong>Route distance:</strong> ~
                {Math.round(routeInfo.coordinates.length * 0.1)} km
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
