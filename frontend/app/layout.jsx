import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Intelligent Travel Planner",
  description: "Plan your perfect trip with our intelligent travel planner",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Removed Cesium scripts from here - we'll load them dynamically */}</head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

