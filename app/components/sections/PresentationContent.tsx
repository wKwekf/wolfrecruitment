'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

interface SlideProps {
  title: string
  content: string | React.ReactNode
  bgColor: string
  textColor?: string
  id: string
}

const slides: SlideProps[] = [
  {
    id: 'intro',
    title: "Wolf AI Präsentation",
    content: "Scrollen Sie nach unten oder nutzen Sie die Pfeiltasten, um durch die Präsentation zu navigieren.",
    bgColor: "#1E1D24",
    textColor: "white"
  },
  {
    id: 'mission',
    title: "Unsere Mission",
    content: "Wir finden die AI-Experten, die andere übersehen.",
    bgColor: "#F25A75",
    textColor: "white"
  },
  {
    id: 'process',
    title: "Wie wir arbeiten",
    content: (
      <div className="space-y-4">
        <p className="text-xl md:text-2xl">1. Wir verstehen Ihre Anforderungen</p>
        <p className="text-xl md:text-2xl">2. Wir finden die passenden Kandidaten</p>
        <p className="text-xl md:text-2xl">3. Wir prüfen die Kandidaten gründlich</p>
        <p className="text-xl md:text-2xl">4. Sie erhalten nur geprüfte Profile</p>
      </div>
    ),
    bgColor: "#2A2D34",
    textColor: "white"
  },
  {
    id: 'success',
    title: "Unsere Erfolge",
    content: (
      <div className="space-y-6">
        <p className="text-xl md:text-2xl">Über 100 erfolgreiche Vermittlungen</p>
        <p className="text-xl md:text-2xl">Durchschnittliche Besetzungszeit: 7 Tage</p>
        <p className="text-xl md:text-2xl">95% Kundenzufriedenheit</p>
      </div>
    ),
    bgColor: "#3E78B2",
    textColor: "white"
  },
  {
    id: 'why',
    title: "Warum Wolf AI?",
    content: (
      <div className="space-y-6">
        <p className="text-xl md:text-2xl">✓ Spezialisiert auf AI-Experten</p>
        <p className="text-xl md:text-2xl">✓ Tiefes Verständnis der Technologie</p>
        <p className="text-xl md:text-2xl">✓ Schnelle Besetzung offener Stellen</p>
        <p className="text-xl md:text-2xl">✓ Qualitativ hochwertige Kandidaten</p>
      </div>
    ),
    bgColor: "#1E1D24",
    textColor: "white"
  },
  {
    id: 'contact',
    title: "Kontakt",
    content: (
      <div className="space-y-6">
        <p className="text-xl md:text-2xl">Telefon: +49 89 322 096 412</p>
        <p className="text-xl md:text-2xl">E-Mail: hello@wolfai.de</p>
        <p className="text-xl md:text-2xl">Web: wolfai.de</p>
      </div>
    ),
    bgColor: "#F25A75",
    textColor: "white"
  }
]

const Slide: React.FC<SlideProps & { index: number }> = ({ title, content, textColor = 'white', id, index }) => {
  return (
    <div 
      id={id}
      className="h-screen w-full flex flex-col justify-center items-center p-8 snap-start"
      data-index={index}
    >
      <div className="max-w-4xl w-full" style={{ color: textColor }}>
        <h2 className="text-4xl md:text-6xl font-bold mb-8">{title}</h2>
        {typeof content === 'string' ? (
          <p className="text-xl md:text-2xl">{content}</p>
        ) : (
          content
        )}
      </div>
    </div>
  )
}

export default function PresentationContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  
  // Handle background color transitions
  useEffect(() => {
    if (!containerRef.current || !bgRef.current) return
    
    const container = containerRef.current
    
    // Function to update background color based on scroll position
    const updateBackgroundColor = () => {
      const scrollPosition = container.scrollTop
      const windowHeight = window.innerHeight
      
      // Calculate which slide we're on and how far through it we are
      const currentIndex = Math.floor(scrollPosition / windowHeight)
      const nextIndex = Math.min(currentIndex + 1, slides.length - 1)
      const progress = (scrollPosition % windowHeight) / windowHeight
      
      // Update current slide index for other effects if needed
      setCurrentSlideIndex(currentIndex)
      
      // Get colors for current and next slide
      const currentColor = slides[currentIndex].bgColor
      const nextColor = slides[nextIndex].bgColor
      
      // Use GSAP to set the background color with interpolation
      gsap.to(bgRef.current, {
        backgroundColor: progress > 0 
          ? gsap.utils.interpolate(currentColor, nextColor, progress)
          : currentColor,
        duration: 0.1, // Small duration for smooth updates
        overwrite: true
      })
    }
    
    // Initial color
    gsap.set(bgRef.current, {
      backgroundColor: slides[0].bgColor
    })
    
    // Use requestAnimationFrame for better performance
    let rafId: number
    const animateScroll = () => {
      updateBackgroundColor()
      rafId = requestAnimationFrame(animateScroll)
    }
    
    rafId = requestAnimationFrame(animateScroll)
    
    // Cleanup
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])
  
  // Enable keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const currentScroll = container.scrollTop
      const slideHeight = window.innerHeight
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'j') {
        // Scroll down one slide
        container.scrollTo({
          top: currentScroll + slideHeight,
          behavior: 'smooth'
        })
        e.preventDefault()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'k') {
        // Scroll up one slide
        container.scrollTo({
          top: currentScroll - slideHeight,
          behavior: 'smooth'
        })
        e.preventDefault()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  return (
    <>
      {/* Fixed background div that will change color */}
      <div 
        ref={bgRef} 
        className="fixed inset-0 w-full h-full transition-colors z-0"
      />
      
      {/* Scrollable content */}
      <div 
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Hide scrollbar for Chrome, Safari and Opera */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {slides.map((slide, index) => (
          <Slide 
            key={slide.id}
            {...slide}
            index={index}
          />
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-4">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlideIndex === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => {
                containerRef.current?.scrollTo({
                  top: index * window.innerHeight,
                  behavior: 'smooth'
                })
              }}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            />
          ))}
        </div>
      </div>
    </>
  )
} 