'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, VolumeX, Volume2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FourthSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const videoUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/CampusFoundersTestimonial-2ecEr5ui8AbGwL3X5cq0RYKytxJctf.mp4"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1 // Video starts when 10% of the section is visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().then(() => {
        setIsPlaying(true)
        // Ensure subtitles are shown when video starts playing
        if (videoRef.current?.textTracks[0]) {
          videoRef.current.textTracks[0].mode = 'showing'
        }
      }).catch(error => {
        console.error("Autoplay failed:", error)
      })
    }
  }, [isVisible])

  useEffect(() => {
    // Check for URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    
    if (section === 'video' && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const handleVideoClick = () => {
    setShowControls(true)
    if (isMuted) {
      setIsMuted(false)
      if (videoRef.current) {
        videoRef.current.muted = false
      }
    }
    if (!isPlaying && videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section ref={sectionRef} id="case-study" className="bg-white py-20 text-[#121118]">
      <div className="max-w-custom mx-auto px-4">
        <div className="mb-12">
        </div>
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 md:pr-8">
            <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium mb-4 sm:mb-6 text-[#121118]">
              Fallstudie: Campus Founders
            </h1>
            <p className="text-lg mb-8">
              Erfahren, wie wir dem führenden AI-Inkubator geholfen haben, 
              innerhalb von nur wenigen Tagen einen AI Track Lead zu finden.
            </p>
            <ul className="mb-8 space-y-2 text-lg">
              <li>✓ Präzise Anforderungsanalyse</li>
              <li>✓ Zugriff auf unser exklusives AI-Experten-Netzwerk</li>
              <li>✓ Beschleunigte Bewerbungsprozesse</li>
              <li>✓ Erfolgreiches Onboarding des neuen Mitarbeiters</li>
            </ul>
            <Button
              variant="default"
              size="lg"
              className="font-semibold"
              asChild
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link href="https://calendly.com/wolfdanielmayer/termin-finden">
                Jetzt unverbindliches Erstgespräch buchen
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.span>
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="mb-4 w-48 h-12 relative">
              <Image
                src="/logos/Logo_CampusFounders_Black.png"
                alt="Campus Founders Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                src={videoUrl}
                width="100%"
                height="100%"
                loop
                playsInline
                muted={isMuted}
                controls={showControls}
                className="rounded-lg"
                onClick={handleVideoClick}
                crossOrigin="anonymous"
              >
                <track
                  kind="subtitles"
                  src="/videos/subtitles/CampusFounders.vtt"
                  srcLang="de"
                  label="Deutsch"
                  default
                />
              </video>
              {!showControls && (
                <button
                  onClick={handleMuteToggle}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}