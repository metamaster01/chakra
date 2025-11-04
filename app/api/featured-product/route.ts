import { createServerAnon } from '@/lib/supabase-anon'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createServerAnon()
  
  // Fetch 6 random products
  const { data: products, error } = await supabase
    .from('products')
    .select('id, slug, name, short_desc, price_paise, primary_image_url')
    .limit(6)
    // For random selection, you might want to add order by random() or fetch all and randomize
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ products })
}