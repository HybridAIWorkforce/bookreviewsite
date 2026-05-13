# 📝 CONVERSATION TRANSCRIPT — CITEABILITY
## Complete Conversation Record
### Generated: April 13, 2026

---

## Turn 0 — USER

**Topic:** Citations System Specification

The user provided a comprehensive specification for the points system:

> here isw how i want to use the point system(called Cetetions) to be set up for review credits (citations)

### Specification Provided:

**1. Core Amazon Review Value Formula:**
```
Total Points = (Book Difficulty Multiplier) × (Reviewer Type Value + Reviewer Frequency Bonus)
```

**A. Book Difficulty Multiplier:**
| Category | Books Included | Multiplier |
|---------|----------------|------------|
| High Difficulty (2.0x) | Poetry, Literary Fiction, Short Stories, Novellas, Translated Works | 2.0 |
| Medium-High Difficulty (1.5x) | Specialized Non-Fiction, Children's Picture Books, Middle Grade | 1.5 |
| Medium Difficulty (1.2x) | Mainstream Non-Fiction, Historical Fiction, Cozy Mysteries, Westerns | 1.2 |
| Low Difficulty (1.0x) | Romance, Fantasy, Science Fiction, Thrillers, Young Adult | 1.0 |

**Debut Author Bonus:** +0.3 to multiplier

**B. Reviewer Type Values:**
| Type | Description | Base Value |
|------|-------------|------------|
| Type 1: The Verifier | Verified Purchase Review on Amazon | 150 |
| Type 2: The Advocate | Non-Verified Amazon Review | 100 |
| Type 3: The Insider | Detailed Site Review (300+ words) | 50 |
| Type 4: The Supporter | Standard Site Review (150+ words) | 25 |

**C. Frequency Bonuses:**
| Tier | Reviews | Bonus |
|------|---------|-------|
| New Reviewer | 0-5 | +0 |
| Active Reviewer | 6-15 | +15 |
| Prolific Reviewer | 16-30 | +25 |
| Expert Reviewer | 31-50 | +40 |
| Master Reviewer | 51+ | +60 |

**2. Points Earning (Daily Activities):**
- Daily Login: 5 points
- Each Review: formula-based
- Adding a Book: 30 points

**3. One-Time Activities:**
- Complete Profile: 20 points
- Link Amazon Profile: 25 points
- Social Media Boost: 100 points

**4. Points Spending (Citation-Based Exchange):**
- Blurb Generator: 40 Citations
- Query Letter Assistant: 75 Citations
- Review Solicitator: 50 Citations
- Marketing Copy Generator: 30 Citations
- Cover Design Analysis: 150 Citations
- Plot Hole Detector: 200 Citations
- Review to Blurb Converter: 60 Citations

**5. Gamification — Reviewer Levels:**
| Level | Name | Citations Required |
|-------|------|--------------------|
| 1 | Apprentice | 0 |
| 2 | Contributor | 100 |
| 3 | Critic | 300 |
| 4 | Authority | 700 |
| 5 | Luminary | 1500 |

**6. Special Badges:**
- Level 2: Reliable Reader
- Level 3: Amazon Critic
- Level 4: Verified Authority
- Level 5: Review Luminary
- Amazon Verified: 5+ Verified Purchase reviews
- Top 100 Reviewer: Linked Amazon Top 100 profile
- Genre Expert: Consistent reviews in one genre
- Weekly Warrior: 4-week review streak

**7. Example Calculations:**
- High-Value: Debut Poetry × Master Verifier = 2.3 × 210 = 483
- Standard: Romance × Active Supporter = 1.0 × 65 = 65

---

## Turn 1 — ASSISTANT

**Action:** Full implementation of the Citations system

**Files Created/Modified:**
- `prisma/schema.prisma` — Added Activity, Badge, ReviewRequest models; ReviewerType, BookGenre, ActivityType, BadgeType enums; updated User, Book, Review models
- `lib/points-calculator.ts` — Created complete calculation engine
- `app/api/books/route.ts` — Updated POST to auto-calculate difficulty multiplier and award Citations
- `app/api/reviews/route.ts` — Updated POST to auto-calculate review Citations
- `app/api/activities/route.ts` — Created activity tracking API
- `app/api/activities/daily-login/route.ts` — Created daily login bonus API
- `app/api/tools/dashboard/route.ts` — Created AI tools dashboard API
- `app/api/review-requests/route.ts` — Created review request API
- `app/api/leaderboard/route.ts` — Created leaderboard API
- `components/dashboard/review-writing-dialog.tsx` — Updated terminology
- `app/tools/page.tsx` — Updated terminology
- `app/leaderboard/page.tsx` — Updated terminology

**Key Outcome:** Full Citations system implemented, all terminology updated from "Points"/"Stars" to "Citations", build passing.

---

## Turn 2 — USER

> is it set up so when a author up loades a book the points auto calucuate

---

## Turn 3 — ASSISTANT

**Action:** Verified auto-calculation system

Confirmed that:
1. **Book Upload:** `POST /api/books` auto-calculates `difficultyMultiplier` from genre + debut status, awards 30 Citations
2. **Review Creation:** `POST /api/reviews` auto-calculates Citations using `calculateReviewPoints()` function
3. **All updates automatic:** balance, review count, level, activity log

---

## Turn 4 — USER

> can you load some place holder and the hovering credit mbar

---

## Turn 5 — ASSISTANT

**Action:** Began reading seed file and navbar for implementation planning.

---

## Turn 6 — USER

> what is the trial useer name and password

---

## Turn 7 — ASSISTANT

**Action:** Looked up and provided test credentials:

- **Main Admin:** john@doe.com / johndoe123
- **Test Users:** sarah.johnson@example.com, michael.chen@example.com, emma.wilson@example.com, david.brown@example.com, alex.rodriguez@example.com, jessica.martinez@example.com, ryan.thompson@example.com — all with password `password123`

Asked user to confirm they wanted both placeholder data and credit bar implemented.

---

## Turn 8 — USER

> yes to 1 and 2

---

## Turn 9 — ASSISTANT

**Action:** Implemented placeholder data and hovering credit bar

**Seed Data Added:**
- 13 total users (admin + 12 test users with varied stats)
- 101 books across multiple genres
- 80 reviews with varied ratings and types
- 49 activities (logins, reviews, book adds)
- 38 badges across users
- 18 review requests
- 7 subscriptions

**Credit Bar Added to Navbar:**
- Gold coin icon (`Coins` from Lucide)
- Fetches balance from `/api/dashboard`
- Formatted number display
- Hover effects
- Responsive (desktop and mobile)

**Rich Test Accounts Created:**
- alex.rodriguez@example.com — 7,500 Citations
- daniel.lee@example.com — 9,200 Citations
- emma.wilson@example.com — 5,800 Citations

**Build:** Passed ✅
**Checkpoint:** Saved ✅

---

## Turn 10 — USER

> you need to up dt the example book for review to the correct citation value

---

## Turn 11 — ASSISTANT

**Action:** Fixed citation value display in How It Works section

**Change Made:**
- **File:** `components/how-it-works-section.tsx`
- **Before:** "Get **1 citation** for each quality review"
- **After:** "Earn **25-150+ Citations** per review based on quality, length, and verification status"

**Build:** Passed ✅
**Checkpoint:** Saved ✅

---

## Turn 12 — USER

Requested comprehensive conversation audit and master build sheet documentation.

---

## Turn 13 — ASSISTANT

*This document and associated files.*

---

*Transcript generated for Citeability — April 13, 2026*
