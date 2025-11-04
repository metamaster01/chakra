// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase-browser'

// export default function AuthCallbackPage() {
//   const supabase = createClient()
//   const router = useRouter()
//   const [err, setErr] = useState<string | null>(null)

//   useEffect(() => {
//     let mounted = true
//     ;(async () => {
//       const url = new URL(window.location.href)
//       const search = url.searchParams
//       const hash = new URLSearchParams(url.hash.replace(/^#/, ''))

//       // --- IMPLICIT flow: tokens in the hash ---
//       const accessToken = hash.get('access_token')
//       const refreshToken = hash.get('refresh_token') || hash.get('refresh_token_hash') // provider variants
//       if (accessToken) {
//         // supabase-js should pick this up automatically; make sure session is present
//         const { data: { session }, error } = await supabase.auth.getSession()
//         if (error) console.error('[OAuth callback] getSession error:', error.message)
//         if (session) {
//           router.replace('/account')
//           return
//         }
//         // Fallback: explicitly set session if needed (rare)
//         if (refreshToken) {
//           const { data, error: sessionError } = await supabase.auth.setSession({
//             access_token: accessToken,
//             refresh_token: refreshToken
//           } as any)
//           if (!mounted) return
//           if (sessionError) {
//             console.error('[OAuth callback] setSession error:', sessionError.message)
//             setErr(sessionError.message)
//             setTimeout(() => router.replace('/login?auth=oauth_error'), 1200)
//             return
//           }
//           router.replace('/account')
//           return
//         }
//         // If no session and no refresh fallback, fall through to PKCE attempt
//       }

//       // --- PKCE flow: a `code` must be present ---
//       const code = search.get('code') || hash.get('code')
//       if (!code) {
//         setErr('Missing OAuth code or tokens in callback URL')
//         setTimeout(() => router.replace('/login?auth=oauth_error'), 1000)
//         return
//       }

//       const { error } = await supabase.auth.exchangeCodeForSession(code)
//       if (!mounted) return
//       if (error) {
//         console.error('[OAuth callback] exchange error:', error.message)
//         setErr(error.message)
//         setTimeout(() => router.replace('/login?auth=oauth_error'), 1200)
//         return
//       }
//       router.replace('/account')
//     })()
//     return () => { mounted = false }
//   }, [router, supabase])

//   return (
//     <main className="min-h-[70vh] flex items-center justify-center px-4">
//       <div className="w-full max-w-md rounded-2xl overflow-hidden border border-purple-900/10 bg-white shadow">
//         <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-amber-100 px-6 py-5">
//           <h1 className="text-xl font-semibold">Signing you in…</h1>
//           <p className="text-amber-200/80 text-sm mt-1">Completing the login flow</p>
//         </header>
//         <div className="p-6 text-sm text-purple-900">
//           {err ? <p className="text-rose-700">Error: {err}</p> : <p>Please wait…</p>}
//         </div>
//       </div>
//     </main>
//   )
// }


// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase-browser'

// export default function AuthCallbackPage() {
//   const supabase = createClient()
//   const router = useRouter()
//   const [err, setErr] = useState<string | null>(null)

//   useEffect(() => {
//     let mounted = true
//     ;(async () => {
//       // 1) Try PKCE exchange first using the FULL URL (most reliable)
//       const { error: pkceErr } = await supabase.auth.exchangeCodeForSession(window.location.href)
//       if (!mounted) return
//       if (!pkceErr) {
//         router.replace('/account'); return
//       }

//       // 2) Fallback: implicit flow (if provider returned tokens in hash)
//       const u = new URL(window.location.href)
//       const hash = new URLSearchParams(u.hash.replace(/^#/, ''))
//       const accessToken = hash.get('access_token')
//       const refreshToken = hash.get('refresh_token')

//       if (accessToken) {
//         const { data: { session }, error: sessErr } = await supabase.auth.getSession()
//         if (!mounted) return
//         if (session && !sessErr) { router.replace('/account'); return }

//         if (refreshToken) {
//           const { error: setErr } = await supabase.auth.setSession({
//             access_token: accessToken,
//             refresh_token: refreshToken
//           } as any)
//           if (!mounted) return
//           if (!setErr) { router.replace('/account'); return }
//         }
//       }

//       // 3) If we’re still here → show error and bounce to /login
//       console.error('[OAuth callback] exchange error:', pkceErr?.message)
//       setErr(pkceErr?.message ?? 'OAuth exchange failed')
//       setTimeout(() => router.replace('/login?auth=oauth_error'), 1200)
//     })()
//     return () => { mounted = false }
//   }, [router, supabase])

//   return (
//     <main className="min-h-[70vh] flex items-center justify-center px-4">
//       <div className="w-full max-w-md rounded-2xl overflow-hidden border border-purple-900/10 bg-white shadow">
//         <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-amber-100 px-6 py-5">
//           <h1 className="text-xl font-semibold">Signing you in…</h1>
//           <p className="text-amber-200/80 text-sm mt-1">Completing the login flow</p>
//         </header>
//         <div className="p-6 text-sm text-purple-900">
//           {err ? <p className="text-rose-700">Error: {err}</p> : <p>Please wait…</p>}
//         </div>
//       </div>
//     </main>
//   )
// }


'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function AuthCallbackPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    let alive = true
    ;(async () => {
      const url = new URL(window.location.href)
      const search = url.searchParams
      const hash = new URLSearchParams(url.hash.replace(/^#/, ''))

      // 1) If provider returned tokens in the hash (implicit flow), finish immediately.
      if (hash.get('access_token')) {
        const { data: { session } } = await supabase.auth.getSession()
        if (!alive) return
        if (session) { router.replace('/account'); return }
        // (rare) try to set the session if refresh_token is present
        const refresh_token = hash.get('refresh_token')
        if (refresh_token) {
          await supabase.auth.setSession({
            access_token: hash.get('access_token') as string,
            refresh_token
          } as any)
          if (!alive) return
          router.replace('/account'); return
        }
      }

      // 2) PKCE path: only attempt exchange when a code exists.
      const code = search.get('code') || hash.get('code')
      if (code) {
        // Pass the FULL URL (lets the SDK find the PKCE verifier in storage)
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
        if (!alive) return
        if (!error) { router.replace('/account'); return }
        // If this fails, fall back to login without spamming console
        router.replace('/login?auth=oauth_error'); return
      }

      // 3) Neither implicit tokens nor code present → back to login.
      router.replace('/login?auth=oauth_error')
    })()
    return () => { alive = false }
  }, [router, supabase])

  return (
    <main className="min-h-[70vh] grid place-items-center text-purple-900">
      <div className="rounded-2xl border border-purple-900/10 bg-white shadow px-6 py-5">
        Completing sign-in…
      </div>
    </main>
  )
}
