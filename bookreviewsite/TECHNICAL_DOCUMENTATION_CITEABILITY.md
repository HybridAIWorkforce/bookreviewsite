# TECHNICAL DOCUMENTATION — CITEABILITY
## Complete Technical Reference
### Generated: April 13, 2026

---

## 1. TECHNOLOGY STACK

| Layer | Technology | Version |
|-------|-----------|--------|
| Frontend | Next.js (App Router) | 14.2.28 |
| UI Framework | Tailwind CSS | 3.x |
| Component Library | shadcn/ui | Latest |
| Backend | Next.js API Routes | 14.2.28 |
| ORM | Prisma | Latest |
| Database | PostgreSQL | Hosted |
| Authentication | NextAuth.js | Latest |
| File Storage | AWS S3 | - |
| Payments | PayPal SDK | - |
| Icons | Lucide React | Latest |
| Language | TypeScript | 5.x |

---

## 2. DATABASE SCHEMA

### Entity Relationship Diagram (ASCII)

```
┌──────────────────┐     ┌──────────────────┐
│      User        │────<│     Account      │
│──────────────────│     │──────────────────│
│ id (PK)          │     │ id (PK)          │
│ email (unique)   │     │ userId (FK)      │
│ password         │     │ provider         │
│ name             │     │ providerAccountId│
│ bio              │     └──────────────────┘
│ citationBalance  │
│ reviewerType     │     ┌──────────────────┐
│ reviewCount      │────<│    Session       │
│ level            │     │──────────────────│
│ streakDays       │     │ id (PK)          │
│ lastLoginDate    │     │ userId (FK)      │
│ amazonProfileLink│     │ sessionToken     │
│ profileCompleted │     │ expires          │
│ socialMediaBoost │     └──────────────────┘
│ amazonProfileLink│
│ darkMode         │     ┌──────────────────┐
│ createdAt        │────<│     Book         │
│ updatedAt        │     │──────────────────│
│ isAdmin          │     │ id (PK)          │
└──────────────────┘     │ userId (FK)      │
    │  │  │  │           │ title            │
    │  │  │  │           │ authorName       │
    │  │  │  │           │ genre            │
    │  │  │  │           │ description      │
    │  │  │  │           │ coverImageUrl    │
    │  │  │  │           │ bookLink         │
    │  │  │  │           │ status           │
    │  │  │  │           │ citationsRequired│
    │  │  │  │           │ isDebut          │
    │  │  │  │           │ difficultyMultiplier│
    │  │  │  │           └──────────────────┘
    │  │  │  │                │
    │  │  │  │           ┌────┴─────────────┐
    │  │  │  └──────────<│    Review        │
    │  │  │              │──────────────────│
    │  │  │              │ id (PK)          │
    │  │  │              │ reviewerId (FK)  │
    │  │  │              │ bookId (FK)      │
    │  │  │              │ rating (1-5)     │
    │  │  │              │ reviewText       │
    │  │  │              │ reviewType       │
    │  │  │              │ amazonVerified   │
    │  │  │              │ amazonLink       │
    │  │  │              │ wordCount        │
    │  │  │              │ citationsEarned  │
    │  │  │              └──────────────────┘
    │  │  │
    │  │  └─────────────<┌──────────────────┐
    │  │                 │   Activity       │
    │  │                 │──────────────────│
    │  │                 │ id (PK)          │
    │  │                 │ userId (FK)      │
    │  │                 │ activityType     │
    │  │                 │ pointsEarned     │
    │  │                 │ metadata (JSON)  │
    │  │                 └──────────────────┘
    │  │
    │  └────────────────<┌──────────────────┐
    │                    │     Badge        │
    │                    │──────────────────│
    │                    │ id (PK)          │
    │                    │ userId (FK)      │
    │                    │ badgeType        │
    │                    │ earnedAt         │
    │                    └──────────────────┘
    │
    ├───────────────────<┌──────────────────┐
    │                    │  Subscription    │
    │                    │──────────────────│
    │                    │ id (PK)          │
    │                    │ userId (FK)      │
    │                    │ toolName         │
    │                    │ paypalSubId      │
    │                    │ status           │
    │                    │ monthlyPrice     │
    │                    └──────────────────┘
    │
    └───────────────────<┌──────────────────┐
                         │ ReviewRequest    │
                         │──────────────────│
                         │ id (PK)          │
                         │ authorId (FK)    │
                         │ bookId (FK)      │
                         │ reviewerId (FK)  │
                         │ reviewerType     │
                         │ pointsCost       │
                         │ status           │
                         └──────────────────┘
```

### Enums

| Enum | Values |
|------|--------|
| ReviewerType | VERIFIER (150), ADVOCATE (100), INSIDER (50), SUPPORTER (25) |
| BookStatus | PENDING, APPROVED, REJECTED |
| BookGenre | POETRY, LITERARY_FICTION, SHORT_STORIES, NOVELLAS, TRANSLATED_WORKS, SPECIALIZED_NON_FICTION, CHILDREN_PICTURE_BOOKS, MIDDLE_GRADE, MAINSTREAM_NON_FICTION, HISTORICAL_FICTION, COZY_MYSTERIES, WESTERNS, ROMANCE, FANTASY, SCIENCE_FICTION, THRILLERS, YOUNG_ADULT |
| SubscriptionStatus | ACTIVE, CANCELLED, EXPIRED, PENDING |
| ActivityType | DAILY_LOGIN, REVIEW_WRITTEN, BOOK_ADDED, PROFILE_COMPLETED, AMAZON_LINKED, SOCIAL_MEDIA_BOOST, SHARE_REVIEW, LEVEL_UP, STREAK_7_DAY, STREAK_30_DAY, REVIEW_WEEK_STREAK |
| BadgeType | RELIABLE_READER, AMAZON_CRITIC, VERIFIED_AUTHORITY, REVIEW_LUMINARY, AMAZON_VERIFIED, TOP_100_REVIEWER, GENRE_EXPERT, WEEKLY_WARRIOR |
| ReviewRequestStatus | PENDING, ACCEPTED, COMPLETED, CANCELLED |
| ContactStatus | PENDING, RESPONDED, CLOSED |

---

## 3. POINTS CALCULATION ENGINE

### Core Formula
```
Total Points = (Book Difficulty Multiplier) × (Reviewer Type Value + Frequency Bonus)
```

### Book Difficulty Multipliers

| Category | Genres | Multiplier |
|----------|--------|------------|
| High Difficulty | Poetry, Literary Fiction, Short Stories, Novellas, Translated Works | 2.0x |
| Medium-High | Specialized Non-Fiction, Children's Picture Books, Middle Grade | 1.5x |
| Medium | Mainstream Non-Fiction, Historical Fiction, Cozy Mysteries, Westerns | 1.2x |
| Low | Romance, Fantasy, Sci-Fi, Thrillers, Young Adult | 1.0x |
| Debut Bonus | Any debut author's first book | +0.3 |

### Reviewer Type Base Values

| Type | Title | Base Value | Requirement |
|------|-------|------------|-------------|
| VERIFIER | The Verifier | 150 | Verified Purchase Amazon Review + link |
| ADVOCATE | The Advocate | 100 | Non-Verified Amazon Review + link |
| INSIDER | The Insider | 50 | 300+ word site review |
| SUPPORTER | The Supporter | 25 | 150+ word site review |

### Frequency Bonus

| Reviews | Tier | Bonus |
|---------|------|-------|
| 1-5 | New Reviewer | +0 |
| 6-15 | Active Reviewer | +15 |
| 16-30 | Prolific Reviewer | +25 |
| 31-50 | Expert Reviewer | +40 |
| 51+ | Master Reviewer | +60 |

### Example Calculations

**High-Value:** Debut Poetry (2.3x) × Master VERIFIER (150+60) = 2.3 × 210 = **483 points**

**Standard:** Romance (1.0x) × Active INSIDER (50+15) = 1.0 × 65 = **65 points**

### Levels

| Level | Name | Points | Badge |
|-------|------|--------|-------|
| 1 | Apprentice | 0-99 | — |
| 2 | Contributor | 100-299 | Reliable Reader |
| 3 | Critic | 300-699 | Amazon Critic |
| 4 | Authority | 700-1499 | Verified Authority |
| 5 | Luminary | 1500+ | Review Luminary |

### AI Tools Costs

| Tool | Cost |
|------|------|
| Blurb & Synopsis Generator | 40 pts |
| Marketing Copy Generator | 30 pts |
| Amazon Review Solicitator | 50 pts |
| Review-to-Blurb Converter | 60 pts |
| Query Letter Assistant | 75 pts |
| Cover Design Analysis | 150 pts |
| Plot Hole Detector | 200 pts |

---

## 4. API REFERENCE

### Authentication

#### POST /api/auth/[...nextauth]
NextAuth.js handler — supports credentials and Google providers.

#### POST /api/signup
**Body:** `{ email, password, name }`
**Response:** `{ user: { id, email, name } }`

### Books

#### GET /api/books
Returns current user's books.
**Auth:** Required

#### POST /api/books
Create a new book submission.
**Body:** `{ title, authorName, genre, description, coverImageUrl?, bookLink? }`
**Awards:** 30 points (one-time per book)

#### PUT /api/books
Update a book.
**Body:** `{ id, title?, authorName?, genre?, description?, coverImageUrl?, bookLink? }`

#### DELETE /api/books
Delete a book.
**Body:** `{ id }`

#### GET /api/books/available
Returns approved books from other authors that the current user hasn't reviewed.

### Reviews

#### GET /api/reviews
Returns current user's reviews.

#### POST /api/reviews
Submit a review and earn points.
**Body:** `{ bookId, rating, reviewText, reviewType?, amazonLink? }`
**Points:** Calculated using core formula

### Activities

#### GET /api/activities
Returns current user's activity history.

#### POST /api/activities
Log an activity.
**Body:** `{ activityType, metadata? }`

#### POST /api/activities/daily-login
Record daily login, update streaks.
**Awards:** 5 points + streak bonuses

### Leaderboard

#### GET /api/leaderboard?type=points&limit=50
Returns ranked users.
**Types:** points, level, streak, reviews

### Review Requests

#### GET /api/review-requests
Returns user's review requests (sent and received).

#### POST /api/review-requests
Create a review request (costs points).
**Body:** `{ bookId, reviewerType }`

### Subscriptions

#### GET /api/subscriptions
Returns user's active subscriptions.

#### POST /api/subscriptions/create
Create a new subscription.

### Dashboard

#### GET /api/dashboard/stats
Returns user's dashboard statistics.

#### GET /api/tools/dashboard
Returns AI tools usage stats.

### Contact

#### POST /api/contact
Submit contact form.
**Body:** `{ name, email, subject, message }`

---

## 5. COMPONENT ARCHITECTURE

### Dashboard Components

```
app/dashboard/page.tsx
├── Overview Tab (inline)
│   ├── Citation Balance Card
│   ├── Level Progress Bar
│   ├── Stats Grid (Books, Reviews Written, Reviews Received)
│   └── Streak Display
├── components/dashboard/my-books-tab.tsx
│   └── components/dashboard/book-submission-dialog.tsx
├── components/dashboard/available-to-review-tab.tsx
│   └── components/dashboard/review-writing-dialog.tsx
├── components/dashboard/my-reviews-tab.tsx
└── components/dashboard/my-subscriptions-tab.tsx
```

### Key Library Files

- **lib/points-calculator.ts** — Core points formula, difficulty multipliers, frequency bonuses, level calculation
- **lib/auth.ts** — NextAuth configuration with credentials provider
- **lib/db.ts** — Prisma client singleton
- **lib/s3.ts** — S3 upload/download helpers
- **lib/aws-config.ts** — AWS SDK configuration

---

## 6. AUTHENTICATION FLOW

```
User visits site
    ↓
┌─ Not authenticated ─────────────────┐
│  /auth/signin or /auth/signup       │
│  ↓                                   │
│  Credentials: email + password       │
│  (or Google SSO - not configured)    │
│  ↓                                   │
│  NextAuth validates credentials      │
│  ↓                                   │
│  Session created                     │
│  ↓                                   │
│  Redirect to /dashboard              │
└─────────────────────────────────────┘
    ↓
┌─ Authenticated ─────────────────────┐
│  Protected routes: /dashboard,      │
│  /tools, API routes                 │
│  ↓                                   │
│  Session checked via getServerSession│
│  or useSession() hook               │
└─────────────────────────────────────┘
```

---

*Document generated: April 13, 2026*
