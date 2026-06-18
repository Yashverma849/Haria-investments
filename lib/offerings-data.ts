export type OfferingItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
};

export const offerings: OfferingItem[] = [
  {
    id: "insurance",
    title: "Insurance & Protection",
    subtitle: "Insurance & Protection Services",
    description:
      "Struggling to find the right protection for your loved ones? You're not alone. Our insurance solutions make safeguarding your family's future simpler, clearer, anywhere.",
    href: "/insurance",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    id: "wealth",
    title: "Wealth Management",
    subtitle: "Wealth Management Services",
    description:
      "We help you build, grow, and protect your wealth through comprehensive portfolio solutions. From strategic asset allocation to tax optimization, we provide data-driven strategies you can trust.",
    href: "/investment",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
];
