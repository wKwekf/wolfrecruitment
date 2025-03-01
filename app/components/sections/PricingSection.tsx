'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

// Definiere ein eigenes Slider-Styling
const CustomSlider = ({ value, onValueChange, min = 1, max = 24, step = 1 }: { 
  value: number[]; 
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  return (
    <div className="relative py-5">
      <div className="absolute top-1/2 left-0 right-0 h-3 -mt-1.5 rounded-full bg-gray-700"></div>
      <div 
        className="absolute top-1/2 left-0 h-3 -mt-1.5 rounded-full bg-[#F25A75]" 
        style={{ 
          width: `${Math.max(3, ((value[0] - min) / (max - min)) * 100)}%` 
        }}
      ></div>
      <Slider
        defaultValue={[min]}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        className="relative z-10"
      />
      <style jsx global>{`
        [data-radix-slider-thumb] {
          height: 28px !important;
          width: 28px !important;
          background-color: white !important;
          border: 3px solid #F25A75 !important;
          box-shadow: 0 0 15px rgba(242, 90, 117, 0.6) !important;
          transition: all 0.2s ease !important;
        }
        
        [data-radix-slider-thumb]:hover {
          transform: scale(1.15) !important;
          box-shadow: 0 0 20px rgba(242, 90, 117, 0.8) !important;
        }
      `}</style>
    </div>
  );
};

const PricingCard = () => {
  const [paymentMonths, setPaymentMonths] = useState(12);
  const [paymentOption, setPaymentOption] = useState('upfront');
  const [salary, setSalary] = useState(80000);
  const [inputSalary, setInputSalary] = useState('80000');
  const sectionRef = useRef<HTMLElement>(null);
  
  // Base percentage rates
  const baseUpfrontRate = 26;
  const baseNoUpfrontRate = 30;
  
  // Progressive rate increases based on payment months
  const getProgressiveRate = (baseRate: number, months: number) => {
    if (months <= 3) return baseRate;
    if (months <= 6) return baseRate + 2;
    if (months <= 12) return baseRate + 4;
    if (months <= 18) return baseRate + 6;
    return baseRate + 8; // 19-24 months
  };
  
  // Calculate the adjusted rate based on payment terms
  const getAdjustedRate = () => {
    const baseRate = paymentOption === 'upfront' ? baseUpfrontRate : baseNoUpfrontRate;
    return getProgressiveRate(baseRate, paymentMonths);
  };
  
  // Calculate the monthly rate percentage
  const getMonthlyRatePercentage = () => {
    return getAdjustedRate() / paymentMonths;
  };
  
  // Format number as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Calculate total fee based on salary
  const getTotalFee = () => (salary * getAdjustedRate()) / 100;
  
  // Calculate monthly payment
  const getMonthlyPayment = () => {
    const totalFee = getTotalFee();
    return totalFee / paymentMonths;
  };
  
  // Calculate savings with upfront payment
  const getSavings = () => {
    const upfrontTotal = (salary * getProgressiveRate(baseUpfrontRate, paymentMonths)) / 100;
    const noUpfrontTotal = (salary * getProgressiveRate(baseNoUpfrontRate, paymentMonths)) / 100;
    return noUpfrontTotal - upfrontTotal;
  };
  
  // Upfront payment amount
  const upfrontPayment = 2990;
  
  // Handle salary input change
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputSalary(value);
  };
  
  // Update salary when input is complete
  const handleSalaryBlur = () => {
    const parsedValue = parseInt(inputSalary);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setSalary(parsedValue);
    } else {
      setInputSalary(salary.toString());
    }
  };

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight lg:leading-[68px] font-medium mb-4 sm:mb-6 text-white text-center">
            Unser Preismodell
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-white text-center">
            Flexible Zahlungsoptionen, die zu deinen Bedürfnissen passen
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="relative border-2 border-white rounded-xl overflow-hidden bg-[#1D1C25] text-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)] mb-12">
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-platform text-2xl sm:text-3xl font-medium text-white">AI-Talent Recruiting</h3>
              </div>
              
              <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">
                      {paymentMonths > 1 
                        ? formatCurrency(getMonthlyPayment())
                        : formatCurrency(getTotalFee())
                      }
                    </span>
                    <span className="text-gray-300 ml-2">
                      {paymentMonths > 1 ? 'pro Monat' : 'Gesamtkosten'}
                    </span>
                  </div>
                  <p className="text-base text-gray-300 mt-1">
                    {paymentOption === 'upfront' 
                      ? `${formatCurrency(upfrontPayment)} Anzahlung + ${paymentMonths > 1 ? `${paymentMonths} Monatsraten nach erfolgreicher Anstellung` : 'Restzahlung nach erfolgreicher Anstellung'}`
                      : `Zahlung in ${paymentMonths > 1 ? `${paymentMonths} Monatsraten` : 'einer Rate'} nach erfolgreicher Anstellung`}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Gesamtgebühr: {getAdjustedRate()}% vom Jahresgehalt
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end mb-2 space-x-2">
                    <label htmlFor="salary-input" className="text-sm text-gray-400">Jahresgehalt:</label>
                    <div className="relative">
                      <Input
                        id="salary-input"
                        type="text"
                        value={inputSalary}
                        onChange={handleSalaryChange}
                        onBlur={handleSalaryBlur}
                        className="w-32 bg-[#252430] border-gray-700 text-white text-right pr-8"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">€</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-300">
                    Basierend auf {formatCurrency(salary)} Jahresgehalt
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Payment Options Tabs */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Zahlungsoption wählen:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentOption('upfront')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md border-2 transition-all duration-200 ${
                      paymentOption === 'upfront' 
                        ? 'bg-[#F25A75] text-white border-[#F25A75] shadow-[0_0_15px_rgba(242,90,117,0.4)]' 
                        : 'bg-[#252430] text-gray-300 border-transparent hover:border-gray-600'
                    }`}
                  >
                    Mit Anzahlung
                    <Badge className="bg-[#F25A75] shadow-[0_0_10px_rgba(242,90,117,0.5)]">
                      {formatCurrency(getSavings())} gespart
                    </Badge>
                  </button>
                  <button
                    onClick={() => setPaymentOption('no-upfront')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md border-2 transition-all duration-200 ${
                      paymentOption === 'no-upfront' 
                        ? 'bg-[#F25A75] text-white border-[#F25A75] shadow-[0_0_15px_rgba(242,90,117,0.4)]' 
                        : 'bg-[#252430] text-gray-300 border-transparent hover:border-gray-600'
                    }`}
                  >
                    Ohne Anzahlung
                    <Badge className="bg-gray-600">Keine Vorabkosten</Badge>
                  </button>
                </div>
                
                {paymentOption === 'upfront' ? (
                  <div className="space-y-6 mt-4">
                    <div className="bg-[#252430] p-4 rounded-lg">
                      <div className="flex items-start mb-2">
                        <ShieldCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-white">
                          <span className="font-semibold">100% Geld-zurück-Garantie</span> auf die Anzahlung, wenn du mit unseren Kandidatenvorschlägen nicht zufrieden bist
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-[#252430] p-4 rounded-lg border border-[#2a2936]">
                      <div className="flex items-start mb-2">
                        <ShieldCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-white">
                          <span className="font-semibold">Kündigungsschutz inklusive:</span> Kostenlose Nachbesetzung während der Probezeit. Sollte der vermittelte Kandidat nach der Probezeit, aber vor Ablauf deiner Ratenzahlung kündigen, reduzieren wir die verbleibenden Raten um 50%
                        </p>
                      </div>
                      <p className="text-gray-300 text-sm ml-7">Minimiertes Risiko bei längeren Zahlungszeiträumen</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="text-white">Zahlungszeitraum:</h5>
                        <span className="text-white font-medium">
                          {paymentMonths === 1 ? '1 Zahlung' : `${paymentMonths} Monatsraten`}
                        </span>
                      </div>
                      
                      <CustomSlider 
                        value={[paymentMonths]} 
                        onValueChange={(value) => setPaymentMonths(value[0])}
                      />
                      
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Einmalzahlung</span>
                        <span>6 Monate</span>
                        <span>12 Monate</span>
                        <span>18 Monate</span>
                        <span>24 Monate</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 mt-4">
                    <div className="bg-[#252430] p-4 rounded-lg">
                      <p className="text-white">
                        <span className="font-semibold">Keine Vorabkosten</span> - du zahlst erst, wenn wir erfolgreich vermittelt haben
                      </p>
                    </div>
                    
                    <div className="bg-[#252430] p-4 rounded-lg border border-[#2a2936]">
                      <div className="flex items-start mb-2">
                        <ShieldCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-white">
                          <span className="font-semibold">Kündigungsschutz inklusive:</span> Kostenlose Nachbesetzung während der Probezeit. Sollte der vermittelte Kandidat nach der Probezeit, aber vor Ablauf deiner Ratenzahlung kündigen, reduzieren wir die verbleibenden Raten um 50%
                        </p>
                      </div>
                      <p className="text-gray-300 text-sm ml-7">Minimiertes Risiko bei längeren Zahlungszeiträumen</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="text-white">Zahlungszeitraum:</h5>
                        <span className="text-white font-medium">
                          {paymentMonths === 1 ? '1 Zahlung' : `${paymentMonths} Monatsraten`}
                        </span>
                      </div>
                      
                      <CustomSlider 
                        value={[paymentMonths]} 
                        onValueChange={(value) => setPaymentMonths(value[0])}
                      />
                      
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Einmalzahlung</span>
                        <span>6 Monate</span>
                        <span>12 Monate</span>
                        <span>18 Monate</span>
                        <span>24 Monate</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Features */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Inklusive Services:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex items-start bg-[#1D1C25] border border-[#2a2936] p-3 rounded-lg hover:border-[#F25A75] transition-colors">
                    <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Persönlicher Recruiting Partner</span>
                      <p className="text-gray-400 text-sm mt-1">Dein dedizierter Ansprechpartner für den gesamten Recruiting-Prozess</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-[#1D1C25] border border-[#2a2936] p-3 rounded-lg hover:border-[#F25A75] transition-colors">
                    <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Kandidaten in 7 Tagen</span>
                      <p className="text-gray-400 text-sm mt-1">Garantierte Vorstellung erster qualifizierter Kandidaten innerhalb einer Woche</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-[#1D1C25] border border-[#2a2936] p-3 rounded-lg hover:border-[#F25A75] transition-colors">
                    <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Individuelles Assessment</span>
                      <p className="text-gray-400 text-sm mt-1">Maßgeschneiderte Bewertungskriterien für maximale Vergleichbarkeit und Eignung</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-[#1D1C25] border border-[#2a2936] p-3 rounded-lg hover:border-[#F25A75] transition-colors">
                    <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Strategische Beratung</span>
                      <p className="text-gray-400 text-sm mt-1">Wöchentliche 30-minütige Sessions zur Optimierung deiner Recruiting-Strategie</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-[#1D1C25] border border-[#2a2936] p-3 rounded-lg hover:border-[#F25A75] transition-colors">
                    <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Proaktives Talent-Sourcing</span>
                      <p className="text-gray-400 text-sm mt-1">Kontinuierliche Suche nach Top-Talenten speziell für deine Anforderungen</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-[#1D1C25] border border-[#2a2936] p-3 rounded-lg hover:border-[#F25A75] transition-colors">
                    <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Unbegrenzte Kandidaten</span>
                      <p className="text-gray-400 text-sm mt-1">Keine Limitierung bei der Anzahl der vorgestellten Profile bis zur erfolgreichen Besetzung</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-[#1D1C25] border border-[#2a2936] p-3 rounded-lg hover:border-[#F25A75] transition-colors">
                    <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Kick-Off Workshop</span>
                      <p className="text-gray-400 text-sm mt-1">Intensive Analyse deiner Anforderungen für passgenaues Matching</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-[#1D1C25] border border-[#2a2936] p-3 rounded-lg hover:border-[#F25A75] transition-colors">
                    <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Detaillierte Analysen</span>
                      <p className="text-gray-400 text-sm mt-1">Umfassende Reports zu Kandidaten-Feedback und Markttrends</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-4 pb-6 flex justify-center">
              <Button 
                variant="default" 
                size="lg" 
                className="shadow-lg relative z-20 px-8"
                asChild
              >
                <Link 
                  href="/kandidatenprofile"
                  className="inline-flex items-center"
                >
                  Hol dir zwei Gratis-Profile
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center justify-center mt-8 space-y-8"
        >
          <p className="text-gray-400 text-center max-w-2xl">
            Teste unser Angebot kostenlos und überzeuge dich selbst von der Qualität unserer AI-Experten
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCard;

