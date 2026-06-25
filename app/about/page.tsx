import type { Metadata } from "next";
import AboutCompanyIntro from "@/components/about-company-intro";
import AboutSectionHeading from "@/components/about-section-heading";
import AboutStackScroll from "@/components/about-stack-scroll";
import LegacyShowcase from "@/components/legacy-showcase";
import { aboutPeopleIntro, teamMembers } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "About | Haria Investments",
  description:
    "Meet the people behind Haria Investments — generations of trusted advisors dedicated to protecting and growing client wealth.",
};

export default function AboutPage() {
  return (
    <main className="bg-surface">
      <AboutStackScroll
        intro={<AboutCompanyIntro keepVisibleOnScroll />}
        legacy={
          <section className="bg-surface pb-20 pt-14 text-charcoal md:pb-28 md:pt-16">
            <div id="legacy-leaders" className="scroll-mt-24">
              <AboutSectionHeading
                title="Legacy Leaders"
                description={aboutPeopleIntro}
                descriptionClassName="text-fluid-lead max-w-xl xl:max-w-2xl"
                scrollReplay
                onSurface
              />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <LegacyShowcase members={teamMembers} scrollReplay onSurface />
            </div>
          </section>
        }
      />
    </main>
  );
}
