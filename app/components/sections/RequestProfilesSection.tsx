'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from 'lucide-react'
import { CustomerCandidateDialog } from "@/app/components/ui/customer-candidate-dialog"

export default function RequestProfilesSection() {
  const [dialogOpen, setDialogOpen] = useState(false)
  
  return (
    <div className="w-full bg-white">
      <section className="py-20">
        <div className="max-w-custom mx-auto px-4">
          <div className="bg-[#121118] rounded-[32px] px-8 py-12 md:px-12 md:py-16 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium tracking-heading mb-6 text-white">
                Starte jetzt mit uns
              </h2>
              <p className="text-xl text-white/80 font-medium leading-relaxed mb-8 max-w-2xl">
                Nimm dir 15 Minuten Zeit, um mit uns zu sprechen. Wir zeigen dir, wie wir dein AI-Team skalieren können.
              </p>
              <Button 
                size="lg"
                className="bg-[#F25A75] hover:bg-[#F25A75]/90 text-white flex items-center gap-2"
                onClick={() => setDialogOpen(true)}
              >
                Kennenlern-Gespräch vereinbaren
                <Calendar className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <CustomerCandidateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCustomerSelect={() => {
          setDialogOpen(false);
          window.location.href = "https://calendly.com/d/cvzz-69b-hc9/quick-chat";
        }}
      />
    </div>
  )
} 