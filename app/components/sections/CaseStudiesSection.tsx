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

export default function CaseStudiesSection() {
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
    // If no filters are active, show everything
    if (activeFilters.length === 0) return true

    // Check if the case study matches ANY of the active filters
    return activeFilters.some(filter => 
      study.jobTitles.includes(filter) || // Check if it's a matching job title
      study.industry === filter           // Check if it's a matching industry
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
              Erfolgsgeschichten.<br />Messbare Ergebnisse.
            </h2>
            <p className="text-xl text-[#121118]/90 max-w-3xl mx-auto font-medium">
              Entdecke, wie wir <span className="font-bold">AI-Talente</span> erfolgreich mit führenden Unternehmen zusammenbringen.
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

        <div className="grid md:grid-cols-2 gap-6">
          {/* Campus Founders Case Study */}
          {shouldShowCaseStudy(caseStudies[0]) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >              
              <Link href="/case-studies/campus-founders" className="block relative w-full mb-4" style={{ paddingTop: '56.25%' }}>
                <Image
                  src="/videos/Thumbnail/CampusFounders_Thumbnail.png"
                  alt="Campus Founders Case Study"
                  fill
                  className="rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-all rounded-lg flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </Link>

              <div className="space-y-3">
                <h3 className="font-platform text-xl font-medium text-[#121118]">
                  AI-Track-Lead angestellt in 4 Wochen
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">86 Mitarbeiter</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">Startup-Inkubator</span>
                </div>
                <p className="text-gray-600">
                  Von monatelanger Suche zu perfektem Match: Wie wir den Campus Founders halfen, ihre Schlüsselposition zu besetzen.
                </p>
                <div className="flex justify-end">
                  <Button 
                    variant="outline"
                    asChild
                    className="hover:bg-[#121118] hover:text-white transition-colors"
                  >
                    <Link href="/case-studies/campus-founders" className="flex items-center gap-2">
                      Zur vollständigen Case Study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
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
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <Link href="/case-studies/bayernlb" className="block relative w-full mb-4" style={{ paddingTop: '56.25%' }}>
                <Image
                  src="/videos/Thumbnail/BayernLB_Thumbnail.png"
                  alt="BayernLB Case Study"
                  fill
                  className="rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-all rounded-lg flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </Link>

              <div className="space-y-3">
                <h3 className="font-platform text-xl font-medium text-[#121118]">
                  2 AI-Experten angestellt in 6 Wochen
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">7.500 Mitarbeiter</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">Finanzdienstleistungen</span>
                </div>
                <p className="text-gray-600">
                  Wie wir der BayernLB halfen, ihr AI-Team mit einem ML-Engineer und MLOps-Engineer aufzubauen.
                </p>
                <div className="flex justify-end">
                  <Button 
                    variant="outline"
                    asChild
                    className="hover:bg-[#121118] hover:text-white transition-colors"
                  >
                    <Link href="/case-studies/bayernlb" className="flex items-center gap-2">
                      Zur vollständigen Case Study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}