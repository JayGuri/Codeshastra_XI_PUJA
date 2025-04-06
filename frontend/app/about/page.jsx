"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import AuroraBackground from "@/components/AuroraBackground"
import { Globe, Map, Users, Sparkles, Compass, Shield, MessageSquare, Zap, ArrowRight } from "lucide-react"

export default function About() {
  const [isVisible, setIsVisible] = useState({
    mission: false,
    problem: false,
    features: false,
    how: false,
    team: false,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll(".animate-section")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <AuroraBackground className="bg-black text-white">
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10"></div>
            <Image
              src="/images/hero-travel.jpg"
              alt="Travel destinations collage"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container mx-auto px-4 relative z-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Redefining <span className="text-blue-400">Travel Planning</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-8">
              We're on a mission to make travel planning seamless, personalized, and intelligent.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors duration-300 flex items-center"
              >
                Plan Your Trip <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/community"
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium transition-colors duration-300 border border-gray-600"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div id="mission" className={`py-20 animate-section ${isVisible.mission ? "animate-fade-in" : "opacity-0"}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-4">
                <Compass className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                At TravelSage, we believe that travel should be transformative, not tedious. Our mission is to harness
                the power of artificial intelligence to create personalized travel experiences that match your unique
                preferences, budget, and interests. We're dedicated to removing the stress from travel planning so you
                can focus on what matters most – creating unforgettable memories.
              </p>
            </div>
          </div>
        </div>

        {/* The Problem We're Solving */}
        <div
          id="problem"
          className={`py-20 bg-gray-900/50 animate-section ${isVisible.problem ? "animate-fade-in" : "opacity-0"}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">The Problem We're Solving</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-500/20 p-2 rounded-lg mt-1">
                      <span className="text-red-400 font-bold">01</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Information Overload</h3>
                      <p className="text-gray-300">
                        Travelers spend an average of 30+ hours researching destinations, accommodations, and activities
                        across dozens of websites.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 p-2 rounded-lg mt-1">
                      <span className="text-yellow-400 font-bold">02</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Budget Uncertainty</h3>
                      <p className="text-gray-300">
                        Most travelers exceed their intended budget by 27% due to hidden costs and poor planning tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                      <span className="text-green-400 font-bold">03</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Personalization Gap</h3>
                      <p className="text-gray-300">
                        Generic itineraries fail to account for individual preferences, resulting in disappointing
                        experiences and wasted opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/Images/travel-problems.jpeg"
                  alt="Frustrated traveler planning a trip"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-lg font-medium text-white">
                    "73% of travelers report feeling stressed during the planning process."
                  </p>
                  <p className="text-sm text-gray-300 mt-2">— Global Travel Insights Report, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Features */}
        <div id="features" className={`py-20 animate-section ${isVisible.features ? "animate-fade-in" : "opacity-0"}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block p-3 bg-purple-500/20 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-purple-400" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Intelligent Features</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform combines cutting-edge AI with human expertise to deliver a travel planning experience
                unlike any other.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Itineraries</h3>
                <p className="text-gray-300">
                  Our advanced AI analyzes thousands of data points to create personalized itineraries based on your
                  preferences, budget, and travel style.
                </p>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Map className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Interactive 3D Globe</h3>
                <p className="text-gray-300">
                  Explore potential destinations in our immersive 3D globe, complete with weather patterns, points of
                  interest, and real-time travel information.
                </p>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Trips</h3>
                <p className="text-gray-300">
                  Join group adventures with like-minded travelers or create your own community trips to share
                  experiences and reduce costs.
                </p>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Budget Protection</h3>
                <p className="text-gray-300">
                  Our budget tracking tools help you plan and stick to your travel budget with real-time alerts and
                  cost-saving recommendations.
                </p>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Travel Assistant</h3>
                <p className="text-gray-300">
                  Our intelligent chatbot provides 24/7 assistance, from suggesting hidden gems to helping with
                  last-minute changes to your itinerary.
                </p>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">One-Click Booking</h3>
                <p className="text-gray-300">
                  Book your entire trip—from flights to accommodations to activities—in just a few clicks, with
                  guaranteed best prices and flexible cancellation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div
          id="how"
          className={`py-20 bg-gray-900/50 animate-section ${isVisible.how ? "animate-fade-in" : "opacity-0"}`}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How TravelSage Works</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">Planning your perfect trip is as easy as 1-2-3</p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 text-center relative">
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Tell Us Your Dream</h3>
                  <p className="text-gray-300">
                    Share your destination, budget, travel dates, and preferences with our AI assistant. The more
                    details you provide, the more personalized your experience will be.
                  </p>
                </div>

                <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 text-center relative">
                  <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Review Your Plan</h3>
                  <p className="text-gray-300">
                    Within seconds, receive a comprehensive travel plan including accommodations, activities,
                    transportation, and dining options tailored to your preferences.
                  </p>
                </div>

                <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 text-center relative">
                  <div className="bg-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Enjoy Your Journey</h3>
                  <p className="text-gray-300">
                    Book your trip with confidence and access your itinerary anytime, anywhere. Our AI assistant remains
                    available throughout your journey for real-time support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div id="team" className={`py-20 animate-section ${isVisible.team ? "animate-fade-in" : "opacity-0"}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">The Minds Behind TravelSage</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're a diverse team of travel enthusiasts, AI experts, and industry veterans united by our passion for
                transforming the travel experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Harry Potter",
                  role: "Founder & CEO",
                  bio: "Former travel executive with 15+ years of experience revolutionizing the industry.",
                  image: "/Images/team-1.jpg",
                },
                {
                  name: "Luna Lovegod",
                  role: "Chief Technology Officer",
                  bio: "AI researcher and engineer specializing in personalization algorithms.",
                  image: "/Images/team-2.jpg",
                },
                {
                  name: "Draco Malfoy",
                  role: "Head of User Experience",
                  bio: "Award-winning designer focused on creating intuitive digital experiences.",
                  image: "/Images/team-3.jpg",
                },
                {
                  name: "Sirius Black",
                  role: "Travel Community Director",
                  bio: "Travel blogger and community builder with a passion for authentic experiences.",
                  image: "/Images/team-5.jpeg",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image || `/placeholder.svg?height=400&width=300`}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-blue-400 mb-3">{member.role}</p>
                    <p className="text-gray-300">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Travel Experience?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join thousands of travelers who have discovered the power of AI-driven travel planning with TravelSage.
            </p>
            <Link
              href="/"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-lg transition-colors duration-300 inline-flex items-center"
            >
              Start Planning Your Adventure <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </AuroraBackground>
  )
}

