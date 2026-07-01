-- ChickBazaar production foundation.
-- This migration is the authoritative baseline for new Supabase environments.

create extension if not exists pgcrypto;
create schema if not exists private;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.users (
  id text primary key default gen_random_uuid()::text,
  auth_user_id uuid unique references auth.users(id) on delete set null,
  name text not null,
  mobile text,
  email text,
  role text not null check (role in ('admin', 'operations', 'delivery', 'collections', 'retailer', 'farm')),
  zone text check (zone is null or zone in ('north', 'south', 'east', 'west', 'central')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.retailers (
  id text primary key default gen_random_uuid()::text,
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'new' check (status in ('new', 'approved', 'blocked', 'rejected')),
  partner_status text not null default 'partner' check (partner_status in ('partner', 'trusted_partner')),
  credit_category text not null default 'new' check (credit_category in ('new', 'trusted', 'premium')),
  credit_limit numeric(14,2) not null default 0 check (credit_limit >= 0),
  available_credit numeric(14,2) not null default 0 check (available_credit >= 0),
  shop_name text not null,
  owner_name text not null,
  mobile text not null unique,
  email text not null,
  address text not null,
  gst text not null unique,
  gst_certificate_path text,
  zone text check (zone is null or zone in ('north', 'south', 'east', 'west', 'central')),
  latitude numeric(10,7),
  longitude numeric(10,7),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.retailer_locations (
  id text primary key default gen_random_uuid()::text,
  retailer_mobile text not null references public.retailers(mobile) on update cascade on delete cascade,
  shop_name text not null,
  contact_person text not null,
  mobile text not null,
  address text not null,
  latitude numeric(10,7),
  longitude numeric(10,7),
  created_at timestamptz not null default now()
);

create table if not exists public.farm_partners (
  id text primary key default gen_random_uuid()::text,
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'new' check (status in ('new', 'approved', 'blocked', 'rejected')),
  farm_name text not null,
  contact_person text not null,
  mobile text not null unique,
  email text not null,
  location text not null,
  daily_capacity integer not null check (daily_capacity >= 0),
  average_bird_weight numeric(6,3) not null check (average_bird_weight > 0),
  message text not null default '',
  zone text check (zone is null or zone in ('north', 'south', 'east', 'west', 'central')),
  latitude numeric(10,7),
  longitude numeric(10,7),
  rating numeric(4,2) not null default 0 check (rating between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id text primary key default gen_random_uuid()::text,
  vehicle_number text not null unique,
  zone text check (zone is null or zone in ('north', 'south', 'east', 'west', 'central')),
  capacity_kg numeric(12,3) not null check (capacity_kg > 0),
  assigned_driver text,
  status text not null default 'available' check (status in ('available', 'on_route', 'maintenance')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id text primary key default gen_random_uuid()::text,
  order_number text not null unique,
  retailer_id text references public.retailers(id) on delete restrict,
  status text not null default 'new' check (status in ('new', 'confirmed', 'locked_for_procurement', 'allocated', 'procured', 'dispatched', 'delivered', 'completed', 'cancelled')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'partially_paid', 'paid', 'refunded', 'failed')),
  payment_amount numeric(14,2) not null default 0 check (payment_amount >= 0),
  payment_type text check (payment_type is null or payment_type in ('advance', 'actual_weight', 'credit')),
  razorpay_order_id text,
  razorpay_payment_id text,
  shop_name text not null,
  owner_name text not null,
  mobile text not null,
  email text not null,
  address text not null,
  birds integer not null default 0 check (birds >= 0),
  average_weight numeric(6,3),
  requested_weight numeric(12,3) check (requested_weight is null or requested_weight >= 0),
  actual_weight numeric(12,3) check (actual_weight is null or actual_weight >= 0),
  rate_per_kg numeric(12,2) check (rate_per_kg is null or rate_per_kg >= 0),
  estimated_amount numeric(14,2) check (estimated_amount is null or estimated_amount >= 0),
  advance_percentage numeric(5,2) check (advance_percentage is null or advance_percentage between 0 and 100),
  advance_required numeric(14,2) check (advance_required is null or advance_required >= 0),
  final_amount numeric(14,2) check (final_amount is null or final_amount >= 0),
  outstanding_amount numeric(14,2),
  delivery_date date not null,
  notes text not null default '',
  zone text check (zone is null or zone in ('north', 'south', 'east', 'west', 'central')),
  latitude numeric(10,7),
  longitude numeric(10,7),
  assigned_farm text,
  assigned_driver text,
  assigned_vehicle text,
  tracking_notes text not null default '',
  delivery_notes text,
  delivered_at timestamptz,
  pod_photo_url text,
  pod_uploaded_at timestamptz,
  locked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_status_history (
  id bigint generated always as identity primary key,
  order_id text not null references public.orders(id) on delete cascade,
  status text not null,
  remarks text,
  actor_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.farm_inventory (
  id text primary key default gen_random_uuid()::text,
  farm_id text not null references public.farm_partners(id) on delete cascade,
  inventory_date date not null,
  weight_category text not null,
  bird_count integer not null default 0 check (bird_count >= 0),
  reserved_bird_count integer not null default 0 check (reserved_bird_count >= 0),
  available_bird_count integer not null default 0 check (available_bird_count >= 0),
  allocated_bird_count integer not null default 0 check (allocated_bird_count >= 0),
  collected_bird_count integer not null default 0 check (collected_bird_count >= 0),
  procurement_price numeric(12,2) check (procurement_price is null or procurement_price >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (farm_id, inventory_date, weight_category),
  check (reserved_bird_count + available_bird_count <= bird_count)
);

create table if not exists public.farm_allocations (
  id text primary key default gen_random_uuid()::text,
  allocation_date date not null,
  order_id text references public.orders(id) on delete set null,
  farm_id text not null references public.farm_partners(id) on delete restrict,
  farm_name text not null,
  weight_category text not null,
  allocated_birds integer not null check (allocated_birds > 0),
  status text not null default 'allocated' check (status in ('allocated', 'accepted', 'rejected', 'collected', 'cancelled')),
  score numeric(8,4),
  score_factors jsonb not null default '{}'::jsonb,
  override_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (allocation_date, farm_id, weight_category, order_id)
);

create table if not exists public.farm_fulfillments (
  id text primary key default gen_random_uuid()::text,
  allocation_id text not null references public.farm_allocations(id) on delete cascade,
  farm_id text not null references public.farm_partners(id) on delete restrict,
  accepted_birds integer not null check (accepted_birds >= 0),
  status text not null check (status in ('accepted', 'rejected', 'loaded', 'collected')),
  remarks text,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id text primary key default gen_random_uuid()::text,
  invoice_number text not null unique,
  order_id text not null unique references public.orders(id) on delete restrict,
  retailer_id text references public.retailers(id) on delete restrict,
  retailer_mobile text,
  retailer_name text not null,
  order_number text not null,
  actual_weight numeric(12,3) not null check (actual_weight >= 0),
  rate_per_kg numeric(12,2) not null check (rate_per_kg >= 0),
  amount numeric(14,2) not null check (amount >= 0),
  status text not null default 'unpaid' check (status in ('unpaid', 'partially_paid', 'paid', 'void')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'partially_paid', 'paid', 'refunded')),
  remarks text,
  created_at timestamptz not null default now()
);

create table if not exists public.retailer_ledger (
  id text primary key default gen_random_uuid()::text,
  retailer_id text not null references public.retailers(id) on delete restrict,
  order_id text references public.orders(id) on delete restrict,
  debit numeric(14,2) not null default 0 check (debit >= 0),
  credit numeric(14,2) not null default 0 check (credit >= 0),
  narration text,
  remarks text,
  payment_mode text,
  reference_number text,
  received_by text,
  created_at timestamptz not null default now(),
  check ((debit > 0 and credit = 0) or (credit > 0 and debit = 0))
);

create table if not exists public.daily_rates (
  id bigint generated always as identity primary key,
  rate_date date not null default current_date,
  rate numeric(12,2) not null check (rate > 0),
  created_at timestamptz not null default now(),
  unique (rate_date)
);

create table if not exists public.platform_settings (
  id integer primary key default 1 check (id = 1),
  booking_amount numeric(14,2) not null default 500,
  partner_max_unpaid_invoices integer not null default 1,
  trusted_partner_max_unpaid_invoices integer not null default 2,
  order_cutoff time not null default '23:59:00',
  timezone text not null default 'Asia/Kolkata',
  updated_at timestamptz not null default now()
);

insert into public.platform_settings (id) values (1) on conflict (id) do nothing;

create table if not exists public.otps (
  mobile text primary key,
  code_hash text not null,
  expires_at timestamptz not null,
  attempt_count integer not null default 0 check (attempt_count between 0 and 10),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  before_data jsonb,
  after_data jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists users_auth_user_id_idx on public.users(auth_user_id);
create index if not exists retailers_user_id_idx on public.retailers(user_id);
create index if not exists retailers_mobile_idx on public.retailers(mobile);
create index if not exists farms_user_id_idx on public.farm_partners(user_id);
create index if not exists orders_retailer_id_idx on public.orders(retailer_id);
create index if not exists orders_mobile_idx on public.orders(mobile);
create index if not exists orders_delivery_status_idx on public.orders(delivery_date, status);
create index if not exists inventory_lookup_idx on public.farm_inventory(farm_id, inventory_date, weight_category);
create index if not exists allocations_order_idx on public.farm_allocations(order_id);
create index if not exists ledger_retailer_created_idx on public.retailer_ledger(retailer_id, created_at desc);
create index if not exists status_history_order_idx on public.order_status_history(order_id, created_at);
create index if not exists audit_entity_idx on public.audit_logs(entity_type, entity_id, created_at desc);

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at before update on public.users for each row execute function public.set_updated_at();
drop trigger if exists retailers_set_updated_at on public.retailers;
create trigger retailers_set_updated_at before update on public.retailers for each row execute function public.set_updated_at();
drop trigger if exists farms_set_updated_at on public.farm_partners;
create trigger farms_set_updated_at before update on public.farm_partners for each row execute function public.set_updated_at();
drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at before update on public.orders for each row execute function public.set_updated_at();
drop trigger if exists inventory_set_updated_at on public.farm_inventory;
create trigger inventory_set_updated_at before update on public.farm_inventory for each row execute function public.set_updated_at();

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.users
    where auth_user_id = (select auth.uid())
      and active = true
      and role in ('admin', 'operations')
  );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

create or replace function public.reserve_farm_inventory(
  p_farm_id text,
  p_farm_name text,
  p_weight_category text,
  p_allocated_birds integer,
  p_order_id text default null,
  p_allocation_date date default current_date
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_inventory public.farm_inventory%rowtype;
  v_allocation_id text;
begin
  if p_allocated_birds <= 0 then
    raise exception 'Allocated birds must be positive';
  end if;

  select * into v_inventory
  from public.farm_inventory
  where farm_id = p_farm_id
    and inventory_date = p_allocation_date
    and weight_category = p_weight_category
  for update;

  if not found then
    raise exception 'Inventory not found';
  end if;

  if v_inventory.available_bird_count < p_allocated_birds then
    raise exception 'Insufficient available inventory';
  end if;

  update public.farm_inventory
  set reserved_bird_count = reserved_bird_count + p_allocated_birds,
      available_bird_count = available_bird_count - p_allocated_birds
  where id = v_inventory.id;

  insert into public.farm_allocations (
    allocation_date, order_id, farm_id, farm_name, weight_category, allocated_birds, status
  ) values (
    p_allocation_date, p_order_id, p_farm_id, p_farm_name, p_weight_category, p_allocated_birds, 'allocated'
  )
  returning id into v_allocation_id;

  return v_allocation_id;
end;
$$;

revoke all on function public.reserve_farm_inventory(text, text, text, integer, text, date) from public, anon, authenticated;
grant execute on function public.reserve_farm_inventory(text, text, text, integer, text, date) to service_role;

alter table public.users enable row level security;
alter table public.retailers enable row level security;
alter table public.retailer_locations enable row level security;
alter table public.farm_partners enable row level security;
alter table public.vehicles enable row level security;
alter table public.orders enable row level security;
alter table public.order_status_history enable row level security;
alter table public.farm_inventory enable row level security;
alter table public.farm_allocations enable row level security;
alter table public.farm_fulfillments enable row level security;
alter table public.invoices enable row level security;
alter table public.retailer_ledger enable row level security;
alter table public.daily_rates enable row level security;
alter table public.platform_settings enable row level security;
alter table public.otps enable row level security;
alter table public.audit_logs enable row level security;

create policy users_read_self on public.users for select to authenticated
using ((select auth.uid()) = auth_user_id or (select private.is_admin()));

create policy retailers_read_self on public.retailers for select to authenticated
using ((select auth.uid()) = user_id or (select private.is_admin()));
create policy retailers_update_self on public.retailers for update to authenticated
using ((select auth.uid()) = user_id or (select private.is_admin()))
with check ((select auth.uid()) = user_id or (select private.is_admin()));

create policy retailer_locations_read_own on public.retailer_locations for select to authenticated
using (retailer_mobile in (select mobile from public.retailers where user_id = (select auth.uid())) or (select private.is_admin()));

create policy farms_read_self on public.farm_partners for select to authenticated
using ((select auth.uid()) = user_id or (select private.is_admin()));
create policy farms_update_self on public.farm_partners for update to authenticated
using ((select auth.uid()) = user_id or (select private.is_admin()))
with check ((select auth.uid()) = user_id or (select private.is_admin()));

create policy orders_retailer_read_own on public.orders for select to authenticated
using (retailer_id in (select id from public.retailers where user_id = (select auth.uid())) or (select private.is_admin()));

create policy order_history_retailer_read_own on public.order_status_history for select to authenticated
using (order_id in (
  select o.id from public.orders o join public.retailers r on r.id = o.retailer_id
  where r.user_id = (select auth.uid())
) or (select private.is_admin()));

create policy invoices_retailer_read_own on public.invoices for select to authenticated
using (retailer_id in (select id from public.retailers where user_id = (select auth.uid())) or (select private.is_admin()));

create policy ledger_retailer_read_own on public.retailer_ledger for select to authenticated
using (retailer_id in (select id from public.retailers where user_id = (select auth.uid())) or (select private.is_admin()));

create policy rates_authenticated_read on public.daily_rates for select to authenticated using (true);
create policy settings_authenticated_read on public.platform_settings for select to authenticated using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('gst-certificates', 'gst-certificates', false, 10485760, array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']),
  ('pod', 'pod', false, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- No direct object policies are created yet. Uploads/downloads are server-only through
-- the service role until role-specific Storage policies are introduced.
