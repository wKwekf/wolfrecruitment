'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from 'lucide-react'

export default function RequestProfilesSection() {
  return (
    <div className="w-full bg-white">
      <section className="py-20">
        <div className="max-w-custom mx-auto px-4">
          <div className="bg-[#121118] rounded-[32px] px-8 py-12 md:px-12 md:py-16 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium mb-6 text-white">
                Starte jetzt mit uns
              </h2>
              <p className="text-xl text-white/80 font-medium leading-relaxed mb-8 max-w-2xl">
                Nimm dir 15 Minuten Zeit, um mit uns zu sprechen. Wir zeigen dir, wie wir dein AI-Team skalieren können.
              </p>
              <Button 
                size="lg"
                className="bg-[#F25A75] hover:bg-[#F25A75]/90 text-white"
                asChild
              >
                <Link href="https://calendly.com/wolfdanielgonzalezgarcia/quickchat" className="flex items-center gap-2">
                  Kennenlern-Gespräch vereinbaren
                  <Calendar className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 