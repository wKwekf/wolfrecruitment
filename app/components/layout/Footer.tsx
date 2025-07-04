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