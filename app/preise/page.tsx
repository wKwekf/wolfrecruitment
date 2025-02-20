import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import PricingSection from '@/app/components/sections/PricingSection'
import FAQSection from '@/app/components/sections/FAQSection'

export default function PreisePage() {
  return (
    <>
      <Header />
      <main>
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
} 