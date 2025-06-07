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
    question: "Wie funktioniert die Wolf Plattform?",
    answer: "Unsere Recruiter sourcen Kandidaten aus eigenen und öffentlichen Quellen. Dann führen unsere AI-Experten technische Interviews durch, bei denen sie deine vordefinierten Fragen stellen und Skills anhand spezieller Scorecards bewerten. Diese Interviews werden aufgezeichnet - 'See before you meet them'. Du erhältst Zugang zur Plattform mit allen Videos, Bewertungen und kannst deine Pipeline im Kanban-Board verwalten. Alles in einer integrierten Lösung."
  },
  {
    question: "Was kostet die Nutzung der Wolf Plattform?",
    answer: "Unser transparentes Preismodell: 4.990€ Starthonorar pro Position + 19% Erfolgshonorar bei Einstellung. Die ersten 7 Tage kannst du kostenlos testen. Besonders fair: Unsere Erfolgsgarantie - sollte es innerhalb von 90 Tagen zu keiner Einstellung kommen, verrechnen wir das Starthonorar mit den tatsächlichen Leistungen (135€/Stunde Kommunikation, 500€/Kandidat) und erstatten die Differenz."
  },
  {
    question: "Was sind Video-Interviews und wie laufen sie ab?",
    answer: "Unsere Experten führen strukturierte Interviews mit den Kandidaten durch, bei denen deine spezifischen Fragen gestellt werden. Diese werden aufgezeichnet, sodass du die Kandidaten sprechen siehst - 'See before you meet them'. Du definierst vorab technische und kulturelle Fragen sowie die zu prüfenden Skills. Die 8-10 minütigen Videos geben authentische Einblicke in Kommunikation und Fachkompetenz."
  },
  {
    question: "Wer führt die technischen Interviews und Bewertungen durch?",
    answer: "Zwei Expertenebenen: Alle unsere Recruiter sind Google Cloud zertifizierte ML-Engineers. Zusätzlich haben wir für technische Interviews echte AI-Practitioners, die täglich AI-Systeme bauen. Diese führen die technischen Interviews für dich durch - unser Anspruch ist es, dir diese aufwändige Arbeit komplett abzunehmen. Jede Bewertung erfolgt mit nachvollziehbaren Scorecards."
  },
  {
    question: "Wie schnell erhalten wir qualifizierte Kandidaten?",
    answer: "Unsere 7-Tage-Garantie ist kein leeres Versprechen: Von deinem Briefing bis zu den ersten Video-Interviews und Bewertungen vergehen maximal 7 Tage. Da wir einen aktiven Pool von AI-Experten pflegen und unsere Plattform den Prozess digitalisiert, sind wir 4-6x schneller als traditionelle Recruiter."
  },
  {
    question: "Welche AI-Rollen könnt ihr über die Plattform besetzen?",
    answer: "Die Plattform ist für alle AI-Positionen optimiert: ML Engineers, MLOps Engineers, AI Solution Architects, Data Scientists, AI Researchers, Computer Vision Engineers und NLP-Spezialisten. Unsere Bewertungskriterien sind rollenspezifisch angepasst - ein MLOps Engineer wird anders evaluiert als ein AI Researcher."
  },
  {
    question: "Wie stellt die Plattform die Qualität der Kandidaten sicher?",
    answer: "Dreifache Qualitätssicherung: 1) Nur vorqualifizierte Kandidaten aus unserem Netzwerk erhalten Zugang. 2) Video-Interviews zeigen echte Kommunikation und Problemlösungsfähigkeiten. 3) Technische Bewertung durch Fachexperten mit nachvollziehbaren Scorecards. Diese Kombination filtert unqualifizierte Bewerber effektiv aus."
  },
  {
    question: "Was passiert nach der 7-tägigen Testphase?",
    answer: "Nach der kostenlosen Testphase kannst du entscheiden: Bei Fortsetzung zahlst du das Starthonorar von 4.990€ und nutzt die Plattform für den kompletten Hiring-Prozess. Erst bei erfolgreicher Einstellung wird das Erfolgshonorar von 19% fällig. Unsere Erfolgsgarantie sichert dich ab: Keine Einstellung binnen 90 Tagen = Rückerstattung der Differenz zwischen Starthonorar und tatsächlichen Leistungen."
  },
  {
    question: "Kann ich die Plattform auch für mein bestehendes Team nutzen?",
    answer: "Ja! Viele Kunden nutzen Wolf auch für Team-Erweiterungen und Nachbesetzungen. Die Plattform speichert alle vergangenen Suchen, sodass du bei Bedarf schnell auf bewährte Kandidaten zurückgreifen kannst. Einige Teams haben eine 'Bench' von vorqualifizierten Kandidaten für zukünftige Projekte."
  },
  {
    question: "Wie geht die Plattform mit Datenschutz um?",
    answer: "Höchste Standards: Die Plattform ist DSGVO-konform, alle Daten werden in deutschen Rechenzentren gespeichert. Kandidaten stimmen der Video-Aufzeichnung explizit zu. Du kontrollierst, wer in deinem Team Zugang hat. Nach Abschluss des Prozesses können Daten auf Wunsch vollständig gelöscht werden."
  },
  {
    question: "Unterstützt die Plattform auch Remote-Hiring?",
    answer: "Perfekt dafür gemacht! Video-Interviews funktionieren ortsunabhängig, unsere Pipeline umfasst Kandidaten aus ganz DACH und Europa. Die Plattform zeigt Standort und Remote-Präferenzen jedes Kandidaten. Viele unserer erfolgreichsten Placements sind Remote-Positionen."
  },
  {
    question: "Was unterscheidet Wolf von anderen Recruiting-Plattformen?",
    answer: "Drei Kern-Unterschiede: 1) 100% AI-Fokus - keine Vermischung mit anderen Tech-Rollen. 2) Video-first statt CV-first - du siehst Menschen, nicht Papier. 3) Echte Fachexpertise - ML-Engineers bewerten ML-Engineers. Diese Kombination gibt es nur bei Wolf."
  },
  {
    question: "Kann ich mehrere Positionen gleichzeitig besetzen?",
    answer: "Absolut! Die Plattform ist für Skalierung gebaut. Du kannst multiple Pipelines parallel führen, verschiedene Rollen mit spezifischen Anforderungen definieren und dein Team kann kollaborativ bewerten. Viele Kunden bauen ihre kompletten AI-Teams über Wolf auf."
  },
  {
    question: "Wie läuft der Start mit der Wolf Plattform ab?",
    answer: "Simpel: 1) Kostenloses Erstgespräch (30 Min) zur Definition deiner Anforderungen. 2) Plattform-Zugang innerhalb von 24h. 3) Briefing der Kandidaten-Fragen. 4) Erste Video-Interviews nach max. 7 Tagen. Du kannst sofort loslegen - keine langen Implementierungen oder Trainings nötig."
  },
  {
    question: "Was ist die Erfolgsgarantie?",
    answer: "Unsere Erfolgsgarantie schützt deine Investition: Sollte es innerhalb von 90 Tagen zu keiner Einstellung kommen, verrechnen wir das Starthonorar (4.990€) mit den tatsächlich erbrachten Leistungen - 135€ pro Stunde Kommunikation und 500€ pro vorgestelltem Kandidaten. Die Differenz erstatten wir dir zurück. Nach 90 Tagen arbeiten wir auf Wunsch weiter, aber die Rückerstattungsoption ist auf diesen Zeitraum begrenzt."
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
