'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function LeadMagnetHeader() {
  return (
    <header className="bg-[#121118] text-white w-full z-50">
      <div className="px-4 sm:px-8 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 sm:space-x-10">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="WolfAI"
                width={120}
                height={40}
              />
            </Link>
          </div>
          <div className="invisible md:block">
            <Button 
              variant="default" 
              size="lg" 
              className="font-semibold"
            >
              <span>Erstgespräch buchen</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 