"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
// import { Navigation } from "@/components/navigation";
// import { FooterSection } from "@/components/footer";

/* ------------------------ Supabase browser client ------------------------ */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const publicImageUrl = (path?: string | null) =>
  path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-image/${path}`
    : undefined;

/* --------------------------------- Types -------------------------------- */
type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumb_path: string | null;
  hero_path: string | null;
  created_at: string;
  read_minutes: number | null;
  featured?: boolean | null;
  featured_rank?: number | null;
  published?: boolean | null;
};

type Category = { slug: string; title: string };

/* ================================ Component =============================== */
export default function BlogsClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const q = sp.get("q")?.trim() || "";
  const catSlug = sp.get("cat") || "all";

  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Blog[]>([]);
  const [latest, setLatest] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------------------- Load categories --------------------------- */
  useEffect(() => {
    let mounted = true;
    supabase
      .from("blog_categories")
      .select("slug,title")
      .order("title", { ascending: true })
      .then(({ data }) => {
        if (!mounted) return;
        setCategories(data ?? []);
      });
    return () => {
      mounted = false;
    };
  }, []);

  /* ------------------- Resolve category → blog ids (client) ------------------ */
  async function getBlogIdsForCategory(slug: string): Promise<string[] | null> {
    if (slug === "all") return null; // null = no category filter
    const { data: catRow } = await supabase
      .from("blog_categories")
      .select("id")
      .eq("slug", slug)
      .single();
    if (!catRow?.id) return []; // unknown category → empty
    const { data: mapRows } = await supabase
      .from("blog_category_map")
      .select("blog_id")
      .eq("category_id", catRow.id);
    return (mapRows ?? []).map((r: any) => r.blog_id);
  }

  /* ---------------------- Load featured + latest posts --------------------- */
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    (async () => {
      const categoryBlogIds = await getBlogIdsForCategory(catSlug); // null | [] | [ids...]

      /* -------- Featured: only when cat = all -------- */
      let featuredData: Blog[] = [];
      if (categoryBlogIds === null) {
        const { data: feat } = await supabase
          .from("blogs")
          .select(
            "id,title,slug,excerpt,thumb_path,hero_path,read_minutes,created_at,featured,featured_rank"
          )
          .eq("published", true)
          .eq("featured", true)
          .order("featured_rank", { ascending: true, nullsFirst: false })
          .order("created_at", { ascending: false })
          .limit(3);
        featuredData = (feat as Blog[]) ?? [];
      }

      // IDs to exclude from latest when category=all
      const exclude = featuredData.map((f) => f.id);

      /* ------------------------- Latest (filtered) ------------------------- */
      let query = supabase
        .from("blogs")
        .select("id,title,slug,excerpt,thumb_path,hero_path,created_at,read_minutes")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(18);

      if (categoryBlogIds && categoryBlogIds.length > 0) {
        query = query.in("id", categoryBlogIds);
      } else if (Array.isArray(categoryBlogIds) && categoryBlogIds.length === 0) {
        // explicit empty category: force no results by querying impossible id
        query = query.in("id", ["00000000-0000-0000-0000-000000000000"]);
      }

      if (exclude.length > 0 && categoryBlogIds === null) {
        // exclude featured only in "all" view
        query = query.not(
          "id",
          "in",
          `(${exclude.map((id) => `'${id}'`).join(",")})`
        );
      }

      if (q) {
        query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`);
      }

      const [{ data: latestData }] = await Promise.all([query]);

      if (!mounted) return;
      setFeatured(featuredData);
      setLatest((latestData as Blog[]) ?? []);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [q, catSlug]);

  /* -------------------------- UI: update querystring ------------------------- */
  const setCat = (slug: string) => {
    const params = new URLSearchParams(sp.toString());
    if (slug === "all") params.delete("cat");
    else params.set("cat", slug);
    router.push(`/blogs?${params.toString()}`);
  };

  const submitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nextQ = (fd.get("q") as string)?.trim() || "";
    const params = new URLSearchParams(sp.toString());
    if (nextQ) params.set("q", nextQ);
    else params.delete("q");
    router.push(`/blogs?${params.toString()}`);
  };

  const showFeatured = useMemo(() => catSlug === "all", [catSlug]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* <Navigation /> */}
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-purple-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Heal. Allign. Awaken.
          </h1>
          <p className="mt-3 text-sm/6 sm:text-base/7 opacity-90">
            Stories and strategies that inspire your heart, empower your voice,
            and guide you to take real, confident action.
          </p>

          {/* Tabs + Search */}
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <FilterChip onClick={() => setCat("all")} label="All post" active={catSlug === "all"} />
              {categories.map((c) => (
                <FilterChip
                  key={c.slug}
                  onClick={() => setCat(c.slug)}
                  label={c.title}
                  active={catSlug === c.slug}
                />
              ))}
            </div>
            <form className="sm:ml-auto" onSubmit={submitSearch}>
              <input
                name="q"
                defaultValue={q}
                placeholder="Search articles"
                className="w-full rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm placeholder:text-white/80 focus:bg-white/20 focus:outline-none"
              />
              {/* keep cat in url; handled by router.push */}
            </form>
          </div>
        </div>
      </section>

      {/* Featured */}
      {showFeatured && (
        <section className="mx-auto max-w-6xl px-6 py-8">
          <h2 className="text-xl font-semibold text-zinc-900">Featured Blogs</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {((loading ? Array.from({ length: 3 }) : featured) as Blog[]).map((post, i) =>
              loading ? (
                <CardSkeleton key={i} />
              ) : (
                <FeaturedCard key={(post as Blog).id} post={post as Blog} large={i === 0} />
              )
            )}
            {!loading && featured.length === 0 && (
              <p className="text-sm text-zinc-500">No featured posts yet.</p>
            )}
          </div>
        </section>
      )}

      {/* Latest */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="text-xl font-semibold text-zinc-900">Latest Blogs</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {((loading ? Array.from({ length: 6 }) : latest) as Blog[]).map((post, i) =>
            loading ? (
              <CardSkeleton key={i} />
            ) : (
              <ArticleCard key={(post as Blog).id} post={post as Blog} />
            )
          )}
          {!loading && latest.length === 0 && (
            <p className="text-sm text-zinc-500">No posts match your filters.</p>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/blogs"
            className="rounded-full border border-zinc-300 px-5 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            Learn more
          </Link>
        </div>
      </section>
    </div>
    
    </div>
  );
}

/* ---------------------------- UI subcomponents ---------------------------- */

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm transition ${
        active ? "bg-white text-[#8E5BB1]" : "bg-white/10 text-white hover:bg-white hover:text-[#8E5BB1]"
      }`}
    >
      {label}
    </button>
  );
}

function FeaturedCard({ post, large = false }: { post: Blog; large?: boolean }) {
  const url = publicImageUrl(post.thumb_path ?? post.hero_path ?? undefined);
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`block rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:shadow-md ${
        large ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
      }`}
    >
      {url && (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image src={url} alt={post.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="mt-3 space-y-1">
        <p className="text-xs text-zinc-500">
          {new Date(post.created_at).toLocaleDateString()} • {post.read_minutes ?? 3} min
        </p>
        <h3 className="line-clamp-2 text-base font-semibold text-zinc-900">{post.title}</h3>
        {post.excerpt && <p className="line-clamp-2 text-sm text-zinc-600">{post.excerpt}</p>}
      </div>
    </Link>
  );
}

function ArticleCard({ post }: { post: Blog }) {
  const url = publicImageUrl(post.thumb_path ?? undefined);
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="block rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      {url && (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
          <Image src={url} alt={post.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="mt-3 space-y-1">
        <p className="text-xs text-zinc-500">
          {new Date(post.created_at).toLocaleDateString()} • {post.read_minutes ?? 3} min
        </p>
        <h3 className="line-clamp-2 text-base font-semibold text-zinc-900">{post.title}</h3>
        {post.excerpt && <p className="line-clamp-2 text-sm text-zinc-600">{post.excerpt}</p>}
      </div>
    </Link>
  );
}

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-3">
      <div className="mb-3 aspect-[4/3] w-full rounded-xl bg-zinc-200" />
      <div className="h-3 w-24 rounded bg-zinc-200" />
      <div className="mt-2 h-4 w-4/5 rounded bg-zinc-200" />
      <div className="mt-2 h-4 w-3/5 rounded bg-zinc-200" />
    </div>
  );
}
