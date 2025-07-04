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

export default function CampusFoundersPage() {
  const [showControls, setShowControls] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const videoUrl = "https://wtgrng5vpllrzskd.public.blob.vercel-storage.com/CampusFoundersTestimonial-2ecEr5ui8AbGwL3X5cq0RYKytxJctf.mp4"

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
                    Technical Track Lead angestellt in <span className="text-[#F25A75]">4 Wochen</span>
                  </h1>
                  <p className="text-xl text-white/80 font-medium leading-relaxed mb-8">
                    Wie wir für die Campus Founders den perfekten Technical Track Lead in nur 4 Wochen fanden und dabei die Qualität der Kandidaten deutlich steigern konnten.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <div className="bg-[#1E1D24] px-4 py-2 rounded-lg">
                      <span className="text-white">Technical Track Lead</span>
                    </div>
                    <div className="bg-[#1E1D24] px-4 py-2 rounded-lg">
                      <span className="text-white">Startup-Inkubator</span>
                    </div>
                    <div className="bg-[#1E1D24] px-4 py-2 rounded-lg">
                      <span className="text-white">4 Wochen Besetzung</span>
                    </div>
                    <div className="bg-[#1E1D24] px-4 py-2 rounded-lg">
                      <span className="text-white">86 Mitarbeiter</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Video */}
                <div className="lg:w-1/2">
                  {/* Fallstudie Label */}
                  <div className="bg-white inline-flex items-center rounded-xl px-6 py-3 mb-4">
                    <span className="text-2xl font-bold mr-3">Fallstudie</span>
                    <Image
                      src="/logos/Logo_CampusFounders_Black.png"
                      alt="Campus Founders Logo"
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
                      <span className={`text-7xl font-bold text-[#121118] ${permanentMarker.className} block -my-3`}>15+</span>
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
                      <span className={`text-7xl font-bold text-[#121118] ${permanentMarker.className} block -my-3`}>4</span>
                    </div>
                    <p className="text-[#121118] text-lg font-bold">Wochen bis zur<br />Besetzung</p>
                  </div>
                </div>
                <p className="text-[#121118] text-lg mt-6 text-center">Die Campus Founders suchten monatelang erfolglos - wir lieferten in nur 4 Wochen den perfekten Kandidaten.</p>
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
                  Die Campus Founders suchten nach einem Technical Track Lead – einer Schlüsselposition, die als Schnittstelle zwischen technischer Fachwelt und Business-/Bildungswelt fungieren sollte. Die besondere Herausforderung lag darin, jemanden zu finden, der nicht nur tiefgreifendes technisches Wissen mitbringt, sondern auch die Fähigkeit besitzt, dieses Wissen effektiv in Bildungsprogramme zu übersetzen.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#121118]">Unser Ansatz</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Mit unserer Spezialisierung auf Tech-Recruiting konnten wir einen effizienten Prozess umsetzen:
                </p>
                <ul className="list-disc list-inside space-y-4 text-lg text-gray-700">
                  <li>Schnelle Identifikation passender Kandidaten durch unser spezialisiertes Recruiting</li>
                  <li>Präsentation der ersten Profile bereits nach einer Woche</li>
                  <li>Sorgfältige Vorqualifizierung mit Fokus auf technische Expertise und didaktische Fähigkeiten</li>
                  <li>Effiziente Koordination der Bewerbungsgespräche mit Top-Kandidaten</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#121118]">Das Ergebnis</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Innerhalb von nur 4 Wochen konnten wir die Position erfolgreich besetzen. Von den 15 präsentierten Kandidaten wurden die besten zum Gespräch eingeladen, wobei die finale Kandidatin perfekt zur Position passte. Die hohe Matching-Qualität führte zu großer Zufriedenheit bei allen Beteiligten, und die Campus Founders konnten ihr Tech-Programm wie geplant starten.
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