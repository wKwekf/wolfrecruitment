import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import HeroSection from '@/app/components/sections/HeroSection'
import SecondSection from '@/app/components/sections/SecondSection'
import ThirdSection from '@/app/components/sections/ThirdSection'
import CaseStudiesSection from '@/app/components/sections/CaseStudiesSection'
import TestimonialSection from '@/app/components/sections/TestimonialSection'
import FAQSection from '@/app/components/sections/FAQSection'
import TeamSection from '@/app/components/sections/TeamSection'
// TestAnimationSection temporär auskommentiert
// import TestAnimationSection from '@/app/components/sections/TestAnimationSection'

export default function Home() {
  return (
    <>
      <Header />
        <main>
          <HeroSection />
          <SecondSection />
          <ThirdSection />
          {/* TestAnimationSection temporär auskommentiert */}
          {/* <TestAnimationSection /> */}
          <CaseStudiesSection />
          <TeamSection />
          <TestimonialSection />
          <FAQSection />
        </main>
      <Footer />
    </>
  )
}
