'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Was ist euer Preismodell?",
    answer: "Wir bieten zwei flexible Modelle an: AI-Talent Flex mit 30% vom Bruttojahresgehalt als Einmalzahlung bei erfolgreicher Vermittlung, und AI-Talent Alliance mit 26% vom Bruttojahresgehalt. Bei Alliance leisten Sie eine Anzahlung von 2.990€ bei Projektstart, der Rest wird bei erfolgreicher Vermittlung fällig. Die Alliance-Option bietet zusätzliche Vorteile wie eine 7-Tage-Garantie für erste Kandidatenvorstellung und priorisierten Zugriff auf unser Netzwerk."
  },
  {
    question: "Kann ich zwischen den Preismodellen wechseln?",
    answer: "Bei einer neuen Position kannst du frei zwischen beiden Modellen wählen. Während der Besetzung einer Position ist ein Wechsel von Flex zu Alliance möglich - andersherum jedoch nicht. Das bedeutet, wenn du mit Flex startest und die Vorteile des Alliance-Modells nutzen möchtest, können wir das für dich anpassen. Die bereits geleisteten Zahlungen werden dabei berücksichtigt."
  },
  {
    question: "Warum ist das Alliance-Modell günstiger als Flex?",
    answer: "Das Alliance-Modell basiert auf einer engeren Partnerschaft mit klarem Commitment von beiden Seiten. Die initiale Anzahlung von 2.990€ ermöglicht es uns, von Anfang an mehr Ressourcen für deine Suche einzusetzen. Unsere Erfahrung zeigt, dass Recruiting-Prozesse deutlich erfolgreicher verlaufen, wenn beide Parteien von Anfang an verbindlich zusammenarbeiten. Diese Effizienzvorteile geben wir in Form eines reduzierten Gesamtpreises und zusätzlicher Premium-Services an unsere Alliance-Partner weiter."
  },
  {
    question: "Wie findet ihr die passenden AI-Experten für uns?",
    answer: "Unsere Stärke liegt in der Kombination aus regionaler und technischer Spezialisierung: Jeder unserer Recruiter ist Experte für seinen lokalen Markt und gleichzeitig vollständig auf AI-Recruiting spezialisiert. Diese doppelte Fokussierung - sowohl geografisch als auch technologisch - ermöglicht es uns, die AI-Landschaft in jeder Region genau zu kennen und die wirklich passenden Experten für eure spezifischen Anforderungen zu identifizieren. Durch den kontinuierlichen Austausch mit Kandidaten und Unternehmen bauen wir unser Netzwerk stetig aus und bleiben nah am Puls der AI-Entwicklung."
  },
  {
    question: "Wie lange dauert es, bis wir erste Kandidaten sehen?",
    answer: "Durch unser aktives Netzwerk von über 1000 AI-Experten können wir meist innerhalb von 7 Tagen erste passende Kandidaten präsentieren. Da wir die Qualifikationen und Verfügbarkeiten in unserem Netzwerk bereits kennen, sind wir besonders schnell."
  },
  {
    question: "Welche AI-Positionen könnt ihr besetzen?",
    answer: "Wir decken das gesamte Spektrum ab: ML Engineers, Data Scientists, AI Researchers, AI-Architekten und Technical Leads. Unsere Expertise liegt besonders in der Vermittlung von Experten für Machine Learning, Deep Learning, Natural Language Processing und Computer Vision."
  },
  {
    question: "Wie stellt ihr die Qualität der Kandidaten sicher?",
    answer: "Als Google-zertifizierte ML-Engineers können wir die technischen Fähigkeiten direkt und fundiert evaluieren. Wir führen detaillierte technische Gespräche und nutzen unsere Praxiserfahrung, um die tatsächliche Expertise in verschiedenen AI-Technologien und Frameworks zu bewerten."
  },
  {
    question: "Wie unterstützt ihr beim Onboarding?",
    answer: "Wir begleiten den gesamten Integrationsprozess - von der Vertragsgestaltung bis zu den ersten Monaten der Zusammenarbeit. Mit regelmäßigen Check-ins stellen wir sicher, dass sowohl ihr als auch der neue Mitarbeiter optimal unterstützt werdet."
  },
  {
    question: "Arbeitet ihr auch mit Start-ups zusammen?",
    answer: "Ja, wir unterstützen Unternehmen jeder Größe. Für Start-ups und Scale-ups bieten wir speziell angepasste Lösungen, die eure spezifischen Anforderungen und Budgets berücksichtigen. Unsere Erfahrung zeigt, dass gerade innovative Start-ups oft besonders interessant für Top-AI-Talente sind."
  },
  {
    question: "Wie geht ihr mit der Flut an unqualifizierten AI-Bewerbungen um?",
    answer: "Der AI-Boom führt zu einer Vielzahl von Bewerbungen von Kandidaten, die nicht über die erforderliche Expertise verfügen. Als ML-Engineers können wir präzise zwischen echten AI-Experten und Quereinsteigern unterscheiden. Unser technischer Hintergrund ermöglicht es uns, die tatsächlichen Fähigkeiten der Kandidaten genau zu evaluieren und nur Top-Performer mit nachgewiesener AI-Expertise vorzustellen."
  },
  {
    question: "Beratet ihr auch bei der Gestaltung von AI-Teams?",
    answer: "Ja, basierend auf unserer Erfahrung aus über 750 Tech-Vermittlungen unterstützen wir euch bei der strategischen Aufstellung eurer AI-Teams. Wir helfen bei der Definition von Rollen, Teamstrukturen und Entwicklungspfaden."
  },
  {
    question: "Wie stellt ihr sicher, dass die Experten langfristig bei uns bleiben?",
    answer: "Wir legen besonderen Wert auf Cultural Fit und die langfristigen Karriereziele der Kandidaten. Durch unsere gründliche Analyse eurer Unternehmenskultur und der Entwicklungsmöglichkeiten können wir eine nachhaltige Passung sicherstellen."
  },
  {
    question: "Vermittelt ihr auch internationale AI-Experten?",
    answer: "Ja, wir haben Erfahrung in der Vermittlung internationaler Talente und unterstützen bei Visa-Angelegenheiten, Relocation und kultureller Integration. Unser Netzwerk erstreckt sich über ganz Europa und darüber hinaus."
  },
  {
    question: "Wie läuft die erste Kontaktaufnahme ab?",
    answer: "Nach einem unverbindlichen Erstgespräch, in dem wir eure spezifischen Anforderungen und Ziele kennenlernen, erstellen wir ein maßgeschneidertes Konzept. Innerhalb weniger Tage präsentieren wir euch erste passende Profile und begleiten euch durch den gesamten Prozess bis zur erfolgreichen Einstellung."
  }
]

const MotionAccordionItem = motion(AccordionItem)

export default function FAQSection() {
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midPoint);
  const rightColumnFaqs = faqs.slice(midPoint);

  return (
    <section id="faq" className="bg-[#121118] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium mb-8 sm:mb-12 text-center text-white">
          Häufig gestellte Fragen
        </h1>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <Accordion type="single" collapsible className="w-full md:w-1/2 max-w-xl">
            {leftColumnFaqs.map((faq, index) => (
              <MotionAccordionItem
                key={index}
                value={`item-left-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionTrigger className="font-sans text-lg text-left text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white">
                  {faq.answer}
                </AccordionContent>
              </MotionAccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full md:w-1/2 max-w-xl">
            {rightColumnFaqs.map((faq, index) => (
              <MotionAccordionItem
                key={index}
                value={`item-right-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + midPoint) * 0.1 }}
              >
                <AccordionTrigger className="font-sans text-lg text-left text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white">
                  {faq.answer}
                </AccordionContent>
              </MotionAccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
