// app/booking/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = false;

import BookingForm from './BookingForm';

export default function BookingPage({
  searchParams,
}: {
  searchParams: { service?: string }
}) {
  const initialServiceSlug = searchParams?.service || null;

  return (
    <div className="min-h-screen bg-white">
      {/* Top banner to match your design */}
      <section className="bg-[#3D2472] text-white py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="uppercase tracking-[0.2em] text-sm/none opacity-80">Services / Booking</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">Book Your Healing Session</h1>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <BookingForm initialServiceSlug={initialServiceSlug} />
      </main>
    </div>
  );
}
