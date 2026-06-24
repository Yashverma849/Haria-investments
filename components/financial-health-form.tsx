"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAfterLoader } from "@/hooks/use-gsap-after-loader";
import { contactInfo } from "@/lib/footer-data";
import { financialHealthGoals } from "@/lib/financial-health-data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  age: string;
  income: string;
  goals: string[];
  notes: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  age: "",
  income: "",
  goals: [],
  notes: "",
};

export default function FinancialHealthForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  useGsapAfterLoader(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const panel = section.querySelector("[data-fh-panel]");
    if (!panel) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(panel, { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  const toggleGoal = (goal: string) => {
    setForm((current) => ({
      ...current,
      goals: current.goals.includes(goal)
        ? current.goals.filter((item) => item !== goal)
        : [...current.goals, goal],
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent("Financial Health Assessment");
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Age: ${form.age}`,
        `Annual Income: ${form.income}`,
        `Goals: ${form.goals.join(", ") || "Not specified"}`,
        "",
        "Additional notes:",
        form.notes || "—",
      ].join("\n"),
    );

    window.location.href = `${contactInfo.emailHref}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/35";

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/10 bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-fh-panel
          className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10"
        >
          {submitted ? (
            <div className="text-center">
              <h2 className="font-serif text-fluid-cta font-semibold text-white">
                Thank you
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Your email client should open with your details. If it does not,
                reach us directly at{" "}
                <a
                  href={contactInfo.emailHref}
                  className="text-brand-light underline-offset-4 hover:underline"
                >
                  {contactInfo.email}
                </a>{" "}
                or call{" "}
                <a
                  href={contactInfo.phoneHref}
                  className="text-brand-light underline-offset-4 hover:underline"
                >
                  {contactInfo.phone}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fh-name" className="text-sm font-medium text-white/85">
                    Full Name
                  </label>
                  <input
                    id="fh-name"
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="fh-email" className="text-sm font-medium text-white/85">
                    Email
                  </label>
                  <input
                    id="fh-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, email: event.target.value }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="fh-phone" className="text-sm font-medium text-white/85">
                    Phone
                  </label>
                  <input
                    id="fh-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, phone: event.target.value }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="fh-age" className="text-sm font-medium text-white/85">
                    Age
                  </label>
                  <input
                    id="fh-age"
                    type="number"
                    min={18}
                    max={100}
                    required
                    value={form.age}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, age: event.target.value }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="fh-income" className="text-sm font-medium text-white/85">
                    Annual Income (₹)
                  </label>
                  <input
                    id="fh-income"
                    type="number"
                    min={0}
                    step={10000}
                    required
                    value={form.income}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, income: event.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-white/85">
                  Primary Goals
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {financialHealthGoals.map((goal) => {
                    const selected = form.goals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleGoal(goal)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          selected
                            ? "border-brand-light bg-brand-light/15 text-white"
                            : "border-white/20 text-white/75 hover:border-white/35"
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="fh-notes" className="text-sm font-medium text-white/85">
                  Additional Notes
                </label>
                <textarea
                  id="fh-notes"
                  rows={4}
                  value={form.notes}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, notes: event.target.value }))
                  }
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="btn-primary inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-sm font-semibold sm:w-auto"
              >
                Submit Assessment
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
