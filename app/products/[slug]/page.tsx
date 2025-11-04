// "use client";
// export const dynamic = "force-dynamic";

// // import { createServer } from '@/lib/supabase-server'
// import { createServerAnon } from "@/lib/supabase-anon";
// import { inr } from "@/lib/money";
// import Gallery from "@/components/ui/Gallery";
// import LikeButton from "@/components/ui/LikeButton";
// import ReviewsBlock from "@/components/ui/ReviewBlock";
// import ProductOptions from "@/components/ui/ProductOptions";
// import { useState } from "react";
// import StatsLive from "@/components/ui/StatsLive";
// import { Tabs, TabPanel } from "@/components/ui/Tabs";
// import { Truck, RotateCcw } from "lucide-react";
// import Link from "next/link";

// type PageProps = { params: Promise<{ slug: string }> };

// export async function generateMetadata({ params }: PageProps) {
//   const { slug } = await params;
//   return { title: `${decodeURIComponent(slug).replace(/-/g, " ")} • Product` };
// }

// export default async function ProductDetailPage({ params }: PageProps) {
//   const [selectedVariant, setSelectedVariant] = useState<any>(null);

//   const { slug } = await params;
//   const supabase = createServerAnon();

//   const { data: product, error } = await supabase
//     .from("products")
//     .select(
//       "id, name, slug, sku, short_desc, description, price_paise, mrp_paise, rating_avg, rating_count, meta, primary_image_url"
//     )
//     .eq("slug", slug)
//     .single();

//   if (error) {
//     console.error("product query error:", error); // temporary
//   }
//   if (!product) {
//     return (
//       <main className="mx-auto max-w-5xl px-4 py-16">
//         <div className="rounded-2xl border border-purple-900/10 bg-white p-8 text-purple-900">
//           Product not found.{" "}
//           <Link href="/products" className="underline">
//             Back to products
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   const { data: images } = await supabase
//     .from("product_images")
//     .select("id, url, sort_order")
//     .eq("product_id", product.id)
//     .order("sort_order", { ascending: true });

//   const { data: variants, error: vErr } = await supabase
//     .from("product_variants")
//     .select(
//       "id, sku, color_label, color_value, size_label, price_paise, mrp_paise, stock, image_url"
//     )
//     .eq("product_id", product.id)
//     .order("id");

//   const colors = Array.from(
//     new Map(
//       (variants || [])
//         .filter((v) => v.color_label || v.color_value)
//         .map((v) => [
//           v.color_label || v.color_value,
//           { label: v.color_label, value: v.color_value },
//         ])
//     ).values()
//   );

//   const sizes = Array.from(
//     new Set((variants || []).map((v) => v.size_label).filter(Boolean))
//   ) as string[];

//   if (error) console.error("product query error:", error);

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-10">
//       <div className="grid md:grid-cols-2 gap-8">
//         <Gallery
//           primary={product.primary_image_url}
//           images={images || []}
//           name={product.name}
//         />

//         <section className="flex flex-col">
//           {/* breadcrumb placeholder */}
//           <div className="text-xs text-purple-900/50 mb-3">
//             Home / Products /{" "}
//             <span className="text-purple-900">{product.name}</span>
//           </div>

//           <div className="flex items-start justify-between gap-3">
//             <h1 className="text-2xl md:text-3xl font-semibold text-purple-900">
//               {product.name}
//             </h1>
//             <LikeButton productId={product.id} />
//           </div>

//           <p className="mt-2 text-sm text-purple-900/70">
//             {product.short_desc}
//           </p>

//           <div className="mt-4 border-t pt-4">
//             <div className="flex items-center gap-4">
//               <div className="text-2xl font-bold text-purple-900">
//                 {inr(product.price_paise)}
//               </div>
//               {product.mrp_paise && (
//                 <div className="text-purple-900/40 line-through">
//                   {inr(product.mrp_paise)}
//                 </div>
//               )}
//               <StatsLive
//                 productId={product.id}
//                 initialAvg={product.rating_avg}
//                 initialCount={product.rating_count}
//               />
//             </div>

//             {/* {colors.length > 0 && (
//               <div className="mt-6">
//                 <div className="text-sm text-purple-900/70 mb-2">Choose a Color</div>
//                 <div className="flex gap-3">
//                   {colors.map((c, i) => (
//                     <div key={i} className="h-8 w-8 rounded-full ring-2 ring-purple-900/10" style={{ backgroundColor: c }} />
//                   ))}
//                 </div>
//               </div>
//             )} */}


//             {/* prev code for product option and quantity button */}

//             {/* <ProductOptions colors={colors} sizes={sizes} />

      
//             <div className="mt-6 flex items-center gap-3">
//               <Quantity />
//               <button className="rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95">
//                 Add To Cart
//               </button>
//               <ShareButton
//                 name={product.name}
//                 url={`/products/${product.slug}`}
//               />
//             </div> */}

//             <ProductOptions
//               variants={variants || []}
//               onChange={setSelectedVariant}
//             />

//             <div className="mt-6 flex items-center gap-3">
//               <div className="inline-flex items-center rounded-full bg-purple-900/5 px-3 py-2">
//                 {/* quantity placeholder */}
//                 <button className="px-2 text-purple-900/70">−</button>
//                 <span className="px-3 text-purple-900">1</span>
//                 <button className="px-2 text-purple-900/70">+</button>
//               </div>

//               <button
//                 className="rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95 disabled:opacity-50"
//                 disabled={(variants?.length ?? 0) > 0 && !selectedVariant}
//                 onClick={() => {
//                   if (!selectedVariant) return;
//                   // TODO: add-to-cart: push to cart table or local state
//                   alert(
//                     `Variant selected: ${
//                       selectedVariant.sku || selectedVariant.id
//                     }`
//                   );
//                 }}
//               >
//                 Add To Cart
//               </button>
//             </div>

//             <div className="mt-6 rounded-2xl border border-purple-900/10 bg-white divide-y">
//               <div className="p-4 flex items-start gap-3">
//                 <div className="mt-0.5 text-purple-900/80">
//                   <Truck size={18} />
//                 </div>
//                 <div>
//                   <div className="font-medium text-purple-900">
//                     Free Delivery
//                   </div>
//                   <div className="text-xs text-purple-900/60">
//                     Enter your Postal code for Delivery Availability
//                   </div>
//                 </div>
//               </div>
//               <div className="p-4 flex items-start gap-3">
//                 <div className="mt-0.5 text-purple-900/80">
//                   <RotateCcw size={18} />
//                 </div>
//                 <div>
//                   <div className="font-medium text-purple-900">
//                     Return Delivery
//                   </div>
//                   <div className="text-xs text-purple-900/60">
//                     Free 30 days Delivery Return.{" "}
//                     <span className="underline">Details</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Tabs — Description & Reviews */}
//       <div className="mt-10">
//         <Tabs
//           items={[
//             { id: "desc", label: "Description" },
//             { id: "reviews", label: "Reviews" },
//           ]}
//         >
//           <TabPanel id="desc">
//             <article className="prose max-w-none prose-p:text-purple-900/90 prose-li:marker:text-amber-400">
//               <div
//                 dangerouslySetInnerHTML={{ __html: product.description || "" }}
//               />
//             </article>
//           </TabPanel>

//           <TabPanel id="reviews">
//             <ReviewsBlock productId={product.id} />
//           </TabPanel>
//         </Tabs>
//       </div>
//     </main>
//   );
// }

// function Quantity() {
//   return (
//     <div className="inline-flex items-center rounded-full bg-purple-900/5 px-3 py-2">
//       <button className="px-2 text-purple-900/70">−</button>
//       <span className="px-3 text-purple-900">1</span>
//       <button className="px-2 text-purple-900/70">+</button>
//     </div>
//   );
// }

// function ShareButton({ name, url }: { name: string; url: string }) {
//   const u = typeof window === "undefined" ? url : location.origin + url;
//   return (
//     <a
//       href={`https://wa.me/?text=${encodeURIComponent(name + " " + u)}`}
//       target="_blank"
//       className="rounded-full px-5 py-3 text-sm font-medium bg-amber-200 text-purple-900 hover:bg-amber-300"
//     >
//       Share
//     </a>
//   );
// }

// /** Super-light tabs */
// // function Tabs({ children }: { children: React.ReactNode }) {
// //   return <div className="rounded-2xl border border-purple-900/10 bg-white">{children}</div>
// // }
// // Tabs.Button = function TabButton({ id, children }: any) {
// //   return (
// //     <a href={`#${id}`} className="inline-block px-5 py-3 text-sm font-medium text-purple-900/80 hover:text-purple-900">
// //       {children}
// //     </a>
// //   )
// // }
// // Tabs.Panel = function TabPanel({ id, children }: any) {
// //   return <div id={id} className="px-5 md:px-6 py-6">{children}</div>
// // }


// REMOVE: "use client"
export const dynamic = 'force-dynamic';

import { createServerAnon } from '@/lib/supabase-anon';
import { inr } from '@/lib/money';
import Gallery from '@/components/ui/Gallery';
import LikeButton from '@/components/ui/LikeButton';
import ReviewsBlock from '@/components/ui/ReviewBlock';
import StatsLive from '@/components/ui/StatsLive';
import { Tabs, TabPanel } from '@/components/ui/Tabs';
import { Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import ClientActions from '@/components/ui/ClientAction'; 
import { FooterSection } from '@/components/footer-section';

// Next 15: params is async
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return { title: `${decodeURIComponent(slug).replace(/-/g, ' ')} • Product` };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createServerAnon();

  const { data: product, error } = await supabase
    .from('products')
    .select('id,name,slug,sku,short_desc,description,price_paise,mrp_paise,rating_avg,rating_count,meta,primary_image_url')
    .eq('slug', slug)
    .single();

  if (error) console.error('product query error:', error);
  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-purple-900/10 bg-white p-8 text-purple-900">
          Product not found. <Link href="/products" className="underline">Back to products</Link>
        </div>
      </main>
    );
  }

  const { data: images } = await supabase
    .from('product_images')
    .select('id,url,sort_order')
    .eq('product_id', product.id)
    .order('sort_order', { ascending: true });

  const { data: variants } = await supabase
    .from('product_variants')
    .select('id,sku,color_label,color_value,size_label,price_paise,mrp_paise,stock,image_url')
    .eq('product_id', product.id)
    .order('id');

  return (
    <div className="min-h-screen overflow-x-hidden">


    <main className="mx-auto max-w-6xl px-4 md:px-6 py-14 mt-8 mb-12">
      <div className="grid md:grid-cols-2 gap-8">
        <Gallery primary={product.primary_image_url} images={images || []} name={product.name} />

        <section className="flex flex-col">
          <div className="text-xs text-purple-900/50 mb-3">
            Home / Products / <span className="text-purple-900">{product.name}</span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-purple-900">{product.name}</h1>
            <LikeButton productId={product.id} />
          </div>

          <p className="mt-2 text-sm text-purple-900/70">{product.short_desc}</p>

          {/* Price + live stats */}
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-purple-900">{inr(product.price_paise)}</div>
              {!!product.mrp_paise && (
                <div className="text-purple-900/40 line-through">{inr(product.mrp_paise)}</div>
              )}
              <StatsLive productId={product.id} initialAvg={product.rating_avg} initialCount={product.rating_count} />
            </div>

            {/* Client actions: options + qty + Add to Cart + Share + Delivery cards */}
            <ClientActions
              productId={product.id}
              productName={product.name}
              slug={product.slug}
              variants={variants || []}
            />
          </div>
        </section>
      </div>

      {/* Tabs: Description + Reviews */}
      <div className="mt-10">
        <Tabs items={[{ id: 'desc', label: 'Description' }, { id: 'reviews', label: 'Reviews' }]}>
          <TabPanel id="desc">
            <article className="prose max-w-none prose-p:text-purple-900/90 prose-li:marker:text-amber-400">
              <div dangerouslySetInnerHTML={{ __html: product.description || '' }} />
            </article>
          </TabPanel>
          <TabPanel id="reviews">
            <ReviewsBlock productId={product.id} />
          </TabPanel>
        </Tabs>
      </div>
    </main>
    <FooterSection />
    </div>
  );
}

