"use client"

import { useState } from "react"

export default function ChatBot() {
  const [destination, setDestination] = useState("")
  const [days, setDays] = useState("")
  const [budget, setBudget] = useState("")
  const [people, setPeople] = useState("")
  const [travelType, setTravelType] = useState("solo")
  const [travelMode, setTravelMode] = useState("plane")
  const [travelClass, setTravelClass] = useState("classic")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would handle the form submission
    console.log({
      destination,
      days,
      budget,
      people,
      travelType,
      travelMode,
      travelClass,
      startDate,
      endDate,
    })
    // For now, just show an alert
    alert("Your travel plan is being generated! This feature will be implemented soon.")
  }

  return (
    <div className="chatbot-container p-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-900">Plan Your Journey</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Where do you want to go?"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Days
            </label>
            <input
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Days"
              min="1"
              required
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
              Budget (USD)
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Budget"
              min="1"
              required
            />
          </div>

          <div>
            <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-1">
              Number of People
            </label>
            <input
              type="number"
              id="people"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="People"
              min="1"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-1">
              Travel Type
            </label>
            <select
              id="travelType"
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="solo">Solo</option>
              <option value="couple">Couple</option>
              <option value="family">Family</option>
              <option value="group">Group (10)</option>
            </select>
          </div>

          <div>
            <label htmlFor="travelMode" className="block text-sm font-medium text-gray-700 mb-1">
              Travel Mode
            </label>
            <select
              id="travelMode"
              value={travelMode}
              onChange={(e) => setTravelMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="car">Car</option>
              <option value="train">Train</option>
              <option value="plane">Plane</option>
              <option value="bus">Bus</option>
              <option value="cruise">Cruise</option>
            </select>
          </div>

          <div>
            <label htmlFor="travelClass" className="block text-sm font-medium text-gray-700 mb-1">
              Travel Class
            </label>
            <select
              id="travelClass"
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="budget">Budget</option>
              <option value="classic">Classic</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 shadow-md"
          >
            Plan My Trip
          </button>
        </div>
      </form>
    </div>
  )
}
