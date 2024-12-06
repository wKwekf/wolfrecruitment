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
              <p>Die wolfrecruitment GmbH (im Folgenden „Wolf") bietet Personalvermittlungsdienstleistungen an, die die Bereitstellung von Kandidatenprofilen und Lebensläufen an Klienten umfassen. Diese Dienstleistungen erfolgen in Übereinstimmung mit möglicherweise im Rahmenvertrag festgelegten Bedingungen.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§2 Kandidatenvorstellung und -vermittlung</h2>
              <p>Ein Kandidat gilt als durch Wolf vorgestellt, wenn dem Klienten ausreichende Informationen zur Identifikation des Kandidaten übermittelt wurden. Ein Kandidat, der innerhalb von zwölf Monaten nach der Vorstellung eingestellt wird, gilt als durch Wolf vermittelt. Die Klienten sind verantwortlich für die Überprüfung der Eignung und Qualifikationen der vorgestellten Kandidaten.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§3 Honorarvereinbarung</h2>
              <p>Im Erfolgsfall, definiert als die Unterzeichnung eines Anstellungsvertrages mit einem von Wolf vorgestellten Kandidaten, entsteht eine Honorarverpflichtung seitens des Klienten. Der Klient hat die Wahl zwischen zwei Preismodellen:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>AI-Talent Flex:</strong> Einmalzahlung in Höhe von 33% des Jahreszielgehalts des Kandidaten, fällig bei erfolgreicher Anstellung.</li>
                <li><strong>AI-Talent Alliance:</strong> Zahlung von 27% des Jahreszielgehalts des Kandidaten, aufgeteilt in drei Chargen:
                  <ul className="list-disc list-inside ml-8 mt-1">
                    <li>Erste Charge bei Projektbeginn</li>
                    <li>Zweite Charge bei ersten Interviews</li>
                    <li>Dritte Charge bei erfolgreicher Anstellung</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§4 Zahlungsbedingungen</h2>
              <p>Die Zahlungsbedingungen variieren je nach gewähltem Preismodell:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>AI-Talent Flex:</strong> Das Honorar wird mit der Unterzeichnung des Anstellungsvertrages fällig. Die Zahlung ist innerhalb von 30 Tagen nach Rechnungsstellung zu leisten.</li>
                <li><strong>AI-Talent Alliance:</strong> Die drei Chargen werden wie folgt fällig:
                  <ul className="list-disc list-inside ml-8 mt-1">
                    <li>Erste Charge: Bei Projektbeginn</li>
                    <li>Zweite Charge: Bei Durchführung der ersten Interviews</li>
                    <li>Dritte Charge: Bei Unterzeichnung des Anstellungsvertrages</li>
                  </ul>
                </li>
              </ul>
              <p className="mt-2">Jede Zahlung ist innerhalb von 30 Tagen nach Rechnungsstellung fällig.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">§5 Rückzahlungsklausel</h2>
              <p>Die Rückzahlungsklausel gilt für beide Preismodelle wie folgt:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Bei einem "Non-Starter" (der Kandidat tritt die Stelle nicht an):
                  <ul className="list-disc list-inside ml-8 mt-1">
                    <li>AI-Talent Flex: Vollständige Rückerstattung des Honorars</li>
                    <li>AI-Talent Alliance: Rückerstattung der dritten Charge</li>
                  </ul>
                </li>
              </ul>
              <p className="mt-2">Bei einer Vertragsauflösung innerhalb der Probezeit gilt folgende Staffelung:</p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Bei Vertragsauflösung im 1. Monat: 80% Rückzahlung der letzten Charge</li>
                <li>Im 2. Monat: 60% Rückzahlung der letzten Charge</li>
                <li>Im 3. Monat: 40% Rückzahlung der letzten Charge</li>
                <li>Im 4. Monat: 20% Rückzahlung der letzten Charge</li>
                <li>Ab dem 5. Monat: Keine Rückzahlung</li>
              </ul>
              <p className="mt-2">Keine Rückzahlung erfolgt, wenn die Vertragsauflösung aus betrieblichen Gründen seitens des Auftraggebers erfolgt.</p>
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