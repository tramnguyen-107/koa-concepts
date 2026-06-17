-- =============================================
-- KOA CONCEPTS — SUPABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. PRODUCTS
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  type text,
  category text,
  material text,
  price numeric(10,2) not null,
  description text,
  dims text,
  shipping text,
  tag text,
  active boolean default true,
  created_at timestamptz default now()
);

-- 2. INVENTORY TRANSACTIONS
create table if not exists inventory_transactions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  type text check (type in ('in', 'out', 'sale', 'adjustment')),
  quantity integer not null,
  unit_price numeric(10,2),
  note text,
  created_at timestamptz default now()
);

-- 3. ORDERS (reservations)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  product_name text,
  customer_name text not null,
  customer_email text not null,
  zip_code text,
  finish text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'paid', 'shipped', 'cancelled')),
  notes text,
  created_at timestamptz default now()
);

-- 4. NEWSLETTER SUBSCRIBERS
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text default 'active' check (status in ('active', 'unsubscribed')),
  created_at timestamptz default now()
);

-- 5. LEADS (contact form)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz default now()
);

-- 6. MEMBERS
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text,
  email text unique not null,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

-- =============================================
-- SEED PRODUCTS
-- =============================================
insert into products (slug, name, type, category, material, price, description, dims, shipping, tag) values
('seville-sofa-set', 'Seville Sofa Set', 'Outdoor Sofa · 3-piece', 'Sets', 'Aluminum · Sunbrella', 890, 'A three-piece sofa set that comes together in under an hour. Clean lines, deep seats, and built to stay outside.', 'Sofa: 220W × 80D × 75H cm · Chair: 80W × 80D × 75H cm · Table: 60W × 60D × 40H cm', 'Ships in multiple boxes. Lead time 8–12 weeks.', 'Best Seller'),
('cantor-rocking-lounger', 'Cantor Rocking Lounger', 'Lounge Chair', 'Seating', 'Aluminum · Mesh', 420, 'The rocking lounge chair that earns its spot. Woven mesh seat, powder-coated frame.', '75W × 120D × 85H cm', 'Ships in 1 box. Lead time 8–12 weeks.', 'New'),
('maritsa-bistro-set', 'Maritsa Bistro Set', 'Bistro Set · 3-piece', 'Sets', 'Aluminum · Cushion', 340, 'Two chairs and a table that turn any corner into a destination.', 'Table: 70 × 70 × 74H cm · Chair: 52W × 56D × 85H cm', 'Ships in multiple boxes. Lead time 8–12 weeks.', ''),
('andes-lounge-chair', 'Andes Lounge Chair', 'Lounge Chair', 'Seating', 'Aluminum · Mesh', 280, 'Lightweight and quietly good-looking. The chair that works everywhere.', '68W × 78D × 82H cm', 'Ships in 1 box. Lead time 8–12 weeks.', ''),
('eastdale-dining-set', 'Eastdale Dining Set', 'Dining · 5-piece', 'Sets', 'Aluminum · Cushion', 1100, 'A full outdoor dining set — table plus four chairs.', 'Table: 160W × 90D × 75H cm · Chair: 55W × 60D × 88H cm', 'Ships in multiple boxes. Lead time 8–12 weeks.', ''),
('flysta-square', 'Flysta Side Table', 'Side Table · Square', 'Tables', 'Aluminum', 140, 'Always in the right place. Minimal, light, and built to stay outside year-round.', '45W × 45D × 50H cm', 'Ships in 1 box. Lead time 8–12 weeks.', ''),
('flysta-barrel', 'Flysta Barrel Table', 'Side Table · Barrel', 'Tables', 'Aluminum', 155, 'Barrel-shaped side table. Pairs perfectly with the Seville Sofa or Cantor Lounger.', 'Ø 40 × 52H cm', 'Ships in 1 box. Lead time 8–12 weeks.', '')
on conflict (slug) do nothing;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
alter table products enable row level security;
alter table inventory_transactions enable row level security;
alter table orders enable row level security;
alter table newsletter_subscribers enable row level security;
alter table leads enable row level security;
alter table members enable row level security;

-- Public can read products
create policy "Public read products" on products for select using (true);

-- Anyone can insert orders, newsletter, leads
create policy "Public insert orders" on orders for insert with check (true);
create policy "Public insert newsletter" on newsletter_subscribers for insert with check (true);
create policy "Public insert leads" on leads for insert with check (true);

-- Members can read their own data
create policy "Members read own" on members for select using (auth.uid() = user_id);
create policy "Members insert own" on members for insert with check (auth.uid() = user_id);
