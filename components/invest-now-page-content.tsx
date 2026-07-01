"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { contactInfo } from "@/lib/footer-data";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Helper to parse tenure strings into min and max years
function parseTenure(tenureStr: string) {
  const defaults = { min: 1, max: 30, unit: "years" };
  if (!tenureStr) return defaults;

  const cleanStr = tenureStr.toLowerCase().replace(/\s+/g, "");

  // Handle strings like "5+ years", "5+ y"
  if (cleanStr.includes("+")) {
    const match = cleanStr.match(/^(\d+)\+?/);
    if (match) {
      const min = parseInt(match[1], 10);
      return { min, max: Math.max(min, 30), unit: "years" };
    }
  }

  // Handle ranges like "1–3 years", "3-10 years" (both hyphen and en-dash)
  const numbers = tenureStr.match(/\d+/g);
  if (numbers) {
    if (numbers.length >= 2) {
      // Special case: "7 days - 10 years"
      if (cleanStr.includes("day") && cleanStr.includes("year")) {
        const hasDaysFirst = cleanStr.indexOf("day") < cleanStr.indexOf("year");
        if (hasDaysFirst) {
          const max = parseInt(numbers[1], 10);
          return { min: 1, max, unit: "years" };
        }
      }

      const first = parseInt(numbers[0], 10);
      const second = parseInt(numbers[1], 10);
      return { min: Math.min(first, second), max: Math.max(first, second), unit: "years" };
    } else if (numbers.length === 1) {
      // E.g., "5 years"
      const val = parseInt(numbers[0], 10);
      return { min: val, max: val, unit: "years" };
    }
  }

  return defaults;
}

// Helper to parse minimum amount threshold from string
function parseMinAmount(amountStr: string): number {
  if (!amountStr) return 0;
  const numbers = amountStr.match(/\d+/g);
  if (numbers) {
    return parseInt(numbers.join(""), 10);
  }
  return 0;
}

export default function InvestNowPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Read params
  const titleParam = searchParams.get("title") || "";
  const tenureParam = searchParams.get("tenure") || "";
  const minAmountParam = searchParams.get("minAmount") || "";
  const serviceParam = searchParams.get("service") || "";

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Tenure states
  const [minTenure, setMinTenure] = useState(1);
  const [maxTenure, setMaxTenure] = useState(30);
  const [tenure, setTenure] = useState(1);
  const [minAmountStr, setMinAmountStr] = useState("");

  // Prefill state from query parameters on mount
  useEffect(() => {
    if (titleParam) setProductName(titleParam);
    if (minAmountParam) setMinAmountStr(minAmountParam);

    if (serviceParam) {
      const lower = serviceParam.toLowerCase();
      if (lower.includes("insur")) {
        setService("insurance");
      } else if (lower.includes("invest")) {
        setService("investment");
      } else if (lower.includes("commod")) {
        setService("commodities");
      }
    }

    if (tenureParam) {
      const parsed = parseTenure(tenureParam);
      setMinTenure(parsed.min);
      setMaxTenure(parsed.max);
      setTenure(parsed.min); // Start value matches the card specification min limit
    }
  }, [titleParam, tenureParam, minAmountParam, serviceParam]);

  // Handle ScrollSmoother and GSAP page enter animations
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTop(0);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useGsapAfterLoader(() => {
    const container = containerRef.current;
    if (!container) return;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTop(0);
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();

    const leftElements = container.querySelectorAll("[data-animate-left]");
    const rightElements = container.querySelectorAll("[data-animate-right]");

    gsap.fromTo(
      leftElements,
      { x: -56, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.6,
        stagger: 0.15,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      rightElements,
      { y: -56, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power3.out",
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !service || !amount.trim() || !message.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const numAmount = parseInt(amount, 10);
    const numMinAmount = parseMinAmount(minAmountStr);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (numMinAmount > 0 && numAmount < numMinAmount) {
      setError(`Minimum investment amount for this selection is ₹${numMinAmount.toLocaleString("en-IN")}.`);
      return;
    }

    // Programmatic mailto link opening
    const subject = `Investment Application: ${productName || service} - ${firstName} ${lastName}`;
    const formattedAmount = numAmount.toLocaleString("en-IN");
    const body = `Investment Application Details\n---------------------------------\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\n\nSelected Product/Plan: ${productName || "General / None"}\nService Category: ${service.toUpperCase()}\n\nSelected Tenure: ${tenure} Year(s)\nInvestment Amount: ₹${formattedAmount}\n\nMessage/Goals:\n${message}`;

    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-charcoal/35";
  const labelClass = "text-sm font-semibold text-charcoal/80 block";

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Form/Success */}
          <div className="lg:col-span-7 flex flex-col justify-center" data-animate-left>
            {isSubmitted ? (
              <div className="surface-panel p-8 md:p-12 rounded-2xl border border-charcoal/10 shadow-sm text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 mb-6 border border-green-200">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-charcoal mb-3">
                  Investment Inquiry Initiated!
                </h2>
                <p className="text-sm text-charcoal/70 max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you for starting your investment application with Haria Investments. Your default mail client should have opened to send the details to <strong>{contactInfo.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setAmount("");
                    setMessage("");
                    setIsSubmitted(false);
                  }}
                  className="btn-dark rounded-full px-8 py-3 text-sm font-semibold cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Another Application
                </button>
              </div>
            ) : (
              <div className="surface-panel p-6 md:p-10 rounded-2xl border border-charcoal/10 shadow-sm">
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-charcoal/50">
                    INVEST NOW
                  </p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-serif font-semibold tracking-tight text-charcoal">
                    Begin Your Wealth Journey
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium border border-red-200">
                      {error}
                    </div>
                  )}

                  {/* Name Grid */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className={labelClass}>
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        required
                        placeholder="First Name"
                        data-lpignore="true"
                        data-1p-ignore
                        data-bwignore
                        suppressHydrationWarning
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className={labelClass}>
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        required
                        placeholder="Last Name"
                        data-lpignore="true"
                        data-1p-ignore
                        data-bwignore
                        suppressHydrationWarning
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      data-lpignore="true"
                      data-1p-ignore
                      data-bwignore
                      suppressHydrationWarning
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  {/* Selected Product (Read Only display if pre-filled) */}
                  {productName && (
                    <div>
                      <label className={labelClass}>Selected Product / Plan</label>
                      <input
                        type="text"
                        readOnly
                        value={productName}
                        className={`${inputClass} bg-charcoal/5 border-charcoal/10 font-semibold cursor-not-allowed text-charcoal/70`}
                      />
                    </div>
                  )}

                  {/* Tenure Slider */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label className={labelClass}>
                        Desired Tenure <span className="text-red-500">*</span>
                      </label>
                      <span className="text-xs font-bold text-charcoal bg-charcoal/5 px-2 py-0.5 rounded-md">
                        {tenure} {tenure === 1 ? "Year" : "Years"}
                      </span>
                    </div>

                    <div className="mt-3">
                      {minTenure === maxTenure ? (
                        <div className="text-xs text-charcoal/60 bg-charcoal/5 px-3 py-2.5 rounded-lg border border-charcoal/10 font-semibold">
                          This plan features a fixed tenure of {minTenure} {minTenure === 1 ? "Year" : "Years"}.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="range"
                            min={minTenure}
                            max={maxTenure}
                            step={1}
                            value={tenure}
                            onChange={(e) => setTenure(parseInt(e.target.value, 10))}
                            className="w-full h-1.5 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal/20"
                          />
                          <div className="flex justify-between text-[10px] text-charcoal/50 font-bold uppercase tracking-wider">
                            <span>Min: {minTenure} Yr</span>
                            <span>Max: {maxTenure} Yrs</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Investment Amount */}
                  <div>
                    <label htmlFor="amount" className={labelClass}>
                      Investment Amount (INR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="amount"
                      type="text"
                      required
                      placeholder={minAmountStr && minAmountStr !== "Variable" ? `e.g. ${parseMinAmount(minAmountStr)}` : "e.g. 10000"}
                      data-lpignore="true"
                      data-1p-ignore
                      data-bwignore
                      suppressHydrationWarning
                      value={amount}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setAmount(val);
                      }}
                      className={inputClass}
                    />
                    {minAmountStr && (
                      <p className="mt-1.5 text-xs text-charcoal/50">
                        Minimum amount required for this card: <span className="font-semibold text-charcoal/70">{minAmountStr}</span>
                      </p>
                    )}
                  </div>

                  {/* Dropdown service */}
                  <div>
                    <label htmlFor="service" className={labelClass}>
                      Which services are you looking for? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        required
                        data-lpignore="true"
                        data-1p-ignore
                        data-bwignore
                        suppressHydrationWarning
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23333333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: "right 1rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.25rem",
                        }}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option value="insurance">Insurance</option>
                        <option value="investment">Investment</option>
                        <option value="commodities">Commodities</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Comment or Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      data-lpignore="true"
                      data-1p-ignore
                      data-bwignore
                      suppressHydrationWarning
                      placeholder="Tell us about your financial goals or questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      suppressHydrationWarning
                      className="btn-dark w-full inline-flex items-center justify-center rounded-full py-3.5 text-sm font-semibold cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Video Panel */}
          <div className="lg:col-span-5 flex" data-animate-right>
            <div className="relative overflow-hidden rounded-2xl border border-charcoal/10 bg-black shadow-lg w-full h-[400px] lg:h-auto min-h-[350px]">
              <video
                src="/contact-us/remove_last_seconds_and_add_processed.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-700 hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                  Haria Investments
                </p>
                <h3 className="font-serif text-xl font-medium mt-1">
                  Start Investing Today
                </h3>
                <p className="text-xs text-white/70 mt-1.5 max-w-xs leading-relaxed">
                  Tailor your investment parameters and connect with our wealth advisors to execute your plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
