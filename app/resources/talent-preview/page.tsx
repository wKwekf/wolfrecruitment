'use client'

import React, { useState, useRef, useEffect, Suspense } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Dialog, DialogContent } from "@/components/ui/dialog"

const PLACEHOLDER_TEXT = `Beschreibe kurz deine offene Stelle:*

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

const heroVideoUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/HeroVideo-gDnCFNF5RFvRnSSGUgnDe7zLuN2Laf.mp4"

// Create a separate component for the main content
function TalentPreviewContent() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [firstName, setFirstName] = useState(searchParams.get('firstName') || '')
  const [description, setDescription] = useState(searchParams.get('description') || '')
  const [dataProcessingConsent, setDataProcessingConsent] = useState(searchParams.get('consent') === 'true')
  const [marketingConsent, setMarketingConsent] = useState(searchParams.get('marketing') === 'true')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/hubspot-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstname: firstName,
          description,
          dataProcessingConsent,
          marketingConsent,
          source: window.location.href,
          pageUri: window.location.pathname,
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      // Redirect to success page with marketing consent status
      window.location.href = `/resources/talent-preview/success?marketing=${marketingConsent}`
    } catch (error) {
      console.error('Submission error:', error)
      alert('Es gab einen Fehler. Bitte versuche es später noch einmal.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const handleVideoClick = () => {
    setIsVideoModalOpen(true)
    setIsMuted(false)
    setShowControls(true)
  }

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
    }

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isVideoModalOpen && videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play()
    }
  }, [isVideoModalOpen])

  return (
    <section className="w-full">
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
      <div className="max-w-custom mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-white font-semibold">IT'S FREE (FOR NOW...)</div>
                <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                  Erhalte zwei kostenfreie Profile für deine AI-Position
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-[#2D2C35] border-gray-600 text-white outline-none focus:ring-0 focus:border-gray-600 focus:outline-none"
                      placeholder="Dein Vorname*"
                    />
                  </div>
                  <div>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#2D2C35] border-gray-600 text-white outline-none focus:ring-0 focus:border-gray-600 focus:outline-none"
                      placeholder="Deine E-Mail für die Profile*"
                    />
                  </div>
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
                      Ich stimme der Verarbeitung meiner Daten gemäß der <a href="https://www.wolfai.de/datenschutz" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Datenschutzerklärung</a> zu.*
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
                      Ja, ich möchte weitere exklusive Einblicke zu AI-Recruiting, relevante Kandidatenprofile und Branchentrends per E-Mail erhalten. Ich bin damit einverstanden, dass Wolf mich zu relevanten Angeboten, Events oder individuellen Recruiting-Lösungen kontaktiert. Ich kann mich jederzeit abmelden.
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
                    {isSubmitting ? 'Wird gesendet...' : 'Jetzt kostenfrei zwei Profile erhalten'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div 
              className="relative w-full aspect-video cursor-pointer rounded-lg overflow-hidden"
              onClick={handleVideoClick}
            >
              <Image
                src="/photos/VideoCover_Hero.png"
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
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

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black overflow-hidden">
          <div className="relative w-full aspect-video">
            <video
              ref={videoRef}
              src={heroVideoUrl}
              width="100%"
              height="100%"
              loop
              playsInline
              controls
              className="w-full h-full"
              autoPlay
            >
              <source src={heroVideoUrl} type="video/mp4" />
              <track
                kind="subtitles"
                src="/videos/subtitles/HeroVideo.vtt"
                srcLang="de"
                label="Deutsch"
                default
              />
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

// Main page component with Suspense
export default function TalentPreviewPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Lädt...</div>
      </div>
    }>
      <TalentPreviewContent />
    </Suspense>
  )
}
