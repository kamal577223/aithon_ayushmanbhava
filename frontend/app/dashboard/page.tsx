"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Database, Stethoscope, UsersRound } from "lucide-react";
import Card from "@/components/Card";
import Sidebar from "@/components/Sidebar";
import { getDashboard } from "@/services/api";

type DashboardStats = {
  total_patients: number;
  total_doctors: number;
  total_records: number;
  detected_attacks: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    getDashboard().then(setStats).catch(() => setStats(null));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-[240px_1fr]">
      <Sidebar />
      <div className="space-y-4">
        <section className="glass-panel p-5">
          <h2 className="text-xl font-bold text-slate-800">Healthcare Command Center</h2>
          <p className="text-sm text-slate-600">
            Unified visibility across records, providers, and GhostNet alerts.
          </p>
        </section>
        <div className="dashboard-grid">
          <Card title="Total Patients" icon={UsersRound}>
            {stats?.total_patients ?? 0}
          </Card>
          <Card title="Total Doctors" icon={Stethoscope} tone="green">
            {stats?.total_doctors ?? 0}
          </Card>
          <Card title="Security Alerts" icon={AlertTriangle} tone="amber">
            {stats?.detected_attacks ?? 0}
          </Card>
          <Card title="System Status" icon={Database} tone="rose">
            Online
          </Card>
        </div>
        <section className="glass-panel p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">System Activity Trend</h3>
          <div className="grid grid-cols-4 gap-3">
            {[60, 78, 55, 86].map((height, idx) => (
              <div key={idx} className="rounded-xl bg-slate-100 p-3">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="mx-auto w-full rounded-md bg-gradient-to-t from-blue-500 to-cyan-400"
                  style={{ height: `${height}%`, minHeight: "56px" }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
