"use client";

import { useState, useEffect, useRef } from "react";
import { getRouteCoordinates } from "@/utils/routingService";
import { geocodeAddress } from "@/utils/geocodingService";

export default function ScrapbookComponent() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [photos, setPhotos] = useState({});
  const [newLocation, setNewLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  // Initialize Cesium
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadCesium = () => {
      return new Promise((resolve) => {
        if (window.Cesium) {
          resolve(window.Cesium);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Cesium.js";
        script.async = true;
        script.onload = () => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Widgets/widgets.css";
          document.head.appendChild(link);
          setTimeout(() => resolve(window.Cesium), 500);
        };
        document.head.appendChild(script);
      });
    };

    const initCesium = async () => {
      try {
        const Cesium = await loadCesium();
        Cesium.Ion.defaultAccessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMDU5NTMxOC0zNWFlLTQzZGUtOGJiYy0wYWQwY2ZiZDljNDYiLCJpZCI6MjkxMDY2LCJpYXQiOjE3NDM4MzkyMTV9.LPvRbUhDWM-Q4w3ALnV4G74fGNiHqFVBWN8iCU1AvVA";

        if (viewerRef.current && !viewerRef.current.isDestroyed()) return;

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
          imageryProvider: new Cesium.IonImageryProvider({ assetId: 3 }),
        });

        if (cesiumViewer.cesiumWidget) {
          cesiumViewer.cesiumWidget.creditContainer.style.display = "none";
        }

        cesiumViewer.scene.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(10.0, 45.0, 10000000.0),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
          },
        });

        viewerRef.current = cesiumViewer;

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

    initCesium();

    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  // Update Cesium viewer when locations change
  useEffect(() => {
    if (!viewerRef.current || !window.Cesium) return;

    const Cesium = window.Cesium;
    const viewer = viewerRef.current;

    // Clear existing entities
    viewer.entities.removeAll();

    // Add pins for each location
    locations.forEach((location) => {
      const position = Cesium.Cartesian3.fromDegrees(
        location.longitude,
        location.latitude,
        100
      );

      viewer.entities.add({
        position: position,
        billboard: {
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9InJlZCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+",
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 0.5,
        },
        label: {
          text: location.name,
          font: "14pt sans-serif",
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -10),
        },
      });
    });

    // Create paths between consecutive locations
    const createPaths = async () => {
      for (let i = 0; i < locations.length - 1; i++) {
        const start = locations[i];
        const end = locations[i + 1];

        const routeCoords = await getRouteCoordinates(
          start.latitude,
          start.longitude,
          end.latitude,
          end.longitude
        );

        if (routeCoords) {
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
      }
    };

    createPaths();
  }, [locations]);

  const handleAddLocation = async () => {
    if (!newLocation.trim()) return;

    setIsLoading(true);
    try {
      const geocode = await geocodeAddress(newLocation);
      if (geocode) {
        setLocations([
          ...locations,
          {
            name: newLocation,
            latitude: geocode.lat,
            longitude: geocode.lng,
          },
        ]);
        setNewLocation("");
      }
    } catch (error) {
      console.error("Error adding location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = (event, locationName) => {
    const files = Array.from(event.target.files);
    setPhotos((prev) => ({
      ...prev,
      [locationName]: [...(prev[locationName] || []), ...files],
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left panel - Location list and photo upload */}
      <div className="w-full md:w-1/3 space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add Location</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Enter location name"
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded"
            />
            <button
              onClick={handleAddLocation}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">My Locations</h2>
          <div className="space-y-4">
            {locations.map((location) => (
              <div key={location.name} className="bg-gray-700 p-4 rounded">
                <h3 className="font-medium">{location.name}</h3>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, location.name)}
                    className="hidden"
                    id={`photo-upload-${location.name}`}
                  />
                  <label
                    htmlFor={`photo-upload-${location.name}`}
                    className="inline-block bg-gray-600 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-gray-500"
                  >
                    Upload Photos
                  </label>
                </div>
                {photos[location.name] && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {photos[location.name].map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`${location.name} photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Cesium map */}
      <div className="w-full md:w-2/3 h-[600px] rounded-lg overflow-hidden">
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
