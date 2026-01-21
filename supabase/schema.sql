-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Users)
-- Links to Supabase Auth. Public profile info.
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text check (role in ('admin', 'agent')) default 'agent',
  agency_name text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
-- Agents can view their own profile. Admins can view all.
create policy "Public profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- PROPERTIES
-- Real Estate listings managed by Agents
create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) not null,
  title text not null, -- Internal name or public title
  address text not null,
  price_usd numeric, 
  specs jsonb, -- e.g. {"beds": 3, "baths": 2, "m2": 150}
  description text,
  status text check (status in ('draft', 'published', 'sold')) default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.properties enable row level security;

-- Policies for Properties
create policy "Agents can view own properties" on properties
  for select using (auth.uid() = owner_id or exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Agents can insert own properties" on properties
  for insert with check (auth.uid() = owner_id);

create policy "Agents can update own properties" on properties
  for update using (auth.uid() = owner_id);

-- SERVICE ORDERS
-- Orders for Content Services (The "Service-First" aspect)
create table public.service_orders (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) not null,
  requester_id uuid references public.profiles(id) not null,
  service_type text not null, -- e.g. 'Pack Punta Lujo', 'Drone Only'
  status text check (status in ('pending', 'scheduled', 'production', 'delivered', 'cancelled')) default 'pending',
  scheduled_date date,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.service_orders enable row level security;

-- Policies for Service Orders
create policy "Agents can view own orders" on service_orders
  for select using (auth.uid() = requester_id);

create policy "Agents can create orders" on service_orders
  for insert with check (auth.uid() = requester_id);

-- MEDIA ASSETS
-- The content delivered by the Admin, used in the Smart Listing
create table public.media_assets (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) not null,
  asset_type text check (asset_type in ('360_url', 'drone_video', 'reel', 'image')) not null,
  url text not null,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.media_assets enable row level security;

-- Policies for Media Assets
create policy "Public read access for media" on media_assets
  for select using (true); -- Public because they are on the Landing Page

-- LEADS (Smart Prospecting)
-- Captured via the Chat AI on the public listing
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) not null,
  visitor_name text,
  visitor_contact text, -- Phone or Email
  intent_data jsonb, -- e.g. {"intent": "buy", "dates": "Jan 10-20", "budget": "500k"}
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_read boolean default false
);

-- Enable RLS
alter table public.leads enable row level security;

-- Policies for Leads
-- Only the owner of the property (Agent) or Admin can see leads
create policy "Agents can view leads for their properties" on leads
  for select using (exists (
    select 1 from properties 
    where properties.id = leads.property_id 
    and properties.owner_id = auth.uid()
  ));
