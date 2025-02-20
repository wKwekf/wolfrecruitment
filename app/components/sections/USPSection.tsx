'use client'

import { Check, X } from 'lucide-react'

interface ComparisonItem {
  feature: string;
  traditional: boolean;
  our: boolean;
  description?: string;
}

const comparisonItems: ComparisonItem[] = [
  {
    feature: 'Spezialisierung',
    traditional: false,
    our: true,
    description: '100% Fokus auf AI-Recruiting, keine Kompromisse'
  },
  {
    feature: 'Geschwindigkeit',
    traditional: false,
    our: true,
    description: 'Erste Kandidaten garantiert in 7 Tagen'
  },
  {
    feature: 'Netzwerk',
    traditional: false,
    our: true,
    description: 'Vorqualifizierter Kandidatenpool'
  }
];

export default function USPSection() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-platform text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-medium mb-6 text-[#121118]">
            Was uns von anderen<br />Recruitern unterscheidet
          </h2>
          <p className="text-xl text-[#121118]/80 max-w-3xl mx-auto">
            Mit der Kombination aus 100% AI-Fokus, technischer Expertise und unserem vorqualifizierten Kandidatenpool setzen wir neue Standards im Recruiting.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-3xl border border-[#121118] bg-[#121118] shadow-lg">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr className="bg-[#121118]">
                <th scope="col" className="py-6 px-8 text-left text-2xl font-semibold text-white">
                  Feature
                </th>
                <th scope="col" className="py-6 px-8 text-center text-2xl font-semibold text-white">
                  Andere<br />Recruiter
                </th>
                <th scope="col" className="py-6 px-8 text-center text-2xl font-semibold text-white">
                  Unser<br />Mehrwert
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {comparisonItems.map((item, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="py-6 px-8">
                    <div>
                      <div className="text-2xl md:text-3xl font-medium text-white">{item.feature}</div>
                      {item.description && (
                        <div className="mt-2 text-xl text-white/70">{item.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-6 px-8 text-center">
                    {item.traditional ? (
                      <Check className="h-8 w-8 text-green-400 mx-auto" />
                    ) : (
                      <X className="h-8 w-8 text-white/30 mx-auto" />
                    )}
                  </td>
                  <td className="py-6 px-8 text-center">
                    <Check className="h-8 w-8 text-green-400 mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
} 