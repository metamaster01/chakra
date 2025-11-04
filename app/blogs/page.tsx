import { Suspense } from "react";
import BlogsClient from "./BlogsClient"; // <-- direct import of the client component
import { FooterSection } from "@/components/footer-section";

export const dynamic = "error"; // keep static export behavior

export default function Page() {
  return (
    <Suspense fallback={<BlogsSkeleton />}>
      <BlogsClient />
      <FooterSection />
    </Suspense>
  );
}

function BlogsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero skeleton */}
      <section className="bg-purple-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <div className="mx-auto h-10 w-72 rounded bg-white/20" />
          <div className="mx-auto mt-3 h-4 w-96 rounded bg-white/10" />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-24 rounded-full bg-white/15" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured + Latest skeleton */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="h-6 w-40 rounded bg-zinc-200" />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="h-6 w-40 rounded bg-zinc-200" />
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
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

