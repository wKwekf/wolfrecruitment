'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const challenges = [
  "Zahlreiche Bewerbungen ohne substantielle AI-Expertise",
  "Wertvolle Zeit in Gesprächen, die nicht zielführend sind",
  "Die Schwierigkeit, technische Qualifikationen präzise zu bewerten",
  "Das Wissen, dass etablierte Recruiting-Wege die besten AI-Spezialisten nicht erreichen",
  "Die kontinuierliche Aufgabe, dein Team mit den richtigen AI Top-Performern zu verstärken"
]

export default function SecondSection() {
  return (
    <section id="benefits" className="bg-[#121118] text-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-custom mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight lg:leading-[68px] font-medium mb-4 sm:mb-6"
            >
              Warum Recruiting für AI so schwierig ist
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">Als Verantwortlicher für HR oder IT kennst du diese Situation:</h3>
              <ul className="space-y-2 sm:space-y-3 list-disc pl-4 sm:pl-5 mb-6 sm:mb-8">
                {challenges.map((challenge, index) => (
                  <li key={index} className="text-base sm:text-lg">{challenge}</li>
                ))}
              </ul>

              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                Genau deswegen sind all unsere Recruiter Google Cloud zertifizierte ML-Engineers, die in klar definierten, kleinen Regionen arbeiten. So kennen Sie den lokalen AI-Markt und die wirklich passenden AI-Experten für deine spezifischen Anforderungen.
              </p>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <motion.div
              className="relative w-full max-w-md aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/photos/officework.jpg"
                alt="AI-Recruiting Expertise"
                fill
                className="rounded-lg shadow-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}