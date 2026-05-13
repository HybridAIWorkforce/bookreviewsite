# ⚡ QUICK REFERENCE — CITEABILITY
## Essential Information at a Glance
### Generated: April 13, 2026

---

## 🔑 TEST CREDENTIALS

| Account | Email | Password | Balance | Role |
|---------|-------|----------|---------|------|
| **Admin** | john@doe.com | johndoe123 | 150 | Admin |
| Top User | daniel.lee@example.com | password123 | 9,200 | User |
| Power User | alex.rodriguez@example.com | password123 | 7,500 | User |
| Active User | emma.wilson@example.com | password123 | 5,800 | User |

---

## 📊 CITATIONS FORMULA

```
Citations = round( Multiplier × (Base Value + Frequency Bonus) )
```

### Difficulty Multipliers
| Tier | Multiplier | Genres |
|------|-----------|--------|
| High | 2.0x | Poetry, Literary Fiction, Short Stories, Novellas, Translated Works |
| Med-High | 1.5x | Specialized Non-Fiction, Children's Picture Books, Middle Grade |
| Medium | 1.2x | Mainstream Non-Fiction, Historical Fiction, Cozy Mysteries, Westerns |
| Low | 1.0x | Romance, Fantasy, Sci-Fi, Thrillers, Young Adult |
| Debut | +0.3 | Added to any genre multiplier |

### Reviewer Types
| Type | Base Value | Requirement |
|------|-----------|-------------|
| Verifier | 150 | Verified Amazon Purchase |
| Advocate | 100 | Non-Verified Amazon Review |
| Insider | 50 | 300+ word site review |
| Supporter | 25 | 150+ word site review |

### Frequency Bonuses
| Reviews | Bonus |
|---------|-------|
| 0-5 | +0 |
| 6-15 | +15 |
| 16-30 | +25 |
| 31-50 | +40 |
| 51+ | +60 |

### Quick Examples
| Scenario | Calculation | Result |
|----------|-------------|--------|
| Debut Poetry + Master Verifier | (2.0+0.3) × (150+60) | **483** |
| Romance + New Supporter | 1.0 × (25+0) | **25** |
| Historical Fiction + Active Insider | 1.2 × (50+15) | **78** |

---

## 💰 ACTIVITY POINTS

| Activity | Citations | Frequency |
|----------|-----------|-----------|
| Daily Login | 5 | Daily |
| Write Review | Formula | Per review |
| Add Book | 30 | Per book |
| Complete Profile | 20 | One-time |
| Link Amazon | 25 | One-time |
| Social Media Boost | 100 | One-time |
| 7-Day Streak | 15 | On achievement |
| 30-Day Streak | 75 | On achievement |
| Level Up | 50 | On achievement |

---

## 🏆 LEVELS

| Level | Name | Citations Required |
|-------|------|-------------------|
| 1 | Apprentice | 0 |
| 2 | Contributor | 100 |
| 3 | Critic | 300 |
| 4 | Authority | 700 |
| 5 | Luminary | 1,500 |

---

## 🤖 AI TOOLS PRICING

| Tool | Cost |
|------|------|
| Marketing Copy Generator | 30 Citations |
| Blurb Generator | 40 Citations |
| Review Solicitator | 50 Citations |
| Review to Blurb Converter | 60 Citations |
| Query Letter Assistant | 75 Citations |
| Cover Design Analysis | 150 Citations |
| Plot Hole Detector | 200 Citations |

---

## 🛣️ ROUTES

### Pages
| URL | Page | Auth |
|-----|------|------|
| `/` | Home | No |
| `/about` | About | No |
| `/books` | Browse Books | No |
| `/books/[id]` | Book Detail | No |
| `/auth/signin` | Sign In | No |
| `/auth/signup` | Sign Up | No |
| `/contact` | Contact | No |
| `/dashboard` | Dashboard | Yes |
| `/leaderboard` | Leaderboard | No |
| `/pricing` | AI Tools Pricing | No |
| `/tools` | AI Tools | Yes |

### API Endpoints
| Method | URL | Purpose |
|--------|-----|----------|
| POST | `/api/signup` | Register |
| GET/POST | `/api/books` | CRUD books |
| GET/POST | `/api/reviews` | CRUD reviews |
| POST | `/api/activities/daily-login` | Daily login |
| GET/POST | `/api/tools/dashboard` | Tools + dashboard |
| GET/POST | `/api/review-requests` | Review requests |
| GET | `/api/leaderboard` | Leaderboard |
| POST | `/api/contact` | Contact form |

---

## 🗄️ DATABASE STATS

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
| **Total** | **316** |

---

## ⚙️ COMMANDS

```bash
# Development
cd /home/ubuntu/bookreviewsite/nextjs_space
yarn dev                    # Start dev server
yarn build                  # Production build

# Database
yarn prisma generate        # Generate Prisma client
yarn prisma db push         # Push schema changes
yarn prisma studio          # Database GUI

# Seeding
npx ts-node scripts/seed.ts # Run seed script

# Package Management
yarn add <package>          # Add dependency
```

---

## 🐛 KNOWN ISSUES

1. **Broken Amazon links** — Seed data has placeholder URLs
2. **Text contrast issues** — Some text hard to read in dark/light mode
3. **AI tools placeholder** — Tools deduct points but don't generate content
4. **No admin approval UI** — Books stuck in PENDING status
5. **Google SSO** — Provider configured but credentials missing

---

## 📁 KEY FILES

| File | Purpose |
|------|---------|
| `lib/points-calculator.ts` | Citations calculation engine |
| `lib/auth.ts` | NextAuth configuration |
| `lib/db.ts` | Prisma client singleton |
| `prisma/schema.prisma` | Database schema |
| `scripts/seed.ts` | Database seeding |
| `components/navbar.tsx` | Nav + citation balance |
| `.env` | Environment variables |

---

*Quick Reference for Citeability — April 13, 2026*
