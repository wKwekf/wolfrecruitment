'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

export default function TestAnimationSection() {
  // State für die Sichtbarkeit
  const [isVisible, setIsVisible] = useState(false)
  
  // Refs müssen vor jeder bedingten Rückgabe deklariert werden
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  
  // Überprüfe beim Laden, ob die Komponente angezeigt werden soll
  useEffect(() => {
    // Hier könntest du eine clientseitige Umgebungsvariable prüfen
    // Für jetzt setzen wir es auf false, um die Komponente auszublenden
    setIsVisible(false)
  }, [])
  
  // GSAP-Effekt muss auch vor der bedingten Rückgabe deklariert werden
  useEffect(() => {
    // Wenn nicht sichtbar, nichts tun
    if (!isVisible) return
    
    // Only run on client side
    if (typeof window === 'undefined') return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    // Make sure elements are available
    if (!sectionRef.current || !containerRef.current || !imageRef.current) return
    
    // Da wir jetzt ein div statt eines img-Elements verwenden, 
    // können wir die Animation direkt starten
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
    
    // Starte die Animation direkt
    setupAnimation()
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [isVisible])
  
  // Wenn nicht sichtbar, nichts rendern
  if (!isVisible) {
    return null
  }

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
          {/* Verwende next/image statt img-Tag */}
          <div 
            ref={imageRef}
            className="relative h-full"
            style={{ 
              maxHeight: '70%',
              transform: 'scale(0.84)',
              transformOrigin: 'center 45%',
              marginLeft: '4vw',
              marginTop: '20vh'
            }}
          >
            <Image 
              src="/svg/fiverr_flow.svg" 
              alt="Process Flow Diagram" 
              width={1000}
              height={500}
              className="h-full w-auto object-contain"
              id="flowImage"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Space after the animation */}
      <div className="h-[50vh] bg-[#FFFFFF]"></div>
    </section>
  )
} 