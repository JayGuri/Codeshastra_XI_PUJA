import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Intelligent Travel Planner",
  description: "Plan your perfect trip with our intelligent travel planner",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Cesium scripts */}
        <script src="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Cesium.js"></script>
        <link
          href="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Widgets/widgets.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
