interface ProductCardProps {
  brand: string;
  model: string;
  variant: string;
  price: number;
  stock: number;
}

export default function ProductCard({ brand, model, variant, price, stock }: ProductCardProps) {
  const isAvailable = stock > 0;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-emerald-500/5">
      {/* Top Details */}
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-md bg-zinc-800/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            {brand}
          </span>
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              isAvailable
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-rose-500/10 text-rose-400"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-emerald-400" : "bg-rose-400"}`}></span>
            {isAvailable ? `${stock} টি স্টকে আছে` : "স্টক আউট"}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-white group-hover:text-emerald-300">
          {model}
        </h3>
        <p className="mt-1 text-xs text-zinc-400">ভেরিয়েন্ট: {variant}</p>
      </div>

      {/* Pricing & CTA */}
      <div className="mt-6 border-t border-zinc-800/80 pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-zinc-500">মূল্য</span>
          <span className="text-xl font-black text-white">৳{price.toLocaleString()}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <a
            href={`https://wa.me/8801700000000?text=${encodeURIComponent(
              `হ্যালো, আমি আপনার শোরুমের ${brand} ${model} (${variant}) ফোনটি নিতে আগ্রহী।`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/70 py-2 text-center text-xs font-semibold text-zinc-200 transition-colors hover:border-emerald-500 hover:bg-emerald-500 hover:text-black"
          >
            হোয়াটসঅ্যাপে বুক করুন
          </a>
        </div>
      </div>
    </div>
  );
}