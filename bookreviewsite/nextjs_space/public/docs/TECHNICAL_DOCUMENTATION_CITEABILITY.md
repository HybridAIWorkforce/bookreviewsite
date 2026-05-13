# 🔧 TECHNICAL DOCUMENTATION — CITEABILITY
## Book Review Platform with Citations Economy
### Generated: April 13, 2026

---

## TABLE OF CONTENTS

1. [Technology Stack](#1-technology-stack)
2. [Architecture](#2-architecture)
3. [Database Schema](#3-database-schema)
4. [API Reference](#4-api-reference)
5. [Points Calculator Engine](#5-points-calculator-engine)
6. [Authentication System](#6-authentication-system)
7. [Frontend Components](#7-frontend-components)
8. [Environment Configuration](#8-environment-configuration)
9. [Development Setup](#9-development-setup)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. TECHNOLOGY STACK

| Layer | Technology | Version |
|-------|-----------|----------|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | 5.x |
| ORM | Prisma | Latest |
| Database | PostgreSQL | Hosted by Abacus AI |
| Auth | NextAuth.js | 4.x |
| Styling | Tailwind CSS | 3.x |
| UI Components | shadcn/ui | Latest |
| Icons | Lucide React | Latest |
| Password Hashing | bcryptjs | Latest |
| Theme | next-themes | Latest |
| Payment | PayPal SDK | Client ID configured |
| Storage | AWS S3 | Configured |

---

## 2. ARCHITECTURE

### 2.1 Request Flow

```
Browser → Next.js App Router → API Route → Prisma → PostgreSQL
                                   ↓
                           Points Calculator
                                   ↓
                           Response (JSON)
```

### 2.2 Authentication Flow

```
User → SignIn Page → NextAuth Credentials Provider → bcrypt verify
                                                         ↓
                                                    JWT Token
                                                         ↓
                                                    Session Cookie
                                                         ↓
                                                    Protected Routes
```

### 2.3 Citations Calculation Flow

```
Book Submission:
  Author submits book → Genre + Debut status → getDifficultyMultiplier()
                      → +30 Citations (BOOK_ADDED)
                      → Activity logged
                      → User balance & level updated

Review Writing:
  Reviewer submits review → calculateReviewPoints(
                                reviewerType,
                                reviewCount,
                                bookGenre,
                                isDebut
                            )
                          → Citations added to balance
                          → Review count incremented
                          → Level recalculated
                          → Activity logged

Review Request:
  Author requests review → calculateReviewPoints() for cost estimate
                         → Deduct from author balance
                         → ReviewRequest created
```

---

## 3. DATABASE SCHEMA

### 3.1 Models Overview

**User** — Core user model with citation tracking
```prisma
model User {
  id                      String        @id @default(cuid())
  email                   String        @unique
  password                String?
  name                    String?
  bio                     String?       @db.Text
  isAdmin                 Boolean       @default(false)
  citationBalance         Int           @default(0)    // "Star Balance" in DB
  reviewerType            ReviewerType  @default(SUPPORTER)
  reviewCount             Int           @default(0)
  level                   Int           @default(1)
  streakDays              Int           @default(0)
  lastLoginDate           DateTime?
  amazonProfileLink       String?
  profileCompleted        Boolean       @default(false)
  socialMediaBoostClaimed Boolean       @default(false)
  amazonProfileLinked     Boolean       @default(false)
  darkMode                Boolean       @default(false)
}
```

**Book** — Book submissions with difficulty metadata
```prisma
model Book {
  id                   String     @id @default(cuid())
  userId               String
  title                String
  authorName           String
  genre                String     @default("ROMANCE")
  description          String     @db.Text
  coverImageUrl        String?
  bookLink             String?
  status               BookStatus @default(PENDING)
  citationsRequired    Int        @default(1)
  isDebut              Boolean    @default(false)
  difficultyMultiplier Float      @default(1.0)
}
```

**Review** — Reviews with citation tracking
```prisma
model Review {
  id              String       @id @default(cuid())
  reviewerId      String
  bookId          String
  rating          Int          @db.SmallInt
  reviewText      String       @db.Text
  reviewType      ReviewerType @default(SUPPORTER)
  amazonVerified  Boolean      @default(false)
  amazonLink      String?
  wordCount       Int          @default(0)
  citationsEarned Int          @default(1)
  @@unique([reviewerId, bookId])  // No duplicate reviews
}
```

**Activity** — Points/citation earning history
```prisma
model Activity {
  id           String       @id @default(cuid())
  userId       String
  activityType ActivityType
  pointsEarned Int
  metadata     String?      @db.Text
}
```

**Badge** — Gamification badges
```prisma
model Badge {
  id        String    @id @default(cuid())
  userId    String
  badgeType BadgeType
  @@unique([userId, badgeType])  // One badge per type per user
}
```

**ReviewRequest** — Author-to-reviewer exchange
```prisma
model ReviewRequest {
  id           String              @id @default(cuid())
  authorId     String
  bookId       String
  reviewerId   String?
  reviewerType ReviewerType
  pointsCost   Int
  status       ReviewRequestStatus @default(PENDING)
}
```

### 3.2 Key Relationships

- User → Books (one-to-many)
- User → Reviews (one-to-many, as reviewer)
- User → Activities (one-to-many)
- User → Badges (one-to-many)
- User → ReviewRequests (one-to-many, as author and as reviewer)
- Book → Reviews (one-to-many)
- Book → ReviewRequests (one-to-many)

---

## 4. API REFERENCE

### 4.1 POST /api/books — Create Book

**Auth:** Required  
**Body:**
```json
{
  "title": "string",
  "authorName": "string",
  "genre": "POETRY | ROMANCE | ... (BookGenre enum)",
  "description": "string",
  "coverImageUrl": "string?",
  "bookLink": "string?",
  "isDebut": "boolean?"
}
```
**Response:**
```json
{
  "success": true,
  "book": { ... },
  "pointsEarned": 30,
  "newBalance": 180
}
```
**Side Effects:**
- Calculates `difficultyMultiplier` from genre + isDebut
- Awards 30 Citations (BOOK_ADDED)
- Creates Activity record
- Updates user balance and level

### 4.2 POST /api/reviews — Create Review

**Auth:** Required  
**Body:**
```json
{
  "bookId": "string",
  "rating": 1-5,
  "reviewText": "string (150+ or 300+ words)",
  "reviewType": "VERIFIER | ADVOCATE | INSIDER | SUPPORTER",
  "amazonLink": "string? (required for VERIFIER/ADVOCATE)",
  "amazonVerified": "boolean?"
}
```
**Response:**
```json
{
  "success": true,
  "review": { ... },
  "citationsEarned": 150,
  "newBalance": 330,
  "newLevel": 3
}
```
**Validations:**
- Cannot review own book
- Cannot review same book twice
- Word count minimums: INSIDER ≥ 300, SUPPORTER ≥ 150
- Amazon link required for VERIFIER/ADVOCATE

### 4.3 POST /api/activities/daily-login — Daily Login

**Auth:** Required  
**Response:**
```json
{
  "message": "Daily login recorded",
  "pointsEarned": 5,
  "newBalance": 155,
  "streakDays": 13,
  "level": 2
}
```
**Side Effects:**
- Awards 5 Citations
- Updates streak (resets if >1 day gap)
- Awards streak bonuses: 7-day (+15), 30-day (+75)

### 4.4 POST /api/review-requests — Request Review

**Auth:** Required  
**Body:**
```json
{
  "bookId": "string",
  "reviewerType": "VERIFIER | ADVOCATE | INSIDER | SUPPORTER"
}
```
**Response:**
```json
{
  "success": true,
  "reviewRequest": { ... },
  "pointsSpent": 120,
  "newBalance": 30
}
```

### 4.5 GET /api/leaderboard — Leaderboard

**Auth:** Not required  
**Query Params:** `type` (citations|level|streak|reviews), `limit` (default 50)  
**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "id": "...",
      "name": "Alex Rodriguez",
      "citationBalance": 7500,
      "level": 32,
      "reviewCount": 156,
      "streakDays": 89,
      "rank": 1,
      "isCurrentUser": false
    }
  ],
  "type": "citations"
}
```

### 4.6 GET /api/tools/dashboard — Dashboard Data

**Auth:** Required  
**Response:** User stats, level info, activity breakdown, recent activities, badges, available AI tools with costs and availability.

### 4.7 POST /api/tools/dashboard — Use AI Tool

**Auth:** Required  
**Body:**
```json
{
  "toolId": "BLURB_GENERATOR | QUERY_LETTER_ASSISTANT | ..."
}
```
**Response:** Success + points deducted. Currently returns placeholder — no actual AI content generated.

---

## 5. POINTS CALCULATOR ENGINE

**File:** `lib/points-calculator.ts`

### 5.1 Core Functions

```typescript
// Calculate review citations
calculateReviewPoints(
  reviewerType: ReviewerType,  // VERIFIER|ADVOCATE|INSIDER|SUPPORTER
  reviewCount: number,          // For frequency bonus
  genre: string,                // BookGenre enum value
  isDebut: boolean              // Debut author flag
): number

// Get difficulty multiplier
getDifficultyMultiplier(genre: string, isDebut: boolean): number

// Get frequency bonus
getFrequencyBonus(reviewCount: number): number

// Calculate user level
calculateUserLevel(points: number): number
```

### 5.2 Constants

```typescript
DIFFICULTY_MULTIPLIERS  // Genre → multiplier mapping
DEBUT_AUTHOR_BONUS      // 0.3
REVIEWER_TYPE_VALUES    // Type → base value mapping
ACTIVITY_POINTS         // Activity → points mapping
LEVEL_THRESHOLDS        // Level → min points mapping
LEVEL_NAMES             // Level → name mapping
LEVEL_BADGES            // Level → badge name mapping
GENRE_DISPLAY_NAMES     // Genre enum → display name mapping
REVIEWER_TYPE_NAMES     // Type enum → display name mapping
REVIEWER_TYPE_DESCRIPTIONS  // Type descriptions
```

---

## 6. AUTHENTICATION SYSTEM

**File:** `lib/auth.ts`

### 6.1 Configuration

- **Strategy:** JWT (stateless sessions)
- **Providers:**
  1. CredentialsProvider (email/password with bcrypt)
  2. GoogleProvider (configured but missing credentials)
- **Adapter:** PrismaAdapter for database integration
- **Custom Pages:** `/auth/signin`

### 6.2 Session Data

```typescript
session.user.id      // User ID from JWT sub
session.user.email   // User email
session.user.name    // User display name
session.user.isAdmin // Admin flag (custom)
```

---

## 7. FRONTEND COMPONENTS

### 7.1 Navbar Citation Balance

The navbar includes a hovering citation balance indicator:
- Fetches from `/api/dashboard` (or `/api/tools/dashboard`) on mount
- Displays gold coin icon + formatted balance
- Only shown when user is authenticated
- Updates on page navigation

### 7.2 Review Writing Dialog

Modal dialog for writing reviews:
- Reviewer type selection (4 types with descriptions)
- Star rating (1-5)
- Review text area with word count
- Amazon link field (conditional)
- Auto-calculated citation preview

### 7.3 Book Submission Dialog

Modal for adding new books:
- Title, author name, description fields
- Genre dropdown (18 genres)
- Debut author checkbox
- Cover image URL field
- Amazon/purchase link field

---

## 8. ENVIRONMENT CONFIGURATION

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=<generated>
NEXTAUTH_URL=<auto-configured by platform>

# AWS S3 (File Storage)
AWS_PROFILE=hosted_storage
AWS_REGION=us-west-2
AWS_BUCKET_NAME=<bucket-name>
AWS_FOLDER_PREFIX=<prefix>/

# PayPal
PAYPAL_CLIENT_ID=<client-id>
PAYPAL_SECRET_KEY=<secret-key>

# Google SSO (Not yet configured)
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
```

---

## 9. DEVELOPMENT SETUP

### 9.1 Running Locally

```bash
cd /home/ubuntu/bookreviewsite/nextjs_space
yarn install
yarn prisma generate
yarn prisma db push
yarn dev
```

### 9.2 Seeding Database

```bash
cd /home/ubuntu/bookreviewsite/nextjs_space
npx ts-node scripts/seed.ts
```

### 9.3 Prisma Commands

```bash
yarn prisma generate     # Generate client
yarn prisma db push      # Push schema changes
yarn prisma studio       # Database GUI
```

---

## 10. TROUBLESHOOTING

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "Unauthorized" on API calls | Session expired or not logged in | Re-authenticate |
| Build error: Prisma client | Client not generated | Run `yarn prisma generate` |
| Citation balance shows null | API endpoint path mismatch | Check navbar fetch URL |
| Seed script fails | Duplicate unique constraints | Script uses upserts to handle |
| Books stuck in PENDING | No admin approval mechanism | Need to build admin panel |

---

*Technical Documentation for Citeability — April 13, 2026*
