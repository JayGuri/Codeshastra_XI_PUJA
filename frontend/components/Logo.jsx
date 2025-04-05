import Image from "next/image"

export default function Logo() {
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 relative">
        <Image src="/images/logo.png" alt="Travel Planner Logo" fill style={{ objectFit: "contain" }} priority />
      </div>
      <span className="ml-2 text-xl font-bold text-indigo-900">TravelSage</span>
    </div>
  )
}
