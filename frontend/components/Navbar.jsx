"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80" : "bg-black"
      } backdrop-blur-lg border-b border-white/10`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 mr-auto">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {[
              { name: "Home", href: "/" },
              { name: "Community", href: "/community" },
              { name: "About Us", href: "/about" },
              { name: "Scrapbook", href: "/scrapbook" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right section - could add buttons/CTAs here */}
          <div className="hidden md:flex items-center ml-auto">
            <Link
              href="/login"
              className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <X className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-lg border-t border-white/10">
            {[
              { name: "Home", href: "/" },
              { name: "Community", href: "/community" },
              { name: "About Us", href: "/about" },
              { name: "Scrapbook", href: "/scrapbook" },
              { name: "Login", href: "/login" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  item.name === "Login"
                    ? "text-white bg-indigo-600 hover:bg-indigo-700"
                    : "text-gray-300 hover:text-white"
                } block px-3 py-2 rounded-md text-base font-medium transition-all`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
