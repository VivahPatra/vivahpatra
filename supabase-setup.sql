-- Run this in Supabase Dashboard > SQL Editor
-- Creates the published_invites table for the Publish feature

create table if not exists public.published_invites (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  template_id text not null,
  user_id uuid references auth.users(id),
  data jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.published_invites enable row level security;

-- Anyone can read published invites (guests viewing invitations)
create policy "Public read access" on public.published_invites
  for select using (true);

-- Authenticated users can insert their own
create policy "Users can insert own invites" on public.published_invites
  for insert with check (auth.uid() = user_id);

-- Users can update their own
create policy "Users can update own invites" on public.published_invites
  for update using (auth.uid() = user_id);

-- Index for fast slug lookups
create index if not exists idx_published_invites_slug on public.published_invites(slug);
