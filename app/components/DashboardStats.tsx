interface StatsProps {
  totalModels: number;
  totalStockUnits: number;
  totalSoldUnits: number;
}

export default function DashboardStats({ totalModels, totalStockUnits, totalSoldUnits }: StatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Total Models</p>
        <p className="mt-2 text-2xl font-bold text-white">{totalModels}</p>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Available Stock</p>
        <p className="mt-2 text-2xl font-bold text-emerald-400">{totalStockUnits} units</p>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Total Sold</p>
        <p className="mt-2 text-2xl font-bold text-amber-400">{totalSoldUnits} units</p>
      </div>
    </div>
  );
}