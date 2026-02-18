-- Meetups table
create table meetups (
  id uuid primary key default uuid_generate_v4(),
  host_id uuid not null references profiles(id) on delete cascade,
  city text not null check (city in ('福岡', '鹿児島')),
  starts_at timestamptz not null,
  area text not null,
  duration_min integer not null,
  group_size integer not null check (group_size >= 2),
  budget_yen integer not null,
  language_ratio jsonb not null, -- e.g., {"ja": 50, "en": 50}
  payment_type text not null check (payment_type in ('各自払い', '割り勘', 'ホスト負担')),
  beginner_friendly boolean default false,
  public_place_only boolean default true,
  rules jsonb default '{}'::jsonb,
  status text default 'open' check (status in ('open', 'closed', 'cancelled')),
  created_at timestamptz default now()
);

-- Enable RLS
alter table meetups enable row level security;

-- Create indexes for filtering
create index meetups_city_idx on meetups(city);
create index meetups_starts_at_idx on meetups(starts_at);
create index meetups_status_idx on meetups(status);
create index meetups_host_id_idx on meetups(host_id);
