"use client"

import { useState, useEffect } from "react"
import { Range } from "react-range"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronDown } from "lucide-react"

const PRICE_MIN = 0
const PRICE_MAX = 100000
const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 24500

export default function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    transport: [],
    budget: [],
    ageGroup: [],
    minPrice: DEFAULT_MIN_PRICE,
    maxPrice: DEFAULT_MAX_PRICE,
  })

  const [priceRange, setPriceRange] = useState([DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("priceRange")

  // Sample filter options
  const filterOptions = {
    transport: ["Bus", "Train", "Flight", "Car"],
    budget: ["Budget Travel", "Classic Travel", "Luxury Travel"],
    ageGroup: ["Young (20-30s)", "Middle-aged (30-50s)", "Senior (50+)", "Family Friendly"],
  }

  // Handle checkbox changes with animation
  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters }

      if (updatedFilters[category].includes(value)) {
        // Remove if already selected
        updatedFilters[category] = updatedFilters[category].filter((item) => item !== value)
      } else {
        // Add if not selected
        updatedFilters[category] = [...updatedFilters[category], value]
      }

      // Call the parent component's callback with updated filters
      if (onFilterChange) {
        onFilterChange(updatedFilters)
      }

      return updatedFilters
    })
  }

  // Clear all filters with animation
  const clearFilters = () => {
    const emptyFilters = {
      transport: [],
      budget: [],
      ageGroup: [],
      minPrice: DEFAULT_MIN_PRICE,
      maxPrice: DEFAULT_MAX_PRICE,
    }
    setFilters(emptyFilters)
    setPriceRange([DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE])
    if (onFilterChange) {
      onFilterChange(emptyFilters)
    }
  }

  // Toggle section expansion
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
  }

  useEffect(() => {
    const updatedFilters = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }
    setFilters(updatedFilters)
    if (onFilterChange) onFilterChange(updatedFilters)
  }, [priceRange])

  // Animation variants
  const sidebarVariants = {
    expanded: { x: 0, opacity: 1 },
    collapsed: { x: "-90%", opacity: 0.7 },
  }

  const filterSectionVariants = {
    hidden: { height: 0, opacity: 0, overflow: "hidden" },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-gray-900 rounded-r-xl shadow-lg fixed left-0 top-20 w-[300px] max-h-[calc(100vh-5rem)] overflow-y-auto z-30"
    >
      {/* Collapse toggle button - flush with the sidebar */}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-r-md p-1 shadow-lg z-10 h-12 w-6 flex items-center justify-center"
        whileHover={{ backgroundColor: "#2563eb" }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight size={16} />
      </motion.button>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Filters</h3>
          <button onClick={clearFilters} className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
            Clear All
          </button>
        </div>

        {/* Transport Filter */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer py-2"
            onClick={() => toggleSection("transport")}
          >
            <h4 className="font-semibold text-white">Transport</h4>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          <AnimatePresence>
            {activeSection === "transport" && (
              <motion.div
                variants={filterSectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-2 mt-2"
              >
                {filterOptions.transport.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`transport-${option}`}
                      checked={filters.transport.includes(option)}
                      onChange={() => handleFilterChange("transport", option)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`transport-${option}`} className="ml-2 text-white">
                      {option}
                    </label>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Budget Filter */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer py-2"
            onClick={() => toggleSection("budget")}
          >
            <h4 className="font-semibold text-white">Budget</h4>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          <AnimatePresence>
            {activeSection === "budget" && (
              <motion.div
                variants={filterSectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-2 mt-2"
              >
                {filterOptions.budget.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`budget-${option}`}
                      checked={filters.budget.includes(option)}
                      onChange={() => handleFilterChange("budget", option)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`budget-${option}`} className="ml-2 text-white">
                      {option}
                    </label>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Age Group Filter */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer py-2"
            onClick={() => toggleSection("ageGroup")}
          >
            <h4 className="font-semibold text-white">Age Group</h4>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          <AnimatePresence>
            {activeSection === "ageGroup" && (
              <motion.div
                variants={filterSectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-2 mt-2"
              >
                {filterOptions.ageGroup.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`age-${option}`}
                      checked={filters.ageGroup.includes(option)}
                      onChange={() => handleFilterChange("ageGroup", option)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`age-${option}`} className="ml-2 text-white">
                      {option}
                    </label>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer py-2"
            onClick={() => toggleSection("priceRange")}
          >
            <h4 className="font-semibold text-white">Price Range</h4>
            <ChevronDown size={18} className="text-gray-400" />
          </div>

          <div className="mt-2">
            <div className="px-1 py-4">
              <Range
                step={500}
                min={PRICE_MIN}
                max={PRICE_MAX}
                values={priceRange}
                onChange={(values) => setPriceRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "4px",
                      width: "100%",
                      backgroundColor: "#4b5563",
                      borderRadius: "2px",
                    }}
                    className="flex items-center"
                  >
                    <div
                      style={{
                        position: "absolute",
                        height: "4px",
                        backgroundColor: "#3b82f6",
                        borderRadius: "2px",
                        left: `${((priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                        width: `${((priceRange[1] - priceRange[0]) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "16px",
                      width: "16px",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      border: "2px solid #3b82f6",
                      boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)",
                      outline: "none",
                    }}
                    className={index === 0 ? "thumb-left" : "thumb-right"}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#3b82f6",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                )}
              />
              <div className="flex justify-between text-sm text-white mt-4">
                <div className="bg-blue-900/30 px-2 py-1 rounded">₹{priceRange[0]}</div>
                <div className="bg-blue-900/30 px-2 py-1 rounded">₹{priceRange[1]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

