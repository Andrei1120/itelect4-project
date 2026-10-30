# I‑Telec t4 – Frontend (GT5)

## Quick start
1. **Copy** `.env.example` → `.env` in the **frontend** folder and set:
   - `VITE_API_URL` = `https://itelect4-backend-xxxx.vercel.app` (replace `xxxx` with your Vercel backend sub‑domain).
2. Install dependencies:
   ```powershell
   npm install
   ```
3. **Run locally** (development server):
   ```powershell
   npm run dev
   ```
   Open <http://localhost:5173> to see the UI.
4. **Build for production** (optional, Vercel does this automatically):
   ```powershell
   npm run build
   ```
5. **Deploy to Vercel**:
   - Push the code to GitHub (branch `gt4-part2`).
   - Vercel will detect the repo and build it automatically.
   - Set the environment variable `VITE_API_URL` in the Vercel dashboard (Production) to point to the live backend URL.

## What this repo contains
- React + Vite front‑end.
- TanStack Query for API calls.
- React Hook Form + Zod for validation.
- Pages: Register, Login, Dashboard, Courses, Submissions, Items, etc.
- Uses the **backend** you built in GT4 (the Express server).

## Deploy status (GT5)
- **Backend URL**: `https://itelect4-backend-xxxx.vercel.app`
- **Frontend URL**: `https://itelect4-project-xxxx.vercel.app`
- Tag: `gt5`

## License
MIT © 2026 Your Name
