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
  { name: 'Covestro', src: '/logos/Covestro.png' },
  { name: 'DEPT', src: '/logos/DEPT.png' }
]

const testimonials = [
  {
    name: "Manuela Stöckl",
    title: "Teamlead Talent Acquisition",
    company: "Siemens",
    photo: "/photos/Manu.jpg"
  },
  {
    name: "Theresa Baeumel",
    title: "Director Talent Acquisition",
    company: "Nike",
    photo: "/photos/Theresa.png"
  },
  {
    name: "Pablo Portilla",
    title: "Teamlead Talent Acquisition",
    company: "Santander",
    photo: "/photos/Pablo.png"
  },
  {
    name: "Dirk Blöbl",
    title: "Technical Director & Partner",
    company: "DEPT",
    photo: "/photos/Dirk.jpg"
  }
]

const benefits = [
  "Erhalte in 7 Tagen passende AI-Experten bereit für Interviews",
  "Google Cloud zertifizierte ML-Engineers prüfen jeden Kandidaten"
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      if (video) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
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

  const handleAvatarClick = () => {
    const testimonialSection = document.getElementById('testimonials');
    if (testimonialSection) {
      testimonialSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className="bg-[#121118] text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-custom mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                <h1 className="font-platform text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-tight tracking-heading mb-6">
                  <span className="text-[#f25a75] block">Dein AI-Team.</span>
                  <span className="text-white block">In 7 Tagen.</span>
                </h1>
                <p className="text-xl text-gray-300 mb-6 sm:mb-8">
                  Schluss mit unpassenden Bewerbungen. Wir liefern dir <span className="text-[#f25a75]">handverlesene AI-Experten</span> – persönlich von uns in intensiven Interviews vorqualifiziert. Mit ausführlicher Bewertung und sofort verfügbar für deine Gespräche.
                </p>
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
                    className="font-semibold w-full sm:w-auto mb-4 bg-[#F25A75] hover:bg-[#F25A75]/90 transition-colors shadow-[0_0_20px_rgba(242,90,117,0.3)]"
                    asChild
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Link href="https://calendly.com/wolfdanielgonzalezgarcia/quickchat">
                      Jetzt Kennenlern-Gespräch buchen
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="h-6 w-6" />
                      </motion.span>
                    </Link>
                  </Button>
                  <p className="text-sm text-gray-400 text-center max-w-lg">Nur noch 2 Slots für Suchaufträge im April verfügbar - Unsere Recruiter haben eine Kapazitätsgrenze für Projekte</p>
                </div>
              </div>
              <div className="relative w-full lg:w-1/2 flex items-center">
                <div className="w-full aspect-video relative">
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
                      className="absolute bottom-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center z-10"
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
          </motion.div>
        </div>

        <div className="mt-16 sm:mt-24 flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex -space-x-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className="relative w-10 h-10 border-2 border-white rounded-full overflow-hidden cursor-pointer hover:scale-110 transition-transform"
                    style={{ zIndex: testimonials.length - index }}
                    onClick={handleAvatarClick}
                    role="button"
                    tabIndex={0}
                    aria-label={`Scroll to ${testimonial.name}'s testimonial`}
                  >
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4 flex items-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-0">Mehr als 20 erfolgreiche Suchaufträge in 2024 mit großartigen Teams von</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-12 w-full max-w-6xl place-items-center">
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