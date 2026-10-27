"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";

interface MobileProduct {
  _id: string;
  brand: string;
  model: string;
  variant: string;
  price: number;
  stock: number;
  sold: number;
}

export default function HomePage() {
  const [mobiles, setMobiles] = useState<MobileProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  useEffect(() => {
    fetch("/api/mobiles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMobiles(data);
        } else {
          setMobiles([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setMobiles([]);
        setLoading(false);
      });
  }, []);

  // ডাটাবেজের ব্র্যান্ডগুলোর তালিকা
  const brands = useMemo(() => {
    const list = mobiles.map((m) => m.brand.trim());
    return ["All", ...Array.from(new Set(list))];
  }, [mobiles]);

  // সার্চ ও ব্র্যান্ড অনুযায়ী ফিল্টার
  const filteredMobiles = useMemo(() => {
    return mobiles.filter((item) => {
      const matchBrand =
        selectedBrand === "All" ||
        item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchSearch =
        item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.variant.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchSearch;
    });
  }, [mobiles, searchQuery, selectedBrand]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-black">
      <Navbar />
      <HeroBanner />

      <section className="mx-auto max-w-6xl px-6 py-10">
        {/* ফিল্টারিং এবং সার্চ বার */}
        <div className="flex flex-col gap-4 border-b border-zinc-800 pb-6 md:flex-row md:items-center md:justify-between">
          {/* ব্র্যান্ড ফিল্টার চিপস */}
          <div className="flex flex-wrap items-center gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
                  selectedBrand === brand
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                    : "border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {brand === "All" ? "সকল ব্র্যান্ড" : brand}
              </button>
            ))}
          </div>

          {/* সার্চ ইনপুট */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="মডেল বা ব্র্যান্ড খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs text-white placeholder-zinc-500 transition-colors focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* প্রোডাক্ট কার্ড গ্রিড */}
        {loading ? (
          <div className="py-20 text-center text-sm text-zinc-500">
            মোবাইল তালিকা লোড হচ্ছে...
          </div>
        ) : filteredMobiles.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 py-16 text-center">
            <p className="text-zinc-400">কোনো ফোন পাওয়া যায়নি।</p>
            <p className="mt-1 text-xs text-zinc-500">সার্চ ফিল্টার রিসেট করে আবার চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMobiles.map((phone) => (
              <ProductCard
                key={phone._id}
                brand={phone.brand}
                model={phone.model}
                variant={phone.variant}
                price={phone.price}
                stock={phone.stock}
              />
            ))}
          </div>
        )}
      </section>

      {/* ফুটার */}
      <footer className="mt-16 border-t border-zinc-800 bg-zinc-950/80 py-8 text-center text-xs text-zinc-500">
        <p>© 2026 Mobile Shoppe. সকল মোবাইল স্টক ও বিক্রয় তথ্য ডাটাবেজের সাথে সিনক্রোনাইজড।</p>
      </footer>
    </main>
  );
}