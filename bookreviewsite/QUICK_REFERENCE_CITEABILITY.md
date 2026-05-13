# QUICK REFERENCE — CITEABILITY
### Generated: April 13, 2026

---

## PROJECT AT A GLANCE

| Property | Value |
|----------|-------|
| **Name** | Citeability |
| **Type** | Author Book Review Exchange Platform |
| **Stack** | Next.js 14, Prisma, PostgreSQL, NextAuth, Tailwind, shadcn/ui |
| **Path** | `/home/ubuntu/bookreviewsite` |
| **Status** | ~75% complete, NOT deployed |
| **Admin Login** | john@doe.com / johndoe123 |
| **Domain** | thebookreviewsite.com (not connected) |

---

## QUICK COMMANDS

```bash
# Navigate to project
cd /home/ubuntu/bookreviewsite/nextjs_space

# Start dev server
yarn dev

# Build production
yarn build

# TypeScript check
yarn tsc --noEmit

# Prisma commands
yarn prisma generate       # Regenerate client
yarn prisma db push        # Push schema changes
yarn prisma studio         # Visual DB editor

# Run seed script
yarn tsx scripts/seed.ts

# Install packages (yarn only!)
yarn add <package-name>
```

---

## KEY FILES

| File | Purpose |
|------|--------|
| `prisma/schema.prisma` | Database schema |
| `lib/points-calculator.ts` | Points formula engine |
| `lib/auth.ts` | NextAuth configuration |
| `lib/db.ts` | Prisma client |
| `app/dashboard/page.tsx` | Main dashboard |
| `app/leaderboard/page.tsx` | Leaderboard |
| `app/tools/page.tsx` | AI tools dashboard |
| `scripts/seed.ts` | Database seeding |
| `.env` | Environment variables |

---

## POINTS FORMULA

```
Total Points = Difficulty Multiplier × (Base Value + Frequency Bonus)
```

**Difficulty:** Poetry/Literary=2.0, Specialized=1.5, Mainstream=1.2, Popular=1.0, Debut=+0.3

**Base Values:** Verifier=150, Advocate=100, Insider=50, Supporter=25

**Frequency:** New=+0, Active(6-15)=+15, Prolific(16-30)=+25, Expert(31-50)=+40, Master(51+)=+60

---

## PAGES & ROUTES

| Page | Route | Auth Required |
|------|-------|--------------|
| Landing | `/` | No |
| About | `/about` | No |
| Books | `/books` | No |
| Book Detail | `/books/[id]` | No |
| Pricing | `/pricing` | No |
| Contact | `/contact` | No |
| Leaderboard | `/leaderboard` | No |
| Sign In | `/auth/signin` | No |
| Sign Up | `/auth/signup` | No |
| Dashboard | `/dashboard` | Yes |
| AI Tools | `/tools` | Yes |

---

## REMAINING WORK (Priority Order)

1. 🔴 Fix text contrast on `/books` page
2. 🟠 Genre dropdown + debut checkbox in book submission
3. 🟠 Points history page
4. 🟠 Badge gallery in dashboard
5. 🟡 Functional AI tools (LLM)
6. 🟡 Email notifications
7. 🟡 Amazon API verification
8. 🟢 Google SSO
9. 🟢 Multi-currency
10. 🟢 Admin panel

---

## TEST ACCOUNTS

| Email | Password | Type |
|-------|----------|------|
| john@doe.com | johndoe123 | Admin |
| sarah.johnson@example.com | password123 | User |
| michael.chen@example.com | password123 | User |
| emma.wilson@example.com | password123 | User |
| david.brown@example.com | password123 | User |

---

## DATABASE STATS

| Table | Rows |
|-------|------|
| users | 13 |
| books | 101 |
| reviews | 80 |
| activities | 49 |
| badges | 38 |
| review_requests | 18 |
| contact_submissions | 10 |
| subscriptions | 7 |
| **Total** | **~316** |

---

## ENVIRONMENT VARIABLES

```
DATABASE_URL          # PostgreSQL connection
NEXTAUTH_SECRET       # Auth encryption
AWS_PROFILE           # S3 profile
AWS_REGION            # S3 region
AWS_BUCKET_NAME       # S3 bucket
AWS_FOLDER_PREFIX     # S3 prefix
PAYPAL_CLIENT_ID      # PayPal
PAYPAL_SECRET_KEY     # PayPal
```

---

*Document generated: April 13, 2026*
