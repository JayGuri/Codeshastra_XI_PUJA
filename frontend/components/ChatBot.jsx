"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Calendar, Users, Plane, MapPin } from "lucide-react"

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hi there! I'm your travel assistant. Tell me your destination, number of people, days, and budget to get started.",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [showDateModal, setShowDateModal] = useState(false)
  const [showTravelTypeModal, setShowTravelTypeModal] = useState(false)
  const [showTransportModal, setShowTransportModal] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [travelType, setTravelType] = useState("solo")
  const [transportMode, setTransportMode] = useState("plane")

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

    // Process the message (in a real app, this would involve NLP)
    setTimeout(() => {
      // Simulate bot response
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `Thanks for sharing! I'll create a travel plan for "${inputValue}". Would you like to add more details using the buttons below?`,
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
        content: `Great! I've noted your travel dates: ${startDate} to ${endDate}.`,
      },
    ])
  }

  const handleTravelTypeSelection = () => {
    setShowTravelTypeModal(false)
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        content: `Perfect! I've updated your travel type to: ${travelType}.`,
      },
    ])
  }

  const handleTransportSelection = () => {
    setShowTransportModal(false)
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        content: `Got it! Your preferred mode of transport is: ${transportMode}.`,
      },
    ])
  }

  return (
    <div className="flex flex-col h-[20%] w-full bg-gray-150 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20">
      {/* Chat header */}
      <div className="bg-gray-400 text-white px-4 py-3 flex items-center">
        <MapPin className="w-5 h-5 mr-2" />
        <h3 className="font-medium">Travel Assistant</h3>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.type === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block px-4 py-2 text-sm rounded-lg max-w-[85%] ${
                message.type === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white text-gray-800 rounded-tl-none shadow-sm"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick action buttons */}
      <div className="px-4 py-2 border-t border-gray-200 flex space-x-2 overflow-x-auto bg-white/70">
        <button
          onClick={() => setShowDateModal(true)}
          className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm whitespace-nowrap hover:bg-indigo-200 transition-colors"
        >
          <Calendar className="w-4 h-4 mr-1" />
          Travel Dates
        </button>
        <button
          onClick={() => setShowTravelTypeModal(true)}
          className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm whitespace-nowrap hover:bg-indigo-200 transition-colors"
        >
          <Users className="w-4 h-4 mr-1" />
          Travel Type
        </button>
        <button
          onClick={() => setShowTransportModal(true)}
          className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm whitespace-nowrap hover:bg-indigo-200 transition-colors"
        >
          <Plane className="w-4 h-4 mr-1" />
          Transport
        </button>
      </div>

      {/* Input area */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex bg-white/70">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter destination, people, days, and budget..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Date Modal */}
      {showDateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Select Travel Dates</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDateSelection}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Select Travel Type</h3>
            <div className="space-y-2">
              {["solo", "couple", "family", "group"].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="radio"
                    id={type}
                    name="travelType"
                    value={type}
                    checked={travelType === type}
                    onChange={() => setTravelType(type)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={type} className="ml-2 block text-sm text-gray-700 capitalize">
                    {type}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowTravelTypeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleTravelTypeSelection}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transport Modal */}
      {showTransportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Select Transport Mode</h3>
            <div className="space-y-2">
              {["plane", "train", "car", "bus", "cruise"].map((mode) => (
                <div key={mode} className="flex items-center">
                  <input
                    type="radio"
                    id={mode}
                    name="transportMode"
                    value={mode}
                    checked={transportMode === mode}
                    onChange={() => setTransportMode(mode)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={mode} className="ml-2 block text-sm text-gray-700 capitalize">
                    {mode}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowTransportModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleTransportSelection}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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

