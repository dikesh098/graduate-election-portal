# Graduate Election Portal

A digital platform for graduate voter registration, assistance and citizen engagement — built for
the Nagpur Graduates' Constituency, Maharashtra Legislative Council.

Built by **Aixoniq Technologies**.

## Stack

- **Frontend:** Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes (Node runtime)
- **Database:** MongoDB (via Mongoose)
- **File storage:** Cloudinary (registration documents)
- **Auth:** JWT in an httpOnly cookie for admin sessions; OTP for graduate login
- **AI:** Claude (Anthropic API) for the chat assistant
- **Hosting:** Vercel

## What's included

- Public site: Home, About, Election Information (with eligibility checker), Register, Track
  Application, Events, News, Help Center, Volunteer, Contact
- Registration flow: form → document upload (Cloudinary) → MongoDB record → tracking ID
- OTP send/verify endpoints (MSG91 by default — swappable for any provider)
- Admin dashboard: stats, registrations table with status updates, volunteers, announcements, events
- AI chatbot widget wired to Claude for FAQ-style assistance
- Auth-protected `/admin/*` routes via middleware + JWT verification on every admin API call

## 1. Local setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → free M0 cluster → Connect → Drivers |
| `JWT_SECRET` | Any long random string, e.g. `openssl rand -base64 32` |
| `CLOUDINARY_*` | [Cloudinary dashboard](https://cloudinary.com/console) → Account Details |
| `MSG91_*` | Optional — leave blank to log OTPs to the console in dev |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Your choice — used once by the seed script |

Create the first admin user:

```bash
npm run seed:admin
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the
admin panel.

## 2. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add all variables from `.env` in **Project Settings → Environment Variables**.
4. Deploy. Vercel auto-detects Next.js — no build config needed.
5. After the first deploy, run the seed script **once** locally (pointed at your production
   `MONGODB_URI`) to create the admin login, or add a temporary one-off Vercel deployment hook.
6. Add your custom domain in **Project Settings → Domains**.

## 3. MongoDB Atlas quick setup

1. Create a free cluster at MongoDB Atlas.
2. Database Access → Add a database user (username/password).
3. Network Access → Allow access from anywhere (`0.0.0.0/0`) for Vercel, or use Atlas's Vercel
   integration for scoped IP access.
4. Copy the connection string into `MONGODB_URI`, replacing `<password>` with your actual password.

## 4. Cloudinary quick setup

1. Sign up at cloudinary.com (free tier is enough to start).
2. Copy Cloud Name, API Key, and API Secret from the dashboard into `.env`.
3. Uploaded documents are organized under `graduate-portal/registrations/<trackingId>/`.

## 5. WhatsApp Assistant (future addition)

Not included in this scaffold — WhatsApp Business API approval (via Meta directly or a provider
like Gupshup/360dialog) typically takes 1–3 weeks, so start that application early. Once approved,
add a `/api/whatsapp/webhook` route that reuses the same `SYSTEM_PROMPT` logic in `src/app/api/chat/route.ts`.

## 6. Project structure

```
src/
  app/                  → pages (App Router) + API routes under app/api/*
  components/           → shared UI components
  lib/                  → db connection, auth, cloudinary, OTP helpers
  models/                → Mongoose schemas
  types/                → shared Zod validation schemas
  middleware.ts         → protects /admin/* pages
scripts/seedAdmin.ts    → creates the first admin login
```

## 7. Security notes before going live

- Rotate `JWT_SECRET` and all API keys before production use — don't reuse anything from `.env.example`.
- Rate-limit `/api/otp/send` and `/api/register` (Vercel Edge Config or a service like Upstash
  Ratelimit) to prevent abuse.
- Review the eligibility rule in `src/app/api/eligibility/route.ts` — it currently uses a
  placeholder "3 years since graduation" rule. Replace it with the exact rule from the Election
  Commission's current qualifying-date notification.
- Enable MongoDB Atlas automated backups (on by default on paid tiers).
