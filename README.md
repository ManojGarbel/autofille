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
- Set Vercel KV environment variables in your deployment environment so that `@vercel/kv` can connect.
- Optionally set `NEXT_PUBLIC_BASE_URL` to your site URL for bookmarklet fetches (falls back to relative `/api/profile`).

Bookmarklet
-----------
- Go to Dashboard -> Generate Bookmarklet and drag the "Auto-Fill" button to your bookmarks bar.
- Click it on any form page to attempt auto-fill using your saved profile.
