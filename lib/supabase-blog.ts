import { createClient } from "@supabase/supabase-js";

export function serverSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  if (!url || !key) throw new Error("Missing SUPABASE envs");
  return createClient(url, key);
}

export function publicImageUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${path}`;
}
