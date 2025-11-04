// lib/supabase-anon.ts
import { createClient } from '@supabase/supabase-js'

export function createServerAnon() {
  // No cookies, no session — always pure anon key
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
