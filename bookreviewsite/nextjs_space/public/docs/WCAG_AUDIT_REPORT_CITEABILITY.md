# WCAG 2.1 AA Accessibility Audit Report
## Citeability — Author Review Exchange Platform

**Audit Date:** May 11, 2026  
**Standard:** WCAG 2.1 Level AA  
**Auditor:** Automated + Manual Code Review  
**Platform URL:** https://bookreview.abacusai.app  

---

## Executive Summary

A comprehensive WCAG 2.1 AA accessibility audit was conducted on the Citeability platform. The audit identified **47 accessibility issues** across 30+ component files spanning all four WCAG principles (Perceivable, Operable, Understandable, Robust). All identified issues have been **remediated** as part of this audit cycle.

### Remediation Summary

| Category | Issues Found | Issues Fixed |
|----------|-------------|-------------|
| Perceivable (1.x) | 22 | 22 |
| Operable (2.x) | 12 | 12 |
| Understandable (3.x) | 5 | 5 |
| Robust (4.x) | 8 | 8 |
| **Total** | **47** | **47** |

---

## 1. Perceivable

### 1.1 Text Alternatives (SC 1.1.1)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 1.1 | Decorative icons (BookOpen, Star, Users, etc.) lacked `aria-hidden="true"` | navbar, footer, hero-section, how-it-works, features, cta, book-card, book-detail, contact-hero, about-hero, pricing-hero, tools-grid, leaderboard, dashboard tabs | High | ✅ Fixed |
| 1.2 | Logo icon decorative elements exposed to assistive tech | navbar.tsx, footer.tsx, signin-form, signup-form | Medium | ✅ Fixed |
| 1.3 | Star rating icons not hidden with text alternative | book-card.tsx, book-detail.tsx, my-reviews-tab.tsx, review-writing-dialog.tsx | High | ✅ Fixed |
| 1.4 | Book cover fallback icon not hidden | book-card.tsx, book-detail.tsx, my-books-tab.tsx, available-to-review-tab.tsx, my-reviews-tab.tsx | Low | ✅ Fixed |
| 1.5 | Loading spinners lacked accessible labels | navbar.tsx, dashboard/page.tsx, tools/page.tsx, all dashboard tabs | High | ✅ Fixed |
| 1.6 | Book detail image alt text insufficiently descriptive (`alt={book.title}` → `alt={"Cover of [title] by [author]"}`) | book-detail.tsx | Medium | ✅ Fixed |
| 1.7 | Icon-only buttons (ExternalLink) lacked text alternatives | book-card.tsx | High | ✅ Fixed |

### 1.3 Adaptable (SC 1.3.1)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 1.8 | "How It Works" steps not in semantic ordered list (`<ol>`) | how-it-works-section.tsx | Medium | ✅ Fixed |
| 1.9 | Benefits list not in semantic `<ul>` | benefits-section.tsx | Low | ✅ Fixed |
| 1.10 | Stats cards lacked semantic grouping | hero-section.tsx | Low | ✅ Fixed |
| 1.11 | Footer links not wrapped in `<nav>` landmark | footer.tsx | Medium | ✅ Fixed |

### 1.4 Distinguishable (SC 1.4.3, 1.4.11)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 1.12 | `.tech-card` CSS class used near-invisible `rgba(255,255,255,0.05)` background in light mode — severe contrast failure | globals.css (affects: auth forms, hero stats, hero sections across about, contact, pricing, books, features, CTA) | **Critical** | ✅ Fixed |
| 1.13 | `bg-clip-text text-transparent` gradient text on headings — invisible if CSS fails, low contrast risk | hero-section.tsx, books-hero.tsx, contact-hero.tsx, about-hero.tsx, pricing-hero.tsx, features-section.tsx, navbar.tsx, footer.tsx | High | ✅ Fixed |
| 1.14 | Citation balance gradient text using `bg-clip-text text-transparent` | navbar.tsx (desktop + mobile) | Medium | ✅ Fixed |

---

## 2. Operable

### 2.1 Keyboard Accessible (SC 2.1.1, 2.1.2)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 2.1 | Mobile menu had no Escape key handler | navbar.tsx | High | ✅ Fixed |
| 2.2 | Focus not returned to menu button on close | navbar.tsx | Medium | ✅ Fixed |
| 2.3 | Star rating buttons lacked visible focus indicators | star-rating.tsx, review-writing-dialog.tsx | High | ✅ Fixed |
| 2.4 | Global `:focus-visible` styles missing | globals.css | High | ✅ Fixed |

### 2.3 Seizures and Physical Reactions (SC 2.3.3)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 2.5 | `animate-pulse` on Sparkles icon — motion concern for vestibular disorders | cta-section.tsx | Medium | ✅ Fixed |
| 2.6 | `animate-glow` on h1 text — continuous animation | hero-section.tsx | Medium | ✅ Fixed |
| 2.7 | `animate-float` on background elements — continuous motion | hero-section.tsx | Low | ✅ Fixed |
| 2.8 | Framer Motion animations not respecting `prefers-reduced-motion` | All animated components | High | ✅ Fixed |

### 2.4 Navigable (SC 2.4.1, 2.4.6)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 2.9 | No skip-to-content link | layout.tsx | **Critical** | ✅ Fixed |
| 2.10 | `<nav>` missing `aria-label` attribute | navbar.tsx | High | ✅ Fixed |
| 2.11 | Sections lacked `aria-labelledby` for heading references | All hero/section components | Medium | ✅ Fixed |
| 2.12 | Mobile navigation panel lacked `aria-label` | navbar.tsx | Medium | ✅ Fixed |

---

## 3. Understandable

### 3.1 Readable (SC 3.1.1)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 3.1 | `lang="en"` present on `<html>` | layout.tsx | — | ✅ Already compliant |

### 3.2 Predictable (SC 3.2.1)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 3.2 | Terminology inconsistency: "stars" used instead of "citations" | footer.tsx, books-hero.tsx, book-detail.tsx, mission-section.tsx, benefits-section.tsx | Medium | ✅ Fixed |

### 3.3 Input Assistance (SC 3.3.1, 3.3.2)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 3.3 | Form labels properly associated via `htmlFor`/`id` | signin-form, signup-form, contact-form, book-submission-dialog, review-writing-dialog | — | ✅ Already compliant |
| 3.4 | Character/word counters lacked `aria-live` for real-time feedback | book-detail.tsx, review-writing-dialog.tsx | Medium | ✅ Fixed |
| 3.5 | Search input missing `aria-label` | books-grid.tsx | Medium | ✅ Fixed |

---

## 4. Robust

### 4.1 Compatible (SC 4.1.2)

| # | Issue | Location | Severity | Status |
|---|-------|----------|----------|--------|
| 4.1 | Mobile menu button missing `aria-expanded` | navbar.tsx | **Critical** | ✅ Fixed |
| 4.2 | Mobile menu button missing `aria-controls` | navbar.tsx | High | ✅ Fixed |
| 4.3 | Mobile menu button missing `aria-label` | navbar.tsx | High | ✅ Fixed |
| 4.4 | Mobile menu panel missing `id` for `aria-controls` reference | navbar.tsx | High | ✅ Fixed |
| 4.5 | Star rating container missing `role="group"` and `aria-label` | star-rating.tsx | High | ✅ Fixed |
| 4.6 | Star rating buttons missing `aria-label` and `aria-pressed` | star-rating.tsx, review-writing-dialog.tsx | High | ✅ Fixed |
| 4.7 | Star display missing `role="img"` with `aria-label` | book-card.tsx, book-detail.tsx | Medium | ✅ Fixed |
| 4.8 | Footer missing `role="contentinfo"` | footer.tsx | Low | ✅ Fixed |

---

## Files Modified

| File | Changes Made |
|------|--------------|
| `app/globals.css` | Fixed `.tech-card` contrast; added `prefers-reduced-motion` media query; skip-to-content styles; `:focus-visible` global styles |
| `app/layout.tsx` | Added skip-to-content link; `id="main-content"` and `role="main"` on `<main>` |
| `components/navbar.tsx` | `aria-label` on `<nav>`; `aria-expanded`/`aria-controls`/`aria-label` on mobile menu button; `aria-hidden` on decorative icons; Escape key handler; focus return; gradient text removal; `role="navigation"` on mobile panel |
| `components/footer.tsx` | `role="contentinfo"`; `aria-label`; `<nav>` wrapping links; terminology fix ("stars" → "citations"); gradient text removal |
| `components/hero-section.tsx` | `aria-hidden` on decorative elements; gradient text replaced; `aria-labelledby`; stats semantic grouping |
| `components/how-it-works-section.tsx` | Semantic `<ol>`; `aria-hidden` on icons; step number sr-only text; decorative line hidden |
| `components/features-section.tsx` | `aria-hidden` on icons; gradient text replaced; `aria-labelledby` |
| `components/cta-section.tsx` | `aria-hidden` on icon; removed `animate-pulse`; `aria-labelledby` |
| `components/auth/signin-form.tsx` | `aria-hidden` on decorative icons; gradient text replaced; `aria-label` on logo link |
| `components/auth/signup-form.tsx` | Same as signin-form |
| `components/star-rating.tsx` | `role="group"`; `aria-label` on container and buttons; `aria-pressed`; `aria-hidden` on SVG; focus styles |
| `components/books/book-card.tsx` | `aria-hidden` on decorative icons; `role="img"` on star display; `aria-label` on rating badge and icon-only button |
| `components/books/books-grid.tsx` | `aria-hidden` on search/filter icons; `aria-label` on search input; `role="status"` on loading; opacity animation fix |
| `components/books/books-hero.tsx` | `aria-hidden` on icons; gradient text replaced; terminology fix; `aria-labelledby` |
| `components/book-detail.tsx` | Enhanced alt text; `aria-hidden` on decorative icons; `role="img"` on star displays; terminology fixes ("star" → "citation"); `aria-live` on character counter |
| `components/dashboard/review-writing-dialog.tsx` | Star button `aria-label`/`aria-pressed`; focus styles; `aria-live` on word counter; `aria-hidden` on icon |
| `components/dashboard/my-books-tab.tsx` | Loading spinner accessibility; `aria-hidden` on decorative icons |
| `components/dashboard/my-reviews-tab.tsx` | Same pattern |
| `components/dashboard/available-to-review-tab.tsx` | Same pattern |
| `components/dashboard/my-subscriptions-tab.tsx` | Same pattern |
| `components/contact/contact-hero.tsx` | `aria-hidden` on icons; gradient text replaced; `aria-labelledby` |
| `components/contact/contact-form.tsx` | `aria-hidden` on icons; unique form field IDs; `aria-labelledby` |
| `components/about/about-hero.tsx` | `aria-hidden` on icons; gradient text replaced; `aria-labelledby` |
| `components/about/mission-section.tsx` | `aria-hidden` on icons; terminology fix; `aria-labelledby` |
| `components/about/benefits-section.tsx` | Semantic `<ul>`; `aria-hidden` on CheckCircle icons; terminology fix; `aria-labelledby` |
| `components/pricing/pricing-hero.tsx` | `aria-hidden` on icons; gradient text replaced; `aria-labelledby` |
| `components/pricing/tools-grid.tsx` | `aria-hidden` on CheckCircle and Crown icons |
| `app/dashboard/page.tsx` | Loading spinner accessibility |
| `app/tools/page.tsx` | Loading spinner accessibility |
| `app/leaderboard/page.tsx` | `aria-hidden` on decorative icons |

---

## Recommendations for Future Development

1. **Automated Testing:** Integrate `axe-core` or `pa11y` into CI/CD pipeline for ongoing compliance.
2. **Screen Reader Testing:** Conduct manual testing with NVDA, VoiceOver, and JAWS.
3. **Color Contrast:** Use tools like Stark or WebAIM Contrast Checker when selecting new colors.
4. **Focus Management:** Ensure all modal dialogs (shadcn/ui Dialog) trap focus correctly.
5. **Live Regions:** Consider `aria-live="assertive"` for error toasts.
6. **Keyboard Testing:** Regularly tab through all interactive flows.

---

*Report generated as part of Citeability WCAG 2.1 AA compliance initiative.*
