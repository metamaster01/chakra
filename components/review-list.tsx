'use client';
type Review = {
  id:number; rating:number; title:string|null; body:string|null; status:string; created_at:string;
  products?: { name:string } | null;
};

export default function ReviewsList({ reviews=[] }: { reviews: Review[] }) {
  if (!reviews.length) {
    return <div className="rounded-xl border border-purple-900/10 p-5 text-purple-900/70 bg-white">No reviews yet.</div>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {reviews.map(r => (
        <article key={r.id} className="rounded-xl border border-purple-900/10 bg-white p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-purple-900">{r.products?.name ?? 'Product'}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full
              ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-900'
                : r.status === 'pending' ? 'bg-amber-100 text-purple-900'
                : 'bg-rose-100 text-rose-900'}`}>
              {r.status}
            </span>
          </div>
          <div className="mt-1 text-amber-600 font-medium">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
          {r.title && <div className="mt-1 text-purple-900 font-medium">{r.title}</div>}
          {r.body && <p className="mt-1 text-sm text-purple-900/80">{r.body}</p>}
          <div className="mt-2 text-xs text-purple-900/60">{new Date(r.created_at).toLocaleString()}</div>
        </article>
      ))}
    </div>
  );
}
