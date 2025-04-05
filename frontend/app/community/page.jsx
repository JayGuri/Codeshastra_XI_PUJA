"use client"

import { useState } from "react"
import DestinationCard from "@/components/Card"
import FilterSidebar from "@/components/FilterSidebar"
import AuroraBackground from "@/components/AuroraBackground"

export default function Community() {
  // Sample destinations array
  const sampleDestinations = [
    {
      name: "Manali Adventure Trip",
      location: "Manali, Himachal Pradesh",
      description:
        "Experience the thrill of the Himalayas with a group of adventure enthusiasts. Trek through scenic trails, enjoy river rafting, and explore local culture in this 7-day expedition.",
      image: "/images/manali.jpg",
      currentPeople: 12,
      maxPeople: 16,
      transport: "Bus",
      budget: "Classic Travel",
      ageGroup: "Young (20-30s)",
      price: 15999,
    },
    {
      name: "Goa Beach Retreat",
      location: "North Goa",
      description:
        "Relax on pristine beaches, enjoy water sports and experience the vibrant nightlife in this 5-day getaway to Goa.",
      image: "/images/goa.jpg",
      currentPeople: 8,
      maxPeople: 12,
      transport: "Flight",
      budget: "Budget Travel",
      ageGroup: "Young (20-30s)",
      price: 12499,
    },
    {
      name: "Kerala Backwaters Tour",
      location: "Alleppey, Kerala",
      description:
        "Experience the serene backwaters of Kerala on a houseboat, explore spice plantations and enjoy authentic Kerala cuisine.",
      image: "/images/kerala.jpg",
      currentPeople: 6,
      maxPeople: 10,
      transport: "Train",
      budget: "Luxury Travel",
      ageGroup: "Middle-aged (30-50s)",
      price: 22999,
    },
    {
      name: "Rajasthan Heritage Tour",
      location: "Jaipur, Udaipur, Jodhpur",
      description:
        "Explore the royal heritage of Rajasthan by visiting magnificent forts, palaces and experiencing the rich culture and cuisine.",
      image: "/images/rajasthan.jpg",
      currentPeople: 15,
      maxPeople: 20,
      transport: "Train",
      budget: "Classic Travel",
      ageGroup: "Family Friendly",
      price: 18500,
    },
  ]

  // State to store filtered destinations
  const [filteredDestinations, setFilteredDestinations] = useState(sampleDestinations)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Handle filter changes
  const handleFilterChange = (filters) => {
    // Filter destinations based on selected criteria
    const filtered = sampleDestinations.filter((destination) => {
      // Check transport filter
      const transportMatch = filters.transport.length === 0 || filters.transport.includes(destination.transport)

      // Check budget filter
      const budgetMatch = filters.budget.length === 0 || filters.budget.includes(destination.budget)

      // Check age group filter
      const ageGroupMatch = filters.ageGroup.length === 0 || filters.ageGroup.includes(destination.ageGroup)

      // Check price range
      const priceMatch = destination.price >= filters.minPrice && destination.price <= filters.maxPrice

      // Return true if all conditions match
      return transportMatch && budgetMatch && ageGroupMatch && priceMatch
    })

    setFilteredDestinations(filtered)
    setCurrentPage(1) // Reset to the first page when filters change
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage)
  const paginatedDestinations = filteredDestinations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <AuroraBackground className="bg-black text-white">
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <h1 className="text-4xl font-bold mb-6 ml-[320px]">Community</h1>

        {/* Sidebar */}
        <FilterSidebar onFilterChange={handleFilterChange} />

        {/* Main Content */}
        <div className="ml-[320px]">
          <h2 className="text-2xl font-bold mb-6">Available Trips</h2>

          {paginatedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedDestinations.map((destination, index) => (
                <DestinationCard key={index} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-300">No destinations match your filters.</p>
              <p className="mt-2 text-gray-400">Try adjusting your filters to see more options.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

          <p className="text-lg mt-10 mb-10">
            Join our growing community of travel enthusiasts and make your next trip unforgettable!
          </p>
        </div>
      </div>
    </AuroraBackground>
  )
}

