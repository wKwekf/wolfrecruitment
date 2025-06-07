import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="bg-white py-20 text-[#121118]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-platform text-5xl md:text-6xl font-medium mb-8 text-[#121118]">
            Impressum
          </h1>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-medium mb-4 text-[#121118]">Angaben gemäß § 5 TMG</h2>
              <p>wolfrecruitment GmbH</p>
              <p>Nördliche Münchner Str. 47</p>
              <p>82031 Grünwald</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4 text-[#121118]">Kontakt</h2>
              <p>E-Mail: <a href="mailto:hello@wolfai.de" className="text-blue-600 hover:underline">hello@wolfai.de</a></p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4 text-[#121118]">Vertreten durch</h2>
              <p>Geschäftsführer: Wolf-Daniel González García</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4 text-[#121118]">Eingetragen am</h2>
              <p>Amtsgericht München</p>
              <p>HRB 287498</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4 text-[#121118]">Umsatzsteuer-Identifikationsnummer</h2>
              <p>DE367766469</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4 text-[#121118]">Die Berufshaftpflichtversicherung wurde abgeschlossen bei</h2>
              <p>Hiscox SA, Arnulfstraße 31, 80636 München</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4 text-[#121118]">Geltungsbereich des Versicherungsschutzes</h2>
              <p>Tätigkeiten der Unternehmens- und Personalberatungsbranche</p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-medium mb-4 text-[#121118]">Hinweise zur Website</h2>
              <h3 className="text-xl font-medium mb-2 text-[#121118]">Information gemäß § 36 VSBG</h3>
              <p className="text-sm">
                Gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz – Gesetz über die alternative Streitbeilegung in Verbrauchersachen) erklärt der Betreiber dieser Website: Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}