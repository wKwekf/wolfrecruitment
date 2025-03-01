import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

export default function AGBPage() {
  return (
    <>
      <Header />
      <main className="bg-white py-20 text-[#121118]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-platform text-5xl md:text-6xl font-medium mb-8 text-[#121118]">
            Allgemeine Geschäftsbedingungen
          </h1>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">§1 Dienstleistungsumfang</h2>
              <p>Die wolfrecruitment GmbH (im Folgenden "Wolf") bietet Personalvermittlungsdienstleistungen an, die die Bereitstellung von Kandidatenprofilen und Lebensläufen an Klienten umfassen. Diese Dienstleistungen erfolgen in Übereinstimmung mit möglicherweise im Rahmenvertrag festgelegten Bedingungen.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§2 Kandidatenvorstellung und -vermittlung</h2>
              <p>Ein Kandidat gilt als durch Wolf vorgestellt, wenn dem Klienten ausreichende Informationen zur Identifikation des Kandidaten übermittelt wurden. Ein Kandidat, der innerhalb von zwölf Monaten nach der Vorstellung eingestellt wird, gilt als durch Wolf vermittelt. Die Klienten sind verantwortlich für die Überprüfung der Eignung und Qualifikationen der vorgestellten Kandidaten.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§3 Honorarvereinbarung</h2>
              <p>Im Erfolgsfall, definiert als die Unterzeichnung eines Anstellungsvertrages mit einem von Wolf vorgestellten Kandidaten, entsteht eine Honorarverpflichtung seitens des Klienten. Der Klient hat die Wahl zwischen zwei Zahlungsoptionen:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>Mit Anzahlung:</strong> Gesamthonorar von 26% des Jahreszielgehalts des Kandidaten, aufgeteilt in:
                  <ul className="list-disc list-inside ml-8 mt-1">
                    <li>Anzahlung von 2.990€ bei Projektbeginn</li>
                    <li>Restzahlung bei erfolgreicher Anstellung</li>
                  </ul>
                </li>
                <li><strong>Ohne Anzahlung:</strong> Gesamthonorar von 30% des Jahreszielgehalts des Kandidaten, fällig bei erfolgreicher Anstellung.</li>
              </ul>
              <p className="mt-2">Bei beiden Optionen besteht die Möglichkeit einer Ratenzahlung über einen Zeitraum von bis zu 24 Monaten. Die genauen Konditionen werden im Einzelfall vereinbart.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§4 Zahlungsbedingungen</h2>
              <p>Die Zahlungsbedingungen variieren je nach gewählter Zahlungsoption:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>Mit Anzahlung:</strong> Die Zahlungen werden wie folgt fällig:
                  <ul className="list-disc list-inside ml-8 mt-1">
                    <li>Anzahlung von 2.990€: Bei Projektbeginn</li>
                    <li>Restzahlung (Differenz zu 26% des Jahresgehalts): Bei Unterzeichnung des Anstellungsvertrages</li>
                  </ul>
                </li>
                <li><strong>Ohne Anzahlung:</strong> Das Honorar (30% des Jahresgehalts) wird mit der Unterzeichnung des Anstellungsvertrages fällig. Die Zahlung ist innerhalb von 30 Tagen nach Rechnungsstellung zu leisten.</li>
              </ul>
              <p className="mt-2">Bei Vereinbarung einer Ratenzahlung werden die monatlichen Raten jeweils zum Monatsanfang fällig. Die erste Rate ist innerhalb von 30 Tagen nach Rechnungsstellung zu leisten.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§5 Kündigungsschutz und Rückzahlungsklausel</h2>
              <p>Für alle Vermittlungen gilt unser Kündigungsschutz wie folgt:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Bei einem "Non-Starter" (der Kandidat tritt die Stelle nicht an):
                  <ul className="list-disc list-inside ml-8 mt-1">
                    <li>Vollständige Rückerstattung des Honorars</li>
                    <li>Bei der Option mit Anzahlung: Vollständige Rückerstattung inklusive der Anzahlung</li>
                  </ul>
                </li>
                <li>Bei Kündigung während der Probezeit:
                  <ul className="list-disc list-inside ml-8 mt-1">
                    <li>Kostenlose Nachbesetzung des Kandidaten</li>
                  </ul>
                </li>
                <li>Bei Kündigung nach der Probezeit (gilt nur bei Ratenzahlung):
                  <ul className="list-disc list-inside ml-8 mt-1">
                    <li>Reduzierung der verbleibenden Raten um 50%</li>
                  </ul>
                </li>
              </ul>
              <p className="mt-2">Keine Rückzahlung oder Reduzierung erfolgt, wenn die Vertragsauflösung aus betrieblichen Gründen seitens des Auftraggebers erfolgt.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§6 Vertraulichkeit und Datenschutz</h2>
              <p>Beide Parteien verpflichten sich zur strengen Vertraulichkeit bezüglich aller im Rahmen der Geschäftsbeziehung erlangten Informationen. Der Umgang mit personenbezogenen Daten erfolgt im Einklang mit der Datenschutz-Grundverordnung (DSGVO).</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§7 Haftungsbeschränkung und Force Majeure</h2>
              <p>Wolf haftet nicht für indirekte Schäden oder entgangene Gewinne, es sei denn, diese beruhen auf vorsätzlichem oder grob fahrlässigem Verhalten seitens Wolf. Bei höherer Gewalt, die außerhalb des Einflussbereichs von Wolf liegt, wird die Leistungspflicht bis zum Wegfall der Störung ausgesetzt.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§8 Abschlussbestimmungen</h2>
              <p>Änderungen dieser Geschäftsbedingungen bedürfen der Schriftform. Mündliche Nebenabreden haben keine Gültigkeit. Sollte eine Bestimmung dieser AGBs unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt. Für Streitigkeiten aus diesem Vertragsverhältnis gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist der Sitz von Wolf.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}