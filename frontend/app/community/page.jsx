"use client";

import { useState } from "react";
import DestinationCard from "@/components/Card";
import FilterSidebar from "@/components/FilterSidebar";

export default function Community() {
  // Sample destinations array
  const sampleDestinations = [
    {
      name: "Manali Adventure Trip",
      location: "Manali, Himachal Pradesh",
      description:
        "Experience the thrill of the Himalayas with a group of adventure enthusiasts. Trek through scenic trails, enjoy river rafting, and explore local culture in this 7-day expedition.",
      image: "/path/to/manali-image.jpg",
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
      image: "/path/to/goa-image.jpg",
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
      image: "/path/to/kerala-image.jpg",
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
      image: "/path/to/rajasthan-image.jpg",
      currentPeople: 15,
      maxPeople: 20,
      transport: "Train",
      budget: "Classic Travel",
      ageGroup: "Family Friendly",
      price: 18500,
    },
  ];

  // State to store filtered destinations
  const [filteredDestinations, setFilteredDestinations] =
    useState(sampleDestinations);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Handle filter changes
  const handleFilterChange = (filters) => {
    // If no filters are selected, show all destinations
    if (!Object.values(filters).some((category) => category.length > 0)) {
      setFilteredDestinations(sampleDestinations);
      return;
    }

    // Filter destinations based on selected criteria
    const filtered = sampleDestinations.filter((destination) => {
      // Check transport filter
      const transportMatch =
        filters.transport.length === 0 ||
        filters.transport.includes(destination.transport);

      // Check budget filter
      const budgetMatch =
        filters.budget.length === 0 ||
        filters.budget.includes(destination.budget);

      // Check age group filter
      const ageGroupMatch =
        filters.ageGroup.length === 0 ||
        filters.ageGroup.includes(destination.ageGroup);

      // Return true if all conditions match
      return transportMatch && budgetMatch && ageGroupMatch;
    });

    setFilteredDestinations(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6">Community</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 h-[500px] overflow-y-auto">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="flex-grow md:w-3/4">
          <h2 className="text-2xl font-bold mb-6">Available Trips</h2>

          {paginatedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedDestinations.map((destination, index) => (
                <DestinationCard key={index} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">
                No destinations match your filters.
              </p>
              <p className="mt-2">
                Try adjusting your filters to see more options.
              </p>
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
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

          <p className="text-lg mt-10">
            Join our growing community of travel enthusiasts and make your next
            trip unforgettable!
          </p>
        </div>
      </div>
    </div>
  );
}
