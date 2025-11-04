'use client';
type Booking = {
  id:number; status:string; start_time:string; end_time:string;
  services?: { name:string } | null;
};

const tone: Record<string,string> = {
  pending: 'bg-amber-100 text-purple-900',
  confirmed: 'bg-emerald-100 text-emerald-900',
  cancelled: 'bg-rose-100 text-rose-900',
  completed: 'bg-purple-100 text-purple-900',
};

export default function BookingsList({ bookings=[] }: { bookings: Booking[] }) {
  if (!bookings.length) {
    return <div className="rounded-xl border border-purple-900/10 p-5 text-purple-900/70 bg-white">No bookings yet.</div>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {bookings.map(b => (
        <div key={b.id} className="rounded-xl border border-purple-900/10 bg-white overflow-hidden">
          <div className="px-4 py-3 bg-gradient-to-r from-amber-200 to-amber-300 flex items-center justify-between">
            <div className="text-purple-900 font-medium">{b.services?.name || 'Service'}</div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tone[b.status] ?? 'bg-slate-100 text-slate-700'}`}>{b.status}</span>
          </div>
          <div className="p-4 text-sm text-purple-900">
            <div>Starts: {new Date(b.start_time).toLocaleString()}</div>
            <div>Ends: {new Date(b.end_time).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
