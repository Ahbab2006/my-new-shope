"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import SmartSellModal, { MobileProduct } from "../components/SmartSellModal";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mobiles, setMobiles] = useState<MobileProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // স্মার্ট সেল মোডাল স্টেট
  const [selectedMobileForSale, setSelectedMobileForSale] = useState<MobileProduct | null>(null);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

  // নতুন প্রোডাক্ট ইনপুট স্টেট
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    variant: "",
    stock: "",
    price: "",
  });

  const fetchMobiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mobiles");
      if (res.ok) {
        const data = await res.json();
        setMobiles(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("shop_admin_auth") === "true") {
      setIsAuthenticated(true);
      fetchMobiles();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("shop_admin_auth", "true");
        fetchMobiles();
      } else {
        setLoginError(data.message || "ভুল ইউজারনেম বা পাসওয়ার্ড!");
      }
    } catch {
      setLoginError("সার্ভার সমস্যা!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("shop_admin_auth");
  };

  // স্মার্ট সেলের কনফার্মেশন হ্যান্ডলার (MongoDB ডাটাবেজে স্টক কমাবে ও সেল বাড়াবে)
  const handleConfirmSale = async (saleData: any) => {
    const target = mobiles.find((m) => m._id === saleData.productId);
    if (!target || target.stock <= 0) return;

    await fetch(`/api/mobiles/${target._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stock: target.stock - 1,
        sold: target.sold + 1,
      }),
    });

    fetchMobiles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই মডেলটি ডিলিট করতে চান?")) return;
    await fetch(`/api/mobiles/${id}`, { method: "DELETE" });
    fetchMobiles();
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brand || !formData.model) return;

    await fetch("/api/mobiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: formData.brand,
        model: formData.model,
        variant: formData.variant || "Standard",
        stock: Number(formData.stock) || 0,
        price: Number(formData.price) || 0,
        sold: 0,
      }),
    });

    setFormData({ brand: "", model: "", variant: "", stock: "", price: "" });
    fetchMobiles();
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold text-white">অ্যাডমিন লগইন</h2>
          {loginError && <p className="mt-2 text-xs text-rose-400">{loginError}</p>}
          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-emerald-500 py-2 text-xs font-bold text-black hover:bg-emerald-400"
            >
              প্রবেশ করুন
            </button>
          </div>
        </form>
      </main>
    );
  }

  const lowStockItems = mobiles.filter((m) => m.stock > 0 && m.stock <= 3);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">ইনভেন্টরি ও স্মার্ট সেলস ম্যানেজার</h2>
            <p className="text-xs text-zinc-400">রিয়েলটাইম স্টক ও বিক্রয় হিসাব</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700"
          >
            লগআউট
          </button>
        </div>

        {/* স্মার্ট লো-স্টক নোটিফিকেশন বার */}
        {lowStockItems.length > 0 && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
            ⚠️ <strong>স্টক সতর্কতা:</strong> {lowStockItems.map((item) => `${item.brand} ${item.model} (${item.stock}টি বাকি)`).join(", ")} — দ্রুত নতুন স্টক আনা প্রয়োজন।
          </div>
        )}

        <DashboardStats
          totalModels={mobiles.length}
          totalStockUnits={mobiles.reduce((a, b) => a + b.stock, 0)}
          totalSoldUnits={mobiles.reduce((a, b) => a + b.sold, 0)}
        />

        {/* Add Product Form */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">নতুন ফোন স্টক এন্ট্রি</h3>
          <form onSubmit={handleAddProduct} className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-5">
            <input
              placeholder="ব্র্যান্ড (Samsung)"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white"
            />
            <input
              placeholder="মডেল (Galaxy A54)"
              required
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white"
            />
            <input
              placeholder="ভেরিয়েন্ট (8/128 GB)"
              value={formData.variant}
              onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white"
            />
            <input
              type="number"
              placeholder="স্টক সংখ্যা"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white"
            />
            <input
              type="number"
              placeholder="মূল্য (টাকা)"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white"
            />
            <button
              type="submit"
              className="col-span-1 rounded-lg bg-emerald-500 py-2 text-xs font-bold text-black sm:col-span-5 hover:bg-emerald-400"
            >
              + স্টকে যুক্ত করুন
            </button>
          </form>
        </div>

        {/* ইনভেন্টরি টেবিল */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="border-b border-zinc-800 bg-zinc-950/60 text-xs uppercase text-zinc-400">
              <tr>
                <th className="px-5 py-3">মডেল বিবরণ</th>
                <th className="px-5 py-3">ভেরিয়েন্ট</th>
                <th className="px-5 py-3">বিক্রয় মূল্য</th>
                <th className="px-5 py-3 text-center">স্টক</th>
                <th className="px-5 py-3 text-center">মোট বিক্রি</th>
                <th className="px-5 py-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {mobiles.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-800/40">
                  <td className="px-5 py-3 font-medium text-white">
                    <div>{item.brand}</div>
                    <div className="text-xs text-zinc-400">{item.model}</div>
                  </td>
                  <td className="px-5 py-3 text-zinc-400">{item.variant}</td>
                  <td className="px-5 py-3 text-white">৳{item.price.toLocaleString()}</td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        item.stock > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {item.stock} টি
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center font-bold text-amber-400">{item.sold} টি</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedMobileForSale(item);
                          setIsSaleModalOpen(true);
                        }}
                        disabled={item.stock === 0}
                        className="rounded-md bg-emerald-500 px-3 py-1 text-xs font-bold text-black hover:bg-emerald-400 disabled:opacity-40"
                      >
                        ⚡ বিক্রি করুন
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded-md bg-rose-500/10 px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-500/20"
                      >
                        ডিলিট
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* স্মার্ট সেল পপআপ মোডাল */}
      <SmartSellModal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        mobile={selectedMobileForSale}
        onConfirmSale={handleConfirmSale}
      />
    </main>
  );
}