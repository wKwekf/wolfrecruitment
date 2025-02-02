export const metadata = {
  title: 'ROI Calculator | WolfAI',
  description: 'Berechnen Sie den ROI Ihrer AI-Recruiting Investition',
  openGraph: {
    title: 'ROI Calculator | WolfAI',
    description: 'Berechnen Sie den ROI Ihrer AI-Recruiting Investition',
    url: 'https://wolfai.de/resources/roi-calculator',
    images: [
      {
        url: '/roi-calculator-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'WolfAI ROI Calculator',
      },
    ],
  },
}

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 