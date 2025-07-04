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
import { CustomerCandidateDialog } from "@/app/components/ui/customer-candidate-dialog"

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
  { name: 'Plattform', href: 'https://app.wolfai.de' },
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
  const [dialogOpen, setDialogOpen] = useState(false)

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

    const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://')
    
    return (
      <Link
        href={link.href}
        onClick={(e) => link.href.startsWith('/#') ? handleScroll(e, link.href) : undefined}
        className="hover:text-gray-300 font-semibold"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {link.name}
      </Link>
    )
  }

  return (
    <>
      <div className="bg-[#1E1D24] text-white py-2">
        <div className="max-w-custom mx-auto px-4 sm:px-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-gray-400">100% FOKUS AUF CLOUD & DEVOPS</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">NUR SENIOR ENGINEERS (3+ JAHRE)</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">EXKLUSIV IN D-A-CH</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">7-TAGE-GARANTIE</span>
            </div>
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
                          onClick={() => setDialogOpen(true)}
                        >
                          Kennenlern-Gespräch vereinbaren
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
                    onClick={() => setDialogOpen(true)}
                  >
                    Kennenlern-Gespräch
                  </Button>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
      
      <CustomerCandidateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCustomerSelect={() => {
          setDialogOpen(false);
          window.location.href = "https://calendly.com/d/cvzz-69b-hc9/quick-chat";
        }}
      />
    </>
  )
}