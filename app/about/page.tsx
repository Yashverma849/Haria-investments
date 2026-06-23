import type { Metadata } from "next";
import AboutCompanyIntro from "@/components/about-company-intro";
import AboutSectionHeading from "@/components/about-section-heading";
import LegacyShowcase from "@/components/legacy-showcase";
import Navbar from "@/components/navbar";
import { aboutPeopleIntro, teamMembers } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "About | Haria Investments",
  description:
    "Meet the people behind Haria Investments — generations of trusted advisors dedicated to protecting and growing client wealth.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background pb-20 md:pb-28">
        <AboutCompanyIntro />

        <section className="border-t border-white/10 bg-background pt-20 md:pt-28">
          <div id="legacy-leaders" className="scroll-mt-24">
            <AboutSectionHeading
              title="Legacy Leaders"
              description={aboutPeopleIntro}
              descriptionClassName="text-fluid-lead max-w-xl text-cream/80 xl:max-w-2xl"
              scrollReplay
            />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <LegacyShowcase members={teamMembers} scrollReplay />
          </div>
        </section>
      </main>
    </>
  );
}
