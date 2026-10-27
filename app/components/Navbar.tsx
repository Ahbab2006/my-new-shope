export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Mobile<span className="text-emerald-500">Inventory</span>
        </h1>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          Shop Dashboard
        </span>
      </div>
    </header>
  );
}