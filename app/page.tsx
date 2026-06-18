import CommitmentSection from "@/components/commitment-section";
import HashScroll from "@/components/hash-scroll";
import JourneyCtaSection from "@/components/journey-cta-section";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import ProcessSection from "@/components/process-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import ValuesSection from "@/components/values-section";
import WhatWeOfferSection from "@/components/what-we-offer-section";

export default function Home() {
  return (
    <>
      <HashScroll />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ValuesSection />
      <WhatWeOfferSection />
      <ProcessSection />
      <CommitmentSection />
      <TestimonialsSection />
      <JourneyCtaSection />
    </>
  );
}
