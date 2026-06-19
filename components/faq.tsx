import FaqGrid from "@/components/faq-grid";
import FaqHero from "@/components/faq-hero";
import { faqItems } from "@/lib/faq-data";

export default function Faq() {
  return (
    <main>
      <FaqHero />

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FaqGrid items={faqItems} />
        </div>
      </section>
    </main>
  );
}
