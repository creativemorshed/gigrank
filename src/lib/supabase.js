// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error('Missing Supabase environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnon);

// ── Get current user's credits from DB
export async function getCreditsFromDB(userId) {
  const { data, error } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('id', userId)
    .single();
  if (error) return 0;
  return data?.credits || 0;
}

// ── Deduct credits (called after successful analysis)
export async function deductCredits(userId, amount) {
  const { data, error } = await supabase.rpc('deduct_credits', {
    user_id: userId,
    amount,
  });
  if (error) throw new Error('Failed to deduct credits.');
  return data;
}

// ── Add credits (called after redeem)
export async function addCreditsDB(userId, amount) {
  const { error } = await supabase.rpc('add_credits', {
    user_id: userId,
    amount,
  });
  if (error) throw new Error('Failed to add credits.');
}
