// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnon);

export async function getCreditsFromDB(userId) {
  if (!userId) return 0;
  try {
    const { data, error } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('id', userId)
      .single();
    if (error) return 0;
    return data?.credits || 0;
  } catch { return 0; }
}

export async function deductCredits(userId, amount) {
  if (!userId) throw new Error('Not logged in.');
  const { error } = await supabase.rpc('deduct_credits', {
    user_id: userId,
    amount,
  });
  if (error) throw new Error('Failed to deduct credits.');
}

export async function addCreditsDB(userId, amount) {
  if (!userId) throw new Error('Not logged in.');
  const { error } = await supabase.rpc('add_credits', {
    user_id: userId,
    amount,
  });
  if (error) throw new Error('Failed to add credits.');
}
