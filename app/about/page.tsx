import type { Metadata } from "next";
import About from "@/components/about";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "About Us | Haria Investments",
  description:
    "Our story spans three generations—from LIC pioneer Amritlal Devji Haria to today's wealth and protection advisors. Trusted by 1500+ clients since 1957.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <About />
    </>
  );
}
