"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertOctagon, BarChart3, ShieldCheck, Users, TrendingUp, MapPin, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Sidebar from "@/components/Sidebar";
import { getDashboard } from "@/services/api";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";

type Stats = {
  total_patients: number;
  total_doctors: number;
  total_records: number;
  detected_attacks: number;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Admin") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    // Fetch dashboard data
    getDashboard()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setStats({
          total_patients: 1250,
          total_doctors: 85,
          total_records: 5432,
          detected_attacks: 12,
        });
        setLoading(false);
      });
  }, [router]);

  if (!userRole || loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="space-y-6 p-6">
        {/* Header */}
        <motion.div
          className="glass-panel p-6 text-white bg-gradient-to-r from-slate-700 to-slate-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-slate-200">
            System monitoring, population health analytics, and security oversight.
          </p>
        </motion.div>

        {/* Key Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card title="Total Patients" icon={Users} tone="blue">
              {stats?.total_patients || 0}
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card title="Active Doctors" icon={TrendingUp} tone="green">
              {stats?.total_doctors || 0}
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card title="Medical Records" icon={BarChart3} tone="amber">
              {stats?.total_records || 0}
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card title="Security Alerts" icon={AlertOctagon} tone="rose">
              {stats?.detected_attacks || 0}
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="glass-panel p-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => router.push("/admin/population")}
          >
            <BarChart3 size={20} />
            <span className="text-xs text-center">Population Health</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => router.push("/admin/fraud")}
          >
            <ShieldCheck size={20} />
            <span className="text-xs text-center">Fraud Detection</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => router.push("/admin/hotspot")}
          >
            <MapPin size={20} />
            <span className="text-xs text-center">Disease Hotspot</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => router.push("/admin/monitoring")}
          >
            <Zap size={20} />
            <span className="text-xs text-center">System Monitor</span>
          </Button>
        </motion.div>

        {/* Security Alerts */}
        <motion.section
          className="glass-panel p-6 border-l-4 border-red-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertOctagon className="text-red-600" size={20} />
            <h2 className="text-xl font-bold text-slate-800">Recent Security Alerts</h2>
          </div>
          <div className="space-y-2">
            {[
              { type: "Duplicate Claim", severity: "High", details: "Claim #5482 matched with #5413" },
              { type: "Unusual Access", severity: "Medium", details: "Multiple login attempts from IP 192.168.x.x" },
              { type: "Data Anomaly", severity: "Low", details: "Patient record temperature reading out of range" },
            ].map((alert, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-lg bg-red-50 p-3 border border-red-200">
                <div
                  className={`mt-0.5 h-2 w-2 rounded-full ${
                    alert.severity === "High"
                      ? "bg-red-600"
                      : alert.severity === "Medium"
                        ? "bg-amber-600"
                        : "bg-yellow-600"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{alert.type}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{alert.details}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">just now</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* System Health */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="mb-4 text-lg font-bold text-slate-800">System Health Metrics</h2>
          <div className="space-y-3">
            {[
              { label: "API Response Time", value: 45, unit: "ms", status: "healthy" },
              { label: "Database Load", value: 65, unit: "%", status: "warning" },
              { label: "Storage Usage", value: 78, unit: "%", status: "warning" },
              { label: "System Uptime", value: 99.8, unit: "%", status: "healthy" },
            ].map((metric, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">{metric.label}</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-slate-200">
                    <div
                      className={`h-2 rounded-full ${
                        metric.status === "healthy"
                          ? "bg-green-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-600 w-14 text-right">
                    {metric.value} {metric.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Report Generation */}
        <motion.section
          className="glass-panel p-6 bg-gradient-to-r from-blue-50 to-cyan-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="mb-3 text-lg font-bold text-slate-800">Generate Reports</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button size="sm" variant="outline">Population Report</Button>
            <Button size="sm" variant="outline">Fraud Report</Button>
            <Button size="sm" variant="outline">Security Report</Button>
            <Button size="sm" variant="outline">System Report</Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
