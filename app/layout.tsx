import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Footer from "@/components/footer";
import SiteLoader from "@/components/site-loader";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Haria Investments | Your One Stop Financial Solution",
  description:
    "Insurance, Investments, and Wealth Solutions, All in One Place. Trusted by 1500+ clients since 1957.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-white">
        <SiteLoader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
