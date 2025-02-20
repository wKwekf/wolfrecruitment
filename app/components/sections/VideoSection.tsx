'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const caseStudies = [
  {
    id: 'campus-founders',
    company: 'Campus Founders',
    jobTitles: ['AI-Track-Lead'],
    industry: 'Startup-Inkubator',
  },
  {
    id: 'bayernlb',
    company: 'BayernLB',
    jobTitles: ['ML-Engineer', 'MLOps-Engineer'],
    industry: 'Finanzdienstleistungen',
  }
]

export default function FourthSection() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [showControlsBLB, setShowControlsBLB] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayingBLB, setIsPlayingBLB] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoBLBRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const videoUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/CampusFoundersTestimonial-2ecEr5ui8AbGwL3X5cq0RYKytxJctf.mp4"
  const videoBLBUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/BayernLBTestimonial-2s.klfjaergjnekrgnkenrgerg-zWOMu1mgJFft4ScVtB1Eb6rDw3Ycgd.mp4"

  const allKeywords = Array.from(new Set([
    ...caseStudies.flatMap(study => study.jobTitles),
    ...caseStudies.map(study => study.industry)
  ]))

  const toggleFilter = (keyword: string) => {
    setActiveFilters(prev => 
      prev.includes(keyword) 
        ? prev.filter(f => f !== keyword)
        : [...prev, keyword]
    )
  }

  const shouldShowCaseStudy = (study: typeof caseStudies[0]) => {
    if (activeFilters.length === 0) return true
    return activeFilters.some(filter => 
      study.jobTitles.includes(filter) || study.industry === filter
    )
  }

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
      }
      
      if (videoBLBRef.current) {
        videoBLBRef.current.muted = true
        // Ensure subtitles are shown when video starts playing
        if (videoBLBRef.current.textTracks[0]) {
          videoBLBRef.current.textTracks[0].mode = 'showing'
        }
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
    
    if (section === 'video-blb') {
      const blbSection = document.getElementById('case-study-blb');
      if (blbSection) {
        blbSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleVideoClick = () => {
    setShowControls(true)
    if (videoRef.current && !isPlaying) {
      videoRef.current.muted = false
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleBLBVideoClick = () => {
    setShowControlsBLB(true)
    if (videoBLBRef.current && !isPlayingBLB) {
      videoBLBRef.current.muted = false
      videoBLBRef.current.play()
      setIsPlayingBLB(true)
    }
  }

  return (
    <section ref={sectionRef} id="case-study" className="bg-[#F25A75] py-20">
      <div className="max-w-custom mx-auto px-4 space-y-12">
        <div className="text-center space-y-8">
          <div>
            <h2 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium mb-4 text-[#121118]">
              Erfolgreiche Vermittlungen.<br />Messbare Ergebnisse.
            </h2>
            <p className="text-xl text-[#121118]/90 max-w-3xl mx-auto font-medium">
              Die Zahlen sprechen für sich ⚡️ Hier zeigen wir dir, wie wir <span className="font-bold">AI-Talente</span> schnell und effizient mit den richtigen Unternehmen zusammenbringen.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 items-center">
            {allKeywords.map((keyword) => (
              <Button
                key={keyword}
                variant={activeFilters.includes(keyword) ? "default" : "outline"}
                onClick={() => toggleFilter(keyword)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilters.includes(keyword)
                    ? 'bg-[#121118] text-white'
                    : 'bg-white text-[#121118] hover:bg-[#121118] hover:text-white'
                }`}
              >
                {keyword}
              </Button>
            ))}
          </div>
        </div>

        {/* Campus Founders Case Study */}
        {shouldShowCaseStudy(caseStudies[0]) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/2 md:pr-8 w-full">
                <div className="mr-auto" style={{ maxWidth: "500px" }}>
                  <h1 className="font-platform text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight font-medium mb-3 text-[#121118]">
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
                    <Button 
                      className="mt-6"
                      variant="outline"
                      asChild
                    >
                      <Link href="/case-studies/campus-founders" className="flex items-center gap-2">
                        Mehr zur Case Study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 w-full">
                <div className="mb-4 w-48 h-12 relative">
                  <Image
                    src="/logos/Logo_CampusFounders_Black.png"
                    alt="Campus Founders Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    loop
                    playsInline
                    controls={showControls}
                    className="rounded-lg absolute top-0 left-0 w-full h-full object-cover"
                    onClick={handleVideoClick}
                    crossOrigin="anonymous"
                    poster="/videos/Thumbnail/CampusFounders_Thumbnail.png"
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
                      onClick={handleVideoClick}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* BayernLB Case Study */}
        {shouldShowCaseStudy(caseStudies[1]) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            id="case-study-blb"
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row-reverse items-start">
              <div className="md:w-1/2 md:pr-8">
                <div className="ml-auto" style={{ maxWidth: "500px" }}>
                  <h1 className="font-platform text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight font-medium mb-3 text-[#121118] text-right">
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
                          Bereits nach 7 Tagen präsentierten wir die ersten 5 passenden Kandidaten. Im Verlauf des Prozesses stellten wir insgesamt 14 hochqualifizierte Bewerber vor, die alle zum Interview eingeladen wurden.
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-lg font-bold mb-2 block text-right">Ergebnis:</span>
                        <p className="text-lg font-medium text-gray-600 leading-normal text-right">
                          In nur 4 Wochen wurde der ML-Engineer und zwei Wochen später der MLOps-Engineer mit zwei herausragenden Kandidaten besetzt.
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
                    <Button 
                      className="mt-6 w-full"
                      variant="outline"
                      asChild
                    >
                      <Link href="/case-studies/bayernlb" className="flex items-center justify-end gap-2">
                        Mehr zur Case Study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 w-full">
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
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <video
                    ref={videoBLBRef}
                    src={videoBLBUrl}
                    loop
                    playsInline
                    controls={showControlsBLB}
                    className="rounded-lg absolute top-0 left-0 w-full h-full object-cover"
                    onClick={handleBLBVideoClick}
                    crossOrigin="anonymous"
                    poster="/videos/Thumbnail/BayernLB_Thumbnail.png"
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
                      onClick={handleBLBVideoClick}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}