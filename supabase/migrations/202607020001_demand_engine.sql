-- ============================================================
-- ChickBazaar ERP
-- Migration:
-- 202607020001_demand_engine.sql
-- Demand Planning Engine
-- ============================================================

-- ============================================================
-- REPEAT ORDERS
-- ============================================================

create table if not exists public.repeat_orders (

    id text primary key default gen_random_uuid()::text,

    retailer_id text not null
        references public.retailers(id)
        on delete cascade,

    order_by text not null
        check (order_by in ('weight','birds')),

    requested_weight numeric(12,3),

    birds integer,

    average_weight numeric(6,3),

    frequency text not null
        check (
            frequency in (
                'daily',
                'weekly',
                'monthly'
            )
        ),

    week_days text[],

    month_days integer[],

    delivery_address text not null,

    latitude numeric(10,7),

    longitude numeric(10,7),

    payment_type text
        check (
            payment_type in (
                'advance',
                'actual_weight',
                'credit'
            )
        ),

    start_date date not null,

    end_date date,

    skip_sundays boolean default false,

    skip_holidays boolean default false,

    status text not null default 'active'
        check (
            status in (
                'active',
                'paused',
                'completed',
                'cancelled'
            )
        ),

    remarks text,

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);

create index if not exists repeat_orders_retailer_idx
on public.repeat_orders(retailer_id);

create index if not exists repeat_orders_status_idx
on public.repeat_orders(status);
-- ============================================================
-- REPEAT ORDER EXCEPTIONS
-- ============================================================

create table if not exists public.repeat_order_exceptions (

    id text primary key default gen_random_uuid()::text,

    repeat_order_id text not null
        references public.repeat_orders(id)
        on delete cascade,

    exception_date date not null,

    requested_weight numeric(12,3),

    birds integer,

    action text not null
        check (
            action in (
                'override',
                'skip'
            )
        ),

    remarks text,

    created_at timestamptz default now(),

    unique(
        repeat_order_id,
        exception_date
    )
);
-- ============================================================
-- FUTURE BOOKINGS
-- ============================================================

create table if not exists public.future_bookings (

    id text primary key default gen_random_uuid()::text,

    retailer_id text not null
        references public.retailers(id)
        on delete cascade,

    order_by text not null
        check (
            order_by in (
                'weight',
                'birds'
            )
        ),

    requested_weight numeric(12,3),

    birds integer,

    average_weight numeric(6,3),

    delivery_date date not null,

    payment_type text,

    delivery_address text,

    latitude numeric(10,7),

    longitude numeric(10,7),

    status text not null default 'planned'
        check (
            status in (
                'planned',
                'converted',
                'cancelled'
            )
        ),

    remarks text,

    created_at timestamptz default now()
);

create index if not exists future_booking_date_idx
on public.future_bookings(delivery_date);
-- ============================================================
-- STANDING CONTRACTS
-- ============================================================

create table if not exists public.standing_contracts (

    id text primary key default gen_random_uuid()::text,

    retailer_id text not null
        references public.retailers(id)
        on delete cascade,

    contract_name text not null,

    minimum_daily_weight numeric(12,3),

    maximum_daily_weight numeric(12,3),

    start_date date,

    end_date date,

    priority integer default 1,

    status text default 'active'
        check (
            status in (
                'active',
                'expired',
                'cancelled'
            )
        ),

    remarks text,

    created_at timestamptz default now()
);
-- ============================================================
-- PLANNING CALENDAR
-- ============================================================

create table if not exists public.planning_calendar (

    planning_date date primary key,

    confirmed_orders integer default 0,

    repeat_orders integer default 0,

    future_orders integer default 0,

    expected_weight numeric(14,3) default 0,

    expected_birds integer default 0,

    expected_revenue numeric(14,2) default 0,

    expected_procurement numeric(14,2) default 0,

    allocation_completed boolean default false,

    procurement_completed boolean default false,

    dispatch_completed boolean default false,

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);
create trigger repeat_orders_updated
before update
on public.repeat_orders
for each row
execute function public.set_updated_at();

create trigger planning_calendar_updated
before update
on public.planning_calendar
for each row
execute function public.set_updated_at();