export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const quickLinks: FooterLink[] = [
  {
    label: "Motilal Oswal Demat Account",
    href: "https://www.motilaloswal.com/open-demat-account",
    external: true,
  },
  {
    label: "Motilal Oswal Login",
    href: "https://invest.motilaloswal.com/",
    external: true,
  },
  {
    label: "Mutual Fund Login",
    href: "https://www.mfcentral.com/",
    external: true,
  },
  {
    label: "Check MF KYC",
    href: "https://www.camsonline.com/Investors/Transactions/KYC-Status",
    external: true,
  },
  {
    label: "NSE India",
    href: "https://www.nseindia.com/",
    external: true,
  },
  {
    label: "BSE India",
    href: "https://www.bseindia.com/",
    external: true,
  },
];

export const serviceLinks: FooterLink[] = [
  { label: "Life Insurance", href: "/insurance/life" },
  { label: "General Insurance", href: "/insurance/general" },
  { label: "Mutual Funds", href: "/investment/mutual-funds" },
  { label: "Equity Trading", href: "/investment/equity" },
  { label: "Fixed Income", href: "/investment/fixed-income" },
  { label: "Commodity Trading", href: "/commodities/trading" },
  { label: "Gold & Silver", href: "/commodities/silver-gold" },
  { label: "Other Derivatives", href: "/commodities/derivation" },
  { label: "Financial Health Form", href: "/financial-health" },
];

export const credentials = [
  "AMFI Registered Mutual Fund Distributor",
  "Authorized Person of Motilal Oswal",
] as const;

export const contactInfo = {
  address: [
    "1st Floor, Shree Krishna Niwas,",
    "Above Panshikhar Sweets,",
    "Matunga West, Mumbai – 400016",
  ],
  phone: "+91 77386 86126",
  phoneHref: "tel:+917738686126",
  email: "hariainvestments9@gmail.com",
  emailHref: "mailto:hariainvestments9@gmail.com",
};

export const googleMapsUrl =
  "https://www.google.com/maps?cid=5476434013758913155&hl=en&gl=IN";

export const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7389837158184!2d72.8438951!3d19.031219999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced3c1603025%3A0x4c0033b859f77a83!2sPanshikar%20Sweets!5e0!3m2!1sen!2sin!4v1781779285653!5m2!1sen!2sin";
