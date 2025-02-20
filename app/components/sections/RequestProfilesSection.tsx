'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function RequestProfilesSection() {
  return (
    <div className="w-full bg-white">
      <section className="py-20">
        <div className="max-w-custom mx-auto px-4">
          <div className="bg-[#121118] rounded-[32px] px-8 py-12 md:px-12 md:py-16 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium mb-6 text-white">
                Hol dir zwei Gratis-Profile
              </h2>
              <p className="text-xl text-white/80 font-medium leading-relaxed mb-8 max-w-2xl">
                Sende uns deine Website und wir zeigen dir die besten nächsten Schritte, um dein AI-Team zu skalieren.
              </p>
              <Button 
                size="lg"
                className="bg-[#F25A75] hover:bg-[#F25A75]/90 text-white"
                asChild
              >
                <Link href="/resources/talent-preview" className="flex items-center gap-2">
                  Hol dir zwei Gratis-Profile
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 