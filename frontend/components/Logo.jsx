import Image from "next/image"

export default function Logo() {
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 relative">
        <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm"></div>
        <Image
          src="/images/logo.png"
          alt="Travel Planner Logo"
          fill
          style={{ objectFit: "contain" }}
          className="p-1.5"
          priority
        />
      </div>
      <span className="ml-2 text-xl font-bold text-white">TravelSage</span>
    </div>
  )
}

