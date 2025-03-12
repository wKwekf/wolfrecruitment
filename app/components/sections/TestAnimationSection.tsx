'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function TestAnimationSection() {
  // State für die Sichtbarkeit
  const [isVisible, setIsVisible] = useState(false)
  
  // Überprüfe beim Laden, ob die Komponente angezeigt werden soll
  useEffect(() => {
    // Hier könntest du eine clientseitige Umgebungsvariable prüfen
    // Für jetzt setzen wir es auf false, um die Komponente auszublenden
    setIsVisible(false)
  }, [])
  
  // Wenn nicht sichtbar, nichts rendern
  if (!isVisible) {
    return null
  }

  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    // Make sure elements are available
    if (!sectionRef.current || !containerRef.current || !imageRef.current) return
    
    // Wait for the image to load to get accurate dimensions
    const img = imageRef.current
    
    const setupAnimation = () => {
      // HIER KANNST DU MIT DEN WERTEN SPIELEN:
      // Erhöhe diesen Wert, um weiter nach links zu scrollen
      // 1.0 = Standard-Scrolldistanz
      // 1.5 = 50% mehr Scrolldistanz
      // 2.0 = Doppelte Scrolldistanz
      const scrollDistanceMultiplier = 1.10;
      
      // Oder verwende einen festen Zusatzwert (in Pixel)
      // 0 = Standard-Scrolldistanz
      // 300 = 300px zusätzliche Scrolldistanz
      // 500 = 500px zusätzliche Scrolldistanz
      const additionalScrollDistance = 0;
      
      // Create a simple horizontal scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // Start slightly before the top of the section reaches the top of the viewport
          start: "top 10%", 
          // End after the section leaves the viewport
          end: "+=100%", 
          pin: true,
          scrub: 0.8, // Slightly smoother scrubbing
          pinSpacing: true,
          // Only pin for a portion of the scroll
          pinReparent: false
        }
      })
      
      // Animate the container position
      tl.to(containerRef.current, {
        x: () => {
          // Calculate how far to scroll based on container width
          const containerWidth = containerRef.current?.scrollWidth || 0
          const sectionWidth = sectionRef.current?.clientWidth || 0
          
          // Angepasste Berechnung mit Multiplikator und zusätzlicher Distanz
          return (-(containerWidth - sectionWidth) * scrollDistanceMultiplier) - additionalScrollDistance
        },
        ease: "none"
      })
    }
    
    // If image is already loaded
    if (img.complete) {
      setupAnimation()
    } else {
      // Wait for image to load
      img.onload = setupAnimation
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section className="bg-[#FFFFFF] text-black w-full">
      {/* Überschrift-Bereich */}
      <div className="py-8 container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl text-center font-bold text-black">Unser Prozess.<br />Schritt für Schritt.</h2>
        <p className="text-center text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
          Von der ersten Kontaktaufnahme bis zum perfekten Match – so finden wir <span className="text-[#f25a75]">genau die AI-Experten</span>, die Ihr Unternehmen voranbringen.
        </p>
      </div>
      
      {/* Outer container with full width */}
      <div 
        ref={sectionRef} 
        className="w-full overflow-hidden"
        style={{ height: '50vh', minHeight: '300px' }}
      >
        {/* Inner container that will be animated */}
        <div
          ref={containerRef}
          className="h-full flex items-center"
          style={{ 
            width: 'max-content', 
            padding: '0 3%', 
            paddingLeft: '8%',
            paddingTop: '1%'
          }}
        >
          <img 
            ref={imageRef}
            src="/svg/fiverr_flow.svg" 
            alt="Process Flow Diagram" 
            className="h-full w-auto object-contain"
            style={{ 
              maxHeight: '70%',
              transform: 'scale(0.84)', // Reduced by 30% from 1.2
              transformOrigin: 'center 45%',
              marginLeft: '4vw',
              marginTop: '20vh'
            }}
            id="flowImage"
          />
        </div>
      </div>
      
      {/* Space after the animation */}
      <div className="h-[50vh] bg-[#FFFFFF]"></div>
    </section>
  )
} 