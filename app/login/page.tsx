// app/login/page.tsx
import AuthCard from '@/components/AuthCard'
import { createServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = await createServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/account')
  return <AuthCard />
}
