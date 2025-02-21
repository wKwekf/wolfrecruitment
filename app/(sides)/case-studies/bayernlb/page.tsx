'use client'

import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { Permanent_Marker } from 'next/font/google'
import { useRef, useState } from 'react'
import RequestProfilesSection from '@/app/components/sections/RequestProfilesSection'

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
})

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
        <section className="bg-[#121118]">
          <div className="max-w-custom mx-auto px-4">
            {/* Hero Section with Two Columns */}
            <div className="max-w-7xl mx-auto mb-16 pt-12">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Left Column - Text Content */}
                <div className="lg:w-1/2 lg:pr-8">
                  <h1 className="font-platform text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-medium mb-6 text-white">
                    2 AI-Experten <span className="text-[#F25A75]">angestellt</span> in 6 Wochen
                  </h1>
                  <p className="text-xl text-white/80 font-medium leading-relaxed mb-8">
                    Wie wir der BayernLB halfen, ihr KI-Team mit einem ML-Engineer und MLOps-Engineer aufzubauen und dabei die perfekte Passgenauigkeit erreichten.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <div className="bg-[#1E1D24] px-4 py-2 rounded-lg">
                      <span className="text-white">ML-Engineer</span>
                    </div>
                    <div className="bg-[#1E1D24] px-4 py-2 rounded-lg">
                      <span className="text-white">MLOps-Engineer</span>
                    </div>
                    <div className="bg-[#1E1D24] px-4 py-2 rounded-lg">
                      <span className="text-white">6 Wochen Besetzung</span>
                    </div>
                    <div className="bg-[#1E1D24] px-4 py-2 rounded-lg">
                      <span className="text-white">7.500 Mitarbeiter</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Video */}
                <div className="lg:w-1/2">
                  {/* Fallstudie Label */}
                  <div className="bg-white inline-flex items-center rounded-xl px-6 py-3 mb-4">
                    <span className="text-2xl font-bold mr-3">Fallstudie</span>
                    <Image
                      src="/logos/Logo_Bayernlb_Black.png"
                      alt="BayernLB Logo"
                      width={140}
                      height={35}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Video Container */}
                  <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      loop
                      playsInline
                      controls={showControls}
                      className="absolute top-0 left-0 w-full h-full object-cover"
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
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-6xl mx-auto relative pb-[22vh]">
              <div className="bg-[#F25A75] rounded-2xl px-12 py-12 shadow-xl absolute left-0 right-0 top-full -translate-y-1/2 z-10">
                <h2 className="text-[#121118] text-4xl md:text-5xl font-bold mb-8 text-center">
                  Stell dir vor,<br />das wäre dein Unternehmen.
                </h2>
                <div className="grid grid-cols-3 gap-12">
                  <div className="text-center">
                    <div className="bg-white rounded-full px-6 py-1 inline-block mb-3 relative">
                      <span className={`text-7xl font-bold text-[#121118] ${permanentMarker.className} block -my-3`}>14</span>
                    </div>
                    <p className="text-[#121118] text-lg font-bold">Hochqualifizierte<br />Kandidaten</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-full px-6 py-1 inline-block mb-3 relative">
                      <span className={`text-7xl font-bold text-[#121118] ${permanentMarker.className} block -my-3`}>7</span>
                    </div>
                    <p className="text-[#121118] text-lg font-bold">Tage bis zur ersten<br />Vorstellung</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-full px-6 py-1 inline-block mb-3 relative">
                      <span className={`text-7xl font-bold text-[#121118] ${permanentMarker.className} block -my-3`}>6</span>
                    </div>
                    <p className="text-[#121118] text-lg font-bold">Wochen bis zur<br />Besetzung</p>
                  </div>
                </div>
                <p className="text-[#121118] text-lg mt-6 text-center">Die BayernLB suchte nach zwei KI-Experten - wir lieferten beide Positionen in nur 6 Wochen.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="pt-[22vh] space-y-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#121118]">Die Herausforderung</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Die BayernLB stand vor der Aufgabe, ihr KI-Team mit zwei Schlüsselpositionen zu verstärken: einem ML-Engineer und einem MLOps-Engineer. Diese Positionen waren entscheidend für den Aufbau einer robusten KI-Infrastruktur und die Entwicklung innovativer KI-Lösungen. Die besondere Herausforderung bestand darin, Experten zu finden, die sowohl technische Expertise als auch Erfahrung im Finanzsektor mitbringen.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#121118]">Unser Ansatz</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Wir entwickelten eine maßgeschneiderte Recruiting-Strategie:
                </p>
                <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
                  <li>Parallele Suche nach beiden Positionen mit spezialisierten Sourcing-Teams</li>
                  <li>Fokus auf Kandidaten mit Erfahrung in regulierten Branchen</li>
                  <li>Intensive Vorqualifizierung mit technischen Assessments</li>
                  <li>Enge Abstimmung mit den Fachabteilungen der BayernLB</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#121118]">Das Ergebnis</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Innerhalb von sechs Wochen konnten beide Positionen erfolgreich besetzt werden. Der ML-Engineer wurde nach vier Wochen eingestellt, der MLOps-Engineer folgte zwei Wochen später. Beide Kandidaten brachten nicht nur die gewünschte technische Expertise mit, sondern auch wertvolle Erfahrungen aus dem Finanzsektor, was ihre Integration in das bestehende Team erheblich beschleunigte.
                </p>
              </div>
            </div>
          </div>
        </section>

        <RequestProfilesSection />
      </main>
      <Footer />
    </>
  )
} 