'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, VolumeX, Volume2 } from 'lucide-react'
import Link from 'next/link'

const logos = [
  { name: 'Siemens', src: '/logos/Siemens.png' },
  { name: 'Nike', src: '/logos/Nike.png' },
  { name: 'Santander', src: '/logos/Santander.png' },
  { name: 'BayernLB', src: '/logos/Bayernlb.png' },
  { name: 'DEPT', src: '/logos/DEPT.png' }
]

const benefits = [
  "Erhalte in 7 Tagen passende AI-Experten bereit für Interviews",
  "Google Cloud zertifizierte ML-Engineers prüfen jeden Kandidaten",
  "Direkter Zugriff auf 1000+ spezialisierte AI-Experten",
]

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const heroVideoUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/HeroVideo-gDnCFNF5RFvRnSSGUgnDe7zLuN2Laf.mp4"

  useEffect(() => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'video';
    preloadLink.href = heroVideoUrl;
    preloadLink.type = 'video/mp4';
    document.head.appendChild(preloadLink);

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.load();
      
      videoRef.current.addEventListener('loadeddata', () => {
        videoRef.current?.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Autoplay failed:", error);
        });
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', () => {});
      }
      document.head.removeChild(preloadLink);
    };
  }, [heroVideoUrl]);

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
    <section className="bg-[#121118] text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-custom mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-4 sm:mb-6 leading-tight">
              In nur 7 Tagen zu deinem neuen AI-Mitarbeiter
            </h1>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 text-white">
              Verabschiede dich von langwierigen Bewerbungsprozessen – unser zielgerichteter Screening-Prozess liefert dir passgenaue, vorgeprüfte AI-Kandidaten, die sofort für dein Interview bereitstehen.
            </p>
            <div className="w-full mb-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="relative w-full lg:w-1/2 aspect-video">
                <video
                  ref={videoRef}
                  src={heroVideoUrl}
                  width="100%"
                  height="100%"
                  loop
                  playsInline
                  muted={isMuted}
                  controls={showControls}
                  className="rounded-lg"
                  onClick={handleVideoClick}
                  preload="auto"
                >
                  <source 
                    src={heroVideoUrl} 
                    type="video/mp4"
                  />
                  <track
                    kind="subtitles"
                    src="/videos/subtitles/HeroVideo.vtt"
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
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start mb-4">
                    <span className="mr-4 flex-shrink-0 mt-1 text-[#FFFFFF]">✓</span>
                    <p className="text-left text-base sm:text-lg">{benefit}</p>
                  </div>
                ))}
                <div className="w-full flex flex-col items-center mt-6">
                  <Button
                    variant="default"
                    size="lg"
                    className="font-semibold w-full sm:w-auto"
                    asChild
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Link href="https://calendly.com/wolfdanielmayer/termin-finden">
                      Jetzt kostenfreies Erstgespräch buchen
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="h-6 w-6" />
                      </motion.span>
                    </Link>
                  </Button>
                  <p className="text-sm text-gray-400 mt-2">Erfahrung aus mehr als 750 Vermittlungen</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-4 sm:mb-6">Uns vertrauen großartige Teams von</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 w-full max-w-6xl place-items-center">
            {logos.map((logo) => (
              <div key={logo.name} className="w-24 h-10 relative flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}