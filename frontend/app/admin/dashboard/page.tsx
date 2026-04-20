"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { AlertCircle, Users, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Admin") {
      router.push("/login");
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin">Loading...</div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Patients",
      value: "15,234",
      icon: Users,
      color: "bg-blue-500/20 text-blue-500",
    },
    {
      label: "Active Doctors",
      value: "342",
      icon: Activity,
      color: "bg-green-500/20 text-green-500",
    },
    {
      label: "Medical Records",
      value: "48,921",
      icon: TrendingUp,
      color: "bg-purple-500/20 text-purple-500",
    },
    {
      label: "Security Alerts",
      value: "23",
      icon: AlertCircle,
      color: "bg-red-500/20 text-red-500",
    },
  ];

  const alerts = [
    { id: 1, title: "Unusual Login Activity", time: "2 hours ago", severity: "high" },
    { id: 2, title: "Database Backup Complete", time: "4 hours ago", severity: "info" },
    { id: 3, title: "High API Response Time", time: "1 day ago", severity: "medium" },
  ];

  return (
    <main className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">System Overview & Management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:border-white/40 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Security Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{alert.title}</p>
                  <p className="text-slate-400 text-sm">{alert.time}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    alert.severity === "high"
                      ? "bg-red-500/20 text-red-400"
                      : alert.severity === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { title: "Population Health", description: "View regional statistics", href: "/admin/population" },
            { title: "Fraud Detection", description: "Monitor suspicious activities", href: "/admin/fraud" },
            { title: "Disease Hotspots", description: "Track outbreak patterns", href: "/admin/hotspot" },
          ].map((action, index) => (
            <motion.a
              key={index}
              href={action.href}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:border-white/40 transition cursor-pointer group"
            >
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                {action.title}
              </h3>
              <p className="text-slate-400 text-sm mt-2">{action.description}</p>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
