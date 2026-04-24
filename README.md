# Asantewaa's Tour — Website

A personalized travel website for Asantewaa's tour guiding business in Ghana. Built with Next.js 14, Tailwind CSS, and Supabase.

## What's inside

- **Homepage** with hero, about, featured tours, gallery preview, testimonials, contact
- **Tours page** with 4 tours (Heritage/Cape Coast, Nature/Mountains, Accra Immersion, Full 10-day Experience)
- **Individual tour detail pages** with itinerary, highlights, and a sticky booking card
- **Booking form** that saves to Supabase
- **Newsletter signup** that saves to Supabase
- **Contact form** that saves to Supabase
- **Gallery** with all the real trip photos
- **About page** featuring Asantewaa's story
- **Admin page** (`/admin`) where she can view bookings, messages, and subscribers (password protected)

---

## Part 1 — Run it locally

### Step 1. Install Node.js

If you don't have it, download the LTS version from [nodejs.org](https://nodejs.org) (version 18 or higher).

### Step 2. Install project dependencies

Open a terminal inside the project folder and run:

```bash
npm install
```

### Step 3. Set up Supabase (one-time)

1. Go to [supabase.com](https://supabase.com) and sign up for a free account.
2. Click **"New Project"**. Name it `asantewaas-tour`, pick a region close to Ghana (e.g. `eu-west-2` London, or `us-east-1`), set a database password (save this somewhere), and wait for the project to initialize — about 2 minutes.
3. Once the project is ready, go to the left sidebar → **SQL Editor** → **"+ New query"**.
4. Open the file `supabase/schema.sql` from this project, copy **everything** inside it, and paste it into the Supabase SQL editor.
5. Click the green **"Run"** button (bottom right). You should see "Success. No rows returned" and a checkmark.
6. You've just created all the tables, security rules, and seeded 3 testimonials.

### Step 4. Get your Supabase keys

In your Supabase project:

1. Left sidebar → **Project Settings** (the gear icon) → **API**.
2. Copy these three values:
   - **Project URL** (looks like `https://xxxx.supabase.co`)
   - **anon public key** (the `anon` one)
   - **service_role key** (click "Reveal", then copy) ⚠️ **This is a secret — never share it or commit it to git.**

### Step 5. Configure environment variables

In the project folder, **copy `.env.example` to a new file named `.env.local`**:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key>
SUPABASE_SERVICE_ROLE_KEY=<your service role key>
ADMIN_PASSWORD=pick-a-strong-password-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The `ADMIN_PASSWORD` is what Asantewaa will use to log into `/admin` to see her bookings. Pick something strong.

### Step 6. Run the site

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site should load with all her photos and tours.

To view the admin page: go to [http://localhost:3000/admin](http://localhost:3000/admin) and enter the `ADMIN_PASSWORD` you set.

### Step 7. Test it

- Fill in the contact form → check your Supabase dashboard → Table Editor → `contact_messages` → you should see the row
- Submit a booking → check the `bookings` table
- Subscribe to the newsletter → check the `subscribers` table

---

## Part 2 — Deploy to the internet (Vercel)

Supabase is your backend (database), but the website itself needs to be hosted somewhere. **Vercel** is the standard home for Next.js sites, free for personal projects, and takes about 10 minutes to set up.

### Step 1. Push the project to GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Create a new repository called `asantewaas-tour` (can be private).
3. In the project folder, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/asantewaas-tour.git
git push -u origin main
```

### Step 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub.
2. Click **"Add New..." → "Project"**.
3. Find `asantewaas-tour` in the list and click **"Import"**.
4. On the configuration screen, expand **"Environment Variables"** and add all five from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL` — set this to whatever Vercel will give you (you can update it after first deploy, e.g. `https://asantewaas-tour.vercel.app`)
5. Click **"Deploy"**. Wait 1–2 minutes.
6. Vercel will give you a live URL like `https://asantewaas-tour.vercel.app`.

### Step 3. (Optional) Connect a custom domain

If Asantewaa buys a domain like `asantewaastour.com`:

1. In Vercel → your project → **Settings → Domains** → add the domain.
2. Vercel shows you two DNS records to add at her domain registrar (Namecheap/GoDaddy/etc).
3. After DNS propagates (a few minutes to a few hours), the custom domain is live.
4. Update the `NEXT_PUBLIC_SITE_URL` environment variable to the custom domain and redeploy.

### Step 4. Tell Asantewaa how to use the admin page

- Admin URL: `https://YOUR-SITE.vercel.app/admin`
- Password: whatever you set for `ADMIN_PASSWORD`
- Here she can see all bookings, messages, and subscriber counts
- To reply to a booking, she just clicks the email address

---

## Editing content

| What you want to change | File to edit |
|---|---|
| Tour details, prices, itineraries | `src/lib/tours.ts` |
| Her bio on the About page | `src/app/about/page.tsx` |
| Homepage copy | `src/app/page.tsx` |
| Gallery photos and captions | `src/app/gallery/page.tsx` |
| Add/remove photos | put the file in `public/images/` and reference it |
| Testimonials | edit directly in Supabase dashboard → Table Editor → `testimonials` (set `approved = true`) |

After any code change, push to GitHub and Vercel will auto-deploy.

---

## File structure

```
supabase/schema.sql         ← run in Supabase once
src/app/
  page.tsx                  ← homepage
  layout.tsx                ← shared layout
  tours/                    ← tours index + individual tour pages
  book/                     ← booking page
  gallery/                  ← photo gallery
  about/                    ← about Asantewaa
  admin/                    ← password-protected admin view
  api/
    bookings/               ← save booking → Supabase
    newsletter/             ← save subscriber → Supabase
    contact/                ← save contact message → Supabase
    admin/{login,logout}/   ← admin auth
src/lib/
  tours.ts                  ← tour data (EDIT THIS to change tours)
  supabase.ts               ← Supabase client setup
src/components/             ← shared UI components
public/images/              ← all tour photos
```

---

## Troubleshooting

**"Site loads but booking form fails"** — Check that your Supabase URL and anon key are correct in `.env.local` (local) or Vercel env vars (production). Also confirm you ran `schema.sql` in Supabase.

**"Admin page says wrong password"** — `ADMIN_PASSWORD` in `.env.local` / Vercel must match exactly what you type. No whitespace, case-sensitive.

**"Photos are missing in production"** — Make sure the `public/images/` folder was committed to git. Run `git status` and check.

**"I want to add a new tour"** — Edit `src/lib/tours.ts`, add a new object following the existing pattern, put the hero image in `public/images/`, commit, push. Vercel auto-deploys.

---

## License

This site is built for Asantewaa. All tour content, photos, and branding belong to her.
