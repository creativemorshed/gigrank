-- Run this in Supabase SQL Editor AFTER the first SQL

-- Function to add credits safely
create or replace function public.add_credits(user_id uuid, amount integer)
returns void as $$
begin
  update public.user_credits
  set
    credits = credits + amount,
    total_purchased = total_purchased + amount,
    updated_at = now()
  where id = user_id;
end;
$$ language plpgsql security definer;

-- Function to deduct credits safely (prevents going below 0)
create or replace function public.deduct_credits(user_id uuid, amount integer)
returns boolean as $$
declare
  current_credits integer;
begin
  select credits into current_credits
  from public.user_credits
  where id = user_id;

  if current_credits < amount then
    return false;
  end if;

  update public.user_credits
  set
    credits = credits - amount,
    updated_at = now()
  where id = user_id;

  return true;
end;
$$ language plpgsql security definer;

-- Allow service role to call these functions
grant execute on function public.add_credits(uuid, integer) to service_role;
grant execute on function public.deduct_credits(uuid, integer) to service_role;
grant execute on function public.add_credits(uuid, integer) to authenticated;
grant execute on function public.deduct_credits(uuid, integer) to authenticated;
