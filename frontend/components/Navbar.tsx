import Link from "next/link";
import { Bell, Search, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-2 text-white shadow-md">
            <ShieldCheck size={16} />
          </div>
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-800">
            Ayushman Bhava
          </Link>
        </div>

        <div className="hidden min-w-[250px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search size={15} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm text-slate-700 outline-none"
            placeholder="Search records, doctors, alerts..."
          />
        </div>

        <div className="flex items-center gap-3">
          <Badge className="hidden sm:inline-flex">Live Secure</Badge>
          <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50">
            <Bell size={16} />
          </button>
          <div className="hidden text-right sm:block">
            <p className="text-xs text-slate-500">Unified Healthcare Platform</p>
            <p className="text-sm font-semibold text-slate-700">Care Operations</p>
          </div>
        </div>
      </div>
    </header>
  );
}
