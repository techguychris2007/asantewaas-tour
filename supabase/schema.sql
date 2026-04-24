-- =============================================================================
-- Asantewaa's Tour — Database Schema
-- Run this ONCE in the Supabase SQL Editor.
-- =============================================================================

create extension if not exists "uuid-ossp";

-- =============================================================================
-- BOOKINGS — tour booking requests from the website
-- =============================================================================
create type booking_status as enum ('new', 'contacted', 'confirmed', 'cancelled', 'completed');

create table public.bookings (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  country text,
  tour_slug text not null,         -- e.g. "heritage-cape-coast"
  tour_title text not null,        -- snapshot of title at time of booking
  preferred_date date,
  group_size int not null default 1,
  message text,
  status booking_status not null default 'new',
  created_at timestamptz not null default now()
);

create index bookings_created_idx on public.bookings(created_at desc);
create index bookings_status_idx on public.bookings(status);

-- =============================================================================
-- NEWSLETTER SUBSCRIBERS
-- =============================================================================
create table public.subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  subscribed_at timestamptz not null default now()
);

-- =============================================================================
-- CONTACT MESSAGES
-- =============================================================================
create table public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  handled boolean not null default false
);

create index contact_created_idx on public.contact_messages(created_at desc);

-- =============================================================================
-- TESTIMONIALS — optionally user-submitted; owner approves before showing
-- =============================================================================
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  author_location text,
  rating int not null check (rating between 1 and 5),
  quote text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- =============================================================================
-- ROW LEVEL SECURITY
-- Public can INSERT (book a tour, subscribe, send message, submit testimonial).
-- Public can READ only approved testimonials.
-- Everything else is locked — only the service role (admin page) can read/manage.
-- =============================================================================

alter table public.bookings enable row level security;
alter table public.subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.testimonials enable row level security;

-- BOOKINGS: anyone can submit, nobody can read via anon key
create policy "bookings_insert_anyone" on public.bookings
  for insert with check (true);

-- SUBSCRIBERS: anyone can subscribe
create policy "subscribers_insert_anyone" on public.subscribers
  for insert with check (true);

-- CONTACT MESSAGES: anyone can send
create policy "contact_insert_anyone" on public.contact_messages
  for insert with check (true);

-- TESTIMONIALS: anyone can submit (pending approval)
create policy "testimonials_insert_anyone" on public.testimonials
  for insert with check (true);

-- TESTIMONIALS: public can only read approved ones
create policy "testimonials_select_approved" on public.testimonials
  for select using (approved = true);

-- =============================================================================
-- SEED some testimonials so the site looks alive on day one.
-- (Edit these to taste — they're all pre-approved.)
-- =============================================================================
insert into public.testimonials (author_name, author_location, rating, quote, approved) values
  ('Denise W.', 'Atlanta, USA', 5, 'Asantewaa made our Ghana trip feel like a homecoming. Every stop was meaningful and she knew each story by heart.', true),
  ('The Johnson family', 'Brooklyn, USA', 5, 'From Cape Coast to Aburi, she handled everything. We just showed up and experienced it. 10/10 would travel with her again.', true),
  ('Marcia B.', 'London, UK', 5, 'She does not just show you Ghana — she introduces you to it. Warm, funny, incredibly knowledgeable.', true);
