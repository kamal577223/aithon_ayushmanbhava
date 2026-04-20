"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Card({
  title,
  children,
  icon: Icon,
  tone = "blue",
}: {
  title: string;
  children: ReactNode;
  icon?: LucideIcon;
  tone?: "blue" | "green" | "amber" | "rose";
}) {
  const toneClass =
    tone === "green"
      ? "from-emerald-500 to-teal-500"
      : tone === "amber"
        ? "from-amber-500 to-orange-500"
        : tone === "rose"
          ? "from-rose-500 to-pink-500"
          : "from-blue-600 to-cyan-500";

  return (
    <motion.section
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="stat-card"
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
        {Icon ? (
          <div className={`rounded-lg bg-gradient-to-r p-2 text-white shadow ${toneClass}`}>
            <Icon size={14} />
          </div>
        ) : null}
      </div>
      <div className="text-3xl font-bold text-slate-800">{children}</div>
      <Badge className="mt-3 border-transparent bg-slate-100 text-slate-600">Updated now</Badge>
    </motion.section>
  );
}
