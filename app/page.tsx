import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import HeroSection from '@/app/components/sections/HeroSection'
import SecondSection from '@/app/components/sections/SecondSection'
import ThirdSection from '@/app/components/sections/ThirdSection'
import VideoSection from '@/app/components/sections/VideoSection'
import TestimonialSection from '@/app/components/sections/TestimonialSection'
import FAQSection from '@/app/components/sections/FAQSection'

export default function Home() {
  return (
    <>
      <Header />
        <main>
          <HeroSection />
          <SecondSection />
          <ThirdSection />
          <VideoSection />
          <TestimonialSection />
          <FAQSection />
        </main>
      <Footer />
    </>
  )
}
