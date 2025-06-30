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
  "Das Wissen, dass andere Recruiting-Wege dir nicht die gewünschten Bewerber bringen"
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

              <blockquote className="text-base sm:text-lg italic text-gray-300 pl-4 border-l-2 border-[#F25A75] mb-4">
                "Für uns gilt: Absolute Fokussierung. Wir machen ausschließlich AI-Recruiting mit einem zweistufigen System: ML-zertifizierte Recruiter koordinieren den Prozess in ihrer Region, während unsere eigenen ML-Engineers die technischen Interviews führen. Diese Kombination aus lokalem Netzwerk und echter technischer Expertise findet die AI-Experten, die andere übersehen."
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