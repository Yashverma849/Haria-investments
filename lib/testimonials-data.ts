export type Testimonial = {
  id: string;
  name: string;
  role: string;
  initials: string;
  quote: string;
  date: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Mehta",
    role: "Business Owner, Mumbai",
    initials: "PM",
    quote:
      "Haria Investments helped us structure life insurance and mutual fund SIPs for our entire family. Their advice is clear, honest, and always in our best interest.",
    date: "JAN 14, 2025",
  },
  {
    id: "2",
    name: "Rajesh Shah",
    role: "Chartered Accountant",
    initials: "RS",
    quote:
      "I've referred many clients to the Haria team. Their depth across insurance and investments, built over decades, is rare to find under one roof.",
    date: "DEC 03, 2024",
  },
  {
    id: "3",
    name: "Ananya Desai",
    role: "IT Professional",
    initials: "AD",
    quote:
      "From my first SIP to planning for my daughter's education, they have been patient guides. I never feel pushed into products I don't need.",
    date: "NOV 22, 2024",
  },
  {
    id: "4",
    name: "Ketan Kothari",
    role: "Retail Entrepreneur",
    initials: "KK",
    quote:
      "General insurance for my business and health cover for my team—everything was handled smoothly. Responsive service and genuine follow-through.",
    date: "OCT 08, 2024",
  },
  {
    id: "5",
    name: "Sneha Patel",
    role: "Doctor",
    initials: "SP",
    quote:
      "As a busy professional, I needed someone I could trust completely. Haria Investments simplified my portfolio and keeps me on track with annual reviews.",
    date: "SEP 17, 2024",
  },
  {
    id: "6",
    name: "Vikram Joshi",
    role: "Engineer",
    initials: "VJ",
    quote:
      "Transparent fee structure, no hidden agendas. They explained every investment option in plain language before I committed a single rupee.",
    date: "AUG 29, 2024",
  },
  {
    id: "7",
    name: "Meera Nair",
    role: "Teacher",
    initials: "MN",
    quote:
      "Three generations of my family have worked with Haria. That kind of trust doesn't happen overnight—it is earned through consistent service.",
    date: "JUL 11, 2024",
  },
  {
    id: "8",
    name: "Arjun Bhatt",
    role: "Startup Founder",
    initials: "AB",
    quote:
      "Equity and mutual fund guidance that actually matches my risk appetite. They helped me diversify without overcomplicating my finances.",
    date: "JUN 05, 2024",
  },
];

export const testimonialColumnA = testimonials.filter((_, index) => index % 2 === 0);
export const testimonialColumnB = testimonials.filter((_, index) => index % 2 === 1);
