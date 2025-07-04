'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Mail, ArrowLeft } from "lucide-react";

interface CustomerCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCustomerSelect: () => void;
}

export function CustomerCandidateDialog({
  open,
  onOpenChange,
  onCustomerSelect,
}: CustomerCandidateDialogProps) {
  const [showCandidateInfo, setShowCandidateInfo] = useState(false);

  const handleCandidateClick = () => {
    setShowCandidateInfo(true);
  };

  const handleBack = () => {
    setShowCandidateInfo(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setShowCandidateInfo(false);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#1a1923] border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            {showCandidateInfo ? 'Für Kandidaten' : 'Wie können wir dir helfen?'}
          </DialogTitle>
          {!showCandidateInfo && (
            <DialogDescription className="text-center text-base mt-2 text-gray-400">
              Bitte wähle aus, ob du Kunde oder Kandidat werden möchtest
            </DialogDescription>
          )}
        </DialogHeader>
        
        {!showCandidateInfo ? (
          <div className="grid gap-4 py-6">
            <Button
              onClick={onCustomerSelect}
              className="h-auto p-6 justify-start gap-4 bg-[#F25A75] hover:bg-[#F25A75]/90 text-white border-none"
            >
              <Briefcase className="h-8 w-8 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-lg">Ich möchte Kunde werden</div>
                <div className="text-sm text-white/80 mt-1">
                  Erfahre, wie Wolf dir beim Recruiting helfen kann
                </div>
              </div>
            </Button>
            
            <Button
              onClick={handleCandidateClick}
              variant="outline"
              className="h-auto p-6 justify-start gap-4 w-full bg-transparent border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-white"
            >
              <Users className="h-8 w-8 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-lg">Ich bin Kandidat</div>
                <div className="text-sm text-gray-400 mt-1">
                  Möchtest du dich als Kandidat bewerben?
                </div>
              </div>
            </Button>
          </div>
        ) : (
          <div className="py-6">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-[#F25A75] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300 mb-3">
                    Vielen Dank für dein Interesse an Wolf! Als spezialisierte Tech-Recruiting Plattform arbeiten wir ausschließlich im Auftrag unserer Kunden.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Wenn du dich als Kandidat bei uns bewerben möchtest, sende bitte deine Unterlagen an:
                  </p>
                  <a 
                    href="mailto:hello@wolfai.de" 
                    className="text-[#F25A75] text-lg font-medium hover:underline inline-flex items-center gap-2"
                  >
                    hello@wolfai.de
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>
              <Button
                onClick={() => handleClose(false)}
                className="bg-[#F25A75] hover:bg-[#F25A75]/90 text-white"
              >
                Verstanden
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}