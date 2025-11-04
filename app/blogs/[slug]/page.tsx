import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { serverSupabase, publicImageUrl } from "@/lib/supabase-blog";
import { FooterSection } from "@/components/footer-section";
// import { FooterSection } from "@/components/footer";
// import { Navigation } from "@/components/navigation";

export const revalidate = 60;
export const dynamic = "error"; // static export enforced

/* -------------------- Static params (required for output: export) -------------------- */
export async function generateStaticParams() {
  const supabase = serverSupabase();
  const { data } = await supabase
    .from("blogs")
    .select("slug")
    .eq("published", true);
  return (data ?? []).map((b: { slug: string }) => ({ slug: b.slug }));
}

/* -------------------- SEO -------------------- */
export async function generateMetadata(arg: {
  params: Promise<{ slug: string }>; // 👈 treat params as a Promise
}): Promise<Metadata> {
  const { slug } = await arg.params; // 👈 await params
  const supabase = serverSupabase();
  const { data: post } = await supabase
    .from("blogs")
    .select("title, excerpt, hero_path")
    .eq("slug", slug)
    .single();

  if (!post) return { title: "Blog" };
  const og = post.hero_path ? publicImageUrl(post.hero_path) : undefined;
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: og ? { images: [{ url: og }] } : undefined,
  };
}

/* -------------------- Page -------------------- */
export default async function BlogDetail(arg: {
  params: Promise<{ slug: string }>; // 👈 treat params as a Promise
}) {
  const { slug } = await arg.params; // 👈 await params
  const supabase = serverSupabase();

  // 1) Post
  const { data: post, error: postErr } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, created_at, read_minutes, hero_path, author_id, body1, body2, body3, body4"
    )
    .eq("slug", slug)
    .single();

  if (postErr || !post) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Article not found</h1>
        <p className="mt-2 text-zinc-600">
          We couldn't find this blog or it isn’t published.
        </p>
        <Link
          href="/blogs"
          className="mt-6 inline-block rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
        >
          Back to blogs
        </Link>
      </div>
    );
  }

  // 2) Author (separate fetch; tolerant if missing)
  let author: { id: string; name: string; avatar_path: string | null } | null =
    null;
  if (post.author_id) {
    const { data: a } = await supabase
      .from("blog_authors")
      .select("id, name, avatar_path")
      .eq("id", post.author_id)
      .single();
    author = a ?? null;
  }

  // 3) Up to 4 images (position 1..4). position=1 can override hero if present.
  const { data: imgsData } = await supabase
    .from("blog_images")
    .select("position, path, caption")
    .eq("blog_id", post.id)
    .order("position", { ascending: true });

  const imgs: { position: number; path: string; caption: string | null }[] =
    imgsData ?? [];

  const imgByPos = (pos: number) =>
    imgs.find((i) => i.position === pos)?.path || null;

  const heroSrc = imgByPos(1) || post.hero_path || null;

  // 4) Right rail suggestions (null-safe)
  const { data: moreData } = await supabase
    .from("blogs")
    .select("id, title, slug, thumb_path, created_at")
    .eq("published", true)
    .neq("id", post.id)
    .order("created_at", { ascending: false })
    .limit(6);

  const more: {
    id: string;
    title: string;
    slug: string;
    thumb_path: string | null;
    created_at: string;
  }[] = moreData ?? [];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* <Navigation /> */}
      <article className="bg-white mt-20">
        {/* Hero (Image 1) */}
        {heroSrc && (
          <div className="mx-auto max-w-5xl px-6 pt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src={publicImageUrl(heroSrc)}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Title + Meta */}
        <header className="mx-auto max-w-5xl px-6">
          <h1 className="mt-6 text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-zinc-600">
            {author?.avatar_path ? (
              <Image
                src={publicImageUrl(author.avatar_path)}
                alt={author?.name || "Author"}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-zinc-200" />
            )}
            <span className="font-medium text-zinc-800">
              {author?.name || "—"}
            </span>
            <span>•</span>
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString()}
            </time>
            {post.read_minutes ? (
              <>
                <span>•</span>
                <span>{post.read_minutes} min read</span>
              </>
            ) : null}
          </div>
        </header>

        {/* Content + Right rail (≈ 70/30) */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-12">
          {/* Main content */}
          <div className="lg:col-span-8">
            {post.excerpt && (
              <p className="text-lg leading-8 text-zinc-700">{post.excerpt}</p>
            )}

            {/* desc1 → image2 → desc2 → image3 → desc3 → image4 → desc4 */}
            {post.body1 && (
              <p className="mt-6 text-base leading-7 text-zinc-800">
                {post.body1}
              </p>
            )}
            {imgByPos(2) && (
              <Figure
                path={imgByPos(2)!}
                caption={
                  imgs.find((i) => i.position === 2)?.caption || undefined
                }
              />
            )}
            {post.body2 && (
              <p className="mt-6 text-base leading-7 text-zinc-800">
                {post.body2}
              </p>
            )}
            {imgByPos(3) && (
              <Figure
                path={imgByPos(3)!}
                caption={
                  imgs.find((i) => i.position === 3)?.caption || undefined
                }
              />
            )}
            {post.body3 && (
              <p className="mt-6 text-base leading-7 text-zinc-800">
                {post.body3}
              </p>
            )}
            {imgByPos(4) && (
              <Figure
                path={imgByPos(4)!}
                caption={
                  imgs.find((i) => i.position === 4)?.caption || undefined
                }
              />
            )}
            {post.body4 && (
              <p className="mt-6 text-base leading-7 text-zinc-800">
                {post.body4}
              </p>
            )}

            {/* Follow us */}
            <div className="mt-10 rounded-2xl border border-zinc-200 p-5">
              <h3 className="text-base font-semibold text-zinc-900">
                Follow Us
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Get tips on confident communication every week.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  href="https://www.instagram.com/trupti_warjurkar/"
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.youtube.com/@TruptiWarjurkar"
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  YouTube
                </Link>
                <Link
                  href="https://www.linkedin.com/in/trupti-warjurkar-393917a4/"
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>

          {/* Right rail */}
          <aside className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-zinc-900">
              More from the blog
            </h3>
            <div className="mt-3 space-y-4">
              {more.map((m) => (
                <Link
                  key={m.id}
                  href={`/blogs/${m.slug}`}
                  className="group flex items-center gap-3"
                >
                  {m.thumb_path ? (
                    <div className="relative h-16 w-24 overflow-hidden rounded-md bg-zinc-100">
                      <Image
                        src={publicImageUrl(m.thumb_path)}
                        alt={m.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-24 rounded-md bg-zinc-100" />
                  )}
                  <div>
                    <p className="line-clamp-2 text-sm font-medium text-zinc-900 group-hover:underline">
                      {m.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(m.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </article>
      <FooterSection />
    </div>
  );
}

function Figure({ path, caption }: { path: string; caption?: string }) {
  return (
    <figure className="mt-6">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={publicImageUrl(path)}
          alt={caption || ""}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-zinc-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
