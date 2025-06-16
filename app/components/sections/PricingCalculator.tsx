'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { CustomerCandidateDialog } from "@/app/components/ui/customer-candidate-dialog";

export const PricingCalculator = () => {
  const [salary, setSalary] = useState(100000);
  const [inputSalary, setInputSalary] = useState('100000');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Konstante Preise
  const startHonorar = 4990;
  const erfolgsHonorarProzent = 19;
  
  // Berechne Erfolgshonorar
  const erfolgsHonorar = (salary * erfolgsHonorarProzent) / 100;
  const gesamtkosten = startHonorar + erfolgsHonorar;
  
  // Format number as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Handle salary input
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputSalary(value);
  };
  
  const handleSalaryBlur = () => {
    const parsedValue = parseInt(inputSalary) || 100000;
    setSalary(parsedValue);
    setInputSalary(parsedValue.toString());
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSalaryBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="max-w-4xl mx-auto"
    >
      {/* Gehaltsrechner */}
      <div className="mb-12 bg-[#1D1C25] p-8 rounded-xl">
        <h3 className="text-2xl font-medium text-white mb-6 text-center">Kostenrechner</h3>
        
        <div className="flex flex-col items-center mb-8">
          <label className="text-gray-400 mb-3">Jahresgehalt des Kandidaten</label>
          <div className="relative w-64">
            <Input
              type="text"
              value={inputSalary}
              onChange={handleSalaryChange}
              onBlur={handleSalaryBlur}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#252430] border-gray-700 text-white text-2xl h-14 pl-4 pr-10 rounded-lg text-center"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">€</span>
          </div>
        </div>
        
        {/* Kostenaufschlüsselung */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center p-4 bg-[#252430] rounded-lg">
            <span className="text-gray-300">Starthonorar (einmalig)</span>
            <span className="text-white font-medium text-xl">{formatCurrency(startHonorar)}</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-[#252430] rounded-lg">
            <span className="text-gray-300">Erfolgshonorar ({erfolgsHonorarProzent}% bei Einstellung)</span>
            <span className="text-white font-medium text-xl">{formatCurrency(erfolgsHonorar)}</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-[#252430] rounded-lg border-2 border-[#F25A75]">
            <span className="text-white font-medium">Gesamtkosten</span>
            <span className="text-[#F25A75] font-bold text-2xl">{formatCurrency(gesamtkosten)}</span>
          </div>
        </div>
        
        {/* Zahlungsinfo */}
        <div className="text-center text-gray-400">
          <p>Starthonorar bei Beauftragung • Erfolgshonorar nur bei erfolgreicher Einstellung</p>
        </div>
      </div>

      {/* Erfolgsgarantie */}
      <div className="mb-12 bg-[#1D1C25] p-8 rounded-xl border border-green-900/50">
        <div className="flex items-start">
          <ShieldCheck className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-medium text-white mb-3">Unsere Erfolgsgarantie</h3>
            <p className="text-gray-300 mb-4">
              Sollte es innerhalb von 90 Tagen zu keiner Einstellung kommen, verrechnen wir das Starthonorar mit den tatsächlich erbrachten Leistungen:
            </p>
            
            <div className="bg-[#252430] p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Kommunikation</span>
                  <span className="text-white">135€/Stunde</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Kandidatenvorstellung</span>
                  <span className="text-white">500€/Kandidat</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm">
              Die Differenz zwischen dem gezahlten Starthonorar und den tatsächlich erbrachten Leistungen wird dir zurückerstattet. 
              Nach 90 Tagen arbeiten wir auf Wunsch weiter, aber die Rückerstattungsoption ist auf diesen Zeitraum begrenzt.
            </p>
          </div>
        </div>
      </div>

      {/* Was du bekommst */}
      <div className="mb-12">
        <h3 className="text-2xl font-medium text-white mb-6 text-center">Was du für deine Investition bekommst</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-[#1D1C25] border-gray-800">
            <CardContent className="p-6">
              <h4 className="text-lg font-medium text-white mb-4">Wolf Plattform Zugang</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Video-Interviews aller Kandidaten</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Detaillierte Skill-Bewertungen (0-5 Sterne)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Kanban-Pipeline für dein Recruiting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Team-Kollaboration möglich</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1D1C25] border-gray-800">
            <CardContent className="p-6">
              <h4 className="text-lg font-medium text-white mb-4">Full-Service Recruiting</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Sourcing aus eigenen & öffentlichen Quellen</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Technische Interviews durch AI-Experten</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">7-Tage-Garantie für erste Kandidaten</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#F25A75] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Unbegrenzte Kandidatenvorschläge</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Zusätzliche Benefits */}
      <div className="mb-12 bg-[#1D1C25] p-6 rounded-xl">
        <h4 className="text-lg font-medium text-white mb-4 flex items-center">
          <Info className="h-5 w-5 mr-2 text-[#F25A75]" />
          Zusätzlich inklusive
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-[#F25A75] font-bold text-2xl mb-2">2 Ebenen</div>
            <p className="text-gray-400 text-sm">Google-zertifizierte Recruiter + AI-Practitioners für Interviews</p>
          </div>
          <div className="text-center">
            <div className="text-[#F25A75] font-bold text-2xl mb-2">100%</div>
            <p className="text-gray-400 text-sm">AI-Fokus - keine Vermischung mit anderen Tech-Rollen</p>
          </div>
          <div className="text-center">
            <div className="text-[#F25A75] font-bold text-2xl mb-2">DACH</div>
            <p className="text-gray-400 text-sm">Spezialisiert auf den deutschsprachigen Markt</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="bg-[#F25A75] hover:bg-[#F25A75]/90 text-white shadow-[0_0_20px_rgba(242,90,117,0.3)]"
          onClick={() => setDialogOpen(true)}
        >
          Jetzt Plattform-Demo buchen
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-gray-400 mt-4">7 Tage kostenlos testen • Keine Kreditkarte erforderlich</p>
      </div>
      
      <CustomerCandidateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCustomerSelect={() => {
          setDialogOpen(false);
          window.location.href = "https://calendly.com/d/cvzz-69b-hc9/quick-chat";
        }}
      />
    </motion.div>
  );
};