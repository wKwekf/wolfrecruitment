'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, BarChart3, Zap } from 'lucide-react'
import Link from 'next/link'

const logos = [
  { name: 'Siemens', src: '/logos/Siemens.png' },
  { name: 'Nike', src: '/logos/Nike.png' },
  { name: 'Santander', src: '/logos/Santander.png' },
  { name: 'BayernLB', src: '/logos/Bayernlb.png' },
  { name: 'Covestro', src: '/logos/Covestro.png' },
  { name: 'DEPT', src: '/logos/DEPT.png' }
]

const platformTabs = [
  { id: 'video', label: 'Kandidaten-Videos', icon: Play },
  { id: 'scorecard', label: 'Skill-Bewertungen', icon: BarChart3 },
  { id: 'pipeline', label: 'Pipeline-Übersicht', icon: Users }
]

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState('video')
  const [isPaused, setIsPaused] = useState(false)

  // Auto-rotate tabs every 5 seconds
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = platformTabs.findIndex(tab => tab.id === current)
        const nextIndex = (currentIndex + 1) % platformTabs.length
        return platformTabs[nextIndex].id
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

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
                {/* Left Content */}
                <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
                  <div className="inline-flex items-center gap-2 mb-6 text-[#f25a75] text-sm font-mono">
                    <span>df['candidates'].apply(video_interview)</span>
                  </div>
                  
                  <h1 className="font-platform text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-tight tracking-heading mb-4">
                    <span className="text-white block">AI-Teams aufbauen.</span>
                    <span className="text-white block">In Rekordzeit.</span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-8">
                    Wolf ist die videobasierte Hiring-Plattform für AI-Talente. 7 Tage kostenlos testen.
                  </p>

                  <Button
                    variant="default"
                    size="lg"
                    className="font-semibold mb-6 bg-[#F25A75] hover:bg-[#F25A75]/90 transition-colors shadow-[0_0_20px_rgba(242,90,117,0.3)]"
                    asChild
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Link href="https://calendly.com/d/cvzz-69b-hc9/quick-chat">
                      Jetzt starten
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </Link>
                  </Button>
                </div>

                {/* Right Platform Preview */}
                <div className="w-full lg:w-[55%] flex items-center">
                  <div 
                    className="w-full bg-[#1a1923] rounded-lg border border-gray-800 overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-800 bg-black/30">
                      {platformTabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id)
                              setIsPaused(true)
                              setTimeout(() => setIsPaused(false), 8000) // Pause rotation for 8 seconds after manual click
                            }}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                              activeTab === tab.id
                                ? 'text-white bg-[#f25a75]/10 border-b-2 border-[#f25a75]'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Platform Content */}
                    <div className="relative aspect-[16/10] bg-gray-900">
                      {activeTab === 'video' && (
                        <div className="absolute inset-0 p-3 sm:p-6">
                          <div className="flex flex-col lg:flex-row h-full gap-3 sm:gap-4">
                            {/* Questions List - Top on mobile, Left on desktop */}
                            <div className="w-full lg:w-80 space-y-2 sm:space-y-3 max-h-[40%] lg:max-h-full overflow-y-auto lg:overflow-visible">
                              <h4 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">Knockout-Fragen für Sarah Schneider</h4>
                              
                              {/* Question 1 */}
                              <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border-2 border-[#f25a75]/30 cursor-pointer hover:border-[#f25a75]/50 transition-colors">
                                <span className="text-xs sm:text-sm font-medium text-white block mb-1 sm:mb-2">Frage 1: ML-Systeme in Produktion</span>
                                <p className="text-[10px] sm:text-xs text-gray-400">"Beschreiben Sie ein ML-System, das Sie in Produktion gebracht haben"</p>
                              </div>
                              
                              {/* Question 2 */}
                              <div className="bg-gray-800 rounded-lg p-3 sm:p-4 cursor-pointer hover:border-gray-700 transition-colors border border-gray-700">
                                <span className="text-xs sm:text-sm font-medium text-white block mb-1 sm:mb-2">Frage 2: Architektur-Entscheidungen</span>
                                <p className="text-[10px] sm:text-xs text-gray-400">"Wie würden Sie eine skalierbare ML-Pipeline designen?"</p>
                              </div>
                              
                              {/* Question 3 - Hidden on mobile to save space */}
                              <div className="hidden sm:block bg-gray-800 rounded-lg p-3 sm:p-4 cursor-pointer hover:border-gray-700 transition-colors border border-gray-700">
                                <span className="text-xs sm:text-sm font-medium text-white block mb-1 sm:mb-2">Frage 3: Teamarbeit & Kommunikation</span>
                                <p className="text-[10px] sm:text-xs text-gray-400">"Beispiel einer erfolgreichen Zusammenarbeit mit Stakeholdern"</p>
                              </div>
                            </div>
                            
                            {/* Video Area - Bottom on mobile, Right on desktop */}
                            <div className="flex-1 bg-black rounded-lg flex items-center justify-center relative overflow-hidden min-h-[60%] lg:min-h-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                              <div className="relative z-10 text-center">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f25a75]/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#f25a75]" />
                                </div>
                                <p className="text-sm sm:text-base text-gray-400">Sarah Schneider</p>
                                <p className="text-[10px] sm:text-xs text-gray-500">ML Engineer • 3 Jahre</p>
                                <p className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2">Antwort zu Frage 1</p>
                              </div>
                              {/* Video Controls */}
                              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-black/50 backdrop-blur rounded px-2 sm:px-3 py-1 sm:py-2">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                  <div className="flex-1 h-1 bg-gray-700 rounded-full">
                                    <div className="w-1/3 h-full bg-[#f25a75] rounded-full" />
                                  </div>
                                  <span className="text-[10px] sm:text-xs text-gray-400">2:45 / 8:30</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'scorecard' && (
                        <div className="absolute inset-0 p-3 sm:p-6">
                          <div className="bg-gray-800 rounded-lg p-3 sm:p-6 h-full overflow-y-auto">
                            <h3 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">AI Technical Proficiency Assessment</h3>
                            <div className="space-y-3 sm:space-y-4">
                              <div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                                  <span className="text-xs sm:text-sm text-gray-300">ML Pipeline Design</span>
                                  <div className="flex gap-0.5 sm:gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg key={star} className={`w-3 h-3 sm:w-5 sm:h-5 ${star <= 5 ? 'text-[#f25a75]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-400 italic">"Exzellentes Verständnis von End-to-End ML Workflows und Best Practices"</p>
                              </div>
                              <div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                                  <span className="text-xs sm:text-sm text-gray-300">Python/TensorFlow</span>
                                  <div className="flex gap-0.5 sm:gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg key={star} className={`w-3 h-3 sm:w-5 sm:h-5 ${star <= 4 ? 'text-[#f25a75]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-400 italic">"Solide Kenntnisse, könnte von mehr Erfahrung mit Custom Layers profitieren"</p>
                              </div>
                              <div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                                  <span className="text-xs sm:text-sm text-gray-300">MLOps Experience</span>
                                  <div className="flex gap-0.5 sm:gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg key={star} className={`w-3 h-3 sm:w-5 sm:h-5 ${star <= 5 ? 'text-[#f25a75]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-400 italic">"Beeindruckende Erfahrung mit Kubernetes, MLflow und CI/CD für ML"</p>
                              </div>
                              <div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                                  <span className="text-xs sm:text-sm text-gray-300">Communication Skills</span>
                                  <div className="flex gap-0.5 sm:gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg key={star} className={`w-3 h-3 sm:w-5 sm:h-5 ${star <= 4 ? 'text-[#f25a75]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-400 italic">"Klar strukturiert, kann komplexe Konzepte gut erklären"</p>
                              </div>
                            </div>
                            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700">
                              <p className="text-xs sm:text-sm text-gray-400">
                                Bewertet von: <span className="text-white">Dr. Markus Schmidt, ML Engineer</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'pipeline' && (
                        <div className="absolute inset-0 p-6">
                          <div className="flex gap-4 h-full overflow-x-auto">
                            {['Sourced', 'Video', 'Scored', 'Ready'].map((stage) => (
                              <div key={stage} className="flex-1 min-w-[200px]">
                                <h4 className="text-sm font-medium text-gray-400 mb-3">{stage}</h4>
                                <div className="space-y-2">
                                  {stage === 'Sourced' && (
                                    <>
                                      <div className="bg-gray-800 rounded p-3 cursor-move">
                                        <p className="text-sm font-medium">Lisa Weber</p>
                                        <p className="text-xs text-gray-400">AI Architect</p>
                                      </div>
                                      <div className="bg-gray-800 rounded p-3 cursor-move">
                                        <p className="text-sm font-medium">Tom Fischer</p>
                                        <p className="text-xs text-gray-400">ML Engineer</p>
                                      </div>
                                    </>
                                  )}
                                  {stage === 'Video' && (
                                    <div className="bg-gray-800 rounded p-3 cursor-move border-2 border-[#f25a75]/30">
                                      <p className="text-sm font-medium">Sarah Schneider</p>
                                      <p className="text-xs text-gray-400">ML Engineer</p>
                                    </div>
                                  )}
                                  {stage === 'Scored' && (
                                    <div className="bg-gray-800 rounded p-3 cursor-move">
                                      <p className="text-sm font-medium">Max Müller</p>
                                      <p className="text-xs text-gray-400">Data Scientist</p>
                                      <div className="flex items-center gap-1 mt-1">
                                        <Zap className="w-3 h-3 text-[#f25a75]" />
                                        <span className="text-xs text-[#f25a75]">Top 5%</span>
                                      </div>
                                    </div>
                                  )}
                                  {stage === 'Ready' && (
                                    <div className="bg-green-900/20 border border-green-700/50 rounded p-3">
                                      <p className="text-sm font-medium text-green-400">3 Kandidaten bereit</p>
                                      <p className="text-xs text-gray-400">Für Interviews verfügbar</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Logos */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400 mb-6">
              WIR HELFEN DEN ERFOLGREICHSTEN UNTERNEHMEN SCHNELLER EINZUSTELLEN
            </p>
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
              {logos.map((logo) => (
                <div key={logo.name} className="w-24 h-10 relative opacity-60 hover:opacity-100 transition-opacity">
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

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-3">Qualität durch Expertise</h3>
              <p className="text-gray-400">
                Echte ML Engineers bewerten jeden Kandidaten. Nicht irgendwelche Recruiter, sondern AI-Experten aus unserem Team.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-3">Geschwindigkeit garantiert</h3>
              <p className="text-gray-400">
                7 Tage von Briefing zu qualifizierten Kandidaten. Während andere noch suchen, führst du bereits Interviews.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-3">AI-First Ansatz</h3>
              <p className="text-gray-400">
                100% spezialisiert auf AI-Talente. Keine generische Plattform - wir sprechen die Sprache von ML, MLOps und AI.
              </p>
            </motion.div>
          </div>
        </div>
    </section>
  )
}