-- RLS Policies for profiles
-- Select: public can view all profiles
create policy "Profiles are viewable by everyone"
  on profiles for select
  using (true);

-- Insert: users can only insert their own profile
create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Update: users can only update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

--------------------------------------
-- RLS Policies for meetups
-- Select: all meetups are public
create policy "Meetups are viewable by everyone"
  on meetups for select
  using (true);

-- Insert: users can only create meetups for themselves
create policy "Users can create own meetups"
  on meetups for insert
  with check (auth.uid() = host_id);

-- Update: only host can update their meetups
create policy "Hosts can update own meetups"
  on meetups for update
  using (auth.uid() = host_id);

-- Delete: only host can delete their meetups
create policy "Hosts can delete own meetups"
  on meetups for delete
  using (auth.uid() = host_id);

--------------------------------------
-- RLS Policies for rsvps
-- Select: users can see their own RSVPs or RSVPs to their hosted meetups
create policy "Users can view relevant RSVPs"
  on rsvps for select
  using (
    auth.uid() = user_id 
    or 
    exists (
      select 1 from meetups 
      where meetups.id = rsvps.meetup_id 
      and meetups.host_id = auth.uid()
    )
  );

-- Insert: users can only RSVP for themselves
create policy "Users can create own RSVPs"
  on rsvps for insert
  with check (auth.uid() = user_id);

-- Update: users can only update their own RSVPs
create policy "Users can update own RSVPs"
  on rsvps for update
  using (auth.uid() = user_id);

-- Delete: users can delete their own RSVPs
create policy "Users can delete own RSVPs"
  on rsvps for delete
  using (auth.uid() = user_id);

--------------------------------------
-- RLS Policies for reports
-- Insert: authenticated users can create reports
create policy "Users can create reports"
  on reports for insert
  with check (auth.uid() = reporter_id);

-- Select: no one can select (admin-only in production, disabled for MVP)
-- (No select policy = no one can read except via service role)
