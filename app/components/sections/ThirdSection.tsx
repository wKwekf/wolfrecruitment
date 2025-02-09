'use client'

import { motion } from 'framer-motion'

const results = [
  {
    headline: "Schnell & zuverlässig",
    description: "In 94 % der Fälle liefern wir dir den ersten passenden Kandidaten in 7 Tagen.*"
  },
  {
    headline: "Überzeugende Qualität",
    description: "82 % unserer Kandidaten werden direkt ins Interview eingeladen.*"
  },
  {
    headline: "Exklusive Top-Talente",
    description: "Mehr als 1.100 AI-Experten für deine Projekte - handverlesen und wechselbereit."
  }
]

export default function ThirdSection() {
  return (
    <section id="results" className="bg-[#121118] text-white py-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium text-center mb-8 sm:mb-12"
        >
          Was du als Unternehmen erwarten kannst
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#302F3B] rounded-lg p-6 flex flex-col items-start text-left"
            >
              <span className="text-lg font-bold mb-2">{result.headline}</span>
              <p className="text-lg text-gray-300">{result.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-sm text-gray-400 space-y-2 px-4">
          <p>*Basierend auf unseren Vermittlungsdaten 2024 (30 von 32 Suchen) und Kundenfeedback.</p>
        
        </div>
      </div>
    </section>
  )
}