import AboutSectionHeading from "@/components/about-section-heading";
import AboutValueCards from "@/components/about-value-cards";
import LegacyShowcase from "@/components/legacy-showcase";
import { aboutPeopleIntro, teamMembers } from "@/lib/team-data";

export default function About() {
  return (
    <>
      <section
        id="about"
        className="overflow-x-clip border-t border-white/10 bg-background pt-20 md:pt-28"
      >
        <AboutSectionHeading
          title="Legacy Leaders"
          description={aboutPeopleIntro}
          descriptionClassName="max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl lg:max-w-2xl lg:text-2xl"
        />

        <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-8">
          <LegacyShowcase
            members={teamMembers.slice(0, 2)}
            showReadMore
          />
        </div>
      </section>

      <section className="bg-background pb-20 md:pb-28">
        <AboutSectionHeading
          title="Our Purpose"
          description="The principles that guide how we protect, grow, and diversify client wealth—across generations of trusted service."
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AboutValueCards />
        </div>
      </section>
    </>
  );
}
