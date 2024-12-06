'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#121118] text-white w-full py-6 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {currentYear} wolfrecruitment GmbH</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
            <Link 
              href="https://open.spotify.com/show/6BwXQ1XIy1KyNoqNWbNSoX" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span>Podcast</span>
            </Link>
            <Link href="/datenschutz" className="text-sm hover:text-gray-300 transition-colors">
              Datenschutz
            </Link>
            <Link href="/impressum" className="text-sm hover:text-gray-300 transition-colors">
              Impressum
            </Link>
            <Link href="/agb" className="text-sm hover:text-gray-300 transition-colors">
              AGB
            </Link>
          </nav>
        </div>
      </div>
      {showScrollTop && (
        <div className="absolute right-4 -top-6">
          <Button 
            onClick={scrollToTop}
            className="bg-[#F25A75] hover:bg-[#F25A75]/90 text-white shadow-lg transition-all duration-300 border-2 border-black w-12 h-12 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </div>
      )}
    </footer>
  )
}