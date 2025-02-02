import Footer from '../components/layout/Footer'
import LeadMagnetHeader from '../components/layout/lead-magnet/header'

export const metadata = {
  title: 'Resources | WolfAI',
  description: 'Kostenlose Ressourcen für AI-Recruiting',
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#121118] text-white">
      <LeadMagnetHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
