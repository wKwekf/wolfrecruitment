import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über Uns | Wolf Digital Recruiting',
  description: 'Lernen Sie das Team hinter Wolf Digital Recruiting kennen. Wir sind Experten für die Vermittlung von AI-Spezialisten.',
  alternates: {
    canonical: 'https://wolfdigitalrecruiting.de/ueber-uns'
  },
  openGraph: {
    title: 'Über Uns | Wolf Digital Recruiting',
    description: 'Lernen Sie das Team hinter Wolf Digital Recruiting kennen. Wir sind Experten für die Vermittlung von AI-Spezialisten.',
    url: 'https://wolfdigitalrecruiting.de/ueber-uns',
    siteName: 'Wolf Digital Recruiting',
    locale: 'de_DE',
    type: 'website',
  },
}

const teamMembers = [
  {
    name: 'Wolf-Daniel Gonzalez Garcia',
    role: 'Geschäftsführer',
    image: '/photos/profilepics/Profilbild_Buro_Daniel.png',
    linkedin: 'https://www.linkedin.com/in/wolfdanielgonzalezgarcia/'
  },
  {
    name: 'Stefan Ruf',
    role: 'Recruiter',
    image: '/photos/profilepics/Profilbild_Buro_Stefan.png',
    linkedin: 'https://www.linkedin.com/in/stefanruf-recruitment/'
  },
  {
    name: 'Vitus Meixl',
    role: 'Recruiter',
    image: '/photos/profilepics/Profilbild_Buro_Vitus.png',
    linkedin: 'https://www.linkedin.com/in/vitus-meixl/'
  },
  {
    name: 'Lilly Ostendorf',
    role: 'Marketing',
    image: '/photos/profilepics/Profilbild_Buro_Lilly.png',
    linkedin: 'https://www.linkedin.com/in/lilly-ostendorf-618327252/'
  },
]

export default function UberUnsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#121118]">
        <section className="max-w-custom mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-16">
            <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-6">
              Über Uns
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Wir sind Experten für die Vermittlung von AI-Spezialisten und helfen Unternehmen dabei, 
              die richtigen Talente für ihre AI-Projekte zu finden.
            </p>
          </div>
          

          {/* Story Section */}
          <div className="max-w-3xl mx-auto mb-24">
            <div className="prose prose-lg prose-invert mx-auto">
              <p className="text-gray-300 mb-6">
                Die Geschichte von Wolf begann mit einer klaren Überzeugung: 
                Recruiting muss auf Transparenz und Ehrlichkeit basieren. Mit der Gründung der wolfrecruitment GmbH 
                im September 2023 haben wir diese Vision in die Realität umgesetzt – mit einem einzigartigen Fokus 
                auf Spezialisierung und Regionalität.
              </p>
              <p className="text-gray-300 mb-6">
                Als einziger deutschsprachiger Recruiter haben wir uns ausschließlich auf den Bereich AI spezialisiert. 
                Diese Entscheidung trafen wir aus einer klaren Erkenntnis heraus: Schon vor Jahren war absehbar, dass 
                AI die größte Innovationswelle der vergangenen Jahrzehnte prägen wird. Unsere Mission ist es, jeder 
                Firma zu ermöglichen, die Arbeitskräfte zu bekommen, die sie für diese AI-Transformation benötigt.
              </p>
              <p className="text-gray-300">
                Heute leben wir diese Werte gemeinsam mit unseren Kunden und Kandidaten. Unser Erfolg basiert auf 
                der Kombination aus extremer Spezialisierung, tiefem Verständnis der AI-Branche und dem Aufbau 
                ehrlicher, transparenter Beziehungen. Wir sind überzeugt: Nur durch diese Verbindung von Expertise 
                und Integrität können wir unseren Kunden helfen, die Herausforderungen der AI-Transformation erfolgreich 
                zu meistern.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-medium text-center mb-12">
              Unser Team
            </h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {teamMembers.map((member) => (
                <div 
                  key={member.name}
                  className="text-center flex flex-col items-center"
                >
                  <div className="w-full max-w-[240px] mx-auto mb-6">
                    <div className="aspect-square relative rounded-2xl overflow-hidden bg-white">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center max-w-[240px]">
                    <h3 className="text-white text-xl leading-tight">{member.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-gray-400">{member.role}</span>
                      <Link 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-6 h-6 text-white"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 