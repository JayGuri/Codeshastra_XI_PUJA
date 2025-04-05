"use client"

import { useState, useEffect } from "react"
import DestinationCard from "@/components/Card"
import FilterSidebar from "@/components/FilterSidebar"
import AuroraBackground from "@/components/AuroraBackground"
import { motion } from "framer-motion"

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
  const [isLoading, setIsLoading] = useState(true)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setIsLoading(true)

    // Simulate filtering delay
    setTimeout(() => {
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
      setIsLoading(false)
    }, 500)
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage)
  const paginatedDestinations = filteredDestinations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top of results
    document.getElementById("results-top")?.scrollIntoView({ behavior: "smooth" })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <AuroraBackground className="bg-black text-white">
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <motion.h1
          className="text-4xl font-bold mb-6 ml-[320px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Community
        </motion.h1>

        {/* Sidebar */}
        <FilterSidebar onFilterChange={handleFilterChange} />

        {/* Main Content */}
        <div className="ml-[320px] transition-all duration-300">
          <div id="results-top">
            <motion.h2
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Available Trips
            </motion.h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-50 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : paginatedDestinations.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {paginatedDestinations.map((destination, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <DestinationCard destination={destination} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-gray-300">No destinations match your filters.</p>
              <p className="mt-2 text-gray-400">Try adjusting your filters to see more options.</p>
            </motion.div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && !isLoading && (
            <motion.div
              className="flex justify-center items-center mt-6 space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index + 1}
                </motion.button>
              ))}
            </motion.div>
          )}

          <motion.p
            className="text-lg mt-10 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join our growing community of travel enthusiasts and make your next trip unforgettable!
          </motion.p>
        </div>
      </div>
    </AuroraBackground>
  )
}

