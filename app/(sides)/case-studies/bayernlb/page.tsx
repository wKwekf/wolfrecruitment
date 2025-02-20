'use client'

import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { useRef, useState } from 'react'

export default function BayernLBPage() {
  const [showControls, setShowControls] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const videoUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/BayernLBTestimonial-2s.klfjaergjnekrgnkenrgerg-zWOMu1mgJFft4ScVtB1Eb6rDw3Ycgd.mp4"

  const handleVideoClick = () => {
    setShowControls(true)
    if (videoRef.current && !isPlaying) {
      videoRef.current.muted = false
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className="bg-[#F25A75] py-20">
          <div className="max-w-custom mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-platform text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-medium mb-6 text-white">
                BayernLB Case Study
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium">
                Zwei KI-Experten für die digitale Transformation der BayernLB
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-start gap-12">
                <div className="md:w-1/2">
                  <div className="mb-8">
                    <Image
                      src="/logos/Logo_Bayernlb_Black.png"
                      alt="BayernLB Logo"
                      width={150}
                      height={40}
                      className="mb-6"
                    />
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <span className="text-lg font-bold text-[#121118]">Mitarbeiter</span>
                        <p className="text-lg text-gray-700">7.500</p>
                      </div>
                      <div>
                        <span className="text-lg font-bold text-[#121118]">Branche</span>
                        <p className="text-lg text-gray-700">Finanzdienstleistungen</p>
                      </div>
                      <div>
                        <span className="text-lg font-bold text-[#121118]">Positionen</span>
                        <p className="text-lg text-gray-700">ML-Engineer, MLOps-Engineer</p>
                      </div>
                      <div>
                        <span className="text-lg font-bold text-[#121118]">Besetzungsdauer</span>
                        <p className="text-lg text-gray-700">4-6 Wochen</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-[#121118]">Die Herausforderung</h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Die BayernLB stand vor der Aufgabe, ihr KI-Team mit zwei Schlüsselpositionen zu verstärken: einem ML-Engineer und einem MLOps-Engineer. Diese Positionen waren entscheidend für den Aufbau einer robusten KI-Infrastruktur und die Entwicklung innovativer KI-Lösungen. Die besondere Herausforderung bestand darin, Experten zu finden, die sowohl technische Expertise als auch Erfahrung im Finanzsektor mitbringen.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-[#121118]">Unser Ansatz</h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Wir entwickelten eine maßgeschneiderte Recruiting-Strategie:
                      </p>
                      <ul className="list-disc list-inside space-y-2 mt-4 text-lg text-gray-700">
                        <li>Parallele Suche nach beiden Positionen mit spezialisierten Sourcing-Teams</li>
                        <li>Fokus auf Kandidaten mit Erfahrung in regulierten Branchen</li>
                        <li>Intensive Vorqualifizierung mit technischen Assessments</li>
                        <li>Enge Abstimmung mit den Fachabteilungen der BayernLB</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-[#121118]">Das Ergebnis</h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Innerhalb von sechs Wochen konnten beide Positionen erfolgreich besetzt werden. Der ML-Engineer wurde nach vier Wochen eingestellt, der MLOps-Engineer folgte zwei Wochen später. Beide Kandidaten brachten nicht nur die gewünschte technische Expertise mit, sondern auch wertvolle Erfahrungen aus dem Finanzsektor, was ihre Integration in das bestehende Team erheblich beschleunigte.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <div className="sticky top-24">
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
                      {!showControls && (
                        <button
                          onClick={handleVideoClick}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                        >
                          <Play className="w-8 h-8 text-white" />
                        </button>
                      )}
                    </div>

                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4">Key Achievements</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-[#F25A75] font-bold mr-2">•</span>
                          <span className="text-gray-600">Erste Kandidatenvorstellung nach 7 Tagen</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#F25A75] font-bold mr-2">•</span>
                          <span className="text-gray-600">14 hochqualifizierte Kandidaten vorgestellt</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#F25A75] font-bold mr-2">•</span>
                          <span className="text-gray-600">Beide Positionen innerhalb von 6 Wochen besetzt</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#F25A75] font-bold mr-2">•</span>
                          <span className="text-gray-600">100% Passgenauigkeit der Kandidaten</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 