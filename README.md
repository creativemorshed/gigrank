# GigRank AI — Fiverr Growth Intelligence Platform

AI-powered Fiverr gig analyzer, competitor spy, rank predictor, content rewriter, growth roadmap generator, and keyword research tool — built on Fiverr's 2026 ranking algorithm.

---

## 📦 Tech Stack

- **Frontend/Backend:** Next.js 14 (App Router)
- **AI Engine:** Groq (LLaMA 3.3 70B) — free tier
- **Auth + Database:** Supabase (email/password + Google OAuth, PostgreSQL credits table)
- **License Keys:** Google Sheets (manual key management, no redeploy needed)
- **Hosting:** Vercel

---

## 📋 CHANGELOG

### v3.5 — Fully responsive layout (hero, module grid, all result grids)
**Date:** Current

- **Fixed:** Middle content area was broken on both desktop and mobile — module grid stayed fixed at 3 columns regardless of screen width, causing cramped/overflowing cards on smaller screens.
- **Added:** Proper CSS breakpoint system for `.mod-grid`:
  - Desktop (>760px): 3 columns
  - Tablet (600–760px): 2 columns
  - Mobile (<600px): 1 column
- **Fixed:** All internal grids across result views and the pricing modal (Competitor table columns, Predict day-cards, Roadmap month cards, FAQ/package grids, plan cards, etc.) now use shared `.two-col` / `.three-col` classes that collapse to 1 column under 600px, instead of being hard-locked via inline styles.
- **Fixed:** Hero heading (`GIG RANK ANALYZER`) could overflow or look cramped on narrow phones — added a dedicated breakpoint shrinking font size further under 420px width, and allowed word-wrap.
- **Why:** Previous responsive CSS only covered the homepage module grid in isolation; everything else (forms, results, modal) was still rigid 2–3 column inline grids that broke on phones.

---

### v3.4 — Mobile-friendly nav + README tracking
**Date:** Current

- **Fixed:** Nav bar was cramped and not mobile-friendly (theme toggle, credits, buy button, user badge, logout all squeezed into one row).
- **Added:** Responsive nav — desktop shows full inline nav; mobile (≤680px) collapses into a hamburger menu with a credits pill always visible.
- **Added:** Mobile dropdown menu includes Theme toggle, Buy Credits, user email + Logout, all in clean stacked rows.
- **Added:** This README.md — from now on, every update will be logged here under a version number (v3.4, v3.5, v3.6, ...).

---

### v3.3 — Collapsible algorithm breakdown
- **Changed:** The "2026 Algorithm Factors" pills (previously always-visible, took up significant homepage space) are now collapsed by default behind a single button: `📊 2026 Algorithm Breakdown (11 Factors) ▾`.
- **Added:** When expanded, factors display in a clean 2-column grid with dot color, label, NEW badge (for 2026-only factors), and percentage weight — aligned and professional.
- **Why:** Original always-visible pill layout was cluttering the homepage and looked unpolished on mobile.

---

### v3.2 — Login system + cloud-synced credits
- **Added:** Full authentication system using Supabase (Email/Password signup+login, Google OAuth, Forgot Password flow).
- **Changed:** Credits moved from `localStorage` (device-only) to Supabase PostgreSQL `user_credits` table — credits now persist across devices and browser sessions.
- **Added:** `add_credits` / `deduct_credits` Postgres RPC functions (see `supabase-functions.sql`) for safe, atomic credit updates.
- **Changed:** `/api/redeem` now requires a logged-in `userId` and writes credits directly to Supabase instead of returning them to the client for local storage.
- **Added:** Nav bar now shows `LOGIN / SIGN UP` when logged out, or credits + user avatar + email + `OUT` button when logged in.
- **Fixed (post-release):**
  - Syntax error in translations object (`T`) causing build failure.
  - Google Fonts CSS minification crash during build — fixed via `next.config.js` (`optimizeFonts: false`).
  - `supabaseUrl is required` crash at build time — Supabase client now falls back to a placeholder at build time and only requires real env vars at runtime.
  - `/api/redeem` now lazily creates the Supabase admin client per-request instead of at module load, preventing build-time crashes when env vars aren't available.

---

### v3.1 — Bengali removed, theme toggle restored
- **Removed:** Bengali (বাংলা) language and the language switcher — app is now English-only per request.
- **Note:** Dark/Light theme toggle was briefly removed by mistake during this cleanup, then restored in the same version after user feedback.

---

### v3.0 — Quick Fill for all modules
- **Added:** "Quick Fill" optional expandable section in all 6 modules (Gig Analyzer, Competitor Spy, Rank Predictor, Gig Rewriter, Growth Roadmap, Keyword Research).
- **Why:** Previously, URL-only input gave AI very little real data to work with (Fiverr can't be scraped), and full manual paste of title/description/tags was tedious.
- **How it works:** User pastes a Fiverr URL, then optionally clicks "Quick Fill" to add Title, Rating, Reviews, Seller Level, Price, Delivery Time, Response Time, Orders in Queue, and Tags via short individual fields — much faster than free-text paste.
- **Added:** Competitor Spy module supports Quick Fill for up to 3 competitors individually.

---

### v2.x — 2026 Algorithm Update (prior to versioning system)
- Updated AI system prompts across all modules from Fiverr's 2025 algorithm (8 factors) to the 2026 algorithm (11 factors), adding:
  - **Gig URL / Slug Optimization** (4% weight) — slug is permanent after first save.
  - **Order Value Signal** (3% weight) — Fiverr's 2026 algorithm rewards higher-value orders as average buyer spend rose 15.4%.
  - **Gig Freshness & Activity** (3% weight) — gigs updated every 3–4 weeks get a temporary ranking boost; over-editing resets algorithm data.
- Adjusted core factor weights (Success Score 25%→22%, CTR 20%→18%, etc.) to make room for the 3 new factors.
- Added new UI sections: Slug Analysis, Pricing Signal Analysis, Freshness Strategy, Multi-Gig Strategy.

---

### v1.x — Initial platform build (prior to versioning system)
- Built full 7-module Next.js platform: Gig Analyzer, Competitor Spy, Rank Predictor, Gig Rewriter, Growth Roadmap, Keyword Research, credit-based paywall.
- Switched AI backend from Anthropic Claude (required paid credits) to Google Gemini (free tier, but unreliable model availability) to Groq (free tier, fast, reliable) — see backend history below.
- Added credit-based payment system: Starter (10cr/$4.99), Pro (30cr/$9.99), Agency (100cr/$24.99).
- Added License Key redemption — initially via Vercel Environment Variables (required redeploy for every new key), then migrated to **Google Sheets** for instant key management without redeploys.
- Removed all "Demo Mode" credit-adding buttons — credits can now ONLY be added via verified License Key redemption (server-validated), closing a free-credit exploit.

---

## 🔧 Environment Variables Required (Vercel)

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | AI analysis engine |
| `GOOGLE_SHEET_ID` | License key sheet |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Google Sheets API auth (full JSON) |
| `LICENSE_KEYS` | Optional demo keys, e.g. `{"GIGA-FREE-DEMO-0001":5}` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret key (server-only, never expose) |

## 🗄️ Supabase Setup

Run both SQL files in the Supabase SQL Editor, in order:
1. User credits table + RLS policies + auto-create trigger (see setup history)
2. `supabase-functions.sql` — `add_credits` / `deduct_credits` RPC functions

## 📊 Google Sheet Format (License Keys)

| KEY | CREDITS | STATUS | USED_BY | USED_AT |
|---|---|---|---|---|
| STAR-A1B2-C3D4-0001 | 10 | ACTIVE | | |

Sheet tab must be named `Sheet1`. STATUS must be exactly `ACTIVE` (case-sensitive) for a key to be redeemable.

---

## 🚀 Deployment

1. Push all files to GitHub.
2. Import repo into Vercel.
3. Add all environment variables above.
4. Redeploy.
5. Test: Sign up → confirm email → log in → redeem a key → run a module.
