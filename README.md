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

Deployment & Redis
------------------
- If you're using Vercel Redis (Upstash), set `REDIS_URL` in Project Settings → Environment Variables. Example: `rediss://:password@us1-upward-whatever.upstash.io:6379`.
- Locally, copy `.env.example` to `.env` and set `REDIS_URL` to a test Redis URL if needed.
- Set `NEXT_PUBLIC_BASE_URL` to your deployed site URL (e.g., `https://your-app.vercel.app`) so the bookmarklet can fetch your profile across sites.
- The API uses Node.js runtime and ioredis with permissive CORS.

Bookmarklet
-----------
- Go to Dashboard -> Generate Bookmarklet and drag the "Auto-Fill" button to your bookmarks bar.
- Click it on any form page to attempt auto-fill using your saved profile.

User Instructions
-----------------
1. Open the deployed site. A unique ID is created and stored locally.
2. Go to `Profile`, fill your details, and click `Save`.
3. Go to `Dashboard` and drag the `Auto-Fill` button to your bookmarks bar, or copy the link and create a bookmark.
4. On any online form page, click your `Auto-Fill` bookmark to prefill common fields (name, email, phone, address, education, etc.).
5. Update your profile anytime; the bookmarklet uses your latest saved data.
