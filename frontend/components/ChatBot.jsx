"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Calendar, Users, MapPin, MessageSquare, IndianRupee } from "lucide-react"

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Welcome! I'm your travel assistant. What destination would you like to explore?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [showDateModal, setShowDateModal] = useState(false)
  const [showTravelTypeModal, setShowTravelTypeModal] = useState(false)
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [travelType, setTravelType] = useState("solo")
  const [budgetCategory, setBudgetCategory] = useState("economy")
  const [isExpanded, setIsExpanded] = useState(true)
  const [initialPromptSubmitted, setInitialPromptSubmitted] = useState(true)
  const chatbotRef = useRef(null)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { type: "user", content: inputValue }])
    setIsExpanded(true)

    // Set initial prompt as submitted to show quick action buttons
    if (!initialPromptSubmitted) {
      setInitialPromptSubmitted(true)
    }

    // Process the message (in a real app, this would involve NLP)
    setTimeout(() => {
      // Simulate bot response
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `Thanks! I'll create a travel plan for "${inputValue}". Use the buttons below for more details.`,
        },
      ])
    }, 1000)

    setInputValue("")
  }

  const handleDateSelection = () => {
    setShowDateModal(false)
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        content: `Travel dates: ${startDate} to ${endDate}`,
      },
    ])
  }

  const handleTravelTypeSelection = () => {
    setShowTravelTypeModal(false)

    // Get the label for the selected travel type
    const selectedType = travelTypeOptions.find((option) => option.id === travelType)

    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        content: `Travel type: ${selectedType?.label || travelType}`,
      },
    ])
  }

  const handleBudgetSelection = () => {
    setShowBudgetModal(false)

    // Get the label for the selected budget category
    const selectedBudget = budgetOptions.find((option) => option.id === budgetCategory)

    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        content: `Budget category: ${selectedBudget?.label || budgetCategory}`,
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
      className={`flex flex-col ${
        initialPromptSubmitted ? "h-[450px]" : isExpanded || messages.length > 0 ? "h-[320px]" : "h-auto"
      } w-full max-w-md bg-black/40 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/20 transition-all duration-500`}
    >
      {/* Chat header */}
      <div className="bg-black/80 text-white px-5 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-white/80" />
          <h3 className="font-medium text-base">Travel Assistant</h3>
        </div>
        {messages.length === 0 && (
          <div className="text-xs text-white/60 flex items-center">
            <MessageSquare className="w-3 h-3 mr-1" />
            Tell me about your trip
          </div>
        )}
      </div>

      {/* Chat messages */}
      {messages.length > 0 && (
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
      )}

      {/* Input area */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex bg-black/30 backdrop-blur-md">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter destination, people, days, budget..."
          className="flex-1 px-4 py-2.5 text-base border border-gray-500/40 rounded-l-md focus:outline-none focus:ring-1 focus:ring-white/50 bg-black/30 text-white placeholder-gray-600"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-black/70 text-white rounded-r-md hover:bg-black/90 transition-colors flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Quick action buttons - only show after initial prompt */}
      {initialPromptSubmitted && (
        <div className="px-3 py-2.5 border-t border-white/10 flex space-x-3 overflow-x-auto bg-black/30 backdrop-blur-md">
          {/* Animated buttons */}
          <button
            onClick={() => setShowDateModal(true)}
            className="flex items-center px-3 py-1.5 bg-white/10 text-white rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-colors shadow-sm animate-fadeInUp"
            style={{ animationDelay: "0ms" }}
          >
            <Calendar className="w-4 h-4 mr-1.5" />
            Dates
          </button>
          <button
            onClick={() => setShowTravelTypeModal(true)}
            className="flex items-center px-3 py-1.5 bg-white/10 text-white rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-colors shadow-sm animate-fadeInUp"
            style={{ animationDelay: "150ms" }}
          >
            <Users className="w-4 h-4 mr-1.5" />
            Type
          </button>
          <button
            onClick={() => setShowBudgetModal(true)}
            className="flex items-center px-3 py-1.5 bg-white/10 text-white rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-colors shadow-sm animate-fadeInUp"
            style={{ animationDelay: "300ms" }}
          >
            <IndianRupee className="w-4 h-4 mr-1.5" />
            Budget
          </button>
        </div>
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

      {/* Travel Type Modal - Compact version without scrolling */}
      {showTravelTypeModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowTravelTypeModal(false)}
        >
          <div
            className="bg-black/80 backdrop-blur-lg p-4 rounded-xl w-full max-w-xs border border-white/20 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold mb-2">Select Travel Type</h3>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {travelTypeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                    travelType === option.id ? "border-white/40 bg-white/10" : "border-white/10 hover:border-white/30"
                  }`}
                  onClick={() => setTravelType(option.id)}
                >
                  <div className="flex items-center mb-1">
                    <div
                      className={`w-3 h-3 rounded-full mr-1.5 ${travelType === option.id ? "bg-white" : "bg-white/30"}`}
                    ></div>
                    <span className="font-medium text-sm">{option.label}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-tight">{option.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowTravelTypeModal(false)}
                className="px-3 py-1.5 text-sm border border-gray-600 rounded-md text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleTravelTypeSelection}
                className="px-3 py-1.5 text-sm bg-white/15 text-white rounded-md hover:bg-white/25 shadow-sm"
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
            <h3 className="text-base font-semibold mb-4">Select Budget Category</h3>
            <div className="space-y-3">
              {budgetOptions.map((option) => (
                <div key={option.id} className="flex items-center p-1.5">
                  <input
                    type="radio"
                    id={option.id}
                    name="budgetCategory"
                    value={option.id}
                    checked={budgetCategory === option.id}
                    onChange={() => setBudgetCategory(option.id)}
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

