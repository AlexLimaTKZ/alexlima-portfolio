# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Alex Lima Portfolio
**Category:** Full Stack Developer Portfolio / Modern Tech Blueprint

---

## Global Rules

### Color Palette

| Role | Hex | CSS Token / Class |
|------|-----|-------------------|
| Primary Accent | `#06b6d4` (Cyan 500) | `text-cyan-400`, `bg-cyan-500` |
| Secondary Accent | `#3b82f6` (Blue 500) | `text-blue-500`, `bg-blue-600` |
| Hero & Deep Dark Bg | `#0c1220` / `#090d16` | `--color-background`, `bg-[#0c1220]` |
| Card Glass Dark | `rgba(15, 23, 42, 0.45)` | `.glass-card`, `dark:bg-zinc-950/40` |
| Foreground / Text | `#F8FAFC` / `#FFFFFF` | `text-foreground`, `text-white` |
| Muted Foreground | `#94A3B8` / `#A1A1AA` | `text-muted-foreground`, `text-zinc-400` |

**Color Notes:** Deep cosmic navy base (`#0c1220`) with cyan-blue neon accents and glassmorphism.

### Typography

- **Display & Headings Font:** Sora (`var(--font-sora)`)
- **Editorial Italic Accent:** Playfair Display (`var(--font-serif)`)
- **Body Font:** Geist Sans (`var(--font-geist-sans)`)
- **Technical & Code Font:** Geist Mono (`var(--font-geist-mono)`)
- **Signature Font:** Autography (`/fonts/autography/Autography.otf`)
- **Mood:** futuristic, precise, minimal, high-impact, full-stack engineer

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

---

## Component Specs

### Primary Button (Pill Gradient)
```tsx
<Button className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-10 py-5 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
  Action
</Button>
```

### Glass Cards
```css
.glass-card {
  background: rgba(15, 15, 15, 0.45);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
}
```

---

## Pre-Delivery Checklist

- [x] No emojis used as icons (use Lucide SVG icons)
- [x] All images optimized with `next/image` (`<Image />`)
- [x] `cursor-pointer` on all clickable cards and buttons
- [x] Smooth transitions (150-300ms) with Framer Motion spring physics
- [x] Accessible contrast in dark & light themes
- [x] Responsive layout across mobile, tablet, desktop
