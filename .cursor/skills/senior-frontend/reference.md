# Senior Frontend Reference

## Folder Structure (recommended as app grows)

```
app/
  (marketing)/
    page.tsx
    layout.tsx
  components/
    ui/           # primitives: Button, Input, Card
    sections/     # page sections: Hero, Footer
    layout/       # Header, Nav
  hooks/          # client hooks only
  lib/            # utils, constants (server-safe)
```

## Accessibility Quick Reference

| Element | Requirement |
|---------|-------------|
| `button` | Visible label or `aria-label` |
| `input` | Associated `<label>` or `aria-labelledby` |
| `nav` | `aria-label` describing purpose |
| Modal | Focus trap, `Escape` to close, `aria-modal` |
| Icon-only btn | `aria-label` describing action |

## Responsive Breakpoints (Tailwind defaults)

| Prefix | Min width |
|--------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

## Investment / Marketing Site Patterns

For Haria Investments specifically:

- Hero: full-width media (video/image in `public/`), clear CTA above fold
- Trust signals: concise copy, professional typography (Geist)
- Contact CTAs: persistent in header/footer
- Performance: lazy-load below-fold media; optimize large video assets

## Code Review Output Format

When reviewing frontend changes:

```markdown
## Summary
[1-2 sentences]

## Critical
- [must fix]

## Suggestions
- [nice to have]

## Positive
- [what's done well]
```
