-- Reports table
create table reports (
  id uuid primary key default uuid_generate_v4(),
  reporter_id uuid not null references profiles(id) on delete cascade,
  target_user_id uuid references profiles(id) on delete cascade,
  meetup_id uuid references meetups(id) on delete cascade,
  reason text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table reports enable row level security;

-- Create index
create index reports_created_at_idx on reports(created_at desc);
