// // app/services/[slug]/page.tsx
// export const dynamic = 'force-dynamic';
// export const revalidate = false;

// import { notFound } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { createServerAnon } from '@/lib/supabase-anon';

// type Service = {
//   id: number;
//   slug: string;
//   title: string;
//   short_desc: string | null;
//   long_desc: string | null;
//   image_path: string | null;
//   is_active: boolean;
// };

// type Benefit = {
//   label: string;
//   sort_order: number | null;
// };

// const toPublicUrl = (image_path?: string | null) => {
//   if (!image_path) return '/placeholder.jpg';
//   if (image_path.startsWith('http')) return image_path;
//   // storage bucket assumed "services"
//   return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/service-images/${image_path}`;
// };

// export default async function ServiceDetailPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const supabase = createServerAnon();

//   // 1) fetch the service
//   const { data: svc, error: svcErr } = await supabase
//     .from('services')
//     .select('id, slug, title, short_desc, long_desc, image_path, is_active')
//     .eq('slug', params.slug)
//     .single<Service>();

//   if (svcErr || !svc || !svc.is_active) {
//     notFound();
//   }

//   // 2) fetch benefits
//   const { data: benefits } = await supabase
//     .from('service_benefits')
//     .select('label, sort_order')
//     .eq('service_id', svc.id)
//     .order('sort_order', { ascending: true });

//   const list = (benefits ?? []) as Benefit[];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Top banner */}
//       <section className="bg-[#3D2472] text-white">
//         <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
//           <p className="uppercase tracking-[0.18em] text-xs md:text-sm/none opacity-80">
//             Home<span className="opacity-60">/</span>Services
//           </p>
//           <h1 className="mt-4 text-3xl md:text-6xl font-semibold tracking-tight">
//             {svc.title}
//           </h1>
//         </div>
//       </section>

//       {/* Hero image */}
//       <section className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-14">
//         <div className="relative w-full overflow-hidden rounded-2xl border border-purple-900/10 bg-white shadow-sm">
//           <div className="relative w-full">
//             <Image
//               src={toPublicUrl(svc.image_path)}
//               alt={svc.title}
//               className="w-full h-auto object-cover"
//               width={1600}
//               height={900}
//               priority
//             />
//           </div>
//         </div>
//       </section>

//       {/* Description + CTA + Benefits */}
//       <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
//           {/* Left: copy & CTA */}
//           <div className="md:col-span-3">
//             {/* Optional sub-heading line; keep it simple so it fits multiple services */}
//             {svc.short_desc && (
//               <h2 className="text-xl md:text-2xl font-semibold text-[#3D2472]">
//                 {svc.short_desc}
//               </h2>
//             )}

//             {svc.long_desc && (
//               <p className="mt-4 text-[15px] md:text-base leading-7 text-purple-900/80">
//                 {svc.long_desc}
//               </p>
//             )}

//             {/* Bonus motif lines or highlights (optional) */}
//             <p className="mt-5 text-[14px] text-purple-900/70">
//               ✨ Feel lighter. Move easier. Breathe deeper.
//             </p>

//             <div className="mt-6">
//               <Link
//                 href={`/booking?service=${encodeURIComponent(svc.slug)}`}
//                 className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold
//                            text-white bg-[#B18661] hover:opacity-95 transition"
//               >
//                 Book now
//                 <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                   <path strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>

//           {/* Right: Benefits */}
//           <aside className="md:col-span-2">
//             <h3 className="text-2xl font-semibold text-purple-900">
//               Benefits Of {svc.title.split(' ')[0]}
//               {svc.title.includes('Massage') ? ' Massage' : ''}
//             </h3>

//             <div className="mt-5 space-y-3">
//               {list.length ? (
//                 list.map((b, idx) => (
//                   <div key={`${idx}-${b.label}`} className="flex items-start gap-3">
//                     <div className="mt-1 text-[#3BAE69]">
//                       {/* tiny check/leaf icon */}
//                       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                         <path strokeWidth="2" d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-[13.5px] md:text-sm text-purple-900/90">
//                         {b.label}
//                       </div>
//                       <div className="h-px mt-3 bg-purple-900/10" />
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-purple-900/50">Benefits will appear here.</p>
//               )}
//             </div>
//           </aside>
//         </div>

//         {/* What to expect (static) */}
//         <section className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
//           <div className="md:col-span-2">
//             <h3 className="text-3xl font-semibold text-purple-900">What To Expect</h3>
//           </div>
//           <div className="md:col-span-3">
//             <p className="text-[15px] md:text-base leading-7 text-purple-900/80">
//               Your session begins with a short consultation to understand your areas of concern.
//               Using a blend of aromatherapy oils and targeted massage techniques, we’ll focus on
//               releasing knots and deep-seated tension — leaving you feeling lighter, grounded,
//               and recharged.
//             </p>
//             <p className="mt-3 text-[14px] text-purple-900/70">
//               💡 Pressure can be adjusted according to your comfort level.
//             </p>
//           </div>
//         </section>

//         {/* Secondary CTA */}
//         <div className="mt-10 md:mt-14">
//           <Link
//             href={`/booking?service=${encodeURIComponent(svc.slug)}`}
//             className="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold
//                        text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95 transition"
//           >
//             Book this therapy
//             <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <path strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }


// app/services/[slug]/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = false;

import { notFound } from 'next/navigation';
import { createServerAnon } from '@/lib/supabase-anon';
import ServiceDetailClient from './service-detail';

type Service = {
  id: number;
  slug: string;
  title: string;
  short_desc: string | null;
  long_desc: string | null;
  image_path: string | null;
  is_active: boolean;
};

type Benefit = { label: string; sort_order: number | null };

export default async function ServiceDetailPage({
  params,
}: { params: { slug: string } }) {
  const supabase = createServerAnon();

  // main service
  const { data: svc, error } = await supabase
    .from('services')
    .select('id, slug, title, short_desc, long_desc, image_path, is_active')
    .eq('slug', params.slug)
    .single<Service>();

  if (error || !svc || !svc.is_active) notFound();

  // benefits
  const { data: benefits } = await supabase
    .from('service_benefits')
    .select('label, sort_order')
    .eq('service_id', svc.id)
    .order('sort_order', { ascending: true });

  return (
    <ServiceDetailClient
      service={{
        id: svc.id,
        slug: svc.slug,
        title: svc.title,
        short_desc: svc.short_desc ?? '',
        long_desc: svc.long_desc ?? '',
        image_path: svc.image_path,
      }}
      benefits={(benefits ?? []).map((b) => b.label)}
    />
  );
}
