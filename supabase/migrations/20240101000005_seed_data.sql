-- Create RPC function for safe RSVP with seat limit check
create or replace function join_meetup(meetup_id_param uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
  current_rsvp_count int;
  max_seats int;
  existing_rsvp_id uuid;
begin
  -- Get current RSVP count and max seats
  select 
    count(*) filter (where r.status = 'going'),
    m.group_size
  into current_rsvp_count, max_seats
  from meetups m
  left join rsvps r on r.meetup_id = m.id and r.status = 'going'
  where m.id = meetup_id_param
  group by m.group_size;

  -- Check if user already has an RSVP
  select id into existing_rsvp_id
  from rsvps
  where meetup_id = meetup_id_param and user_id = auth.uid();

  -- If user already RSVPed, update to 'going'
  if existing_rsvp_id is not null then
    update rsvps
    set status = 'going'
    where id = existing_rsvp_id;
    
    return jsonb_build_object('success', true, 'message', '参加を再確認しました');
  end if;

  -- Check seat limit
  if current_rsvp_count >= max_seats then
    return jsonb_build_object('success', false, 'message', '定員に達しています');
  end if;

  -- Create new RSVP
  insert into rsvps (meetup_id, user_id, status)
  values (meetup_id_param, auth.uid(), 'going');

  return jsonb_build_object('success', true, 'message', '参加を確定しました');
end;
$$;

-- Seed data: Create test profiles (in real scenarios, these would be created via auth)
-- Note: You'll need to create actual auth users first, then reference their IDs here
-- For demo purposes, we'll use placeholder UUIDs that you should replace when testing

-- Seed meetups for Fukuoka
insert into meetups (
  id,
  host_id,
  city,
  starts_at,
  area,
  duration_min,
  group_size,
  budget_yen,
  language_ratio,
  payment_type,
  beginner_friendly,
  public_place_only,
  rules,
  status
) values
(
  'aaaaaaaa-0000-0000-0000-000000000001',
  'bbbbbbbb-0000-0000-0000-000000000001', -- Replace with actual user ID
  '福岡',
  now() + interval '2 hours',
  '天神',
  90,
  4,
  2000,
  '{"ja": 50, "en": 50}'::jsonb,
  '各自払い',
  true,
  true,
  '{"photoOk": true, "topicsAvoid": ["政治", "宗教"]}'::jsonb,
  'open'
),
(
  'aaaaaaaa-0000-0000-0000-000000000002',
  'bbbbbbbb-0000-0000-0000-000000000001',
  '福岡',
  now() + interval '1 day',
  '博多',
  120,
  6,
  3000,
  '{"ja": 70, "en": 30}'::jsonb,
  '割り勘',
  true,
  true,
  '{"photoOk": false, "topicsAvoid": []}'::jsonb,
  'open'
),
(
  'aaaaaaaa-0000-0000-0000-000000000003',
  'bbbbbbbb-0000-0000-0000-000000000002',
  '福岡',
  now() + interval '3 days',
  '中洲',
  60,
  3,
  1500,
  '{"ja": 30, "en": 70}'::jsonb,
  '各自払い',
  false,
  true,
  '{"photoOk": true, "topicsAvoid": ["年齢", "収入"]}'::jsonb,
  'open'
);

-- Seed meetups for Kagoshima
insert into meetups (
  id,
  host_id,
  city,
  starts_at,
  area,
  duration_min,
  group_size,
  budget_yen,
  language_ratio,
  payment_type,
  beginner_friendly,
  public_place_only,
  rules,
  status
) values
(
  'aaaaaaaa-0000-0000-0000-000000000004',
  'bbbbbbbb-0000-0000-0000-000000000002',
  '鹿児島',
  now() + interval '4 hours',
  '天文館',
  90,
  4,
  2500,
  '{"ja": 60, "en": 40}'::jsonb,
  '各自払い',
  true,
  true,
  '{"photoOk": true, "topicsAvoid": []}'::jsonb,
  'open'
),
(
  'aaaaaaaa-0000-0000-0000-000000000005',
  'bbbbbbbb-0000-0000-0000-000000000003',
  '鹿児島',
  now() + interval '2 days',
  '中央駅前',
  120,
  5,
  3500,
  '{"ja": 50, "en": 50}'::jsonb,
  '割り勘',
  true,
  true,
  '{"photoOk": false, "topicsAvoid": ["政治"]}'::jsonb,
  'open'
),
(
  'aaaaaaaa-0000-0000-0000-000000000006',
  'bbbbbbbb-0000-0000-0000-000000000003',
  '鹿児島',
  now() + interval '5 days',
  '鴨池',
  75,
  3,
  2000,
  '{"ja": 40, "en": 60}'::jsonb,
  '各自払い',
  false,
  true,
  '{"photoOk": true, "topicsAvoid": []}'::jsonb,
  'open'
);

-- Note: Before applying this migration, make sure to:
-- 1. Create auth users via Supabase Auth
-- 2. Create corresponding profiles for those users
-- 3. Replace the placeholder host_id values with actual user IDs
