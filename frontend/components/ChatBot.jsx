"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Calendar, Users, Plane, MapPin, MessageSquare } from "lucide-react"

export default function ChatBot() {
  const [messages, setMessages] = useState([])
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
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        content: `Travel type: ${travelType}`,
      },
    ])
  }

  const handleTransportSelection = () => {
    setShowTransportModal(false)
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        content: `Transport: ${transportMode}`,
      },
    ])
  }

  return (
    <div
      className={`flex flex-col ${messages.length > 0 ? "h-[280px]" : "h-[140px]"} w-full max-w-md bg-black/40 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/20 transition-all duration-300`}
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
            <div key={index} className={`mb-3 ${message.type === "user" ? "text-right" : "text-left"}`}>
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
          placeholder="Enter destination, number of people, days, budget..."
          className="flex-1 px-4 py-2.5 text-base border border-gray-500/40 rounded-l-md focus:outline-none focus:ring-1 focus:ring-white/50 bg-black/30 text-white placeholder-gray-300"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-black/70 text-white rounded-r-md hover:bg-black/90 transition-colors flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Quick action buttons */}
      <div className="px-3 py-2.5 border-t border-white/10 flex space-x-3 overflow-x-auto bg-black/30 backdrop-blur-md">
        <button
          onClick={() => setShowDateModal(true)}
          className="flex items-center px-3 py-1.5 bg-white/10 text-white rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-colors shadow-sm"
        >
          <Calendar className="w-4 h-4 mr-1.5" />
          Dates
        </button>
        <button
          onClick={() => setShowTravelTypeModal(true)}
          className="flex items-center px-3 py-1.5 bg-white/10 text-white rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-colors shadow-sm"
        >
          <Users className="w-4 h-4 mr-1.5" />
          Type
        </button>
        <button
          onClick={() => setShowTransportModal(true)}
          className="flex items-center px-3 py-1.5 bg-white/10 text-white rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-colors shadow-sm"
        >
          <Plane className="w-4 h-4 mr-1.5" />
          Transport
        </button>
      </div>

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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-black/80 backdrop-blur-lg p-5 rounded-xl w-full max-w-xs border border-white/20 text-white shadow-2xl">
            <h3 className="text-base font-semibold mb-4">Select Travel Type</h3>
            <div className="space-y-3">
              {["solo", "couple", "family"].map((type) => (
                <div key={type} className="flex items-center p-1.5">
                  <input
                    type="radio"
                    id={type}
                    name="travelType"
                    value={type}
                    checked={travelType === type}
                    onChange={() => setTravelType(type)}
                    className="h-4 w-4 text-white focus:ring-white/50"
                  />
                  <label htmlFor={type} className="ml-2.5 block text-sm text-gray-200 capitalize">
                    {type}
                  </label>
                </div>
              ))}
              <div className="flex items-center p-1.5">
                <input
                  type="radio"
                  id="group"
                  name="travelType"
                  value="group"
                  checked={travelType === "group"}
                  onChange={() => setTravelType("group")}
                  className="h-4 w-4 text-white focus:ring-white/50"
                />
                <label htmlFor="group" className="ml-2.5 block text-sm text-gray-200 capitalize">
                  Group (&gt;10)
                </label>
              </div>
            </div>
            <div className="mt-5 flex justify-end space-x-3">
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

      {/* Transport Modal */}
      {showTransportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-black/80 backdrop-blur-lg p-5 rounded-xl w-full max-w-xs border border-white/20 text-white shadow-2xl">
            <h3 className="text-base font-semibold mb-4">Select Transport Mode</h3>
            <div className="space-y-3">
              {["plane", "train", "car", "bus", "cruise"].map((mode) => (
                <div key={mode} className="flex items-center p-1.5">
                  <input
                    type="radio"
                    id={mode}
                    name="transportMode"
                    value={mode}
                    checked={transportMode === mode}
                    onChange={() => setTransportMode(mode)}
                    className="h-4 w-4 text-white focus:ring-white/50"
                  />
                  <label htmlFor={mode} className="ml-2.5 block text-sm text-gray-200 capitalize">
                    {mode}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                onClick={() => setShowTransportModal(false)}
                className="px-4 py-2 text-sm border border-gray-600 rounded-md text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleTransportSelection}
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

