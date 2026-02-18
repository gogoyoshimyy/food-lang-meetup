-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null,
  bio text,
  city text not null check (city in ('福岡', '鹿児島')),
  languages jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Create index for faster lookups
create index profiles_city_idx on profiles(city);
