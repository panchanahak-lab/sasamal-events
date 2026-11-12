import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(rawUrl) &&
    Boolean(rawKey) &&
    rawUrl !== 'your_supabase_project_url' &&
    (rawUrl.startsWith('http://') || rawUrl.startsWith('https://'))
  );
};

// Safe fallback client so the app runs smoothly in offline/demo mode without crashing on import
const fallbackUrl = 'https://demo-sasamal-events.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo';

export const supabase = createClient(
  isSupabaseConfigured() ? rawUrl : fallbackUrl,
  isSupabaseConfigured() ? rawKey : fallbackKey
);
