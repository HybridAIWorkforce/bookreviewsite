# TASK CHECKLIST — CITEABILITY
## Prioritized Action Items
### Generated: April 13, 2026

---

## PHASE 1: CRITICAL FIXES (Do Immediately)

### ☐ 1.1 Fix Text Contrast Issues on Books Page
- **Priority:** 🔴 Critical
- **Complexity:** Simple (1-2 hours)
- **File:** `app/books/page.tsx`
- **Issue:** Author name, review count, description, and Review button have contrast ratios below 1.5:1 (WCAG requires 4.5:1)
- **Steps:**
  1. Find all `text-muted-foreground` or light-colored text on the books page
  2. Replace with darker colors: use `text-foreground` for primary text, `text-muted-foreground` with proper theme values
  3. Ensure Review button has adequate contrast between text and background
  4. Test in both light and dark mode
- **Definition of Done:** All text on `/books` passes 4.5:1 contrast ratio

---

## PHASE 2: HIGH PRIORITY FEATURES

### ☐ 2.1 Genre Dropdown & Debut Checkbox in Book Submission
- **Priority:** 🟠 High
- **Complexity:** Medium (2-3 hours)
- **Files:** `components/dashboard/book-submission-dialog.tsx`, `app/api/books/route.ts`
- **Steps:**
  1. Import BookGenre enum values
  2. Replace free-text genre input with `<Select>` dropdown
  3. Map genre labels to human-readable names
  4. Add "Debut Author" checkbox
  5. Auto-calculate difficulty multiplier based on genre selection
  6. Update API route to validate genre enum
  7. Test submission flow
- **Definition of Done:** Book submission uses genre dropdown with all 17 genres, debut checkbox works

### ☐ 2.2 Points History Page
- **Priority:** 🟠 High
- **Complexity:** Medium (3-4 hours)
- **Dependencies:** Activity data already exists (49 rows)
- **Steps:**
  1. Create `app/points-history/page.tsx`
  2. Create `app/api/activities/history/route.ts` with pagination
  3. Display activities in a table: Date, Type, Points, Description
  4. Add filters: activity type dropdown, date range picker
  5. Show running balance
  6. Add "Points History" link to dashboard and navbar
- **Definition of Done:** Users can view all point transactions with filtering

### ☐ 2.3 Visual Badge Gallery
- **Priority:** 🟠 High
- **Complexity:** Medium (3-4 hours)
- **Dependencies:** Badge data exists (38 rows)
- **Steps:**
  1. Create `components/dashboard/badge-gallery.tsx`
  2. Design badge icons/visuals for all 8 badge types
  3. Show earned badges with glow/color, locked badges greyed out
  4. Add badge descriptions and earn requirements
  5. Integrate into dashboard overview section
  6. Add earn notifications when new badge is unlocked
- **Definition of Done:** Dashboard shows visual badge grid with earned/locked states

---

## PHASE 3: MEDIUM PRIORITY FEATURES

### ☐ 3.1 Functional AI Tools with LLM
- **Priority:** 🟡 Medium
- **Complexity:** Complex (12-16 hours)
- **Dependencies:** LLM API initialization required
- **Steps:**
  1. Call `initialize_llm_apis` tool
  2. Create tool execution API: `/api/tools/execute/route.ts`
  3. Implement each tool:
     - Blurb & Synopsis Generator (40 pts) — Input: book description → Output: blurb
     - Query Letter Assistant (75 pts) — Input: book details → Output: query letter
     - Amazon Review Solicitator (50 pts) — Input: book + target → Output: email draft
     - Marketing Copy Generator (30 pts) — Input: book → Output: social media copy
     - Cover Design Analysis (150 pts) — Input: cover image → Output: analysis
     - Plot Hole Detector (200 pts) — Input: manuscript excerpt → Output: analysis
     - Review-to-Blurb Converter (60 pts) — Input: reviews → Output: marketing blurbs
  4. Deduct points on execution
  5. Track usage in activities table
  6. Update tools page with functional modals
- **Definition of Done:** All 7 AI tools are functional, deduct points, produce results

### ☐ 3.2 Email Notifications
- **Priority:** 🟡 Medium
- **Complexity:** Medium (4-6 hours)
- **Dependencies:** Notification email initialization required
- **Steps:**
  1. Call `initialize_notification_email` tool
  2. Register notification types:
     - "Review Request Received" (USER)
     - "Streak Milestone" (USER)
     - "Level Up" (USER)
  3. Add triggers in:
     - `/api/review-requests` POST → notify reviewer
     - `/api/activities/daily-login` → check streak milestones
     - Points calculator → check level-up
  4. User notification preferences page
- **Definition of Done:** Users receive emails for review requests, streaks, level-ups

### ☐ 3.3 Amazon API Integration
- **Priority:** 🟡 Medium
- **Complexity:** Complex (8-12 hours)
- **Dependencies:** Amazon API credentials, may require Amazon Associates account
- **Steps:**
  1. Research Amazon Product Advertising API v5
  2. Configure API credentials
  3. Create `/api/amazon/verify/route.ts`
  4. Validate review URLs exist on Amazon
  5. Detect verified purchase status
  6. Add admin manual verification fallback
  7. Update review submission flow
- **Definition of Done:** Amazon review links are automatically verified, manual fallback works

---

## PHASE 4: LOW PRIORITY

### ☐ 4.1 Google SSO Setup
- **Priority:** 🟢 Low
- **Complexity:** Medium (2-3 hours)
- **Steps:**
  1. Create Google Cloud project
  2. Configure OAuth consent screen
  3. Generate Client ID + Secret
  4. Add to .env
  5. Test Google sign-in flow
- **Definition of Done:** Users can sign in with Google

### ☐ 4.2 Multi-Currency Support
- **Priority:** 🟢 Low
- **Complexity:** Medium (4-6 hours)
- **Steps:**
  1. Add currency selector to pricing page
  2. Configure PayPal multi-currency
  3. Display prices in selected currency
- **Definition of Done:** Pricing page supports USD, EUR, GBP

### ☐ 4.3 Admin Panel
- **Priority:** 🟢 Low
- **Complexity:** Complex (8-12 hours)
- **Steps:**
  1. Create `/admin` route with admin-only access
  2. User management: view/edit/ban users
  3. Book moderation: approve/reject submissions
  4. Review moderation
  5. Site analytics dashboard
- **Definition of Done:** Admins can manage users, books, reviews

---

## COMPLETION CRITERIA

- [ ] All text contrast issues fixed
- [ ] Genre dropdown & debut checkbox working
- [ ] Points history page functional
- [ ] Badge gallery visible in dashboard
- [ ] AI tools functional with LLM
- [ ] Email notifications configured
- [ ] Amazon review verification working
- [ ] Google SSO configured
- [ ] Multi-currency support
- [ ] Admin panel
- [ ] Full testing completed
- [ ] Deployed to production

---

*Document generated: April 13, 2026*
