// PricingSection.tsx - Server Component
import { PricingCalculator } from './PricingCalculator';

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#121118] py-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-platform text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight lg:leading-[68px] font-medium mb-4 sm:mb-6 text-white text-center">
          Transparente Preise, faire Partnerschaft
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-white text-center">
          4.990€ Starthonorar + 20% Erfolgshonorar. Mit Erfolgsgarantie.
        </p>
        
        {/* Client Component für interaktive Elemente */}
        <PricingCalculator />
      </div>
    </section>
  );
}