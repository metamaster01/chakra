'use client';
type Order = {
  id: number;
  status: string;
  created_at: string;
  subtotal_paise: number;
  order_items?: { id:number; name_snapshot:string; qty:number; total_paise:number }[];
};

const fmtINR = (p:number) => new Intl.NumberFormat('en-IN',{ style:'currency', currency:'INR'}).format(p/100);

const statusTone: Record<string, string> = {
  created: 'bg-amber-100 text-purple-900',
  pending: 'bg-amber-100 text-purple-900',
  paid: 'bg-emerald-100 text-emerald-900',
  shipped: 'bg-blue-100 text-blue-900',
  delivered: 'bg-purple-100 text-purple-900',
  cancelled: 'bg-rose-100 text-rose-900',
  expired: 'bg-slate-100 text-slate-700',
};

export default function OrdersList({ orders=[] }: { orders: Order[] }) {
  if (!orders.length) {
    return <div className="rounded-xl border border-purple-900/10 p-5 text-purple-900/70 bg-white">No orders yet.</div>;
  }

  return (
    <div className="space-y-4">
      {orders.map(o => (
        <div key={o.id} className="rounded-xl border border-purple-900/10 bg-white overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-200 to-amber-300">
            <div className="text-purple-900 font-medium">Order #{o.id}</div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusTone[o.status] ?? 'bg-slate-100 text-slate-700'}`}>
              {o.status}
            </span>
          </div>
          <div className="p-4 text-sm">
            <div className="text-purple-900/80">Placed: {new Date(o.created_at).toLocaleString()}</div>
            <div className="mt-2 space-y-2">
              {(o.order_items||[]).map(it => (
                <div key={it.id} className="flex items-center justify-between">
                  <div className="text-purple-900">{it.name_snapshot} <span className="text-purple-900/60">× {it.qty}</span></div>
                  <div className="text-purple-900 font-medium">{fmtINR(it.total_paise)}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t pt-3 flex justify-end">
              <div className="text-purple-900 font-semibold">Subtotal: {fmtINR(o.subtotal_paise)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
