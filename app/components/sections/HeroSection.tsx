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
  { id: 'scorecard', label: 'AI-Bewertungen', icon: BarChart3 },
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
                    <Link href="https://calendly.com/wolfdanielgonzalezgarcia/quickchat">
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
                        <div className="absolute inset-0 p-6">
                          <div className="flex h-full gap-4">
                            {/* Main Video Area */}
                            <div className="flex-1 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                              {/* Placeholder for platform screenshot */}
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                              <div className="relative z-10 text-center">
                                <div className="w-20 h-20 bg-[#f25a75]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <Play className="w-10 h-10 text-[#f25a75]" />
                                </div>
                                <p className="text-gray-400">Sarah Schneider</p>
                                <p className="text-sm text-gray-500">ML Engineer • 3 Jahre</p>
                              </div>
                              {/* Video Controls */}
                              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur rounded px-3 py-2">
                                <div className="flex items-center gap-3">
                                  <Play className="w-4 h-4 text-white" />
                                  <div className="flex-1 h-1 bg-gray-700 rounded-full">
                                    <div className="w-1/3 h-full bg-[#f25a75] rounded-full" />
                                  </div>
                                  <span className="text-xs text-gray-400">0:08 / 0:24</span>
                                </div>
                              </div>
                            </div>
                            {/* Sidebar */}
                            <div className="w-64 hidden lg:block space-y-3">
                              <div className="bg-gray-800 rounded-lg p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gray-700 rounded-full" />
                                  <div>
                                    <p className="text-sm font-medium">Max Müller</p>
                                    <p className="text-xs text-gray-400">Data Scientist</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-800 rounded-lg p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gray-700 rounded-full" />
                                  <div>
                                    <p className="text-sm font-medium">Anna Schmidt</p>
                                    <p className="text-xs text-gray-400">MLOps Engineer</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'scorecard' && (
                        <div className="absolute inset-0 p-6">
                          <div className="bg-gray-800 rounded-lg p-6 h-full">
                            <h3 className="text-lg font-semibold mb-4">AI Technical Proficiency Assessment</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-gray-300">ML Pipeline Design</span>
                                  <span className="text-sm font-medium text-[#f25a75]">92/100</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#f25a75] rounded-full" style={{ width: '92%' }} />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-gray-300">Python/TensorFlow</span>
                                  <span className="text-sm font-medium text-[#f25a75]">88/100</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#f25a75] rounded-full" style={{ width: '88%' }} />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-gray-300">MLOps Experience</span>
                                  <span className="text-sm font-medium text-[#f25a75]">95/100</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#f25a75] rounded-full" style={{ width: '95%' }} />
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-700">
                              <p className="text-sm text-gray-400">
                                Bewertet von: <span className="text-white">Dr. Stefan Wolf, ML Engineer</span>
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