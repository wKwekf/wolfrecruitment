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
  const [isPlayingBLB, setIsPlayingBLB] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoBLBRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const videoUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/CampusFoundersTestimonial-2ecEr5ui8AbGwL3X5cq0RYKytxJctf.mp4"
  const videoBLBUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/BayernLBTestimonial-2s.klfjaergjnekrgnkenrgerg.mp4-uGpwHOUrAqqIFKKYc3jUziK7W3RS6X.mp4"

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
    if (isVisible) {
      if (videoRef.current) {
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
      
      if (videoBLBRef.current) {
        videoBLBRef.current.muted = true
        videoBLBRef.current.play().then(() => {
          setIsPlayingBLB(true)
          // Ensure subtitles are shown when video starts playing
          if (videoBLBRef.current?.textTracks[0]) {
            videoBLBRef.current.textTracks[0].mode = 'showing'
          }
        }).catch(error => {
          console.error("Autoplay failed:", error)
        })
      }
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

  const handleBLBVideoClick = () => {
    setShowControls(true)
    if (isMuted) {
      setIsMuted(false)
      if (videoBLBRef.current) {
        videoBLBRef.current.muted = false
      }
    }
    if (!isPlayingBLB && videoBLBRef.current) {
      videoBLBRef.current.play()
      setIsPlayingBLB(true)
    }
  }

  return (
    <section ref={sectionRef} id="case-study" className="bg-white py-20 text-[#121118]">
      <div className="max-w-custom mx-auto px-4">
        <div className="mb-12">
        </div>
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 md:pr-8">
            <div className="mr-auto" style={{ maxWidth: "500px" }}>
              <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium mb-3 text-[#121118]">
                Fallstudie: Campus Founders
              </h1>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-figtree text-lg font-bold mb-1 text-[#121118]">Problem:</h3>
                    <p className="text-lg font-medium text-gray-600 leading-normal">
                      Die Campus Founders suchten monatelang erfolglos nach einem AI-Track-Lead – einer Schlüsselposition, die technische Expertise mit strategischem Denken verbindet.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-figtree text-lg font-bold mb-1 text-[#121118]">Ziel:</h3>
                    <p className="text-lg font-medium text-gray-600 leading-normal">
                      Schnelle Besetzung der Position mit einem erstklassigen Kandidaten.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-figtree text-lg font-bold mb-1 text-[#121118]">Lösung:</h3>
                    <p className="text-lg font-medium text-gray-600 leading-normal">
                      Durch unser Netzwerk von 1.000+ KI-Experten präsentierten wir innerhalb von 7 Tagen die ersten passenden Kandidaten. Insgesamt stellten wir 15 hochqualifizierte Bewerber vor.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-figtree text-lg font-bold mb-1 text-[#121118]">Ergebnis:</h3>
                    <p className="text-lg font-medium text-gray-600 leading-normal">
                      Position in nur 4 Wochen erfolgreich besetzt. Die Campus Founders konnten ihre Projekte direkt mit der benötigten Expertise starten.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-6">
                  <div>
                    <p className="font-semibold">Mitarbeiter</p>
                    <p className="text-gray-600">86</p>
                  </div>
                  <div>
                    <p className="font-semibold">Branche</p>
                    <p className="text-gray-600">Startup-Inkubator</p>
                  </div>
                </div>
              </div>
            </div>
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

      {/* BayernLB Case Study */}
      <div className="max-w-custom mx-auto px-4 mt-32">
        <div className="flex flex-col md:flex-row-reverse items-start">
          <div className="md:w-1/2 md:pr-8">
            <div className="ml-auto" style={{ maxWidth: "500px" }}>
              <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium mb-3 text-[#121118] text-right">
                Fallstudie: BayernLB
              </h1>
              <div className="space-y-4 text-right">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-figtree text-lg font-bold mb-1 text-[#121118] text-right">Problem:</h3>
                    <p className="text-lg font-medium text-gray-600 leading-normal text-right">
                      Die BayernLB suchte einen erfahrenen AI Product Owner, der die digitale Transformation vorantreiben und KI-Lösungen implementieren kann.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-figtree text-lg font-bold mb-1 text-[#121118] text-right">Ziel:</h3>
                    <p className="text-lg font-medium text-gray-600 leading-normal text-right">
                      Einen Experten finden, der sowohl technisches Know-how als auch Führungsqualitäten mitbringt.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-figtree text-lg font-bold mb-1 text-[#121118] text-right">Lösung:</h3>
                    <p className="text-lg font-medium text-gray-600 leading-normal text-right">
                      Innerhalb von 7 Tagen präsentierten wir die ersten KI-Experten mit Banking-Expertise. Von 12 vorgestellten Kandidaten überzeugten 9 im ersten Gespräch.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-figtree text-lg font-bold mb-1 text-[#121118] text-right">Ergebnis:</h3>
                    <p className="text-lg font-medium text-gray-600 leading-normal text-right">
                      Nach nur 3 Wochen wurde der ideale Kandidat gefunden. Die Position konnte schnell und passgenau besetzt werden.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-6 mt-6">
                  <div className="text-right">
                    <p className="font-semibold">Mitarbeiter</p>
                    <p className="text-gray-600">7.500</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Branche</p>
                    <p className="text-gray-600">Finanzdienstleistungen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-32 h-8 relative">
                <Image
                  src="/logos/Logo_Bayernlb_Black.png"
                  alt="BayernLB logo"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="relative aspect-video">
              <video
                ref={videoBLBRef}
                src={videoBLBUrl}
                width="100%"
                height="100%"
                loop
                playsInline
                muted={isMuted}
                controls={showControls}
                className="rounded-lg"
                onClick={handleBLBVideoClick}
                crossOrigin="anonymous"
              >
                <track
                  kind="subtitles"
                  src="/videos/subtitles/BayernLB.vtt"
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