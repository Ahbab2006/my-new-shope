"use client";

import { MobileItem } from "./data";

interface MobileTableProps {
  mobiles: MobileItem[];
  isAdmin: boolean;
  onSellOne: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MobileTable({ mobiles, isAdmin, onSellOne, onDelete }: MobileTableProps) {
  if (mobiles.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-400">
        Kono mobile data nei.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="border-b border-zinc-800 bg-zinc-950/60 text-xs uppercase text-zinc-400">
          <tr>
            <th className="px-5 py-3">Brand & Model</th>
            <th className="px-5 py-3">Variant</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3 text-center">In Stock</th>
            <th className="px-5 py-3 text-center">Sold Units</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {mobiles.map((item) => (
            <tr key={item.id} className="hover:bg-zinc-800/40">
              <td className="px-5 py-3 font-medium text-white">
                <div>{item.brand}</div>
                <div className="text-xs text-zinc-400">{item.model}</div>
              </td>
              <td className="px-5 py-3 text-zinc-400">{item.variant}</td>
              <td className="px-5 py-3 text-white">৳{item.price.toLocaleString()}</td>
              <td className="px-5 py-3 text-center">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    item.stock > 0
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {item.stock} left
                </span>
              </td>
              <td className="px-5 py-3 text-center font-medium text-amber-400">
                {item.sold} sold
              </td>
              <td className="px-5 py-3 text-right">
                <div className="flex justify-end items-center gap-2">
                  <button
                    onClick={() => onSellOne(item.id)}
                    disabled={item.stock === 0}
                    className="rounded-md bg-emerald-600/80 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-500 disabled:opacity-40"
                  >
                    Sell (1)
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="rounded-md bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-400 hover:bg-rose-500/20"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}