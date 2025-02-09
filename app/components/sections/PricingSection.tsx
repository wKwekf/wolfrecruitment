'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PricingCard = () => {
  const [isHoveredFlex, setIsHoveredFlex] = useState(false);
  const [isHoveredAlliance, setIsHoveredAlliance] = useState(false);
  const [isHoveredROI, setIsHoveredROI] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    
    if (section === 'pricing' && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('Scrolling to Pricing section');
    }
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="bg-[#121118] py-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight lg:leading-[68px] font-medium mb-4 sm:mb-6 text-white text-center">
          Unsere Preismodelle
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-white text-center">
          Wähle das Modell, das am besten zu deinen Bedürfnissen passt
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          {/* Flex Plan */}
          <Card className="relative border-2 border-gray-200 rounded-xl overflow-hidden bg-[#1D1C25] text-white h-fit">
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-platform text-2xl sm:text-3xl font-medium text-white">AI-Talent Flex</h3>
              </div>
              <div className="mt-4">
                <span className="text-5xl font-bold text-white">30%</span>
                <span className="text-gray-300 ml-2">vom Bruttojahresgehalt</span>
              </div>
              <p className="text-base text-gray-300">Zahlung erst bei erfolgreicher Anstellung</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  'Kick Off für passgenaues Matching',
                  'Dedizierter Recruiting Partner',
                  'Proaktives Talent-Sourcing',
                  'Erste Kandidatenvorstellung in 7-12 Tagen'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-white mr-2 mt-0.5" />
                    <span className="text-white text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="pt-4">
              <Button 
                variant="default"
                size="lg"
                className="w-full font-semibold"
                asChild
                onMouseEnter={() => setIsHoveredFlex(true)}
                onMouseLeave={() => setIsHoveredFlex(false)}
              >
                <Link href="https://calendly.com/wolfdanielmayer/termin-finden">
                  Erstgespräch für Flex buchen
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: isHoveredFlex ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.span>
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Alliance Plan */}
          <Card className="relative border-2 border-white rounded-xl overflow-hidden bg-[#1D1C25] text-white h-fit shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]">
            <div className="absolute top-4 right-4">
              <Badge className="bg-[#F25A75]">
                <Zap className="h-4 w-4 mr-1" />
                Empfohlen
              </Badge>
            </div>
            
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-platform text-2xl sm:text-3xl font-medium text-white">AI-Talent Alliance</h3>
              </div>
              <div className="mt-4">
                <span className="text-5xl font-bold text-white">26%</span>
                <span className="text-gray-300 ml-2">vom Bruttojahresgehalt</span>
              </div>
              <p className="text-base text-gray-300">2.990€ Anzahlung, Rest bei erfolgreicher Vermittlung</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                {[
                  'Kick Off für passgenaues Matching',
                  'Dedizierter Recruiting Partner',
                  'Proaktives Talent-Sourcing'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-white mr-2 mt-0.5" />
                    <span className="text-white text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="mb-2 text-green-500">Zusätzliche Vorteile:</h4>
                <div className="space-y-2">
                  {[
                    '7-Tage-Garantie für erste Kandidatenvorstellung',
                    'Priorisierter Zugriff auf über 1000 wechselbereiter Kandidaten',
                    'Detaillierte Reports zu Kandidaten-Feedback',
                    'Wöchentliche Strategy Sessions (30min)'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-white text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                variant="default"
                size="lg"
                className="w-full font-semibold"
                asChild
                onMouseEnter={() => setIsHoveredAlliance(true)}
                onMouseLeave={() => setIsHoveredAlliance(false)}
              >
                <Link href="https://calendly.com/wolfdanielmayer/termin-finden">
                  Erstgespräch für Alliance buchen
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: isHoveredAlliance ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* ROI Calculator Link */}
        <div className="text-center mt-12">
          <Link 
            href="/resources/roi-calculator"
            className="group inline-flex items-center text-lg text-white hover:text-[#F25A75] transition-colors"
            onMouseEnter={() => setIsHoveredROI(true)}
            onMouseLeave={() => setIsHoveredROI(false)}
          >
            Berechne hier deinen individuellen Return on Investment
            <motion.span
              className="inline-block ml-2"
              animate={{ x: isHoveredROI ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </Link>
          <p className="text-gray-400 mt-2">
            und finde heraus, wie viel du mit unseren Modellen sparen kannst
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingCard;

