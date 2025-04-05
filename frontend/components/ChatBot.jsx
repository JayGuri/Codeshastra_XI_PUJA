"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Calendar, MapPin, MessageSquare, IndianRupee, Heart, Compass } from "lucide-react"

export default function ChatBot() {
  const [formMode, setFormMode] = useState(true)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [showDateModal, setShowDateModal] = useState(false)
  const [showTravelTypeModal, setShowTravelTypeModal] = useState(false)
  const [showBudgetModal, setShowBudgetModal] = useState(false)

  // Form data
  const [fromCity, setFromCity] = useState("")
  const [destinationCity, setDestinationCity] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [people, setPeople] = useState("")
  const [budget, setBudget] = useState("")
  const [relationship, setRelationship] = useState("")
  const [luxury, setLuxury] = useState("")
  const [interests, setInterests] = useState("")

  const messagesEndRef = useRef(null)
  const chatbotRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle map zoom effect when switching to chat mode
  useEffect(() => {
    if (!formMode) {
      // Try to access the map instance (this would need to be adapted based on your actual map implementation)
      try {
        if (window.mapInstance) {
          // Zoom out the map for dramatic effect
          window.mapInstance.setZoom(2)
        }
      } catch (error) {
        console.log("Could not zoom map:", error)
      }
    }
  }, [formMode])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { type: "user", content: inputValue }])

    // Process the message (in a real app, this would involve NLP)
    setTimeout(() => {
      // Simulate bot response
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `I'll help you refine your itinerary. What specific changes would you like to make?`,
        },
      ])
    }, 1000)

    setInputValue("")
  }

  const handleDateSelection = () => {
    setShowDateModal(false)
  }

  const handleTravelTypeSelection = () => {
    setShowTravelTypeModal(false)
  }

  const handleBudgetSelection = () => {
    setShowBudgetModal(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""

    // Convert from yyyy-mm-dd to dd/mm/yyyy
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // Create the JSON response
    const itineraryData = {
      from_city: fromCity,
      destination_city: destinationCity,
      date_from: formatDate(startDate),
      date_to: formatDate(endDate),
      people: people,
      relationship: relationship,
      interests: interests,
      luxury: luxury,
      budget: budget,
    }

    // Switch to chat mode
    setFormMode(false)

    // Add initial bot message with the created itinerary
    setMessages([
      {
        type: "bot",
        content: "I've created your initial itinerary based on your preferences:",
      },
      {
        type: "bot",
        content: (
          <pre className="bg-black/30 p-3 rounded-md overflow-x-auto text-xs">
            {JSON.stringify(itineraryData, null, 2)}
          </pre>
        ),
      },
      {
        type: "bot",
        content:
          "How would you like to refine this itinerary? You can ask me to add specific activities, adjust the budget, or suggest accommodations.",
      },
    ])
  }

  // Travel type options with shorter descriptions
  const travelTypeOptions = [
    {
      id: "solo",
      label: "Solo",
      description: "Discover yourself while exploring new places.",
    },
    {
      id: "couple",
      label: "Couple",
      description: "Create cherished memories together.",
    },
    {
      id: "family",
      label: "Family",
      description: "Build lifelong memories with loved ones.",
    },
    {
      id: "group",
      label: "Group",
      description: "Share extraordinary moments with friends.",
    },
  ]

  // Budget options with descriptions
  const budgetOptions = [
    {
      id: "budget",
      label: "Budget",
      description: "Affordable options with basic amenities",
    },
    {
      id: "economy",
      label: "Economy",
      description: "Mid-range comfort with good value",
    },
    {
      id: "luxury",
      label: "Luxury",
      description: "Premium experience with top-tier services",
    },
  ]

  return (
    <div
      ref={chatbotRef}
      className={`flex flex-col h-[500px] w-full max-w-md bg-black/40 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/20 transition-all duration-500 ${
        !formMode ? "fixed right-0 top-20 z-50 rounded-r-none" : ""
      }`}
    >
      {/* Chat header */}
      <div className="bg-black/80 text-white px-5 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-white/80" />
          <h3 className="font-medium text-base">{formMode ? "Create Your Itinerary" : "Travel Assistant"}</h3>
        </div>
        {formMode && (
          <div className="text-xs text-white/60 flex items-center">
            <MessageSquare className="w-3 h-3 mr-1" />
            Fill in your travel details
          </div>
        )}
      </div>

      {formMode ? (
        /* Form Interface */
        <div className="flex-1 p-4 overflow-y-auto bg-transparent">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-white mb-1">From</label>
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  placeholder="Starting city"
                  className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">To</label>
                <input
                  type="text"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  placeholder="Destination city"
                  className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-white mb-1">People</label>
                <input
                  type="number"
                  min="1"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="Number of travelers"
                  className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Budget (₹)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <IndianRupee className="w-4 h-4" />
                  </span>
                  <input
                    type="number"
                    min="1000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Your total budget"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-600 rounded-md bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Interests</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., Adventure, Culture, Food, Relaxation"
                className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowDateModal(true)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-white/10 text-white rounded-md text-sm hover:bg-white/20 transition-colors"
              >
                <Calendar className="w-4 h-4 mr-1.5" />
                {startDate && endDate ? `${formatDate(startDate)} to ${formatDate(endDate)}` : "Select Dates"}
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowTravelTypeModal(true)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-white/10 text-white rounded-md text-sm hover:bg-white/20 transition-colors"
              >
                <Heart className="w-4 h-4 mr-1.5" />
                {relationship ? travelTypeOptions.find((t) => t.id === relationship)?.label : "Relationship Type"}
              </button>

              <button
                type="button"
                onClick={() => setShowBudgetModal(true)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-white/10 text-white rounded-md text-sm hover:bg-white/20 transition-colors"
              >
                <IndianRupee className="w-4 h-4 mr-1.5" />
                {luxury ? budgetOptions.find((b) => b.id === luxury)?.label : "Travel Class"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <Compass className="w-5 h-5 mr-2" />
              Create Itinerary
            </button>
          </form>
        </div>
      ) : (
        /* Chat Interface */
        <>
          <div className="flex-1 p-4 overflow-y-auto bg-transparent">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.type === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block px-4 py-2.5 rounded-lg max-w-[85%] text-base ${
                    message.type === "user"
                      ? "bg-black/70 text-white rounded-tr-none shadow-md"
                      : "bg-white/70 text-gray-800 rounded-tl-none shadow-md backdrop-blur-sm"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex bg-black/30 backdrop-blur-md">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask to refine your itinerary..."
              className="flex-1 px-4 py-2.5 text-base border border-gray-500/40 rounded-l-md focus:outline-none focus:ring-1 focus:ring-white/50 bg-black/30 text-white placeholder-gray-600"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-black/70 text-white rounded-r-md hover:bg-black/90 transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </>
      )}

      {/* Date Modal */}
      {showDateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-black/80 backdrop-blur-lg p-5 rounded-xl w-full max-w-xs border border-white/20 text-white shadow-2xl">
            <h3 className="text-base font-semibold mb-4">Select Travel Dates</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1.5">Start Date</label>
                <div className="date-input-container">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/40 text-white calendar-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1.5">End Date</label>
                <div className="date-input-container">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/40 text-white calendar-white"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                onClick={() => setShowDateModal(false)}
                className="px-4 py-2 text-sm border border-gray-600 rounded-md text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDateSelection}
                className="px-4 py-2 text-sm bg-white/15 text-white rounded-md hover:bg-white/25 shadow-sm"
                disabled={!startDate || !endDate}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Travel Type Modal */}
      {showTravelTypeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <div
            className="bg-black/90 backdrop-blur-lg p-6 rounded-xl w-[90%] max-w-sm border border-white/20 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Select Relationship Type</h3>

            <div className="grid grid-cols-1 gap-3 mb-4">
              {travelTypeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    relationship === option.id ? "border-white/60 bg-white/15" : "border-white/10 hover:border-white/30"
                  }`}
                  onClick={() => setRelationship(option.id)}
                >
                  <div className="flex items-center mb-1.5">
                    <div
                      className={`w-4 h-4 rounded-full mr-2 ${relationship === option.id ? "bg-white" : "bg-white/30"}`}
                    ></div>
                    <span className="font-medium text-base">{option.label}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-tight pl-6">{option.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 mt-2">
              <button
                onClick={() => setShowTravelTypeModal(false)}
                className="px-4 py-2 text-sm border border-gray-600 rounded-md text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleTravelTypeSelection}
                className="px-4 py-2 text-sm bg-white/15 text-white rounded-md hover:bg-white/25 shadow-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Budget Modal */}
      {showBudgetModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowBudgetModal(false)}
        >
          <div
            className="bg-black/80 backdrop-blur-lg p-5 rounded-xl w-full max-w-xs border border-white/20 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold mb-4">Select Travel Class</h3>
            <div className="space-y-3">
              {budgetOptions.map((option) => (
                <div key={option.id} className="flex items-center p-1.5">
                  <input
                    type="radio"
                    id={option.id}
                    name="luxuryLevel"
                    value={option.id}
                    checked={luxury === option.id}
                    onChange={() => setLuxury(option.id)}
                    className="h-4 w-4 text-white focus:ring-white/50"
                  />
                  <div className="ml-2.5">
                    <label htmlFor={option.id} className="block text-sm text-gray-200 font-medium">
                      {option.label}
                    </label>
                    <p className="text-xs text-gray-400">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="px-4 py-2 text-sm border border-gray-600 rounded-md text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleBudgetSelection}
                className="px-4 py-2 text-sm bg-white/15 text-white rounded-md hover:bg-white/25 shadow-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

