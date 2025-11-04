'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function ProfileForm({ user, profile }: any) {
  const supabase = createClient();
  const [full_name, setName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [avatar_url, setAvatar] = useState(profile?.avatar_url || user?.user_metadata?.avatar_url || '');
  const [address, setAddress] = useState(profile?.address || { line1:'', city:'', state:'', pincode:'' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string|undefined>();

  useEffect(() => {
    if (!profile?.avatar_url && user?.user_metadata?.avatar_url) {
      setAvatar(user.user_metadata.avatar_url);
    }
  }, [profile, user]);

async function save() {
  setSaving(true); setMsg(undefined);

  const payload = {
    id: user.id,               // critical so upsert targets your row
    full_name,
    phone,
    avatar_url,
    address
  };

  const { error, data } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id', ignoreDuplicates: false })
    .select('*')
    .single(); // get the saved row back

  if (error) {
    setMsg(error.message);
  } else {
    // refresh local UI with persisted data
    setName(data.full_name || '');
    setPhone(data.phone || '');
    setAvatar(data.avatar_url || '');
    setAddress(data.address || { line1:'', city:'', state:'', pincode:'' });
    setMsg('Saved successfully');
  }

  setSaving(false);
}


  return (
    <div className="rounded-2xl border border-purple-900/10 bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-amber-200 to-amber-300 px-5 py-4">
        <h3 className="font-semibold text-purple-900">Profile</h3>
      </div>

      <div className="p-5 md:p-6 space-y-5">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar_url || '/avatar-placeholder.svg'}
               className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-200"
               alt="" />
          <div className="text-sm">
            <div className="font-medium text-purple-900">{full_name || user.email}</div>
            <div className="text-purple-900/70">{user.email}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm text-purple-900">Full name
            <input className="mt-1 w-full rounded-xl border border-purple-900/20 px-3 py-2 focus:ring-2 focus:ring-amber-300"
              value={full_name} onChange={e=>setName(e.target.value)} />
          </label>
          <label className="text-sm text-purple-900">Phone
            <input className="mt-1 w-full rounded-xl border border-purple-900/20 px-3 py-2"
              value={phone} onChange={e=>setPhone(e.target.value)} />
          </label>
          <label className="text-sm text-purple-900 md:col-span-2">Avatar URL
            <input className="mt-1 w-full rounded-xl border border-purple-900/20 px-3 py-2"
              placeholder="https://..." value={avatar_url} onChange={e=>setAvatar(e.target.value)} />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <label className="text-sm text-purple-900">Address line 1
            <input className="mt-1 w-full rounded-xl border border-purple-900/20 px-3 py-2"
              value={address.line1||''} onChange={e=>setAddress({ ...address, line1:e.target.value })} />
          </label>
          <label className="text-sm text-purple-900">City
            <input className="mt-1 w-full rounded-xl border border-purple-900/20 px-3 py-2"
              value={address.city||''} onChange={e=>setAddress({ ...address, city:e.target.value })} />
          </label>
          <label className="text-sm text-purple-900">State
            <input className="mt-1 w-full rounded-xl border border-purple-900/20 px-3 py-2"
              value={address.state||''} onChange={e=>setAddress({ ...address, state:e.target.value })} />
          </label>
          <label className="text-sm text-purple-900">Pincode
            <input className="mt-1 w-full rounded-xl border border-purple-900/20 px-3 py-2"
              value={address.pincode||''} onChange={e=>setAddress({ ...address, pincode:e.target.value })} />
          </label>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-xl px-4 py-2 text-sm font-medium
            text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          {msg && <span className="text-sm text-purple-900/80">{msg}</span>}
        </div>
      </div>
    </div>
  );
}
