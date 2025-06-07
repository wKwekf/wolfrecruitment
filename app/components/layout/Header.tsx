'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Mail, Phone } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'

interface NavigationLink {
  name: string;
  href: string;
  type?: 'dropdown';
  items?: Array<{
    name: string;
    href: string;
  }>;
}

const navigationLinks: NavigationLink[] = [
  { name: 'Preise', href: '/preise' },
  { name: 'Ressourcen', 
    href: '#',
    type: 'dropdown',
    items: [
      { name: 'ROI-Rechner', href: '/roi-rechner' },
    ]
  },
]

export default function Header() {
  const [showButton, setShowButton] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const prevShowButtonRef = useRef(showButton)
  const [isRootPage, setIsRootPage] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    // Close dropdown when route changes
    const handleRouteChange = () => {
      setDropdownOpen(false)
    }

    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    // Check if we're on the root page
    setIsRootPage(window.location.pathname === '/')
    
    // If not on root page, show button immediately
    if (window.location.pathname !== '/') {
      setShowButton(true)
    }

    const handleScroll = () => {
      // Only apply scroll logic on root page
      if (window.location.pathname === '/') {
        const heroSection = document.querySelector('section')
        if (heroSection) {
          const heroRect = heroSection.getBoundingClientRect()
          // Show button when hero section is 75% scrolled out of viewport
          setShowButton(heroRect.top < -(heroRect.height * 0.75))
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP animation for nav and button
  useEffect(() => {
    if (showButton !== prevShowButtonRef.current) {
      prevShowButtonRef.current = showButton
      
      // Only animate on root page
      if (isRootPage && navRef.current) {
        if (showButton) {
          // Animate nav to the left when button appears
          gsap.to(navRef.current, {
            x: -10,
            duration: 0.5,
            ease: "power2.out"
          })
        } else {
          // Animate nav to the right when button disappears
          gsap.to(navRef.current, {
            x: 0,
            duration: 0.5,
            ease: "power2.out"
          })
        }
      }
      
      // Only animate button on root page
      if (isRootPage && buttonRef.current && showButton) {
        // Animate button in
        gsap.fromTo(buttonRef.current, 
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        )
      }
    }
  }, [showButton, isRootPage])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (window.location.pathname === '/' && href.includes('#')) {
      e.preventDefault()
      const element = document.querySelector(href.split('#')[1])
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const renderNavLink = (link: NavigationLink) => {
    if (link.type === 'dropdown') {
      return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gray-300 font-semibold">
            {link.name}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1E1D24] border-gray-800">
            {link.items?.map((item) => (
              <DropdownMenuItem key={item.name} className="focus:bg-gray-800" onSelect={() => setDropdownOpen(false)}>
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-300 w-full py-1"
                  onClick={() => setDropdownOpen(false)}
                >
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <Link
        href={link.href}
        onClick={(e) => link.href.startsWith('/#') ? handleScroll(e, link.href) : undefined}
        className="hover:text-gray-300 font-semibold"
      >
        {link.name}
      </Link>
    )
  }

  return (
    <>
      <div className="bg-[#1E1D24] text-white py-2">
        <div className="max-w-custom mx-auto px-4 sm:px-8">
          <div className="flex justify-end items-center gap-6">
            <Link 
              href="tel:+498932209412"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors text-sm"
            >
              <Phone className="h-4 w-4" strokeWidth={2.5} />
              +49 89 322 096 412
            </Link>
            <Link 
              href="mailto:hello@wolfai.de"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors text-sm"
            >
              <Mail className="h-4 w-4" strokeWidth={2.5} />
              hello@wolfai.de
            </Link>
          </div>
        </div>
      </div>
      <div className="z-50 sticky top-0">
        <div className="flex justify-center w-full py-3 px-4 sm:px-8">
          <header className="bg-[#F5F5F5]/30 text-[#1A1921] rounded-full w-full max-w-6xl backdrop-blur-lg h-16 flex items-center">
            <div className="px-6 sm:px-8 w-full">
              <div className="flex justify-between items-center">
                <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/logo.png"
                      alt="Wolf Logo"
                      width={120}
                      height={40}
                    />
                  </Link>
                </div>
                
                {/* Desktop Navigation */}
                <div className={`hidden md:flex items-center ${!showButton && isRootPage ? 'w-full justify-end' : ''}`}>
                  <div 
                    className="space-x-4 lg:space-x-6"
                    ref={navRef}
                  >
                    {navigationLinks.map((link) => (
                      <div key={link.name} className="inline-block">
                        {renderNavLink(link)}
                      </div>
                    ))}
                    <Link 
                      href="https://open.spotify.com/show/6BwXQ1XIy1KyNoqNWbNSoX" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-gray-300 font-semibold inline-flex items-center gap-1"
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
                  </div>
                  <div className="ml-6">
                    {showButton && (
                      <div
                        ref={buttonRef}
                        className={isRootPage ? "opacity-0" : "opacity-100"}
                      >
                        <Button 
                          variant="default"
                          size="default"
                          className="inline-flex rounded-full bg-[#F25A75] hover:bg-[#F25A75]/90 transition-colors h-10"
                          asChild
                        >
                          <Link href="https://calendly.com/d/cvzz-69b-hc9/quick-chat">
                            Kennenlern-Gespräch vereinbaren
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Mobile CTA Button */}
                <div className="md:hidden">
                  <Button 
                    variant="default"
                    size="sm"
                    className="rounded-full bg-[#F25A75] hover:bg-[#F25A75]/90 transition-colors"
                    asChild
                  >
                    <Link href="https://calendly.com/d/cvzz-69b-hc9/quick-chat">
                      Kennenlern-Gespräch
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  )
}