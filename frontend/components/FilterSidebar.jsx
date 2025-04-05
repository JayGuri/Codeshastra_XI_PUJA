import { useState, useEffect } from "react";
import { Range } from "react-range";

const PRICE_MIN = 0;
const PRICE_MAX = 100000;

export default function FilterSidebar({ onFilterChange }) {
  // State for tracking selected filters
  const [filters, setFilters] = useState({
    transport: [],
    budget: [],
    ageGroup: [],
    minPrice: 0,
    maxPrice: 50000,
  });

  // Sample filter options (you can replace these with your actual options)
  const filterOptions = {
    transport: ["Bus", "Train", "Flight", "Car"],
    budget: ["Budget Travel", "Classic Travel", "Luxury Travel"],
    ageGroup: [
      "Young (20-30s)",
      "Middle-aged (30-50s)",
      "Senior (50+)",
      "Family Friendly",
    ],
  };

  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);

  // Handle checkbox changes
  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (updatedFilters[category].includes(value)) {
        // Remove if already selected
        updatedFilters[category] = updatedFilters[category].filter(
          (item) => item !== value
        );
      } else {
        // Add if not selected
        updatedFilters[category] = [...updatedFilters[category], value];
      }

      // Call the parent component's callback with updated filters
      if (onFilterChange) {
        onFilterChange(updatedFilters);
      }

      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    const emptyFilters = {
      transport: [],
      budget: [],
      ageGroup: [],
    };
    setFilters(emptyFilters);
    if (onFilterChange) {
      onFilterChange(emptyFilters);
    }
  };

  useEffect(() => {
    const updatedFilters = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  }, [priceRange]);

  return (
    <div className="bg-gray-800  bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg p-6 fixed left-0 top-20 w-[300px] max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white-800">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {/* Transport Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-white mb-3">Transport</h4>
        <div className="space-y-2">
          {filterOptions.transport.map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                id={`transport-${option}`}
                checked={filters.transport.includes(option)}
                onChange={() => handleFilterChange("transport", option)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={`transport-${option}`}
                className="ml-2 text-white"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-white mb-3">Budget</h4>
        <div className="space-y-2">
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
        </div>
      </div>

      {/* Age Group Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-white mb-3">Age Group</h4>
        <div className="space-y-2">
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
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-white mb-3">Price Range</h4>
        <div className="px-2">
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
                  height: "6px",
                  width: "100%",
                  backgroundColor: "#ddd",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "#3b82f6",
                    marginLeft: `${
                      ((priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) *
                      100
                    }%`,
                    width: `${
                      ((priceRange[1] - priceRange[0]) /
                        (PRICE_MAX - PRICE_MIN)) *
                      100
                    }%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "50%",
                  outline: "none",
                }}
              />
            )}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
