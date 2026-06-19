export type TeamMember = {
  name: string;
  image: string;
  bio: string[];
  badge?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Amritlal Devji Haria",
    image: "/Amritlal-Haria-DJayP5gp.jpg",
    bio: [
      "Our journey began with Late Shri Amritlal Devji Haria. Being a graduate, he joined LIC right from its inception. Over the decades, he dedicated his entire career to serving people through insurance, retiring as a Development Officer and later continuing as an agent.",
      "His unwavering commitment touched the lives of thousands of clients, laying a strong foundation for the generations to come.",
    ],
  },
  {
    name: "Anil Amritlal Haria",
    image: "/Anil-Haria-_negvWXL.jpg",
    bio: [
      "Carrying this legacy forward, Mr. Anil Amritlal Haria embraced entrepreneurship early on. After beginning his career in the textile business, he chose to dedicate himself fully to the insurance profession to honor his father's vision.",
      "He expanded the family business beyond life insurance into health insurance and broader financial solutions, ensuring that our services evolved with the needs of our clients.",
    ],
  },
  {
    name: "Rohan Haria",
    image: "/Rohan-Haria-D4_UJO8b.jpg",
    badge: "Chartered Accountant",
    bio: [
      "A Chartered Accountant with 6 years of specialized experience in the financial services sector, having worked with two of India's most respected firms. During this time, he has developed deep expertise in auditing leading financial institutions, with a particular focus on mutual fund audits.",
      "This experience gave more than just technical knowledge—it provided a rare, behind-the-scenes understanding of how the investment ecosystem truly operates. From regulatory compliance to operational excellence, he has seen firsthand what it takes to protect and grow investor wealth.",
      "Today, he combines this professional insight with a client-first approach, offering advice that is transparent, precise, and driven by integrity.",
    ],
  },
  {
    name: "Raj Haria",
    image: "/Raj-Haria-7cM3NeO4.jpg",
    badge: "MBA – NMIMS",
    bio: [
      "Raj Haria, an MBA graduate from NMIMS, has been carrying forward his grandfather's legacy. Since 2015, he has expanded into mutual fund business while building strong expertise in life and general insurance.",
      "With a focus on trust and long-term growth, he helps clients achieve their financial goals one after the other.",
    ],
  },
  {
    name: "Meet Savla",
    image: "/Meet-Savla1-c1GMECJ0.jpeg",
    badge: "Technical Specialist",
    bio: [
      "Since 2017, he has been actively engaged in the financial markets, with a strong focus on technical analysis. His approach blends data-driven insights with hands-on market experience, enabling him to identify opportunities, manage risk effectively, and navigate dynamic market conditions with discipline.",
    ],
  },
];

export const aboutPeopleIntro =
  "From insurance pioneers to modern wealth advisors, each generation has strengthened our commitment to protecting and growing client wealth.";

export const aboutCompanyParagraphs = [
  "Haria Investments was established in 1957 when Late Shri Amritlal Devji Haria dedicated himself to serving families through insurance—building a practice founded on trust, integrity, and personal care.",
  "The firm was created to help people protect what matters most and secure their financial future through honest, dependable guidance.",
  "Over three generations, that purpose has grown into a full spectrum of insurance and wealth solutions—and today, more than 1,500 clients rely on Haria Investments for planning they can trust.",
] as const;
