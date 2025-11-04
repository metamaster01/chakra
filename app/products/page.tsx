export const dynamic = 'force-dynamic'
export const revalidate = 0 // ISR


import { FooterSection } from '@/components/footer-section'
import ProductCard from '@/components/ProductCard'
// import { createServer } from '@/lib/supabase-server'
import { createServerAnon } from '@/lib/supabase-anon'


export default async function ProductsPage() {
  const supabase = createServerAnon()
  const { data: products, error } = await supabase
    .from('products')
    .select('id, slug, name, short_desc, price_paise, primary_image_url')
    .order('id', { ascending: true })

  if (error) return <div className="p-8 text-red-700">Failed to fetch products: {error.message}</div>

  if (!products?.length) return <div className="p-8 text-purple-900/70">No products found.</div>

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">

    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 mt-8" >
      <header className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-purple-900">Our Products</h1>
        <p className="text-sm text-purple-900/70">Sacred Tools For Healing, Energy, And Balance.</p>
      </header>

      <div className="grid gap-5 sm:gap-6
                      grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
        {(products || []).map(p => (
          <ProductCard
            key={p.slug}
            slug={p.slug}
            name={p.name}
            short_desc={p.short_desc}
            price_paise={p.price_paise}
            image={p.primary_image_url}
          />
        ))}
      </div>
    </main>
    <div className='mt-10'>

      <FooterSection />
    </div>
    </div>
  )
}
