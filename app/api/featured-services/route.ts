import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // or use anon if your RLS allows public read
);

export async function GET() {
  const { data, error } = await supabase
    .from('services')
    .select('id, slug, title, short_desc, image_path, is_active')
    .eq('is_active', true)
    .order('created_at', { ascending: true })
    .limit(12);

  if (error) {
    return NextResponse.json({ services: [], error: error.message }, { status: 500 });
  }
  return NextResponse.json({ services: data ?? [] });
}
