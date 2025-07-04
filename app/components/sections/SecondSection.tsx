'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const challenges = [
  "Kaum Bewerbungen trotz attraktiver Stellenausschreibungen",
  "Die besten Cloud & DevOps Engineers sind bereits vergeben und nicht aktiv suchend",
  "Monatelange Vakanzen, die deine digitale Transformation ausbremsen",
  "Der Konkurrenzkampf mit Tech-Giganten um die wenigen verfügbaren Experten"
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
              Warum Recruiting für Cloud & DevOps so schwierig ist
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

              <blockquote className="text-base sm:text-lg italic text-gray-300 pl-4 border-l-2 border-[#F25A75] mb-4">
                "Für uns gilt: Wir kennen jeden Senior Cloud & DevOps Engineer im DACH-Raum - auch die, die nicht aktiv suchen. Unser zweistufiges System funktioniert: Spezialisierte Tech-Recruiter mit tiefem Netzwerk sprechen passive Kandidaten direkt an, während echte DevOps-Engineers aus unserem Team die technische Passung in Video-Interviews prüfen. So erreichen wir die 20% Top-Performer, die niemals auf Stellenanzeigen reagieren würden."
              </blockquote>
              <div className="w-80 h-24 relative -mt-2">
                <Image
                  src="/photos/UnterschriftDaniel.svg"
                  alt="Daniel's Unterschrift"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
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
                src="/photos/DanielGonzalezGarcia.png"
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