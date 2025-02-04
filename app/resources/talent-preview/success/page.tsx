'use client'

import React, { useRef, useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const heroVideoUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/HeroVideo-gDnCFNF5RFvRnSSGUgnDe7zLuN2Laf.mp4"

// Using real testimonials from TestimonialSection
const testimonials = [
  {
    quote: "Wolf lieferte hervorragende Ergebnisse bei der Einstellung von sehr gefragten Tech-Profilen.",
    name: "Manuela Stöckl",
    title: "Teamlead Talent Acquisition",
    company: "Siemens",
    photo: "/photos/Manu.jpg",
    logo: "/logos/Logo_Siemens_Black.png"
  },
  {
    quote: "Die Zusammenarbeit mit Wolf war ein echtes Vergnügen.",
    name: "Theresa Baeumel",
    title: "Director Talent Acquisition",
    company: "Nike",
    photo: "/photos/Theresa.png",
    logo: "/logos/Logo_Nike_Black.png"
  },
  {
    quote: "Während des Recruiting-Prozesses für mehrere Positionen in meiner Abteilung beeindruckte mich Wolf mit exzellenter Talent Acquisition und Sourcing-Expertise.",
    name: "Marina Sverdel",
    title: "Domain Owner",
    company: "Metro.digital",
    photo: "/photos/Marina.jpg",
    logo: "/logos/Logo_MetroDigital_Black.png"
  },
  {
    quote: "Wolf hat uns dabei geholfen, den richtigen Kandidaten für eine unserer technischen Führungspositionen zu finden.",
    name: "Dirk Blößl",
    title: "Technical Director & Partner",
    company: "DEPT",
    photo: "/photos/Dirk.jpg",
    logo: "/logos/Logo_Dept_Black.png"
  },
  {
    quote: "Wolf besitzt ein außerordentliches Talent dafür, die Wünsche und vor allem die Bedürfnisse der Menschen zu verstehen.",
    name: "Pablo Portilla",
    title: "Teamlead Talent Acquisition",
    company: "Santander",
    photo: "/photos/Pablo.png",
    logo: "/logos/Logo_Santander_Black.png"
  }
]

function TalentPreviewSuccessContent() {
  const searchParams = useSearchParams()
  const showMarketingMessage = searchParams.get('marketing') === 'true'
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full">
      <div className="max-w-custom mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20">
        {showMarketingMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20"
          >
            <div className="flex items-center space-x-4">
              <span className="text-4xl">🎉</span>
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">Fast geschafft!</h3>
                <p className="text-gray-300">
                  Wir haben dir gerade eine Bestätigungs-E-Mail geschickt. Bitte bestätige deine E-Mail-Adresse, 
                  damit wir dich über die neuesten AI-Recruiting Trends informieren können. 
                  <span className="block mt-2 text-sm text-gray-400">
                    (Bitte check auch deinen Spam-Ordner und markiere uns als "Kein Spam" 😊)
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                  Danke für dein Interesse!
                </h1>
                <p className="text-xl text-gray-300">
                  Wir werden dir innerhalb der nächsten 2-3 Werktage zwei passende Profile zusenden.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">Brauchst du Recruiting-Unterstützung?</h3>
                <p className="text-base sm:text-lg text-gray-300">
                  Wenn du über die kostenlosen Profile hinaus Unterstützung bei der Besetzung deiner AI-Positionen brauchst, 
                  sind wir gerne für dich da. Unser Team hat jahrelange Erfahrung in der AI-Branche und versteht die 
                  spezifischen Anforderungen deiner Vakanzen.
                </p>
                <div className="flex flex-col space-y-4">
                  <Button 
                    asChild
                    size="lg"
                  >
                    <a href="mailto:contact@wolf.ai">
                      Jetzt kostenlose AI-Recruiting Beratung sichern
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={heroVideoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-32 mb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonialIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-[#2D2C35] rounded-xl p-8 sm:p-12"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3">
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src={testimonials[currentTestimonialIndex].photo}
                      alt={testimonials[currentTestimonialIndex].name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <p className="text-xl font-medium text-white mb-4">
                    "{testimonials[currentTestimonialIndex].quote}"
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-white">{testimonials[currentTestimonialIndex].name}</p>
                    <p className="text-gray-400">{testimonials[currentTestimonialIndex].title} at {testimonials[currentTestimonialIndex].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main page component with Suspense
export default function TalentPreviewSuccess() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Lädt...</div>
      </div>
    }>
      <TalentPreviewSuccessContent />
    </Suspense>
  )
} 