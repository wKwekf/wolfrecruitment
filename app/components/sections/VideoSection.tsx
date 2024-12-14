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
  const [isMutedBLB, setIsMutedBLB] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [showControlsBLB, setShowControlsBLB] = useState(false)
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
        // Ensure subtitles are shown when video starts playing
        if (videoRef.current.textTracks[0]) {
          videoRef.current.textTracks[0].mode = 'showing'
        }
        videoRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.error("Autoplay failed:", error)
        })
      }
      
      if (videoBLBRef.current) {
        videoBLBRef.current.muted = true
        // Ensure subtitles are shown when video starts playing
        if (videoBLBRef.current.textTracks[0]) {
          videoBLBRef.current.textTracks[0].mode = 'showing'
        }
        videoBLBRef.current.play().then(() => {
          setIsPlayingBLB(true)
        }).catch(error => {
          console.error("Autoplay failed:", error)
        })
      }
    }
  }, [isVisible])

  useEffect(() => {
    // Initialize subtitles for Campus Founders video
    if (videoRef.current && videoRef.current.textTracks[0]) {
      videoRef.current.textTracks[0].mode = 'showing'
    }
    
    // Initialize subtitles for BayernLB video
    if (videoBLBRef.current && videoBLBRef.current.textTracks[0]) {
      videoBLBRef.current.textTracks[0].mode = 'showing'
    }
  }, [])

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

  const handleMuteToggleBLB = () => {
    setIsMutedBLB(!isMutedBLB)
    if (videoBLBRef.current) {
      videoBLBRef.current.muted = !isMutedBLB
    }
  }

  const handleBLBVideoClick = () => {
    setShowControlsBLB(true)
    if (isMutedBLB) {
      setIsMutedBLB(false)
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
                    <span className="text-lg font-bold mb-2 block">Ausgangssituation:</span>
                    <p className="text-lg font-medium text-gray-600 leading-normal">
                      Die Campus Founders suchten monatelang erfolglos nach einem AI-Track-Lead – einer Schlüsselposition, die technische Expertise mit strategischem Denken verbindet.
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-lg font-bold mb-2 block">Lösung:</span>
                    <p className="text-lg font-medium text-gray-600 leading-normal">
                      Wir präsentierten innerhalb von 7 Tagen die ersten passenden Kandidaten. Insgesamt stellten wir 15 hochqualifizierte Bewerber vor.
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-lg font-bold mb-2 block">Ergebnis:</span>
                    <p className="text-lg font-medium text-gray-600 leading-normal">
                      Position in nur 4 Wochen erfolgreich besetzt. Die Campus Founders konnten ihre Projekte direkt mit der benötigten Expertise starten.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-6">
                  <div>
                    <span className="text-lg font-bold text-[#121118]">Mitarbeiter</span>
                    <p className="text-lg text-gray-600">86</p>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-[#121118]">Branche</span>
                    <p className="text-lg text-gray-600">Startup-Inkubator</p>
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
                      <span className="text-lg font-bold mb-2 block text-right">Ausgangssituation:</span>
                      <p className="text-lg font-medium text-gray-600 leading-normal text-right">
                        Die BayernLB suchte jeweils einen ML-Engineer und einen MLOps-Engineer, die Grundlagen schaffen und AI-Lösungen voranbringen können.
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-lg font-bold mb-2 block text-right">Lösung:</span>
                      <p className="text-lg font-medium text-gray-600 leading-normal text-right">
                        In 7 Tagen erhielt das Team der BayernLB die ersten passenden Kandidaten. Von den 5 vorgestellten Kandidaten wurden alle zum Interview eingeladen.
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-lg font-bold mb-2 block text-right">Ergebnis:</span>
                      <p className="text-lg font-medium text-gray-600 leading-normal text-right">
                        In nur 4 Wochen wurde die ML-Engineer und zwei Wochen später der MLOps Engineer mit zwei herausragenden Kandidaten besetzt.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-6 mt-6">
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#121118]">Mitarbeiter</span>
                      <p className="text-lg text-gray-600">7.500</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#121118]">Branche</span>
                      <p className="text-lg text-gray-600">Finanzdienstleistungen</p>
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
                  muted={isMutedBLB}
                  controls={showControlsBLB}
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
                {!showControlsBLB && (
                  <button
                    onClick={handleMuteToggleBLB}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                  >
                    {isMutedBLB ? (
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
      </div>
    </section>
  )
}