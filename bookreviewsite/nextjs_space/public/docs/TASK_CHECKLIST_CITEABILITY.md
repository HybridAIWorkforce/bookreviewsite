# ✅ TASK CHECKLIST — CITEABILITY
## Prioritized & Actionable Task List
### Generated: April 13, 2026

---

## 🔴 CRITICAL (Do First)

### ☐ 1. Fix Text Contrast/Visibility Issues
- **Priority:** CRITICAL
- **Effort:** 2-3 hours
- **Impact:** Usability — users can't read text on some pages
- **Steps:**
  1. Audit all pages in both light and dark mode
  2. Identify all low-contrast text elements
  3. Update Tailwind CSS classes for proper contrast ratios
  4. Verify WCAG AA compliance (4.5:1 for normal text)
- **Files:** Multiple component files across `/components/`

### ☐ 2. Verify/Fix Navbar Citation Balance Fetch
- **Priority:** CRITICAL
- **Effort:** 30 minutes
- **Impact:** Citation balance may not display correctly
- **Steps:**
  1. Check if `/api/dashboard` exists or if it should be `/api/tools/dashboard`
  2. Create lightweight `/api/user/balance` endpoint if needed
  3. Verify balance displays on all pages
- **Files:** `components/navbar.tsx`

### ☐ 3. Build Admin Book Approval Panel
- **Priority:** CRITICAL
- **Effort:** 3-4 hours
- **Impact:** Books stuck in PENDING status with no way to approve
- **Steps:**
  1. Create `/app/admin/books/page.tsx` — list all PENDING books
  2. Create `/app/api/admin/books/route.ts` — approve/reject endpoints
  3. Add admin middleware/guard
  4. Add admin link in navbar (visible to admin users only)
- **Files to Create:** `app/admin/books/page.tsx`, `app/api/admin/books/route.ts`

---

## 🟡 HIGH PRIORITY

### ☐ 4. Connect AI Tools to LLM API
- **Priority:** HIGH
- **Effort:** 6-8 hours
- **Impact:** Core value proposition — currently placeholder only
- **Steps:**
  1. Call `initialize_llm_apis` tool
  2. Design prompts for each of the 7 AI tools:
     - Blurb Generator (40 Citations)
     - Query Letter Assistant (75 Citations)
     - Review Solicitator (50 Citations)
     - Marketing Copy Generator (30 Citations)
     - Cover Design Analysis (150 Citations)
     - Plot Hole Detector (200 Citations)
     - Review to Blurb Converter (60 Citations)
  3. Update `POST /api/tools/dashboard` to call LLM API
  4. Create response display UI with markdown rendering
  5. Add input forms specific to each tool
- **Files:** `app/api/tools/dashboard/route.ts`, `app/tools/page.tsx`

### ☐ 5. Fix/Replace Broken Amazon Links in Seed Data
- **Priority:** HIGH
- **Effort:** 1 hour
- **Steps:**
  1. Replace all `amazon.com/dp/...` placeholder URLs with `#` or remove
  2. Re-run seed script
- **Files:** `scripts/seed.ts`

### ☐ 6. Complete Book Cover Image Upload
- **Priority:** HIGH
- **Effort:** 3-4 hours
- **Steps:**
  1. Verify S3 presigned URL generation works
  2. Add drag-and-drop file upload to book submission dialog
  3. Show preview before submission
  4. Store cloud_storage_path in database
- **Files:** `components/dashboard/book-submission-dialog.tsx`, new API route

---

## 🟢 MEDIUM PRIORITY

### ☐ 7. Email Notifications Setup
- **Priority:** MEDIUM
- **Effort:** 2-3 hours
- **Types to implement:**
  - Contact form submission → Admin
  - New review received on your book → User
  - Review request received → User
- **Steps:**
  1. Call `initialize_notification_email`
  2. Register 3 notification types
  3. Add email sending to relevant API routes

### ☐ 8. Google SSO Configuration
- **Priority:** MEDIUM
- **Effort:** 1 hour
- **Steps:**
  1. Get `get_implementation_guidelines` for GOOGLE_SSO
  2. Follow setup instructions
  3. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env
  4. Test login flow

### ☐ 9. Points History / Activity Log Page
- **Priority:** MEDIUM
- **Effort:** 2-3 hours
- **Steps:**
  1. Create `/app/history/page.tsx`
  2. Display all activities with timestamps and point values
  3. Add filtering by activity type
  4. Add pagination

### ☐ 10. Badge Gallery Page
- **Priority:** MEDIUM
- **Effort:** 2-3 hours
- **Steps:**
  1. Create `/app/badges/page.tsx`
  2. Display all available badges with descriptions
  3. Show which badges user has earned (highlighted)
  4. Show progress toward unearned badges

---

## 🔵 LOW PRIORITY

### ☐ 11. Social Media Share Tracking
- **Priority:** LOW
- **Effort:** 2-3 hours
- **Description:** Implement share buttons with tracking for SHARE_REVIEW activity

### ☐ 12. Amazon Review Link Verification
- **Priority:** LOW
- **Effort:** 4-6 hours
- **Description:** Validate that submitted Amazon links actually point to reviews

### ☐ 13. Author Profile Pages
- **Priority:** LOW
- **Effort:** 2-3 hours
- **Description:** Public profile pages showing author's books and review stats

### ☐ 14. Reading Lists / Wishlists
- **Priority:** LOW
- **Effort:** 3-4 hours
- **Description:** Allow users to save books to personal reading lists

### ☐ 15. Review Comments / Replies
- **Priority:** LOW
- **Effort:** 4-5 hours
- **Description:** Add threaded comments on reviews for community interaction

---

## 🚀 DEPLOYMENT

### ☐ 16. Deploy to Production
- **Priority:** HIGH (after tasks 1-3)
- **Effort:** 30 minutes
- **Steps:**
  1. Verify build passes
  2. Run `deploy_nextjs_project`
  3. Verify deployed app works
  4. Configure custom domain (optional)

---

## RECOMMENDED BUILD ORDER

| Phase | Tasks | Timeline |
|-------|-------|----------|
| **Phase 1: Critical Fixes** | #1, #2, #3 | Day 1 |
| **Phase 2: Core Features** | #4, #5, #6 | Day 2-3 |
| **Phase 3: Deploy** | #16 | Day 3 |
| **Phase 4: Enhancements** | #7, #8, #9, #10 | Day 4-5 |
| **Phase 5: Polish** | #11-15 | Week 2 |

---

## COMPLETION CRITERIA

- [ ] All 11 pages render correctly in both themes
- [ ] All text has proper contrast (WCAG AA)
- [ ] Admin can approve/reject books
- [ ] AI tools generate real content
- [ ] Citation balance displays correctly
- [ ] All seed data has valid links
- [ ] Book covers can be uploaded
- [ ] Email notifications working
- [ ] App deployed to production
- [ ] All automated tests passing

---

*Task Checklist for Citeability — April 13, 2026*
