import type { Metadata } from "next";
import ContactPageContent from "@/components/contact-page-content";

export const metadata: Metadata = {
  title: "Contact Us | Haria Investments",
  description:
    "Get in touch with Haria Investments for customized financial solutions in insurance, investments, and commodities.",
};

export default function ContactPage() {
  return (
    <main className="bg-surface min-h-screen">
      <ContactPageContent />
    </main>
  );
}
