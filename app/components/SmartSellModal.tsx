"use client";

import { useState } from "react";

export interface MobileProduct {
  _id: string;
  brand: string;
  model: string;
  variant: string;
  stock: number;
  sold: number;
  price: number;
}

interface SmartSellModalProps {
  isOpen: boolean;
  onClose: () => void;
  mobile: MobileProduct | null;
  onConfirmSale: (saleData: {
    productId: string;
    customerName: string;
    customerPhone: string;
    imei: string;
    paymentMethod: string;
    salePrice: number;
  }) => Promise<void>;
}

export default function SmartSellModal({
  isOpen,
  onClose,
  mobile,
  onConfirmSale,
}: SmartSellModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [imei, setImei] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSale, setCompletedSale] = useState<any | null>(null);

  if (!isOpen || !mobile) return null;

  const handleSaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const saleInfo = {
      productId: mobile._id,
      customerName: customerName || "সম্মানিত ক্রেতা",
      customerPhone: customerPhone || "N/A",
      imei: imei || "N/A",
      paymentMethod,
      salePrice: mobile.price,
      brand: mobile.brand,
      model: mobile.model,
      variant: mobile.variant,
      date: new Date().toLocaleString("bn-BD"),
      invoiceNo: `INV-${Date.now().toString().slice(-6)}`,
    };

    await onConfirmSale(saleInfo);
    setIsSubmitting(false);
    setCompletedSale(saleInfo);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleModalClose = () => {
    setCompletedSale(null);
    setCustomerName("");
    setCustomerPhone("");
    setImei("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        {/* রিসিট প্রিন্ট ভিউ */}
        {completedSale ? (
          <div>
            <div
              id="printable-receipt"
              className="rounded-xl border border-dashed border-zinc-700 bg-white p-6 text-black"
            >
              <div className="border-b border-zinc-200 pb-3 text-center">
                <h2 className="text-xl font-bold tracking-tight">মোবাইল শোরুম</h2>
                <p className="text-xs text-zinc-600">ক্যাশ মেমো / ওয়ারেন্টি রিসিট</p>
                <p className="mt-1 text-[11px] text-zinc-500">ইনভয়েস: {completedSale.invoiceNo}</p>
                <p className="text-[11px] text-zinc-500">তারিখ: {completedSale.date}</p>
              </div>

              <div className="mt-3 space-y-1 text-xs">
                <p><span className="font-semibold">ক্রেতার নাম:</span> {completedSale.customerName}</p>
                <p><span className="font-semibold">মোবাইল নং:</span> {completedSale.customerPhone}</p>
                <p><span className="font-semibold">IMEI/Serial:</span> {completedSale.imei}</p>
                <p><span className="font-semibold">পেমেন্ট মেথড:</span> {completedSale.paymentMethod}</p>
              </div>

              <div className="mt-4 border-t border-b border-zinc-300 py-2">
                <div className="flex justify-between font-bold text-xs">
                  <span>বিবরণ</span>
                  <span>মূল্য</span>
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <span>{completedSale.brand} {completedSale.model} ({completedSale.variant})</span>
                  <span>৳{completedSale.salePrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-3 flex justify-between font-extrabold text-sm">
                <span>সর্বমোট পরিশোধ:</span>
                <span>৳{completedSale.salePrice.toLocaleString()}</span>
              </div>

              <p className="mt-4 text-center text-[10px] text-zinc-500">
                আমাদের সাথে কেনাকাটা করার জন্য ধন্যবাদ! অফিসিয়াল ওয়ারেন্টি সংরক্ষিত।
              </p>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handlePrint}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400"
              >
                🖨️ প্রিন্ট রিসিট
              </button>
              <button
                onClick={handleModalClose}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-700"
              >
                সম্পন্ন করুন
              </button>
            </div>
          </div>
        ) : (
          /* স্মার্ট চেকআউট ফর্ম */
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">স্মার্ট সেল চেকআউট</h3>
                <p className="text-xs text-emerald-400 font-medium">
                  {mobile.brand} {mobile.model} ({mobile.variant})
                </p>
              </div>
              <span className="text-lg font-bold text-white">৳{mobile.price.toLocaleString()}</span>
            </div>

            <form onSubmit={handleSaleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs text-zinc-400">ক্রেতার নাম</label>
                <input
                  type="text"
                  placeholder="যেমন: মোঃ সাব্বির"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400">ক্রেতার মোবাইল নম্বর</label>
                  <input
                    type="text"
                    placeholder="017XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400">পেমেন্ট মাধ্যম</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Cash">নগদ ক্যাশ (Cash)</option>
                    <option value="bKash">বিকাশ (bKash)</option>
                    <option value="Nagad">নগদ (Nagad)</option>
                    <option value="Card">ব্যাংক কার্ড (Card)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400">IMEI / সিরিয়াল নম্বর (ওয়ারেন্টির জন্য)</label>
                <input
                  type="text"
                  placeholder="যেমন: 864521048956321"
                  value={imei}
                  onChange={(e) => setImei(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-3 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-emerald-500 px-5 py-2 text-xs font-bold text-black transition-colors hover:bg-emerald-400 disabled:opacity-50"
                >
                  {isSubmitting ? "বিক্রি প্রসেস হচ্ছে..." : "বিক্রি ও রিসিট জেনারেট"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}