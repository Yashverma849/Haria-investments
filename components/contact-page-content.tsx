"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { contactInfo } from "@/lib/footer-data";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ContactPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

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

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !service || !message.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (message.trim().length < 5) {
      setError("Message must be at least 5 characters long.");
      return;
    }

    // Programmatic mailto link opening
    const subject = `Inquiry: ${service} - ${firstName} ${lastName}`;
    const body = `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\n\nService Interested: ${service}\n\nMessage:\n${message}`;
    
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
        {/* Success/Form Grid */}
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
                  Inquiry Initiated!
                </h2>
                <p className="text-sm text-charcoal/70 max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you for reaching out to Haria Investments. Your default mail client should have opened to send the details to <strong>{contactInfo.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setService("");
                    setMessage("");
                    setIsSubmitted(false);
                  }}
                  className="btn-dark rounded-full px-8 py-3 text-sm font-semibold cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="surface-panel p-6 md:p-10 rounded-2xl border border-charcoal/10 shadow-sm">
                {/* Heading inside the card */}
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-charcoal/50">
                    GET IN TOUCH
                  </p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-serif font-semibold tracking-tight text-charcoal">
                    Let's Start a Conversation
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
                        placeholder="John"
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
                        placeholder="Doe"
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
                      placeholder="john.doe@example.com"
                      data-lpignore="true"
                      data-1p-ignore
                      data-bwignore
                      suppressHydrationWarning
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  {/* Dropdown menu */}
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
                      placeholder="Share your goals or ask a question..."
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
                      Send Message
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
                  Trusted Financial Guidance
                </h3>
                <p className="text-xs text-white/70 mt-1.5 max-w-xs leading-relaxed">
                  Trusted by 1500+ clients since 1957. Empowering your wealth creation journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
