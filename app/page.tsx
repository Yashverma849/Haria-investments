import { AboutLeaders, AboutPurpose } from "@/components/about";
// import CommitmentSection from "@/components/commitment-section";
import JourneyCtaSection from "@/components/journey-cta-section";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import ProcessSection from "@/components/process-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import ValuesSection from "@/components/values-section";

export default function Home() {
  return (
    <main className="w-full max-w-full overflow-x-clip">
      <Navbar />
      <HeroSection />
      <AboutPurpose />
      <ServicesSection />
      <AboutLeaders />
      <ValuesSection />
      <ProcessSection />
      {/* <CommitmentSection /> */}
      <TestimonialsSection />
      <JourneyCtaSection />
    </main>
  );
}
