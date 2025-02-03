'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { VolumeX, Volume2 } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image'

const PLACEHOLDER_TEXT = `Beschreibe kurz deine offene Stelle:

Stellentitel: z.B. Senior Frontend Developer
Tech Stack: z.B. React, TypeScript, Next.js
Standort: Remote/Berlin/etc.`

const benefits = [
  'Zwei handverlesene Profile, die zu deiner Stelle passen',
  'Direkter Zugriff auf die LinkedIn Profile - ohne Provision',
  'Von unseren Recruitern speziell für dich ausgewählt'
]

const faqs = [
  {
    question: "Warum sind die Profile kostenlos?",
    answer: "Wir glauben an die Qualität unserer Arbeit. Wenn du mit unseren kostenlosen Profilen zufrieden bist, kommst du für deine nächste Position bestimmt wieder zu uns - dann mit unserem regulären Service."
  },
  {
    question: "Wie schnell erhalte ich die Profile?",
    answer: "In der Regel innerhalb von 2-3 Werktagen. Da wir die Profile manuell für dich auswählen, nehmen wir uns die Zeit, wirklich passende Kandidaten zu finden."
  },
  {
    question: "Wie geht es nach den Profilen weiter?",
    answer: "Du kannst die Kandidaten direkt über LinkedIn kontaktieren. Falls es zu einer Einstellung kommt, freuen wir uns über dein Feedback - aber es gibt keine Verpflichtungen."
  },
  {
    question: "Was macht eure Profile besonders?",
    answer: "Unsere Profile sind handverlesen von Recruitern, die selbst einen technischen Hintergrund haben. Wir kennen den AI-Markt und können die Qualifikationen der Kandidaten präzise einschätzen."
  }
]

const testimonials = [
  {
    quote: "Wir könnten es bald kostenpflichtig machen, also schnell die kostenlosen Profile sichern.",
    author: "Wolf-Daniel González García",
    role: "Wolf",
    image: "/photos/profilepics/Daniel_Profilbild.jpg"
  },
  {
    quote: "Aber versprochen, dass du uns Bescheid gibst, wenn du mal einen Recruiter brauchst.",
    author: "Stefan Ruf",
    role: "Wolf",
    image: "/photos/profilepics/Stefan_Profilbild.jpg"
  },
  {
    quote: "Hand drauf: Bei uns werden Kandidaten mit Liebe und Sorgfalt ausgewählt.",
    author: "Vitus Meixl",
    role: "Wolf",
    image: "/photos/profilepics/Vitus_Profilbild.jpg"
  }
]

const styles = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .animate-shake {
    animation: shake 0.3s ease-in-out;
  }
`

const styleSheet = document.createElement('style')
styleSheet.textContent = styles
document.head.appendChild(styleSheet)

export default function TalentPreviewPage() {
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Implement HubSpot submission
    setIsSubmitting(false)
  }

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.load()
      
      videoRef.current.addEventListener('loadeddata', () => {
        videoRef.current?.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.error("Autoplay failed:", error)
        })
      })
    }
  }, [])

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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="text-white font-semibold">IT'S FREE (FOR NOW...)</div>
                <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                  Erhalte zwei Profile für deine AI-Position
                </h1>
                <p className="text-xl text-gray-300">
                  Sag uns, wen du suchst - und wir schicken dir zwei handverlesene Profile von passenden Kandidaten. 
                  Komplett kostenfrei und ohne versteckte Gebühren.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <span className="mr-4 flex-shrink-0 mt-1 text-white">✓</span>
                    <p className="text-left text-base sm:text-lg">{benefit}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#2D2C35] border-gray-600 text-white outline-none focus:ring-0 focus:border-gray-600 focus:outline-none"
                    placeholder="Deine E-Mail für die Profile"
                  />
                </div>

                <div>
                  <Textarea
                    id="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-[#2D2C35] border-gray-600 text-white min-h-[120px] outline-none focus:ring-0 focus:border-gray-600 focus:outline-none"
                    placeholder={PLACEHOLDER_TEXT}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataProcessing"
                      required
                      checked={dataProcessingConsent}
                      onCheckedChange={(checked) => setDataProcessingConsent(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="dataProcessing" className="text-sm text-gray-300">
                      Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.*
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={marketingConsent}
                      onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="marketing" className="text-sm text-gray-300">
                      Ich möchte regelmäßig spannende Insights und Updates von WolfAI erhalten.
                    </Label>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    onClick={(e) => {
                      if (!dataProcessingConsent) {
                        e.preventDefault();
                        const btn = e.currentTarget;
                        btn.classList.add('animate-shake', 'bg-red-500/50');
                        setTimeout(() => {
                          btn.classList.remove('animate-shake', 'bg-red-500/50');
                        }, 500);
                      }
                    }}
                    className="bg-[#F25A75] hover:bg-[#F25A75]/90 text-white font-semibold py-4 px-6 text-lg transition-colors duration-200"
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Jetzt zwei Profile erhalten'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Video */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full aspect-video">
              <video
                ref={videoRef}
                src="/videos/hero.mp4"
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
                <source src="/videos/hero.mp4" type="video/mp4" />
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

        {/* Testimonial Section */}
        <div className="mt-20">
          <div className="max-w-4xl mx-auto bg-[#2D2C35] rounded-xl p-12 relative overflow-hidden">
            <motion.div
              key={currentTestimonialIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              <p className="text-3xl font-medium text-white text-center">
                "{testimonials[currentTestimonialIndex].quote}"
              </p>
              <div className="flex items-center justify-center space-x-3">
                {testimonials[currentTestimonialIndex].image && (
                  <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 relative">
                    <Image 
                      src={testimonials[currentTestimonialIndex].image} 
                      alt={testimonials[currentTestimonialIndex].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center text-gray-400">
                  <span className="font-medium text-gray-200">
                    {testimonials[currentTestimonialIndex].author}
                  </span>
                  <span className="mx-2">/</span>
                  <span className="text-gray-400">
                    {testimonials[currentTestimonialIndex].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 mb-20">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-sans text-lg text-left text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
