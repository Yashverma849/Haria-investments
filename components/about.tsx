import AboutSectionHeading from "@/components/about-section-heading";
import AboutValueCards from "@/components/about-value-cards";
import LegacyShowcase from "@/components/legacy-showcase";
import { aboutPeopleIntro, teamMembers } from "@/lib/team-data";

export function AboutPurpose() {
  return (
    <section
      id="about"
      className="overflow-x-clip border-t border-charcoal/10 bg-surface pt-20 text-charcoal md:pt-28"
    >
      <AboutSectionHeading
        title="Our Purpose"
        description="The principles that guide how we protect, grow, and diversify client wealth—across generations of trusted service."
        onSurface
      />

      <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-8">
        <AboutValueCards />
      </div>
    </section>
  );
}

export function AboutLeaders() {
  return (
    <section className="overflow-x-clip border-t border-charcoal/10 bg-surface pt-20 text-charcoal md:pt-28">
      <AboutSectionHeading
        title="Legacy Leaders"
        description={aboutPeopleIntro}
        descriptionClassName="text-fluid-lead max-w-xl xl:max-w-2xl"
        onSurface
      />

      <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-8">
        <LegacyShowcase
          members={teamMembers.slice(0, 2)}
          showReadMore
          onSurface
        />
      </div>
    </section>
  );
}
