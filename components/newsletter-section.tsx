"use client";

import { type FormEvent, useState } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <div className="mt-8">
      <h3 className="font-serif text-lg font-semibold leading-tight text-charcoal">
        Newsletter
      </h3>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3"
        noValidate
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          data-lpignore="true"
          data-1p-ignore
          data-bwignore
          suppressHydrationWarning
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Enter your email"
          className="min-h-11 w-full rounded-full border border-charcoal/15 bg-white/60 px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/45 transition-colors focus:border-charcoal/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/15"
        />
        <button
          type="submit"
          suppressHydrationWarning
          className="btn-primary inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold sm:w-fit"
        >
          Subscribe
        </button>
      </form>

      {status === "error" ? (
        <p className="mt-3 text-sm text-charcoal/70" role="alert">
          Please enter a valid email address.
        </p>
      ) : null}

      {status === "success" ? (
        <p className="mt-3 text-sm text-charcoal/70" role="status">
          Thank you for subscribing.
        </p>
      ) : null}
    </div>
  );
}
