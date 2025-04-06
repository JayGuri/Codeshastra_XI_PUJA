import { useState, useRef, useEffect } from "react";
import { geocodeAddress } from "../utils/geocodingService";
import {
  Send,
  Calendar,
  MapPin,
  MessageSquare,
  IndianRupee,
  Heart,
  Compass,
  Users,
  Plane,
} from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { usePDF } from 'react-to-pdf';

// Add this new component for loading messages
const LoadingMessages = () => {
  const messages = [
    "Your trip is being planned...",
    "Budget is being allocated...",
    "Finding the best deals...",
    "Finalizing your itinerary..."
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 15000); // Change message every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <span>{messages[currentMessageIndex]}</span>
    </div>
  );
};

export default function ChatBot({ onCoordinatesChange }) {
  const [formMode, setFormMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTravelTypeModal, setShowTravelTypeModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialPromptSubmitted, setInitialPromptSubmitted] = useState(false);

  // Form data
  const [fromCity, setFromCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [people, setPeople] = useState("");
  const [budget, setBudget] = useState("");
  const [relationship, setRelationship] = useState("");
  const [luxury, setLuxury] = useState("");
  const [interests, setInterests] = useState("");

  // Add new state for itinerary ID
  const [itineraryId, setItineraryId] = useState(null);

  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle map zoom effect when switching to chat mode
  useEffect(() => {
    if (!formMode) {
      // Try to access the map instance (this would need to be adapted based on your actual map implementation)
      try {
        if (window.mapInstance) {
          // Zoom out the map for dramatic effect
          window.mapInstance.setZoom(2);
        }
      } catch (error) {
        console.log("Could not zoom map:", error);
      }
    }
  }, [formMode]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { type: "user", content: inputValue }]);
    
    const userMessage = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Get itinerary_id from state or localStorage
      const currentItineraryId = itineraryId || localStorage.getItem('itineraryId');
      
      if (!currentItineraryId) {
        throw new Error("No itinerary ID found");
      }

      const response = await fetch(
        "https://3ddc-14-139-125-231.ngrok-free.app/modify-itinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itinerary_id: currentItineraryId,
            user_message: userMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const markdownContent = data.travel_plan.replace(/^```markdown\n/, '').replace(/```$/, '');

      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          content: (
            <div className="prose max-w-none relative">
              
              <CustomMarkdown>{markdownContent}</CustomMarkdown>
            </div>
          ),
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          content: "Sorry, I couldn't process your request. Please try again.",
        },
      ]);
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelection = () => {
    setShowDateModal(false);
  };

  const handleTravelTypeSelection = () => {
    setShowTravelTypeModal(false);
  };

  const handleBudgetSelection = () => {
    setShowBudgetModal(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Convert from yyyy-mm-dd to mm-dd-yyyy
    const [year, month, day] = dateString.split("-");
    return `${month}-${day}-${year}`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    };

    try {
      // Get coordinates for source and destination
      const sourceCoords = await geocodeAddress(fromCity);
      const destCoords = await geocodeAddress(destinationCity);

      if (!sourceCoords || !destCoords) {
        throw new Error('Could not find coordinates for one or both locations');
      }

      // Update coordinates through the prop
      onCoordinatesChange?.({
        source: sourceCoords,
        destination: destCoords
      });

      const response = await fetch(
        "https://3ddc-14-139-125-231.ngrok-free.app/generate-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itineraryData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create itinerary");
      }

      const data = await response.json();
      
      // Save itinerary_id to state and localStorage
      if (data.itinerary_id) {
        setItineraryId(data.itinerary_id);
        localStorage.setItem('itineraryId', data.itinerary_id);
      }

      setInitialPromptSubmitted(true);
      setFormMode(false);

      const markdownContent = data.travel_plan.replace(/^```markdown\n/, '').replace(/```$/, '');

      setMessages([
        {
          type: "bot",
          content: (
            <div className="prose max-w-none relative">
              <CustomMarkdown>{markdownContent}</CustomMarkdown>
            </div>
          ),
        },
        {
          type: "bot",
          content:
            "How would you like to refine this itinerary? You can ask me to add specific activities, adjust the budget, or suggest accommodations.",
        },
      ]);
    } catch (error) {
      setMessages([
        {
          type: "bot",
          content:
            "Sorry, there was an error creating your itinerary. Please try again.",
        },
      ]);
      console.error("Error creating itinerary:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
  ];

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
  ];

  // Add this custom component for markdown rendering
  const CustomMarkdown = ({ children }) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Customize heading styles
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-black/90" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3 text-black/80" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mt-4 mb-2 text-black/70" {...props} />,
          
          // Customize paragraph and list styles
          p: ({ node, ...props }) => <p className="my-3 leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside my-3 space-y-1" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-3 space-y-1" {...props} />,
          
          // Customize table styles
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-300" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-sm border-t border-gray-200" {...props} />
          ),
          
          // Style blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />
          ),
          
          // Style code blocks and inline code
          code: ({ node, inline, ...props }) => (
            inline ? 
              <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props} /> :
              <code className="block bg-gray-100 rounded-lg p-4 my-4 text-sm overflow-x-auto" {...props} />
          ),
          
          // Style horizontal rules
          hr: ({ node, ...props }) => <hr className="my-6 border-gray-300" {...props} />,
          
          // Add spacing between list items
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    );
  };

  // Update the DownloadButton component
  
  return (
    <motion.div
    ref={chatbotRef}
    className={`flex mb-10 flex-col bg-white text-black/90 shadow-xl overflow-hidden border-l border-gray-700/30 transition-all duration-500 ${
      formMode
        ? "w-full h-full rounded-lg"
        : "w-[40%] h-screen fixed right-0 top-0 z-50 rounded-none"
    }`}
    initial={formMode ? { opacity: 1 } : { x: "100%" }}
    animate={formMode ? { opacity: 1 } : { x: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
  >
    {/* Chat header */}
    <div className="bg-white text-black px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-white/90" />
        <h3 className="font-semibold text-lg">
          {formMode ? "Create Your Itinerary" : "Travel Assistant"}
        </h3>
      </div>
      {formMode && (
        <div className="text-xs text-black/90 flex items-center">
          <MessageSquare className="w-3 h-3 mr-1" />
          Fill in your travel details
        </div>
      )}
    </div>

    {formMode ? (
      /* Form Interface */
      <div className="flex-1 p-6 overflow-y-auto bg-white rounded-lg text-black/90  space-y-5">
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium  mb-2">
                From
              </label>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="Starting city"
                className="w-full px-4 py-3 text-sm   rounded-lg bg-gray-200/80 text-black/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                To
              </label>
              <input
                type="text"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                placeholder="Destination city"
                className="w-full px-4 py-3 text-sm   rounded-lg bg-gray-200/80 text-black/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                People
              </label>
              <input
                type="number"
                min="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                placeholder="Number of travelers"
                className="w-full px-4 py-3 text-sm   rounded-lg bg-gray-200/80 text-black/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/90 mb-2">
                Budget (₹)
              </label>
              <div className="relative">
                
                <input
                  type="number"
                  min="1000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Your total budget"
                  className="w-full px-4 py-3 text-sm   rounded-lg bg-gray-200/80 text-black/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black/90 mb-2">
              Interests
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., Adventure, Culture, Food, Relaxation"
              className="w-full px-4 py-3 text-sm   rounded-lg bg-gray-200/80 text-black/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowDateModal(true)}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-200/80 text-black/90 rounded-lg text-sm hover:bg-gray-700/70 hover:text-white transition-colors "
            >
              <Calendar className="w-4 h-4 mr-2" />
              {startDate && endDate
                ? `${formatDate(startDate)} to ${formatDate(endDate)}`
                : "Select Dates"}
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowTravelTypeModal(true)}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-200/80 text-black/90 rounded-lg text-sm hover:bg-gray-700/70 hover:text-white transition-colors "
            >
              <Heart className="w-4 h-4 mr-2" />
              {relationship
                ? travelTypeOptions.find((t) => t.id === relationship)?.label
                : "Relationship Type"}
            </button>

            <button
              type="button"
              onClick={() => setShowBudgetModal(true)}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-200/80 text-black/90 rounded-lg text-sm hover:bg-gray-700/70 hover:text-white transition-colors "
            >
              <IndianRupee className="w-4 h-4 mr-2" />
              {luxury
                ? budgetOptions.find((b) => b.id === luxury)?.label
                : "Travel Class"}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black   text-white font-medium py-3 px-4 hover:bg-transparent hover:text-black hover:border-1 hover:border-black rounded-full transition-colors duration-300 flex items-center justify-center shadow-lg"
          >
            {isLoading ? (
              <LoadingMessages />
            ) : (
              <>
                <Compass className="w-5 h-5 mr-2" />
                Create Itinerary
              </>
            )}
          </button>
        </form>
      </div>
    ) : (
      /* Chat Interface */
      <>
        <div className="flex-1 p-5 overflow-y-auto bg-white">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.type === 'user' ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block px-5 py-3 rounded-xl max-w-[90%] text-base ${
                  message.type === 'user'
                    ? "bg-gray-200 text-black rounded-tr-none shadow-md"
                    : "bg-white border border-gray-200 text-black rounded-tl-none shadow-md"
                }`}
              >
                {typeof message.content === 'string' ? (
                  message.content
                ) : (
                  <div className="relative">
                    {message.content}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-800 flex bg-gray-900"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask to refine your itinerary..."
            className="flex-1 px-5 py-3 text-base border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-500"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </>
    )}

    {/* Quick action buttons - only show after initial prompt */}
    {initialPromptSubmitted && (
      <div className="px-4 py-3 border-t border-gray-800 flex space-x-3 overflow-x-auto bg-gray-900">
        {/* Animated buttons */}
        <button
          onClick={() => setShowDateModal(true)}
          className="flex items-center px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-gray-700 transition-colors shadow-md animate-fadeInUp"
          style={{ animationDelay: "0ms" }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Dates
        </button>
        <button
          onClick={() => setShowTravelTypeModal(true)}
          className="flex items-center px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-gray-700 transition-colors shadow-md animate-fadeInUp"
          style={{ animationDelay: "150ms" }}
        >
          <Users className="w-4 h-4 mr-2" />
          Type
        </button>
        <button
          onClick={() => setShowTransportModal(true)}
          className="flex items-center px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-gray-700 transition-colors shadow-md animate-fadeInUp"
          style={{ animationDelay: "300ms" }}
        >
          <Plane className="w-4 h-4 mr-2" />
          Transport
        </button>
      </div>
    )}

    {/* Date Modal */}
    {showDateModal && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-900 p-6 rounded-xl w-full max-w-sm border border-gray-800 text-white shadow-2xl">
          <h3 className="text-lg font-semibold mb-5">
            Select Travel Dates
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date
              </label>
              <div className="date-input-container">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-700 rounded-lg bg-gray-800 text-white calendar-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Date
              </label>
              <div className="date-input-container">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-700 rounded-lg bg-gray-800 text-white calendar-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowDateModal(false)}
              className="px-5 py-2.5 text-sm border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleDateSelection}
              className="px-5 py-2.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
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
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray/70 backdrop-blur-sm">
        <div
          className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-sm border border-gray-800 text-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold mb-5">
            Select Relationship Type
          </h3>

          <div className="grid grid-cols-1 gap-3 mb-5">
            {travelTypeOptions.map((option) => (
              <div
                key={option.id}
                className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                  relationship === option.id
                    ? "border-indigo-500 bg-indigo-900/30"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setRelationship(option.id)}
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 ${
                      relationship === option.id ? "bg-indigo-500" : "bg-gray-600"
                    }`}
                  ></div>
                  <span className="font-medium text-base">
                    {option.label}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-tight pl-7">
                  {option.description}
                </p>
              </div>
            ))}
           
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowTravelTypeModal(false)}
              className="px-5 py-2.5 text-sm border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleTravelTypeSelection}
              className="px-5 py-2.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setShowBudgetModal(false)}
      >
        <div
          className="bg-gray-900 p-6 rounded-xl w-full max-w-sm border border-gray-800 text-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold mb-5">
            Select Travel Class
          </h3>
          <div className="space-y-4">
            {budgetOptions.map((option) => (
              <div key={option.id} className="flex items-center p-2">
                <input
                  type="radio"
                  id={option.id}
                  name="luxuryLevel"
                  value={option.id}
                  checked={luxury === option.id}
                  onChange={() => setLuxury(option.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="ml-3">
                  <label
                    htmlFor={option.id}
                    className="block text-sm text-gray-300 font-medium"
                  >
                    {option.label}
                  </label>
                  <p className="text-xs text-gray-400 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowBudgetModal(false)}
              className="px-5 py-2.5 text-sm border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleBudgetSelection}
              className="px-5 py-2.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}
  </motion.div> 
  );
}
