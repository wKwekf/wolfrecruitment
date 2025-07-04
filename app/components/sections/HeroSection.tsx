'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, BarChart3, Zap } from 'lucide-react'
import { CustomerCandidateDialog } from "@/app/components/ui/customer-candidate-dialog"

const logos = [
  { name: 'Siemens', src: '/logos/Siemens.png' },
  { name: 'YOKOGAWA', src: '/logos/YOKOGAWA.png', scale: 1.2 },
  { name: 'Nike', src: '/logos/Nike.png' },
  { name: 'BayernLB', src: '/logos/Bayernlb.png' },
  { name: 'HYVE', src: '/logos/HYVE.png', scale: 1.1 },
  { name: 'Santander', src: '/logos/Santander.png' },
  { name: 'CampusFounders', src: '/logos/CampusFounders.png', scale: 1.2 },
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
  const [dialogOpen, setDialogOpen] = useState(false)

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            {/* Code snippet */}
            <div className="inline-flex items-center gap-2 mb-8 text-[#f25a75] text-sm font-mono">
              <span>git push -u origin your-next-hire</span>
            </div>
            
            {/* Centered headline */}
            <h1 className="font-platform text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight mb-6 max-w-6xl mx-auto">
              <span className="text-white block">Engineers, die andere</span>
              <span className="text-white block">übersehen.</span>
              <span className="text-[#f25a75] block">{"{ Video-First Hiring }"}</span>
            </h1>
            
            {/* Centered subheader */}
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Die videobasierte Recruiting-Plattform für Tech-Talente in DACH. Sieh deine Kandidaten sprechen, bevor du sie triffst. 7-Tage-Garantie.
            </p>

            {/* Centered CTA */}
            <Button
              variant="default"
              size="lg"
              className="font-semibold mb-12 bg-[#F25A75] hover:bg-[#F25A75]/90 transition-colors shadow-[0_0_20px_rgba(242,90,117,0.3)] px-8 py-4 text-lg"
              onClick={() => setDialogOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Jetzt starten
              <motion.span
                className="inline-block ml-2"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Button>

            {/* Full width platform preview */}
            <div className="w-full max-w-6xl mx-auto">
              <div 
                className="w-full bg-[#1a1923] rounded-lg border border-gray-800 overflow-hidden shadow-2xl"
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
                          setTimeout(() => setIsPaused(false), 8000)
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
                <div className="relative aspect-[16/9] bg-gray-900">
                  {activeTab === 'video' && (
                    <div className="absolute inset-0 p-6">
                      <div className="flex h-full gap-6">
                        {/* Questions List */}
                        <div className="w-96 space-y-3">
                          <h4 className="text-sm font-medium text-gray-400 mb-4">Knockout-Fragen für Sarah Schneider</h4>
                          
                          {/* Question 1 */}
                          <div className="bg-gray-800 rounded-lg p-4 border-2 border-[#f25a75]/30 cursor-pointer hover:border-[#f25a75]/50 transition-colors">
                            <span className="text-sm font-medium text-white block mb-2">Frage 1: Technische Architektur</span>
                            <p className="text-xs text-gray-400">"Beschreiben Sie ein System, das Sie in Produktion gebracht haben"</p>
                          </div>
                          
                          {/* Question 2 */}
                          <div className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:border-gray-700 transition-colors border border-gray-700">
                            <span className="text-sm font-medium text-white block mb-2">Frage 2: Skalierung & Performance</span>
                            <p className="text-xs text-gray-400">"Wie würden Sie ein System für Millionen von Nutzern skalieren?"</p>
                          </div>
                          
                          {/* Question 3 */}
                          <div className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:border-gray-700 transition-colors border border-gray-700">
                            <span className="text-sm font-medium text-white block mb-2">Frage 3: Teamarbeit & Kommunikation</span>
                            <p className="text-xs text-gray-400">"Beispiel einer erfolgreichen Zusammenarbeit mit Stakeholdern"</p>
                          </div>
                        </div>
                        
                        {/* Video Area */}
                        <div className="flex-1 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                          <div className="relative z-10 text-center">
                            <div className="w-24 h-24 bg-[#f25a75]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Play className="w-12 h-12 text-[#f25a75]" />
                            </div>
                            <p className="text-lg text-gray-400">Sarah Schneider</p>
                            <p className="text-sm text-gray-500">Software Engineer • 3 Jahre</p>
                            <p className="text-sm text-gray-600 mt-2">Antwort zu Frage 1</p>
                          </div>
                          {/* Video Controls */}
                          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur rounded px-4 py-2">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Play className="w-4 h-4 text-white" />
                                <span className="text-sm text-white">110</span>
                                <span className="text-sm text-white">101</span>
                              </div>
                              <div className="flex-1 h-2 bg-gray-700 rounded-full">
                                <div className="w-1/3 h-full bg-[#f25a75] rounded-full" />
                              </div>
                              <span className="text-sm text-gray-400">6:20 / 9:18</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'scorecard' && (
                    <div className="absolute inset-0 p-6">
                      <div className="bg-gray-800 rounded-lg p-6 h-full overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Technical Proficiency Assessment</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-300">System Design & Architecture</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className={`w-5 h-5 ${star <= 5 ? 'text-[#f25a75]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 italic">"Exzellentes Verständnis von skalierbaren Systemen und Best Practices"</p>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-300">Code Quality & Testing</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className={`w-5 h-5 ${star <= 4 ? 'text-[#f25a75]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 italic">"Solide Kenntnisse in Testing-Strategien und Clean Code Principles"</p>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-300">Teamwork & Leadership</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className={`w-5 h-5 ${star <= 5 ? 'text-[#f25a75]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 italic">"Beeindruckende Führungsqualitäten und agile Arbeitsweise"</p>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-300">Communication Skills</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className={`w-5 h-5 ${star <= 4 ? 'text-[#f25a75]' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 italic">"Klar strukturiert, kann komplexe Konzepte gut erklären"</p>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700">
                          <p className="text-xs sm:text-sm text-gray-400">
                            Bewertet von: <span className="text-white">Dr. Markus Schmidt, Senior Software Engineer</span>
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
                                    <p className="text-xs text-gray-400">Tech Lead</p>
                                  </div>
                                  <div className="bg-gray-800 rounded p-3 cursor-move">
                                    <p className="text-sm font-medium">Tom Fischer</p>
                                    <p className="text-xs text-gray-400">Software Engineer</p>
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
                                  <p className="text-xs text-gray-400">Engineering Manager</p>
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
          </motion.div>
        </div>

        {/* Trust Logos */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider">
            VON STARTUPS BIS ENTERPRISE – SKIP THE SCREENING, HIRE WORLD-CLASS ENGINEERS
          </p>
          <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8 flex-wrap">
            {logos.map((logo) => (
              <div 
                key={logo.name} 
                className="w-20 h-8 md:w-24 md:h-10 relative opacity-60 hover:opacity-100 transition-opacity"
                style={{ transform: logo.scale ? `scale(${logo.scale})` : undefined }}
              >
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
      
      <CustomerCandidateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCustomerSelect={() => {
          setDialogOpen(false);
          window.location.href = "https://calendly.com/d/cvzz-69b-hc9/quick-chat";
        }}
      />
  </section>
  )
}