'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Edit2, Check } from 'lucide-react'
import * as SliderPrimitive from '@radix-ui/react-slider'

export default function ROICalculatorPage() {
  const [salary, setSalary] = useState<number | ''>(80000)
  const [valueFactor, setValueFactor] = useState<number | ''>(2)
  const [usualHiringTime, setUsualHiringTime] = useState<number | string>(121)
  const [isEditingHiringTime, setIsEditingHiringTime] = useState<boolean>(false)
  const [hiringTimeAfterCandidate, setHiringTimeAfterCandidate] = useState<number>(14)
  const [roi, setRoi] = useState<number>(0)
  const [isNegativeRoi, setIsNegativeRoi] = useState<boolean>(false)
  const [customValueFactor, setCustomValueFactor] = useState<boolean>(false)
  const [confirmedValueFactor, setConfirmedValueFactor] = useState<number | ''>(2)

  const calculateROI = useCallback(() => {
    if (salary === '' || confirmedValueFactor === '' || usualHiringTime === '') {
      setRoi(0);
      setIsNegativeRoi(false);
      return;
    }
    const dailyValue = (Number(salary) * Number(confirmedValueFactor)) / 365;
    const timeSaved = Number(usualHiringTime) - (hiringTimeAfterCandidate + 7);
    const valueSaved = dailyValue * timeSaved;
    const cost = Number(salary) * 0.20 + 4990; // 20% success fee + 4990€ start fee
    const calculatedRoi = valueSaved - cost;
    
    setIsNegativeRoi(calculatedRoi < 0);
    setRoi(Math.max(0, calculatedRoi));
  }, [salary, confirmedValueFactor, usualHiringTime, hiringTimeAfterCandidate])

  useEffect(() => {
    calculateROI()
  }, [salary, confirmedValueFactor, usualHiringTime, hiringTimeAfterCandidate, calculateROI])

  const valueFactorOptions = [1.5, 2, 2.5, 3, 4, 5]

  return (
    <div className="min-h-screen bg-[#121118] py-12">
      <TooltipProvider>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-platform text-3xl sm:text-4xl text-white mb-4">ROI Calculator</h1>
            <p className="text-xl text-gray-300 mb-4">Berechne hier deinen individuellen Return on Investment:</p>
            <div className="mt-4 flex justify-center">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="cursor-pointer focus:outline-none flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2D2C35] text-white hover:bg-[#3D3C45] transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Info className="h-5 w-5" />
                      <span>Wie funktioniert der Rechner?</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent 
                    sideOffset={5}
                    className="bg-[#2D2C35] text-white border border-gray-600 rounded-lg px-4 py-2 max-w-xs shadow-lg text-base"
                  >
                    <div className="space-y-2">
                      <p className="text-[#F25A75]">So verwendest du den ROI-Rechner:</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>Gib das geplante Jahresgehalt für die Position ein</li>
                        <li>Wähle den Wertschöpfungsfaktor (wie viel Mehrwert generiert die Position)</li>
                        <li>Passe eure durchschnittliche Einstellungszeit an</li>
                        <li>Schätze eure interne Entscheidungszeit nach Profilerhalt</li>
                      </ol>
                      <p className="text-gray-300">Der Rechner zeigt dir dann den geschätzten ROI basierend auf der Zeitersparnis und dem gewählten Modell.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <Card className="w-full max-w-3xl mx-auto bg-[#1D1C25] text-white border-2 border-gray-200 rounded-xl overflow-hidden relative">
            <CardHeader className="pt-6 sm:pt-8">
              <h2 className="font-platform text-2xl sm:text-3xl font-medium text-white text-center">ROI-Rechner</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="salary" className="text-lg text-white">Jahresgehalt des Mitarbeiters (€)</Label>
                <Input
                  id="salary"
                  type="number"
                  value={salary}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSalary(value === '' ? '' : Number(value));
                  }}
                  className="mt-1 bg-[#121118] text-white border-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-lg placeholder:text-lg text-lg"
                  placeholder="Jahresgehalt eingeben"
                />
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Label htmlFor="valueFactor" className="text-lg text-white mr-2">Wertschöpfungsfaktor</Label>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="cursor-pointer focus:outline-none"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Info className="h-4 w-4 text-gray-400" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent 
                        sideOffset={5} 
                        className="bg-[#2D2C35] text-white border border-gray-600 rounded-lg px-4 py-2 max-w-xs shadow-lg"
                      >
                        <p className="text-base">Die durchschnittliche Wertschöpfung eines IT-Mitarbeiters liegt zwischen 2 und 2,5 und kann je nach Unternehmen deutlich höher sein.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {valueFactorOptions.map((option) => (
                    <Button
                      key={option}
                      variant={valueFactor === option ? "default" : "outline"}
                      onClick={() => {
                        setValueFactor(option);
                        setConfirmedValueFactor(option);
                        setCustomValueFactor(false);
                      }}
                      className={`px-3 py-1 text-base ${valueFactor === option ? 'bg-[#F25A75] text-white' : 'bg-[#1D1C25] text-white border-gray-400 hover:bg-[#2D2C35] hover:text-white'}`}
                    >
                      {option}x
                    </Button>
                  ))}
                  <Button
                    variant={customValueFactor ? "default" : "outline"}
                    onClick={() => {
                      setCustomValueFactor(true);
                      setValueFactor('');
                      setConfirmedValueFactor('');
                    }}
                    className={`px-3 py-1 text-base ${customValueFactor ? 'bg-[#F25A75] text-white' : 'bg-[#1D1C25] text-white border-gray-400 hover:bg-[#2D2C35] hover:text-white'}`}
                  >
                    Andere
                  </Button>
                </div>
                {customValueFactor && (
                  <div>
                    {valueFactor === '' || valueFactor !== confirmedValueFactor ? (
                      <div className="flex items-center">
                        <Input
                          id="valueFactor"
                          type="number"
                          value={valueFactor}
                          onChange={(e) => {
                            const value = e.target.value;
                            setValueFactor(value === '' ? '' : Number(value));
                          }}
                          min={1.5}
                          max={10}
                          step={0.1}
                          className="mt-1 bg-[#121118] text-lg text-white border-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            let value = Number(valueFactor);
                            if (value < 1.5) {
                              value = 1.5;
                            } else if (value > 10) {
                              value = 10;
                            }
                            setConfirmedValueFactor(value);
                            setValueFactor(value);
                          }}
                          className="text-gray-400 hover:text-white ml-2"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="text-xl font-semibold text-white mt-1">
                        {confirmedValueFactor}x
                      </p>
                    )}
                  </div>
                )}
                <p className="text-base text-gray-400 mt-1">Erlaubter Bereich: 1,5 - 10</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Label htmlFor="usualHiringTime" className="text-lg text-white mr-2">Eure durchschnittliche Einstellungszeit</Label>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="cursor-pointer focus:outline-none"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Info className="h-4 w-4 text-gray-400" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent 
                          sideOffset={5}
                          className="bg-[#2D2C35] text-white border border-gray-600 rounded-lg px-4 py-2 max-w-xs shadow-lg"
                        >
                          <p className="text-base">Die durchschnittliche Einstellungszeit in der IT-Branche beträgt 121 Tage.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingHiringTime(!isEditingHiringTime)}
                    className="text-gray-400 hover:text-white"
                  >
                    {isEditingHiringTime ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                  </Button>
                </div>
                {isEditingHiringTime ? (
                  <Input
                    id="usualHiringTime"
                    type="number"
                    value={usualHiringTime}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        setUsualHiringTime('');
                      } else {
                        const numValue = Number(value);
                        setUsualHiringTime(Math.min(364, numValue));
                      }
                    }}
                    max={364}
                    className="mt-1 bg-[#121118] text-white border-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-lg text-lg"
                    placeholder="Anstellungsdauer eingeben"
                  />
                ) : (
                  <p className="text-xl font-semibold text-white mt-1">
                    {typeof usualHiringTime === 'string' ? '0' : usualHiringTime} Tage
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="hiringTimeAfterCandidate" className="text-lg text-white">
                  Eure Entscheidungszeit nach Profilerhalt
                </Label>
                <SliderPrimitive.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  defaultValue={[hiringTimeAfterCandidate]}
                  value={[hiringTimeAfterCandidate]}
                  onValueChange={(value) => setHiringTimeAfterCandidate(value[0])}
                  max={30}
                  min={1}
                  step={1}
                >
                  <SliderPrimitive.Track className="bg-gray-400 relative grow rounded-full h-2">
                    <SliderPrimitive.Range className="absolute bg-[#F25A75] rounded-full h-full" />
                  </SliderPrimitive.Track>
                  <SliderPrimitive.Thumb className="block w-5 h-5 bg-[#F25A75] rounded-full focus:outline-none focus-visible:ring focus-visible:ring-[#F25A75] focus-visible:ring-opacity-75" />
                </SliderPrimitive.Root>
                <div className="flex justify-between text-base mt-1 text-gray-300">
                  <span>1 Tag</span>
                  <span>14 Tage</span>
                  <span>30 Tage</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center">
                <p className="text-xl font-semibold text-white">Geschätzter ROI:</p>
                {isNegativeRoi ? (
                  <div>
                    <motion.p
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F25A75]"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      0 €
                    </motion.p>
                    <p className="text-base sm:text-lg text-[#F25A75] mt-2 max-w-2xl mx-auto">
                      Mit deinen eingegebenen Werten könnte sich eine direkte Einstellung ohne externe Unterstützung als wirtschaftlicher erweisen. Bedenk dabei, dass der Rechner nicht alle Faktoren wie Kandidatenqualität, deinen eigenen Zeitaufwand oder Opportunitätskosten einbezieht.
                    </p>
                  </div>
                ) : (
                  <motion.p
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F25A75]"
                    key={roi}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {roi.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </motion.p>
                )}
                <p className="text-base sm:text-lg text-gray-400 mt-2">
                  Zeitersparnis: {Number(usualHiringTime) - (hiringTimeAfterCandidate + 7)} Tage
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </TooltipProvider>
    </div>
  )
}
