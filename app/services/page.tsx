// app/services/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = false; // keep as boolean/number; page is SERVER (no "use client")

import { FooterSection } from '@/components/footer-section';
import ServiceCard from '@/components/ServiceCard';
import { createServerAnon } from '@/lib/supabase-anon';

type ServiceRow = {
  id: number;
  slug: string;
  title: string;
  short_desc: string | null;
  image_path: string | null; // storage key or absolute URL
  is_active: boolean;
};

const toPublicUrl = (image_path?: string | null) => {
  if (!image_path) return '/placeholder.jpg';
  if (image_path.startsWith('http')) return image_path;
  // Bucket assumed "services" — change if yours differs
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/service-images/${image_path}`;
};

export default async function ServicesPage() {
  const supabase = createServerAnon();

  const { data, error } = await supabase
    .from('services')
    .select('id, slug, title, short_desc, image_path, is_active')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) {
    return <div className="p-8 text-red-700">Failed to fetch services: {error.message}</div>;
  }

  const services = (data ?? []) as ServiceRow[];

  if (!services.length) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white">
        <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 mt-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-purple-900">Our Services</h1>
            <p className="text-sm text-purple-900/70">
              Holistic Therapies Designed For Your Mind, Body &amp; Spirit.
            </p>
          </header>

          <div className="text-center py-16 bg-white/60 rounded-3xl backdrop-blur-sm border border-purple-100/50 shadow-lg">
            <p className="text-xl sm:text-2xl text-purple-900 font-semibold mb-2">No services found.</p>
            <p className="text-sm sm:text-base text-purple-900/60">Please check back soon.</p>
          </div>
        </main>

        <div className="mt-10">
          <FooterSection />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 mt-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-purple-900">Our Services</h1>
          <p className="text-sm text-purple-900/70">
            Holistic Therapies Designed For Your Mind, Body &amp; Spirit.
          </p>
        </header>

        <div className="grid gap-5 sm:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              slug={s.slug}
              title={s.title}
              short_desc={s.short_desc}
              image={toPublicUrl(s.image_path)}
            />
          ))}
        </div>
      </main>

      <div className="mt-10">
        <FooterSection />
      </div>
    </div>
  );
}
