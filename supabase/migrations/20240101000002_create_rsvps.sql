-- RSVPs table
create table rsvps (
  id uuid primary key default uuid_generate_v4(),
  meetup_id uuid not null references meetups(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  status text default 'going' check (status in ('going', 'cancelled')),
  created_at timestamptz default now(),
  unique(meetup_id, user_id)
);

-- Enable RLS
alter table rsvps enable row level security;

-- Create indexes
create index rsvps_meetup_id_idx on rsvps(meetup_id);
create index rsvps_user_id_idx on rsvps(user_id);
