import type { Metadata } from "next";
import Faq from "@/components/faq";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "FAQ | Haria Investments",
  description:
    "Answers to common questions about insurance, investments, consultations, and financial planning with Haria Investments.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <Faq />
    </>
  );
}
