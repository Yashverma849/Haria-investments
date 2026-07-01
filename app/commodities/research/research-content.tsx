"use client";

import { useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import {
  researchArticles,
  categoryLabels,
  type BlogCategory,
  type ResearchArticle,
} from "@/lib/research-data";

export default function ResearchContent() {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<ResearchArticle | null>(null);

  // Sync category from search parameter
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      if (catParam === "all" || catParam in categoryLabels) {
        setSelectedCategory(catParam);
      }
    }
  }, [searchParams]);

  // Handle category tab click
  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  };

  // Filter articles
  const filteredArticles = researchArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  // Lock scroll when reader is open
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeArticle]);

  return (
    <div className="section-shell">
      {/* Page Header */}
      <div className="mb-12 text-center md:mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
          Research Hub
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Market Intelligence
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
          Institutional-grade technical analysis, supply-demand reports, and proprietary short-term trading signals from our research desks.
        </p>
      </div>

      {/* Controls Container */}
      <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {["all", "technical-analysis", "market-reports", "trading-signals"].map((cat) => {
            const label = cat === "all" ? "All Research" : categoryLabels[cat as BlogCategory];
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-background shadow-md shadow-white/5"
                    : "bg-white/[0.05] text-white/70 hover:bg-white/[0.1] hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/40">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by asset, tag, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/45 outline-none transition-all focus:border-white/25 focus:bg-white/[0.06]"
          />
        </div>
      </div>

      {/* Articles Presentation */}
      {filteredArticles.length === 0 ? (
        <div className="flex min-h-[30vh] flex-col items-center justify-center text-center">
          <svg
            className="h-10 w-10 text-white/20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h3 className="mt-4 font-serif text-lg font-semibold text-white/80">No reports match search criteria</h3>
          <p className="mt-1 text-xs text-white/45">Try refining your keyword query or clear search filter.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group/card flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:border-white/20"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white border border-white/10">
                  {categoryLabels[article.category]}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-[11px] text-white/45">
                  <span>{article.publishDate}</span>
                  <span aria-hidden>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold leading-tight text-white group-hover/card:text-white/90">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/60 line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] text-white/45 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] py-2 text-xs font-semibold text-white transition-all hover:bg-white hover:text-background"
                  >
                    Read Report
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Immersive Document Reader Overlay */}
      {activeArticle && (
        <div 
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto bg-background/75 p-4 py-8 backdrop-blur-md sm:p-6 md:p-10"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#0d0d0d] shadow-2xl p-6 sm:p-10 flex flex-col min-h-fit"
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Haria Intelligence Report
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:text-white"
                aria-label="Close reader"
              >
                <svg
                  className="h-4 w-4 transition-transform group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Document Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/50">
                <span className="font-bold text-white uppercase tracking-wider">
                  {categoryLabels[activeArticle.category]}
                </span>
                <span aria-hidden>•</span>
                <span>{activeArticle.publishDate}</span>
                <span aria-hidden>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                {activeArticle.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-white/50 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-b border-white/5 py-3">
                <span className="text-[11px] uppercase tracking-wider text-white/40">Author:</span>
                <span className="text-xs font-semibold text-white/80">{activeArticle.author}</span>
              </div>
            </header>

            {/* Rich Document Content */}
            <article 
              className="prose prose-invert max-w-none text-white/80 font-sans leading-relaxed select-text text-sm sm:text-base
                [&_h2]:font-serif [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-2
                [&_h3]:font-serif [&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-semibold [&_h3]:text-white/95 [&_h3]:mt-6
                [&_h4]:text-sm [&_h4]:font-bold [&_h4]:text-white
                [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1.5 [&_ul]:mt-3 [&_ul]:pl-2
                [&_li]:text-white/80
                [&_table]:w-full [&_table]:mt-6 [&_table]:border-collapse
                [&_th]:p-3 [&_th]:font-semibold [&_th]:text-white [&_th]:border-b [&_th]:border-white/20 [&_th]:bg-white/[0.03]
                [&_td]:p-3 [&_td]:text-white/80 [&_td]:border-b [&_td]:border-white/5"
              dangerouslySetInnerHTML={{ __html: activeArticle.content }}
            />

            {/* Professional Disclaimer Notice */}
            <footer className="mt-12 pt-8 border-t border-white/10">
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-[11px] leading-relaxed text-white/35 sm:text-xs">
                <strong className="text-white/45 block mb-1">Disclaimer & Risk Disclosure:</strong>
                This document is prepared by Haria Investments research desk for informational and educational purposes only. It does not constitute financial, legal, or investment advice. Trading in commodity derivatives (futures, options) and precious metals involves substantial risk of capital loss and is not suitable for all investors. Past performance is not indicative of future results. Leverage can magnify losses. Consult with a certified financial advisor before executing trades or investing capital.
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
