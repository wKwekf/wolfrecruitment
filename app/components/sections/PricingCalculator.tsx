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
  // Berechnen des prozentualen Anteils für die ersten Positionen mit besserer Ausrichtung
  const getProgressWidth = () => {
    const percent = ((value[0] - min) / (max - min)) * 100;
    
    // Spezialbehandlung für die ersten Positionen, um die Ausrichtung zu verbessern
    if (value[0] === 1) {
      // Bei Minimalwert (Einmalzahlung) - minimaler Balken
      return '10px'; // Nur eine minimale Breite zeigen
    } else if (value[0] === 2) {
      // Korrektur für den zweiten Monat
      return `calc(${percent}% + 10px)`;
    }
    
    return `${percent}%`;
  };

  return (
    <div className="relative py-5">
      <div className="absolute top-1/2 left-0 right-0 h-3 -mt-1.5 rounded-full bg-gray-700"></div>
      <div 
        className="absolute top-1/2 left-0 h-3 -mt-1.5 rounded-full bg-[#F25A75]" 
        style={{ 
          width: getProgressWidth() 
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
          height: 85px !important;
          width: 85px !important;
          background-color: white !important;
          border: 6px solid #F25A75 !important;
          box-shadow: 0 0 30px rgba(242, 90, 117, 0.85) !important;
          transition: all 0.2s ease !important;
        }
        
        [data-radix-slider-thumb]:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 0 35px rgba(242, 90, 117, 1) !important;
        }
      `}</style>
    </div>
  );
};

export const PricingCalculator = () => {
  const [paymentMonths, setPaymentMonths] = useState(1);
  const [paymentOption, setPaymentOption] = useState('no-upfront');
  const [salary, setSalary] = useState(80000);
  const [inputSalary, setInputSalary] = useState('80000');
  const sectionRef = useRef<HTMLElement>(null);
  
  // Gehaltsgrenzen
  const MIN_SALARY = 5000;
  const MAX_SALARY = 3000000;
  
  // Base percentage rates
  const baseUpfrontRate = 26;
  const baseNoUpfrontRate = 30;
  
  // Progressive rate increases based on payment months
  const getProgressiveRate = (baseRate: number, months: number) => {
    if (months <= 3) return 0;
    if (months <= 6) return 2;
    if (months <= 12) return 4;
    if (months <= 18) return 6;
    return 8; // 19-24 months
  };
  
  // Calculate the adjusted rate based on payment terms
  const getAdjustedRate = () => {
    const baseRate = paymentOption === 'upfront' ? baseUpfrontRate : baseNoUpfrontRate;
    return baseRate + getProgressiveRate(0, paymentMonths);
  };
  
  // Calculate adjusted rate for upfront option
  const getUpfrontRate = () => {
    return baseUpfrontRate + getProgressiveRate(0, paymentMonths);
  };
  
  // Calculate adjusted rate for no-upfront option
  const getNoUpfrontRate = () => {
    return baseNoUpfrontRate + getProgressiveRate(0, paymentMonths);
  };
  
  // Calculate total fee based on salary
  const getTotalFee = () => (salary * getAdjustedRate()) / 100;
  
  // Calculate total fee for upfront option
  const getUpfrontTotalFee = () => (salary * getUpfrontRate()) / 100;
  
  // Calculate total fee for no-upfront option
  const getNoUpfrontTotalFee = () => (salary * getNoUpfrontRate()) / 100;
  
  // Calculate monthly payment
  const getMonthlyPayment = () => {
    const totalFee = getTotalFee();
    return totalFee / paymentMonths;
  };
  
  // Calculate monthly payment for upfront option
  const getUpfrontMonthlyPayment = () => {
    // Berechne die Gesamtgebühr ohne Anzahlung
    const totalFee = getUpfrontTotalFee() - getUpfrontPayment();
    // Teile durch die Anzahl der Monate
    return paymentMonths > 1 ? totalFee / paymentMonths : totalFee;
  };
  
  // Calculate monthly payment for no-upfront option
  const getNoUpfrontMonthlyPayment = () => {
    const totalFee = getNoUpfrontTotalFee();
    return paymentMonths > 1 ? totalFee / paymentMonths : totalFee;
  };
  
  // Calculate upfront payment amount (only for upfront option)
  const getUpfrontPayment = () => {
    return 2990; // Fester Betrag von 2.990 € als Anzahlung
  };
  
  // Format number as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Calculate savings with upfront payment
  const getSavings = () => {
    const upfrontTotal = (salary * getUpfrontRate()) / 100;
    const noUpfrontTotal = (salary * getNoUpfrontRate()) / 100;
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
    updateSalary();
  };
  
  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateSalary();
      // Fokus vom Input-Feld entfernen
      (e.target as HTMLInputElement).blur();
    }
  };
  
  // Zentrale Funktion zum Aktualisieren des Gehalts mit Grenzen
  const updateSalary = () => {
    let parsedValue = parseInt(inputSalary);
    
    if (isNaN(parsedValue)) {
      // Wenn keine gültige Zahl, zurück zum vorherigen Wert
      setInputSalary(salary.toString());
      return;
    }
    
    // Gehaltsgrenzen anwenden
    if (parsedValue < MIN_SALARY) {
      parsedValue = MIN_SALARY;
    } else if (parsedValue > MAX_SALARY) {
      parsedValue = MAX_SALARY;
    }
    
    // Gehalt und Eingabefeld aktualisieren
    setSalary(parsedValue);
    setInputSalary(parsedValue.toString());
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      {/* Einstellungen - Oben */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center justify-center mb-3 w-full max-w-md">
          <div className="relative flex-1">
            <Input
              id="salary-input"
              type="text"
              value={inputSalary}
              onChange={handleSalaryChange}
              onBlur={handleSalaryBlur}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#252430] border-gray-700 text-white text-xl h-14 pl-4 pr-10 rounded-lg"
              placeholder="80.000"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">€</span>
          </div>
          <div className="ml-4 text-xl font-medium text-white">
            Jahresgehalt des Kandidaten
          </div>
        </div>
        
        <p className="text-gray-400 text-center mb-6">
          Unsere Vermittlungsgebühr wird als Prozentsatz des Jahresgehalts berechnet
        </p>
      </div>
      
      {/* Zahlungsoption - Auswahl */}
      <div className="mb-6 bg-[#1D1C25] p-5 rounded-xl">
        <h3 className="font-medium text-white mb-3">Zahlungsoption:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: Mit Anzahlung */}
          <div 
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              paymentOption === 'upfront' 
                ? 'bg-[#252430] border-2 border-[#F25A75] shadow-[0_0_15px_rgba(242,90,117,0.4)]' 
                : 'bg-[#252430] border border-gray-700 hover:border-white'
            }`}
            onClick={() => setPaymentOption('upfront')}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-medium text-white">Mit Anzahlung</h4>
              <Badge className="bg-[#F25A75] shadow-[0_0_10px_rgba(242,90,117,0.5)]">
                {formatCurrency(getSavings())} gespart
              </Badge>
            </div>
            
            <p className="text-sm text-gray-300">
              {formatCurrency(getUpfrontPayment())} Anzahlung + Restzahlung nach erfolgreicher Anstellung
            </p>
            
            <p className="text-sm text-gray-300 mt-1">
              Gesamtgebühr: {getUpfrontRate()}% vom Jahresgehalt
            </p>
            
            <div className="mt-3 bg-[#1D1C25] p-3 rounded-lg">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm">
                  <span className="font-medium">100% Geld-zurück-Garantie</span> auf die Anzahlung, wenn du mit unseren Kandidatenvorschlägen nicht zufrieden bist
                </p>
              </div>
            </div>
          </div>
          
          {/* Option 2: Ohne Anzahlung */}
          <div 
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              paymentOption === 'no-upfront' 
                ? 'bg-[#252430] border-2 border-[#F25A75] shadow-[0_0_15px_rgba(242,90,117,0.4)]' 
                : 'bg-[#252430] border border-gray-700 hover:border-white'
            }`}
            onClick={() => setPaymentOption('no-upfront')}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-medium text-white">Ohne Anzahlung</h4>
              <Badge className="bg-[#252430] text-gray-300 border border-gray-700">
                Keine Vorabkosten
              </Badge>
            </div>
            
            <p className="text-sm text-gray-300">
              Zahlung in einer Rate nach erfolgreicher Anstellung
            </p>
            
            <p className="text-sm text-gray-300 mt-1">
              Gesamtgebühr: {getNoUpfrontRate()}% vom Jahresgehalt
            </p>
            
            <div className="mt-3 bg-[#1D1C25] p-3 rounded-lg">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm">
                  <span className="font-medium">Keine Vorabkosten</span> - du zahlst erst, wenn wir erfolgreich vermittelt haben
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Zahlungszeitraum - Slider */}
      <div className="mb-6 bg-[#1D1C25] p-5 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-white">Zahlungszeitraum:</h3>
          <span className="text-white font-medium">
            {paymentMonths === 1 ? 'Einmalzahlung' : `${paymentMonths} Monate`}
          </span>
        </div>
        
        <CustomSlider
          value={[paymentMonths]}
          onValueChange={(value) => setPaymentMonths(value[0])}
          min={1}
          max={24}
        />
        
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Einmalzahlung</span>
          <span>6 Monate</span>
          <span>12 Monate</span>
          <span>18 Monate</span>
          <span>24 Monate</span>
        </div>
      </div>
      
      {/* Ergebnis - Ein Gesamtbetrag unten */}
      <div className="mb-6 bg-[#252430] p-6 rounded-xl border-2 border-[#F25A75] shadow-[0_0_20px_rgba(242,90,117,0.3)]">
        <h3 className="text-xl font-medium text-white mb-3 text-center">Deine Kosten</h3>
        
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-2">
            <span className="text-5xl font-bold text-white">
              {paymentOption === 'upfront' 
                ? (paymentMonths > 1 
                    ? formatCurrency(getUpfrontMonthlyPayment()) 
                    : formatCurrency(getUpfrontTotalFee()))
                : (paymentMonths > 1 
                    ? formatCurrency(getNoUpfrontMonthlyPayment()) 
                    : formatCurrency(getNoUpfrontTotalFee()))
              }
            </span>
            <span className="text-xl text-gray-300 ml-2">
              {paymentMonths > 1 ? 'pro Monat' : 'einmalig'}
            </span>
          </div>
          
          <p className="text-gray-300 text-center mb-3">
            {paymentOption === 'upfront' 
              ? `2.990 € Anzahlung + ${paymentMonths > 1 ? `${paymentMonths} Monatsraten` : 'Restzahlung'} nach erfolgreicher Anstellung`
              : `Zahlung in ${paymentMonths > 1 ? `${paymentMonths} Monatsraten` : 'einer Rate'} nach erfolgreicher Anstellung`
            }
          </p>
          
          <p className="text-gray-300 text-center">
            Vermittlungsgebühr: {paymentOption === 'upfront' ? getUpfrontRate() : getNoUpfrontRate()}% vom Jahresgehalt des Kandidaten
          </p>
        </div>
      </div>
      
      {/* Kündigungsschutz - jetzt über dem CTA Button */}
      <div className="mb-6 bg-[#1D1C25] p-4 rounded-xl max-w-3xl mx-auto">
        <div className="flex items-start">
          <ShieldCheck className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-white">
            <span className="font-medium">Kündigungsschutz inklusive:</span> Kostenlose Nachbesetzung während der Probezeit. Sollte der Kandidat nach der Probezeit, aber vor Ablauf deiner Ratenzahlung kündigen, reduzieren wir die verbleibenden Raten um 50%
          </p>
        </div>
      </div>
      
      {/* CTA Button */}
      <div className="flex justify-center mb-8">
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
      </div>
      
      {/* Inclusive Services - Ganz unten */}
      <div className="mt-8">
        <h3 className="font-platform text-xl font-medium text-white mb-4">Inklusive Services:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
    </motion.div>
  );
}; 