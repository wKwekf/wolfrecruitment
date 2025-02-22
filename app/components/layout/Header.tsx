'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Mail, Phone } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'

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
      { name: 'Kostenlose Profile', href: '/kandidatenprofile' },
    ]
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (window.location.pathname === '/' && href.includes('#')) {
      e.preventDefault()
      setIsOpen(false)
      const element = document.querySelector(href.split('#')[1])
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const renderNavLink = (link: NavigationLink) => {
    if (link.type === 'dropdown') {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gray-300 font-semibold">
            {link.name}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1E1D24] border-gray-800">
            {link.items?.map((item) => (
              <DropdownMenuItem key={item.name} className="focus:bg-gray-800">
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-300 w-full py-1"
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
      <header className="bg-[#121118] text-white w-full z-50 sticky top-0">
        <div className="px-4 sm:px-8 py-2">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Wolf Logo"
                width={120}
                height={40}
              />
            </Link>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-4 lg:space-x-6">
                {navigationLinks.map((link) => (
                  <div key={link.name}>
                    {renderNavLink(link)}
                  </div>
                ))}
                <Link 
                  href="https://open.spotify.com/show/6BwXQ1XIy1KyNoqNWbNSoX" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-300 font-semibold flex items-center gap-1"
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
              </nav>
              <div className="hidden md:block">
                <Button 
                  variant="default"
                  size="lg"
                  className="hidden md:inline-flex"
                  asChild
                >
                  <Link href="/resources/talent-preview">
                    Hol dir zwei Gratis-Profile
                  </Link>
                </Button>
              </div>
              <button 
                className="md:hidden text-white ml-auto font-semibold"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? 'Schließen' : 'Menü'}
              </button>
            </div>
          </div>
          {isOpen && (
            <nav className="mt-4 md:hidden">
              <ul className="flex flex-col space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <Button 
                      variant="default" 
                      className="w-full justify-start font-semibold"
                      asChild
                    >
                      <Link 
                        href={link.href}
                        onClick={(e) => link.href.startsWith('#') ? handleScroll(e, link.href) : undefined}
                      >
                        {link.name}
                      </Link>
                    </Button>
                  </li>
                ))}
                <li>
                  <Button 
                    variant="default" 
                    className="w-full justify-start font-semibold"
                    asChild
                  >
                    <Link 
                      href="https://open.spotify.com/show/6BwXQ1XIy1KyNoqNWbNSoX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
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
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="default" 
                    className="w-full justify-start font-semibold"
                    asChild
                  >
                    <Link href="https://calendly.com/wolfdanielmayer/termin-finden">
                      Jetzt unverbindliches Erstgespräch buchen
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}