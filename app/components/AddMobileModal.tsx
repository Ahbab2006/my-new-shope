"use client";

import { useState } from "react";

interface AddMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (mobile: {
    id: string;
    brand: string;
    model: string;
    variant: string;
    stock: number;
    sold: number;
    price: number;
  }) => void;
}

export default function AddMobileModal({ isOpen, onClose, onAdd }: AddMobileModalProps) {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    variant: "",
    stock: 0,
    price: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brand || !formData.model) return;

    onAdd({
      id: Date.now().toString(),
      brand: formData.brand,
      model: formData.model,
      variant: formData.variant || "Standard",
      stock: Number(formData.stock),
      sold: 0,
      price: Number(formData.price),
    });

    setFormData({ brand: "", model: "", variant: "", stock: 0, price: 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <h2 className="text-lg font-semibold text-white">Add New Mobile Model</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs text-zinc-400">Brand Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Samsung, Xiaomi, Apple"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400">Model Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Galaxy A54, Redmi Note 13"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400">Variant (RAM/Storage)</label>
            <input
              type="text"
              placeholder="e.g. 8/128 GB"
              value={formData.variant}
              onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400">Stock Quantity</label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Price (BDT)</label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-emerald-400"
            >
              Save Mobile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}