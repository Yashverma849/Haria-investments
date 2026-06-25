export type SectionTone = "dark" | "light";

/** Full-width section shell — alternate dark / light down the page */
export const sectionShell = {
  dark: "border-t border-white/10 bg-background text-cream",
  light: "border-t border-charcoal/10 bg-surface text-charcoal",
} as const;

export function sectionToneClass(tone: SectionTone) {
  return sectionShell[tone];
}
