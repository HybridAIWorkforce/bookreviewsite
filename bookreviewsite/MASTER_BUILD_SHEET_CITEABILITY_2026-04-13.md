# MASTER BUILD SHEET — CITEABILITY
## Book Review Exchange Platform
### Generated: April 13, 2026

---

## TABLE OF CONTENTS

1. [Conversation Summary & Flow](#part-1-conversation-summary--flow)
2. [Topic Analysis](#part-2-topic-analysis)
3. [Project Status Report](#part-3-project-status-report)
4. [Completion Status](#part-4-completion-status)
5. [Quality Assurance & Testing](#part-5-quality-assurance--testing)
6. [Security & Accessibility](#part-6-security--accessibility)
7. [Deployment & DevOps](#part-7-deployment--devops)
8. [Master Build Sheet — Remaining Tasks](#part-8-master-build-sheet)
9. [Future Enhancements](#part-9-future-enhancements)
10. [Maintenance Plan](#part-10-maintenance-plan)
11. [Comprehensive Summary](#part-11-comprehensive-summary)

---

# PART 1: CONVERSATION SUMMARY & FLOW

## 1.1 Conversation Overview
- **Total Turns:** 39 (20 user, 19 assistant)
- **Project:** Citeability — Author Book Review Exchange Platform
- **Technology:** Next.js 14, Prisma ORM, PostgreSQL, NextAuth, Tailwind CSS, shadcn/ui
- **Domain:** thebookreviewsite.com (name: Citeability)

## 1.2 Conversation Flow

```
Turn 0-1:  Initial Request & Clarification
    ↓      User requested book review site like pubby.co
    ↓      Assistant asked clarifying questions
Turn 2-3:  Requirements Gathering
    ↓      User provided brand details, PayPal keys, auth preferences
    ↓      Corrected "courses" to "AI tools"
Turn 4-5:  MVP Build
    ↓      Full site scaffolded: landing, auth, dashboard, books, pricing, contact
Turn 6-7:  User Approval & Polish
    ↓      User said "you did a great job"
Turn 8-9:  Completion Prompt Request
    ↓      User asked for prompt to finish site
Turn 10-11: Dashboard Implementation
    ↓      Complete dashboard with tabs, book submission, reviews, subscriptions
Turn 12-13: Remove "Indie" References
    ↓      Site-wide text change: "indie author" → "author"
Turn 14-15: Rename to Citeability
    ↓      All branding updated from "BookReviewSite" to "Citeability"
Turn 16-19: Hero Section Rewrite
    ↓      User wanted unique hero copy, not exact copy of their input
    ↓      Multiple iterations to get creative version
Turn 20-21: Stars → Citations + How It Works Relocation
    ↓      Replaced all "stars" with "citations"
    ↓      Moved How It Works section under hero
Turn 22-25: Comprehensive Points System Implementation
    ↓      User provided full points formula specification
    ↓      Implemented entire calculation engine, DB schema updates,
    ↓      activity tracking, badges, review requests, AI tools dashboard
Turn 26-27: Enhancement Suggestions Acknowledged
    ↓      User listed 7 future enhancements
Turn 28-29: Leaderboard Implementation
    ↓      Full leaderboard page with 4 tabs (points/level/streak/reviews)
Turn 30-31: Placeholder Data for Leaderboard
    ↓      Seeded 12+ diverse users with varied stats
Turn 32-33: Stars → Citations in Exchange Section
    ↓      Updated remaining "stars" text to "citations"
Turn 34-35: Comprehensive Placeholder Data
    ↓      Full seed: 101 books, 80 reviews, 49 activities, 38 badges, etc.
Turn 36-37: Leaderboard Layout Adjustment
    ↓      Moved winners section under leaderboard subheader
Turn 38:   Documentation Request (this document)
```

## 1.3 Key User Messages (Chronological)

**Turn 0 — Initial Request:**
> "Build a modern landing page for a book review site like https://pubby.co with login, dashboard, course checkout (Stripe), course library, dark mode, and deploy it."

**Turn 2 — Detailed Requirements:**
> "This web site is for indy authors to go to for book reviews. Authors post their book they want to be reviewed and to get they reviews the authors need to do reviews for other authors to earn stars so they can get book reviews."
> "I made a mistake in my prompt when I talked about course. the product is not courses but AI tools check out."
> Site name: thebookreviewsite.com, Style: "High tech", Colors: "Modern"
> PayPal Client ID and Secret provided
> Auth: Email/password + Google SSO

**Turn 4:** "lets build the MVP"

**Turn 6:** "thank you .. you did a great job"

**Turn 10 — Dashboard Specification:**
> Complete dashboard spec with 7 sections: Overview, My Books, Available to Review, My Reviews, My Subscriptions, Auth & Layout, API Routes
> Test credentials provided (john@doe.com / johndoe123, plus 4 test users)

**Turn 12:** "Can you make a site wise change and remove indie from statement indie author. so it talks about authors in general"

**Turn 14:** "the new name is citeability"

**Turn 16:** "replace hero section with a version of this Get reviews and creability for your books provides authors with visibility and credibility on the largest online bookstore through verified reviews."

**Turn 18:** "i asked to create a version of my headline and sub headline and you copied it exactly plse fix"

**Turn 20:** "move how it works under the hero section and update the site to replace stars with reviews it is citations"

**Turn 22 — Full Points System Specification:**
> Complete points system with:
> - Core Amazon Review Value Formula
> - Book Difficulty Multipliers (4 tiers + debut bonus)
> - Reviewer Type Values (4 types: Verifier/Advocate/Insider/Supporter)
> - Reviewer Frequency Bonus (5 tiers from New to Master)
> - Points Earning System (daily activities + one-time activities)
> - Points Spending System (review requests + AI tools)
> - Gamification & Progression (5 levels + special badges)
> - Technical Implementation Notes

**Turn 24 — Implementation Answers:**
> Scope: "The entire system"
> Points = Citations: "Points are citations for the math I used points"
> AI Tools: "placeholder page. I would like the page to be the tool dashboard and analytics"
> Amazon Integration: "both Amazon API and Manual"

**Turn 26 — Future Enhancement List:**
> 1. Book Submission Dialog Update (genre dropdown + debut checkbox)
> 2. Amazon API Integration (automated verification)
> 3. Functional AI Tools (integrate LLM APIs)
> 4. Badge Display (visual badge gallery in profiles)
> 5. Leaderboard (top reviewers by points/level/streak)
> 6. Email Notifications (review requests, milestones, level-ups)
> 7. Points History Page (detailed transaction breakdown)

**Turn 28:** "can you add the leader board"

**Turn 30:** "can you put place holders to see it better please"

**Turn 32:** "change to citations Star-Based Exchange Earn stars by reviewing books, spend stars to get your books reviewed. Fair and balanced system."

**Turn 34:** "fill in with place holder"

**Turn 36:** "Move top scorer winner, most active winner and longest streak right under the leader board sub header"

---

# PART 2: TOPIC ANALYSIS

## 2.1 Identified Topics

### Topic A: Site Identity & Branding
- **Turns:** 0, 2, 12, 14, 16, 18
- Site originally "thebookreviewsite.com" → renamed "Citeability" (Turn 14)
- Removed "indie" references to be inclusive of all authors (Turn 12)
- Hero section rewritten to be creative, not copy-paste (Turns 16-18)
- Design style: "High tech", "Modern" color scheme

### Topic B: Core Platform Concept
- **Turns:** 0, 2, 22
- Authors exchange book reviews to earn citations (points)
- Citations can be spent on getting reviews or using AI tools
- Modeled after pubby.co

### Topic C: Points/Citations System
- **Turns:** 20, 22, 24, 32
- Stars → Citations terminology change (Turn 20)
- Full formula: Total Points = (Book Difficulty Multiplier) × (Reviewer Type Value + Frequency Bonus)
- Complete gamification with levels, badges, streaks

### Topic D: Dashboard & User Features
- **Turns:** 10, 22, 24
- 5-tab dashboard: Overview, My Books, Available to Review, My Reviews, Subscriptions
- AI Tools dashboard page
- Review writing with type selector and word count validation

### Topic E: Leaderboard
- **Turns:** 26, 28, 30, 36
- 4 ranking categories: Points, Level, Streak, Reviews
- Winner highlights for Top Scorer, Most Active, Longest Streak
- Populated with 12+ placeholder users

### Topic F: AI Tools Marketplace
- **Turns:** 2, 22, 24
- Corrected from "courses" to "AI tools" (Turn 2)
- Tools: Blurb Generator, Query Letter Assistant, Amazon Review Solicitator, etc.
- Currently placeholder dashboard — not yet functional with LLM

### Topic G: Payment Integration
- **Turns:** 0, 2
- Originally Stripe → corrected to PayPal (Turn 2)
- PayPal credentials provided
- Monthly subscriptions + one-time charges
- Multi-currency support requested

### Topic H: Authentication
- **Turns:** 0, 2, 10
- Email/password + Google SSO
- Test credentials: john@doe.com / johndoe123
- Additional test users provided

### Topic I: Future Enhancements
- **Turn:** 26
- 7 items listed (genre dropdown, Amazon API, functional AI tools, badges, leaderboard, email notifications, points history)
- Leaderboard was completed (Turns 28-37)
- 6 items remain

---

# PART 3: PROJECT STATUS REPORT

## PROJECT: Citeability — Author Book Review Exchange Platform

### 3.1 Project Requirements Summary

**Original Request (Turn 0):**
Modern book review site like pubby.co with login, dashboard, checkout, dark mode

**Refined Requirements (Turn 2):**
- Authors post books for review
- Authors earn stars/citations by reviewing others
- AI tools marketplace (not courses)
- PayPal integration (not Stripe)
- Email/password + Google SSO auth
- High-tech, modern design

**Points System (Turn 22):**
- Complete formula-based points calculation
- 4 difficulty tiers for books
- 4 reviewer types with base values
- 5 frequency bonus tiers
- Daily activities + one-time activities
- AI tools cost system
- 5 levels + 8 badge types

**Dashboard (Turn 10):**
- Star/citation balance display
- Stats: Books Submitted, Reviews Written, Reviews Received
- My Books tab with submission dialog
- Available to Review tab
- My Reviews tab
- My Subscriptions tab

### 3.2 Architecture Overview

```
┌─────────────────────────────────────────────┐
│                 FRONTEND                     │
│  Next.js 14 (App Router) + Tailwind + shadcn │
├─────────────────────────────────────────────┤
│  Pages:                                      │
│  / (Landing)     /about      /pricing        │
│  /books          /books/[id] /contact         │
│  /dashboard      /tools      /leaderboard    │
│  /auth/signin    /auth/signup                 │
├─────────────────────────────────────────────┤
│                 API LAYER                     │
│  /api/auth/[...nextauth]  /api/signup        │
│  /api/books    /api/books/available           │
│  /api/reviews  /api/review-requests           │
│  /api/activities  /api/activities/daily-login  │
│  /api/leaderboard  /api/dashboard/stats       │
│  /api/subscriptions  /api/subscriptions/create │
│  /api/tools/dashboard  /api/contact           │
├─────────────────────────────────────────────┤
│              DATA LAYER                       │
│  Prisma ORM → PostgreSQL                     │
│  11 tables, ~316 rows (seeded)               │
│  NextAuth session management                  │
├─────────────────────────────────────────────┤
│              SERVICES                         │
│  AWS S3 (cover images)                       │
│  PayPal (subscriptions)                      │
│  NextAuth (authentication)                    │
└─────────────────────────────────────────────┘
```

### 3.3 File Structure

```
bookreviewsite/nextjs_space/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── about/page.tsx              # About page
│   ├── books/page.tsx              # Books listing
│   ├── books/[id]/page.tsx         # Book detail
│   ├── contact/page.tsx            # Contact form
│   ├── dashboard/page.tsx          # User dashboard (5 tabs)
│   ├── leaderboard/page.tsx        # Leaderboard (4 tabs)
│   ├── pricing/page.tsx            # Pricing tiers
│   ├── tools/page.tsx              # AI Tools dashboard
│   ├── auth/signin/page.tsx        # Sign in
│   ├── auth/signup/page.tsx        # Sign up
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── signup/route.ts
│       ├── books/route.ts
│       ├── books/available/route.ts
│       ├── reviews/route.ts
│       ├── review-requests/route.ts
│       ├── activities/route.ts
│       ├── activities/daily-login/route.ts
│       ├── leaderboard/route.ts
│       ├── dashboard/stats/route.ts
│       ├── subscriptions/route.ts
│       ├── subscriptions/create/route.ts
│       ├── tools/dashboard/route.ts
│       └── contact/route.ts
├── components/
│   ├── dashboard/
│   │   ├── my-books-tab.tsx
│   │   ├── my-reviews-tab.tsx
│   │   ├── my-subscriptions-tab.tsx
│   │   ├── available-to-review-tab.tsx
│   │   ├── book-submission-dialog.tsx
│   │   └── review-writing-dialog.tsx
│   ├── pricing/
│   │   ├── pricing-hero.tsx
│   │   ├── tools-grid.tsx
│   │   └── paypal-subscribe-button.tsx
│   ├── contact/
│   │   ├── contact-hero.tsx
│   │   └── contact-form.tsx
│   ├── auth/
│   │   ├── signin-form.tsx
│   │   └── signup-form.tsx
│   ├── book-detail.tsx
│   ├── how-it-works-section.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   └── ui/ (shadcn components)
├── lib/
│   ├── auth.ts                     # NextAuth config
│   ├── db.ts                       # Prisma client
│   ├── points-calculator.ts        # Points formula engine
│   ├── utils.ts                    # Utility functions
│   ├── types.ts                    # TypeScript types
│   ├── aws-config.ts               # AWS configuration
│   └── s3.ts                       # S3 upload helpers
├── prisma/
│   └── schema.prisma               # Database schema
├── scripts/
│   └── seed.ts                     # Database seeding
└── .env                            # Environment variables
```

### 3.4 Database Schema Summary

| Table | Rows | Purpose |
|-------|------|---------|
| users | 13 | User accounts with points, levels, badges |
| books | 101 | Book submissions with genre/difficulty |
| reviews | 80 | Book reviews with type, word count, ratings |
| activities | 49 | Points earning activity log |
| badges | 38 | Earned badges per user |
| review_requests | 18 | Author requests for reviews |
| subscriptions | 7 | AI tool subscriptions |
| contact_submissions | 10 | Contact form entries |
| accounts | 0 | OAuth accounts (NextAuth) |
| sessions | 0 | Active sessions (NextAuth) |
| verification_tokens | 0 | Email verification (NextAuth) |

### 3.5 Environment Variables

| Variable | Purpose |
|----------|--------|
| DATABASE_URL | PostgreSQL connection string |
| NEXTAUTH_SECRET | NextAuth encryption key |
| AWS_PROFILE | AWS profile for S3 |
| AWS_REGION | AWS region |
| AWS_BUCKET_NAME | S3 bucket for uploads |
| AWS_FOLDER_PREFIX | S3 folder prefix |
| PAYPAL_CLIENT_ID | PayPal integration |
| PAYPAL_SECRET_KEY | PayPal secret |

### 3.6 API Endpoints

| Endpoint | Methods | Purpose |
|----------|---------|--------|
| /api/auth/[...nextauth] | GET, POST | Authentication |
| /api/signup | POST | User registration |
| /api/books | GET, POST, PUT, DELETE | Book CRUD |
| /api/books/available | GET | Books available for review |
| /api/reviews | GET, POST | Review CRUD + points award |
| /api/review-requests | GET, POST | Review request management |
| /api/activities | GET, POST | Activity logging |
| /api/activities/daily-login | POST | Daily login tracking |
| /api/leaderboard | GET | Leaderboard rankings |
| /api/dashboard/stats | GET | Dashboard statistics |
| /api/subscriptions | GET | User subscriptions |
| /api/subscriptions/create | POST | Create subscription |
| /api/tools/dashboard | GET | AI tools stats |
| /api/contact | POST | Contact form |

---

# PART 4: COMPLETION STATUS

## ✅ FULLY COMPLETED FEATURES

### 1. Landing Page
- **Request:** Turn 0 — Modern landing page like pubby.co
- **Status:** Complete with hero, stats, How It Works section
- **Files:** `app/page.tsx`, `components/how-it-works-section.tsx`

### 2. Authentication System
- **Request:** Turn 2 — Email/password + Google SSO
- **Status:** Complete with NextAuth, sign in/sign up pages
- **Files:** `lib/auth.ts`, `app/auth/signin/page.tsx`, `app/auth/signup/page.tsx`, `app/api/auth/[...nextauth]/route.ts`, `app/api/signup/route.ts`

### 3. Books System
- **Request:** Turn 10 — Book submission, listing, detail pages
- **Status:** Complete with CRUD, status management, cover images
- **Files:** `app/books/page.tsx`, `app/books/[id]/page.tsx`, `app/api/books/route.ts`, `app/api/books/available/route.ts`, `components/dashboard/book-submission-dialog.tsx`

### 4. Review Exchange System
- **Request:** Turn 10 — Write reviews, earn citations
- **Status:** Complete with points calculation, type selection, word count
- **Files:** `app/api/reviews/route.ts`, `components/dashboard/review-writing-dialog.tsx`, `components/dashboard/available-to-review-tab.tsx`

### 5. User Dashboard
- **Request:** Turn 10 — Complete 5-tab dashboard
- **Status:** Complete — Overview, My Books, Available to Review, My Reviews, Subscriptions
- **Files:** `app/dashboard/page.tsx`, all `components/dashboard/*.tsx`

### 6. Points/Citations Calculation Engine
- **Request:** Turn 22 — Full formula implementation
- **Status:** Complete with difficulty multipliers, reviewer types, frequency bonuses
- **Files:** `lib/points-calculator.ts`

### 7. Activity Tracking System
- **Request:** Turn 22 — Daily login, streaks, one-time activities
- **Status:** Complete with all activity types tracked
- **Files:** `app/api/activities/route.ts`, `app/api/activities/daily-login/route.ts`

### 8. Badge System
- **Request:** Turn 22 — 8 badge types with earn conditions
- **Status:** Complete in database schema and badge checking logic
- **Files:** `prisma/schema.prisma` (Badge model), points calculator

### 9. Review Request System
- **Request:** Turn 22 — Authors spend points to request reviews
- **Status:** Complete with cost calculation matching formula
- **Files:** `app/api/review-requests/route.ts`

### 10. Leaderboard
- **Request:** Turn 28 — Top reviewers by points, level, streak
- **Status:** Complete with 4 tabs + winner highlights
- **Files:** `app/leaderboard/page.tsx`, `app/api/leaderboard/route.ts`

### 11. AI Tools Dashboard (Placeholder)
- **Request:** Turn 24 — "placeholder page... tool dashboard and analytics"
- **Status:** Complete as placeholder with point costs displayed
- **Files:** `app/tools/page.tsx`, `app/api/tools/dashboard/route.ts`

### 12. Pricing Page
- **Request:** Turn 2 — AI tools pricing with PayPal
- **Status:** Complete with subscription tiers
- **Files:** `app/pricing/page.tsx`, `components/pricing/*.tsx`

### 13. About Page
- **Status:** Complete
- **Files:** `app/about/page.tsx`

### 14. Contact Page
- **Status:** Complete with form submission
- **Files:** `app/contact/page.tsx`, `components/contact/*.tsx`, `app/api/contact/route.ts`

### 15. Dark Mode
- **Request:** Turn 0 — Dark mode toggle
- **Status:** Complete with theme persistence
- **Files:** `components/theme-provider.tsx`

### 16. Branding Updates
- **Request:** Turns 12, 14, 16-18, 20, 32
- **Status:** Complete — Name "Citeability", no "indie", stars→citations

### 17. Placeholder/Seed Data
- **Request:** Turns 30, 34
- **Status:** Complete — 13 users, 101 books, 80 reviews, activities, badges
- **Files:** `scripts/seed.ts`

### 18. Leaderboard Winners Repositioned
- **Request:** Turn 36 — Move winners under subheader
- **Status:** Complete with gradient card design
- **Files:** `app/leaderboard/page.tsx`

---

## ⚠️ PARTIALLY COMPLETED FEATURES

### 1. Book Submission Dialog — Genre Dropdown & Debut Checkbox
- **Request:** Turn 26 — "Book Submission Dialog Update - Add genre dropdown and debut checkbox (currently accepts string genres)"
- **What IS done:** Genre field exists as free text string, isDebut field in DB schema
- **What is NOT done:** Genre dropdown with the predefined BookGenre enum, debut checkbox in submission form
- **Files to update:** `components/dashboard/book-submission-dialog.tsx`

### 2. Google SSO
- **Request:** Turn 2 — Google SSO authentication
- **What IS done:** NextAuth configured with credentials provider, Google provider referenced in schema
- **What is NOT done:** Google OAuth Client ID/Secret not configured in .env, Google SSO not fully tested
- **Blocker:** Needs Google Cloud Console setup

---

## ❌ NOT STARTED FEATURES

### 1. Amazon API Integration
- **Request:** Turn 24 — "both Amazon API and Manual" / Turn 26 — "Amazon API Integration - Automated verification of Amazon review links"
- **Status:** Not started
- **Reason:** Complex third-party integration, not prioritized in MVP
- **Complexity:** High

### 2. Functional AI Tools (LLM Integration)
- **Request:** Turn 24 — "I would like the page to be the tool dashboard and analytics" / Turn 26 — "Functional AI Tools - Integrate LLM APIs for the AI tools marketplace"
- **Status:** Not started — currently placeholder UI
- **Reason:** Requires LLM API initialization
- **Tools to build:** Blurb Generator (40pts), Query Letter Assistant (75pts), Amazon Review Solicitator (50pts), Marketing Copy Generator (30pts), Cover Design Analysis (150pts), Plot Hole Detector (200pts), Review-to-Blurb Converter (60pts)

### 3. Badge Display — Visual Badge Gallery
- **Request:** Turn 26 — "Badge Display - Visual badge gallery in user profiles"
- **Status:** Not started
- **Reason:** Listed as future enhancement

### 4. Email Notifications
- **Request:** Turn 26 — "Email Notifications - For review requests, streak milestones, level-ups"
- **Status:** Not started
- **Reason:** Listed as future enhancement

### 5. Points History Page
- **Request:** Turn 26 — "Points History Page - Detailed breakdown of all point transactions"
- **Status:** Not started
- **Reason:** Listed as future enhancement
- **Data exists:** Activities table tracks all point transactions

---

## 🐛 KNOWN ISSUES & BUGS

### 1. Text Visibility / Contrast Issues on Books Page
- **Detected by:** Automated tests (multiple turns)
- **Details:** Low contrast text on `/books` page:
  - Author name (span): FG #dfdfe1 on BG #ffffff — ratio 1.33
  - Review count (span): FG #e3e3e5 on BG #ffffff — ratio 1.28
  - Review button: FG #fefeff on BG #eadffc — ratio 1.26
  - Book description (p): FG #e3e3e5 on BG #ffffff — ratio 1.28
- **Status:** Unresolved — reported in multiple test runs
- **Files:** `app/books/page.tsx`

### 2. Broken Amazon Link in Seeds
- **Detected by:** Automated tests
- **Details:** `https://amazon.com/dp/B07X234567` returns 404
- **Status:** Expected — placeholder URL in seed data, not a real bug
- **Impact:** Low — only affects test data links

### 3. Leaderboard Static Generation Warning
- **Detected by:** Build logs
- **Details:** "Route /api/leaderboard couldn't be rendered statically because it used headers"
- **Status:** Non-blocking — works correctly at runtime with dynamic rendering

---

# PART 5: QUALITY ASSURANCE & TESTING

## 5.1 Build Status
- **TypeScript Compilation:** ✅ Passes (0 errors)
- **Next.js Production Build:** ✅ Passes
- **Dev Server:** ✅ Starts successfully
- **Last checkpoint:** "Winners section moved under subheader"

## 5.2 Testing Checklist

**Functional Testing:**
- [x] Landing page loads correctly
- [x] Sign up creates new user
- [x] Sign in authenticates user
- [x] Dashboard displays user stats
- [x] Books listing shows all books
- [x] Book detail page renders
- [x] Review submission awards points
- [x] Leaderboard displays rankings (4 tabs)
- [x] Leaderboard winner cards display correctly
- [x] Contact form submits
- [x] Dark mode toggle works
- [ ] Book submission with genre dropdown (needs update)
- [ ] Amazon review link verification
- [ ] AI tools functional execution
- [ ] Badge gallery display
- [ ] Points history page
- [ ] Email notifications

**Browser/Device Testing:**
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Mobile (iOS)
- [ ] Mobile (Android)

## 5.3 Test Accounts

| Email | Password | Role | Notes |
|-------|----------|------|-------|
| john@doe.com | johndoe123 | Admin | Primary test account |
| sarah.johnson@example.com | password123 | User | Seeded test user |
| michael.chen@example.com | password123 | User | Seeded test user |
| emma.wilson@example.com | password123 | User | Seeded test user |
| david.brown@example.com | password123 | User | Seeded test user |
| +(8 more seeded users) | password123 | User | Various reviewer types/levels |

---

# PART 6: SECURITY & ACCESSIBILITY

## 6.1 Security Checklist
- [x] Passwords hashed (bcrypt via NextAuth)
- [x] Session-based auth with NextAuth
- [x] API routes check session before mutations
- [x] Users can only modify their own data
- [x] Environment variables for secrets
- [x] CSRF protection (NextAuth built-in)
- [ ] Rate limiting on API routes
- [ ] Input sanitization audit

## 6.2 Accessibility Issues
- [ ] Text contrast issues on books page (see Known Issues #1)
- [ ] Full WCAG 2.1 AA audit needed

---

# PART 7: DEPLOYMENT & DEVOPS

## 7.1 Deployment Status
- **Current State:** NOT deployed to any public URL
- **Platform:** Abacus AI hosting
- **Build:** Passing (Next.js standalone output)

## 7.2 Pre-Deployment Checklist
- [x] TypeScript compiles without errors
- [x] Production build succeeds
- [x] Database schema applied
- [x] Seed data populated
- [x] Environment variables configured
- [ ] Fix text contrast issues
- [ ] Google SSO credentials (if needed)
- [ ] Custom domain setup

## 7.3 Environment Variables Required
```
DATABASE_URL=<postgresql connection string>
NEXTAUTH_SECRET=<auto-generated>
AWS_PROFILE=<aws profile>
AWS_REGION=<aws region>
AWS_BUCKET_NAME=<s3 bucket>
AWS_FOLDER_PREFIX=<folder prefix>
PAYPAL_CLIENT_ID=<paypal client id>
PAYPAL_SECRET_KEY=<paypal secret>
```

---

# PART 8: MASTER BUILD SHEET — REMAINING TASKS

## Priority: CRITICAL (Fix Before Deploy)

### ☐ Task 1: Fix Text Contrast Issues on Books Page
- **Based on:** Automated test detection (multiple turns)
- **Current status:** Unresolved
- **What needs to be done:**
  1. Open `app/books/page.tsx`
  2. Update text colors for author name, review count, description, and review button
  3. Ensure minimum 4.5:1 contrast ratio for WCAG AA
- **Complexity:** Simple
- **Priority:** Critical
- **Files:** `app/books/page.tsx`

## Priority: HIGH

### ☐ Task 2: Book Submission Dialog — Genre Dropdown & Debut Checkbox
- **Based on:** Turn 26
- **User requirement:** "Add genre dropdown and debut checkbox (currently accepts string genres)"
- **What needs to be done:**
  1. Replace free-text genre input with dropdown using BookGenre enum values
  2. Add debut author checkbox
  3. Map selected genre to difficulty multiplier automatically
  4. Update `/api/books` POST to handle enum genre and debut flag
- **Complexity:** Medium
- **Files:** `components/dashboard/book-submission-dialog.tsx`, `app/api/books/route.ts`

### ☐ Task 3: Points History Page
- **Based on:** Turn 26
- **User requirement:** "Points History Page - Detailed breakdown of all point transactions"
- **What needs to be done:**
  1. Create `app/points-history/page.tsx`
  2. Create `/api/activities/history` endpoint
  3. Display all activities with timestamps, point amounts, descriptions
  4. Add filters by activity type and date range
  5. Add running balance display
  6. Add link in dashboard and navbar
- **Complexity:** Medium
- **Data:** Activities table already tracks all point transactions

### ☐ Task 4: Badge Display — Visual Gallery
- **Based on:** Turn 26
- **User requirement:** "Badge Display - Visual badge gallery in user profiles"
- **What needs to be done:**
  1. Create badge gallery component with icons and descriptions for all 8 badge types
  2. Add to user dashboard overview section
  3. Show earned vs locked badges
  4. Add badge earn animations/toasts
- **Complexity:** Medium
- **Files:** New component + update `app/dashboard/page.tsx`

## Priority: MEDIUM

### ☐ Task 5: Functional AI Tools (LLM Integration)
- **Based on:** Turn 24, 26
- **User requirement:** "Functional AI Tools - Integrate LLM APIs for the AI tools marketplace"
- **What needs to be done:**
  1. Initialize LLM API (`initialize_llm_apis` tool)
  2. Create individual tool pages/modals for each AI tool
  3. Implement point deduction on tool use
  4. Build UI for each tool:
     - Blurb & Synopsis Generator (40 pts)
     - Query Letter Assistant (75 pts)
     - Amazon Review Solicitator (50 pts)
     - Marketing Copy Generator (30 pts)
     - Cover Design Analysis (150 pts)
     - Plot Hole Detector (200 pts)
     - Review-to-Blurb Converter (60 pts)
  5. Track tool usage in activities
- **Complexity:** Complex
- **Dependencies:** LLM API initialization

### ☐ Task 6: Email Notifications
- **Based on:** Turn 26
- **User requirement:** "Email Notifications - For review requests, streak milestones, level-ups"
- **What needs to be done:**
  1. Initialize notification email system
  2. Register notification types: review request received, streak milestone, level-up
  3. Add notification triggers in relevant API routes
  4. User preference management for notification opt-in/out
- **Complexity:** Medium
- **Dependencies:** `initialize_notification_email` tool

### ☐ Task 7: Amazon API Integration
- **Based on:** Turn 24, 26
- **User requirement:** "both Amazon API and Manual" verification
- **What needs to be done:**
  1. Research Amazon Product Advertising API or scraping alternatives
  2. Implement review link validation
  3. Auto-detect verified purchase status
  4. Add manual verification fallback for admin
- **Complexity:** Complex
- **Dependencies:** Amazon API credentials

## Priority: LOW

### ☐ Task 8: Google SSO Configuration
- **Based on:** Turn 2
- **What needs to be done:**
  1. Set up Google Cloud Console project
  2. Configure OAuth consent screen
  3. Create OAuth 2.0 credentials
  4. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env
  5. Test sign-in flow
- **Complexity:** Medium
- **Dependencies:** Google Cloud Console access

### ☐ Task 9: Multi-Currency Support
- **Based on:** Turn 2 — "Should pricing support multiple currencies? YES"
- **What needs to be done:**
  1. Add currency selector to pricing page
  2. Integrate PayPal multi-currency checkout
  3. Display prices in selected currency
- **Complexity:** Medium

---

## RECOMMENDED BUILD ORDER

```
1. Fix Text Contrast Issues          [CRITICAL, Simple, No Dependencies]
   ↓
2. Genre Dropdown & Debut Checkbox   [HIGH, Medium, No Dependencies]
   ↓
3. Points History Page               [HIGH, Medium, Data Already Exists]
   ↓
4. Badge Gallery                     [HIGH, Medium, Badges Already in DB]
   ↓
5. Functional AI Tools               [MEDIUM, Complex, Needs LLM Init]
   ↓
6. Email Notifications               [MEDIUM, Medium, Needs Notif Init]
   ↓
7. Amazon API Integration            [MEDIUM, Complex, Needs API Keys]
   ↓
8. Google SSO                        [LOW, Medium, Needs Google Console]
   ↓
9. Multi-Currency                    [LOW, Medium, PayPal Config]
```

---

# PART 9: FUTURE ENHANCEMENTS

## 9.1 Requested but Not Yet Implemented

| Feature | Turn | Priority | Effort | Notes |
|---------|------|----------|--------|-------|
| Genre dropdown + debut checkbox | 26 | High | 2-3 hrs | DB ready |
| Amazon API Integration | 24, 26 | Medium | 8-12 hrs | Complex |
| Functional AI Tools | 24, 26 | Medium | 12-16 hrs | 7 tools |
| Badge Gallery | 26 | High | 3-4 hrs | Data ready |
| Email Notifications | 26 | Medium | 4-6 hrs | 3 types |
| Points History Page | 26 | High | 3-4 hrs | Data ready |

## 9.2 Recommended Additional Enhancements

1. **Admin Panel** — Manage books, users, reviews (requested in Turn 0 but not detailed)
2. **Search & Filtering** — Advanced book search by genre, difficulty, author
3. **User Profiles** — Public profiles showing badges, reviews, level
4. **Review Comments** — Ability to comment on reviews
5. **Notification Center** — In-app notification system
6. **Analytics Dashboard** — Site-wide stats for admins
7. **SEO Optimization** — Dynamic meta tags, sitemap, robots.txt
8. **Mobile App** — React Native companion app

---

# PART 10: MAINTENANCE PLAN

## 10.1 Ongoing Tasks

**Daily:**
- [ ] Monitor error logs
- [ ] Check database health

**Weekly:**
- [ ] Review new user signups
- [ ] Check streak calculation accuracy
- [ ] Verify points calculations
- [ ] Back up database

**Monthly:**
- [ ] Security dependency audit
- [ ] Performance review
- [ ] User feedback collection
- [ ] Badge distribution review

## 10.2 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Leaderboard static generation warning | Non-blocking; dynamic route works at runtime |
| Contrast issues on books page | Update text colors to meet WCAG AA (4.5:1 ratio) |
| Amazon placeholder links 404 | Expected — seed data uses fake URLs |

---

# PART 11: COMPREHENSIVE SUMMARY

## 11.1 Executive Summary

- **Project:** Citeability — Author Book Review Exchange Platform
- **Purpose:** Authors exchange book reviews to earn citations/points, spend on getting reviews and AI tools
- **Current Status:** ~75% complete (core platform functional)
- **Health:** 🟡 Yellow — Core features work, but contrast issues and missing enhancements remain

## 11.2 Statistics

| Metric | Count |
|--------|-------|
| Total conversation turns | 39 |
| Total projects | 1 |
| Total features requested | 24 |
| Features fully completed | 18 |
| Features partially completed | 2 |
| Features not started | 6 |
| Known bugs/issues | 3 |
| Database tables | 11 |
| Database rows (seeded) | ~316 |
| API endpoints | 14 |
| Pages | 11 |
| Components created | 15+ |

## 11.3 Key Decisions Made

1. **Turn 2:** Courses → AI Tools (user correction)
2. **Turn 2:** Stripe → PayPal (user preference)
3. **Turn 14:** BookReviewSite → Citeability (rebrand)
4. **Turn 20:** Stars → Citations (terminology)
5. **Turn 22:** Points = Citations for math (user clarification)
6. **Turn 24:** Full system implementation (not phased)
7. **Turn 24:** AI tools as placeholder dashboard first
8. **Turn 24:** Both Amazon API + manual verification

## 11.4 Immediate Next Steps

1. **Fix text contrast issues** on books page (critical for accessibility)
2. **Add genre dropdown & debut checkbox** to book submission dialog
3. **Create points history page** (data already exists in activities table)
4. **Build badge gallery** component for dashboard
5. **Deploy to production** once contrast issues are fixed
6. **Set up Google SSO** if needed for launch

## 11.5 Critical Context

- The app is NOT yet deployed publicly
- Database is shared between dev and production environments
- 13 test users exist with varied levels and stats
- PayPal credentials are configured but subscriptions are placeholder
- The points formula is: `Total Points = (Book Difficulty Multiplier) × (Reviewer Type Value + Frequency Bonus)`
- Admin account: john@doe.com / johndoe123

---

*Document generated: April 13, 2026*
*Project path: /home/ubuntu/bookreviewsite*
*Last checkpoint: "Winners section moved under subheader"*
