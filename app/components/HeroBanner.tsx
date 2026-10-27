import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-zinc-950 py-16 px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-60"></div>
      
      <div className="relative mx-auto max-w-4xl space-y-4">
        <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
          ১০০% অফিসিয়াল ও অথেনটিক স্মার্টফোন
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          আপনার পছন্দের স্মার্টফোন খুঁজুন <span className="text-emerald-400">সেরা মূল্যে</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          আমাদের শোরুমের সরাসরি স্টক ও সেলস ইনফরমেশন। লেটেস্ট মডেল ও অফিশিয়াল ওয়ারেন্টির ফোন সরাসরি শোরুম থেকে সংগ্রহ করুন।
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="tel:+8801700000000"
            className="rounded-lg bg-emerald-500 px-5 py-2.5 text-xs font-bold text-black transition-transform hover:scale-105 hover:bg-emerald-400"
          >
            সরাসরি দোকানে কল দিন
          </a>
          <Link
            href="/admin"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            অ্যাডমিন ড্যাশবোর্ড &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}