// // lib/supabase-server.ts
// import { cookies } from 'next/headers';
// import { createServerClient, type CookieOptions } from '@supabase/ssr';
// import { createClient as createServiceClient, type SupabaseClient } from '@supabase/supabase-js';

// const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!; // keep server-only

// export function createServer() {
//   const cookieStore = cookies();
//   return createServerClient(URL, ANON, {
//     cookies: {
//       get: (name: string) => cookieStore.get(name)?.value,
//       set: (name: string, value: string, options: CookieOptions) => {
//         try { cookieStore.set({ name, value, ...options }); } catch {}
//       },
//       remove: (name: string, options: CookieOptions) => {
//         try { cookieStore.set({ name, value: '', ...options }); } catch {}
//       },
//     },
//   });
// }

// export function createService(): SupabaseClient {
//   if (typeof window !== 'undefined') throw new Error('createService() is server-only');
//   return createServiceClient(URL, SERVICE, { auth: { persistSession: false } });
// }

// export async function requireUser() {
//   const supabase = createServer();
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) throw new Error('Unauthorized');
//   return { supabase, user };
// }


// lib/supabase-server.ts
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient as createServiceClient, type SupabaseClient } from '@supabase/supabase-js'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!

/** Server-side client (await this in server code) */
export async function createServer() {
  const cookieStore = await cookies() // NOTE: now awaited

  return createServerClient(URL, ANON, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try { cookieStore.set({ name, value, ...options }) } catch {}
      },
      remove(name: string, options: CookieOptions) {
        try { cookieStore.set({ name, value: '', ...options }) } catch {}
      },
    },
  })
}

/** Service (admin) client — server-only */
export function createService(): SupabaseClient {
  if (typeof window !== 'undefined') throw new Error('createService() is server-only')
  return createServiceClient(URL, SERVICE, { auth: { persistSession: false } })
}

/** Helper to require an authenticated user (optional) */
export async function requireUser() {
  const supabase = await createServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return { supabase, user }
}
