import type { Profile } from '@/types/profile';

import { getSupabaseClient } from './supabase';

export async function getAuthorizedProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await getSupabaseClient()
    .from('profiles')
    .select('id, name, created_at')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data as Profile | null;
}
