"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Shield, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <section className="mx-auto mt-8 grid max-w-5xl items-center gap-8 rounded-3xl border border-slate-200/80 bg-white/85 p-8 shadow-xl shadow-slate-200/70 md:grid-cols-2">
      <motion.div className="space-y-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Badge>Secure Healthcare Intelligence</Badge>
        <h2 className="text-3xl font-bold leading-tight text-slate-800">
          One platform for patients, doctors, and admins.
        </h2>
        <p className="text-slate-600">
          Access records, monitor treatment workflows, and guard your infrastructure with GhostNet
          AI security monitoring.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/login">
            <Button size="lg">Login Portals</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              Preview Dashboard
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[{ icon: UserRound, label: "Patient" }, { icon: Activity, label: "Doctor" }, { icon: Shield, label: "Admin" }].map(
            (item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                <item.icon className="mx-auto mb-1 text-blue-600" size={16} />
                <p className="text-xs font-semibold text-slate-600">{item.label}</p>
              </div>
            )
          )}
        </div>
      </motion.div>
      <motion.div
        className="gradient-ring"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="space-y-3 rounded-2xl bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-700">Live Modules</h3>
          <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
            Patient and Record Hub
          </p>
          <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
            Doctor Workflow Center
          </p>
          <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
            Admin Threat and Compliance Console
          </p>
        </div>
      </motion.div>
    </section>
  );
}
