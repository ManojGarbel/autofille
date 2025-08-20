Form Auto-Filler
=================

Store your personal, academic, and contact details once and reuse them to auto-fill online forms via a bookmarklet.

Tech Stack
----------
- Next.js App Router
- TailwindCSS
- Vercel KV (Redis)

Setup
-----
1. Install dependencies:
   - `npm install`
2. Run dev server:
   - `npm run dev`

Deployment & KV
---------------
- On Vercel, create a Redis database (Vercel KV) and attach it to your project.
- Vercel will inject the required env vars automatically when KV is linked. Locally, copy `.env.example` to `.env` and fill values if testing against a remote KV.
- Set `NEXT_PUBLIC_BASE_URL` to your deployed site URL (e.g., `https://your-app.vercel.app`) so the bookmarklet can fetch your profile across sites. It falls back to the current page origin if not set.
- The API runs on the Edge runtime and includes permissive CORS, so the bookmarklet can fetch your profile from other domains.

Bookmarklet
-----------
- Go to Dashboard -> Generate Bookmarklet and drag the "Auto-Fill" button to your bookmarks bar.
- Click it on any form page to attempt auto-fill using your saved profile.
