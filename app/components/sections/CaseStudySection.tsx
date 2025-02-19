'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface CaseStudy {
  id: string;
  category: string;
  keywords: string[];
  title: string;
  description: string;
  link: string;
  companyName: string;
  employeeCount: number;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'campus-founders',
    category: 'StartUp',
    keywords: ['startup', 'ai-lead'],
    title: '814% mehr Leads durch strategische AI-Talent Vermittlung',
    description: 'Entdecke, wie unsere maßgeschneiderte Talent-Matching Strategie den Campus Founders (86 Mitarbeiter) half, ihren perfekten AI-Track-Lead zu finden. Mit unserem innovativen Ansatz konnten wir innerhalb von nur 4 Wochen die ideale Besetzung realisieren.',
    link: '/fallstudien/campus-founders',
    companyName: 'Campus Founders',
    employeeCount: 86
  },
  {
    id: 'bayernlb',
    category: 'Financial',
    keywords: ['bank', 'ml-engineer', 'ml-ops'],
    title: 'Revolutionärer Erfolg im ML-Team Aufbau bei führender Bank',
    description: 'Erfahre, wie wir der BayernLB (7.500 Mitarbeiter) halfen, ihr ML-Team mit Spitzentalenten zu verstärken. Durch unseren effizienten Recruiting-Prozess konnten wir aus einem Pool von 14 hochqualifizierten Kandidaten die perfekte Besetzung für beide Positionen in Rekordzeit realisieren.',
    link: '/fallstudien/bayernlb',
    companyName: 'BayernLB',
    employeeCount: 7500
  }
];

export default function CaseStudySection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Dynamisch alle einzigartigen Keywords aus den Case Studies sammeln und sortieren
  const allKeywords = Array.from(new Set(
    caseStudies.flatMap(study => study.keywords)
  ))
  .sort() // Alphabetisch sortieren
  .map(keyword => ({
    label: keyword.split('-').map(word => {
      // Spezielle Behandlung für Abkürzungen
      if (word.toLowerCase() === 'ai') return 'AI';
      if (word.toLowerCase() === 'ml') return 'ML';
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' '),
    value: keyword
  }));

  // Gefilterte Case Studies basierend auf aktivem Filter
  const filteredCaseStudies = activeFilter
    ? caseStudies.filter(study => study.keywords.includes(activeFilter))
    : caseStudies;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    
    if (section === 'case-studies' && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section ref={sectionRef} id="case-study" className="bg-[#F25A75] py-20">
      <div className="max-w-custom mx-auto px-4 space-y-12">
        <div className="text-center mb-12">
          <h2 className="font-platform text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-medium mb-4 text-[#121118]">
            Erfolgreiche Vermittlungen.<br />Messbare Ergebnisse.
          </h2>
          <p className="text-xl sm:text-2xl text-[#121118]/90 max-w-3xl mx-auto font-medium leading-relaxed">
            Die Zahlen sprechen für sich ⚡️ Hier zeigen wir dir, wie wir <span className="font-bold">AI-Talente</span> schnell und effizient mit den richtigen Unternehmen zusammenbringen.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {allKeywords.map((keyword) => (
            <Button
              key={keyword.value}
              onClick={() => setActiveFilter(activeFilter === keyword.value ? null : keyword.value)}
              variant={activeFilter === keyword.value ? "default" : "outline"}
            >
              {keyword.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCaseStudies.map((study) => (
            <div key={study.id} className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex flex-col h-full">
                <div className="space-y-6 flex-grow">
                  <div className="mb-2">
                    <span className="text-lg font-medium text-gray-600">{study.category}</span>
                  </div>
                  
                  <h3 className="font-platform text-2xl md:text-3xl font-medium text-[#121118]">
                    {study.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600">
                    {study.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 text-center">
                  <Link href={study.link}>
                    <Button className="inline-flex">
                      Fallstudie ansehen
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 