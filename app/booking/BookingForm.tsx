'use client';

import { useEffect, useMemo, useState } from 'react';
import { createServerAnon } from '@/lib/supabase-anon';
import Image from 'next/image';
import Link from 'next/link';

type ServiceRow = {
  id: number;
  slug: string;
  title: string;
  image_path: string | null;
};

function toPublicUrl(path?: string | null) {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http')) return path;
  // storage bucket assumed "services"
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/service-images/${path}`;
}

type Props = {
  initialServiceSlug: string | null;
};

export default function BookingForm({ initialServiceSlug }: Props) {
  const supabase = useMemo(() => createServerAnon(), []);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [selected, setSelected] = useState<ServiceRow | null>(null);

  // form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState(''); // free text -> will be saved in JSON
  const [date, setDate] = useState('');       // YYYY-MM-DD
  const [time, setTime] = useState('');       // HH:MM
  const [location, setLocation] = useState<'center'>('center');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // fetch all services (for dropdown / preselect)
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('services')
        .select('id, slug, title, image_path, is_active')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      const rows = (data ?? []).map((r: any) => ({
        id: r.id, slug: r.slug, title: r.title, image_path: r.image_path
      })) as ServiceRow[];

      setServices(rows);

      if (initialServiceSlug) {
        const found = rows.find(s => s.slug === initialServiceSlug) || null;
        setSelected(found);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialServiceSlug]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const payload: any = {
        service_id: selected ? selected.id : null,
        other_therapy: selected ? null : null, // if you later allow typing a custom therapy
        contact_name: name,
        contact_email: email || null,
        address: { line1: address },
        preferred_date: date || null,
        preferred_time: time || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        preferred_location: location,
        notes: note || null,
      };

      const { error } = await supabase.from('service_bookings').insert([payload]);
      if (error) throw error;

      setDone(true);
      // optionally reset fields
      // setName(''); setEmail(''); setAddress(''); setDate(''); setTime(''); setNote('');
    } catch (err: any) {
      alert(`Failed to submit booking: ${err.message || err}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
      {/* Left info column (address & note as per your design) */}
      <aside className="md:col-span-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-purple-900">Book Your Chakra Healing Session</h2>
        <p className="mt-2 text-purple-900/70 text-sm md:text-base">
          Rebalance your mind, body, and spirit — one session at a time. Select your therapy,
          share your details, and we’ll prepare your peaceful space.
        </p>

        <div className="mt-8 space-y-6 text-sm md:text-base text-purple-900">
          <div>
            <div className="font-semibold">Address</div>
            <div className="text-purple-900/80">Hong Kong Bazaar, Sector 57, Gurgaon</div>
            {location === 'center' && (
              <p className="mt-1 text-[12px] text-purple-900/60">
                Note: You have to be physically present at this location for therapy.
              </p>
            )}
          </div>

          <div>
            <div className="font-semibold">Phone number</div>
            <div className="text-purple-900/80">+91 98765 43210</div>
          </div>

          <div>
            <div className="font-semibold">Email</div>
            <div className="text-purple-900/80">chakra@gmail.com</div>
          </div>

          <div className="flex gap-4">
            <Link href="https://instagram.com" className="text-purple-700 hover:underline">Instagram</Link>
            <Link href="https://twitter.com" className="text-purple-700 hover:underline">Twitter</Link>
            <Link href="https://facebook.com" className="text-purple-700 hover:underline">Facebook</Link>
          </div>
        </div>
      </aside>

      {/* Right form */}
      <section className="md:col-span-3">
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Selected therapy (pre-filled if coming from service) */}
          <div className="rounded-2xl border border-purple-900/10 p-4">
            <label className="block text-sm font-medium text-purple-900 mb-2">Select Therapy Type</label>

            {/* visible selected capsule */}
            <div className="flex items-center gap-3">
              {selected ? (
                <>
                  <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                    <Image
                      src={toPublicUrl(selected.image_path)}
                      alt={selected.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-medium text-purple-900">{selected.title}</div>
                  <button
                    type="button"
                    className="ml-auto text-sm text-purple-700 hover:underline"
                    onClick={() => setSelected(null)}
                  >
                    Change
                  </button>
                </>
              ) : (
                <div className="text-sm text-purple-900/70">No therapy pre-selected</div>
              )}
            </div>

            {/* Dropdown list (shows thumbnails) */}
            <div className="mt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('svc-list');
                  if (el) el.classList.toggle('hidden');
                }}
                className="inline-flex items-center rounded-xl border border-purple-900/10 px-3 py-2 text-sm text-purple-900/80 hover:bg-purple-50"
              >
                {selected ? 'Choose a different therapy' : 'Choose a therapy'}
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </button>

              <div id="svc-list" className="hidden mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSelected(s);
                      const el = document.getElementById('svc-list');
                      if (el) el.classList.add('hidden');
                    }}
                    className="flex items-center gap-3 rounded-xl border border-purple-900/10 p-2 hover:bg-purple-50"
                  >
                    <div className="relative w-10 h-10 overflow-hidden rounded-lg shrink-0">
                      <Image src={toPublicUrl(s.image_path)} alt={s.title} fill className="object-cover" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-purple-900">{s.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-900 mb-1">Name</label>
              <input
                value={name} onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-purple-900/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-900 mb-1">Email</label>
              <input
                type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-purple-900/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">Address</label>
            <textarea
              value={address} onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-purple-900/10 px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="House / Street, City, State, Postal code"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-900 mb-1">Preferred Date</label>
              <input
                type="date"
                value={date} onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-purple-900/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-900 mb-1">Preferred Time</label>
              <input
                type="time"
                value={time} onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-purple-900/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Location selector (for now: one option) */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">Preferred Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as any)}
              className="w-full rounded-xl border border-purple-900/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="center">Center – Hong Kong Bazaar, Sector 57, Gurgaon</option>
            </select>
            {location === 'center' && (
              <p className="mt-1 text-[12px] text-purple-900/60">
                Note: You have to be physically present at this location for therapy.
              </p>
            )}
          </div>

          {/* Special request */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">Special Request</label>
            <textarea
              value={note} onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-xl border border-purple-900/10 px-3 py-2 min-h-[110px] focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Anything we should know before your session?"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !name}
            className="mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white
                       bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95
                       focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60"
          >
            {submitting ? 'Booking...' : 'Book now'}
          </button>

          {/* note area */}
          <p className="text-xs text-purple-900/60">
            We’ll confirm your session via call or message within 24 hours. Pay securely online or at our center.
          </p>
        </form>
      </section>

      {/* Confirmation dialog */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-10 h-10 rounded-full bg-green-100 text-green-700">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor"><path strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-purple-900">You’re all set!</h3>
            </div>
            <p className="mt-3 text-sm text-purple-900/70">
              Thank you for your booking. Our team will contact you shortly to confirm your session.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white
                           bg-purple-800 hover:bg-purple-900"
              >
                Explore more services
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
                           text-purple-900 border border-purple-900/15 hover:bg-purple-50"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
