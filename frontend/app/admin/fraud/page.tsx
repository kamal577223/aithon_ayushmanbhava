"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, CheckCircle2, TrendingUp, Zap, Download } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";

type FraudAlert = {
  id: string;
  claimId: string;
  type: "Duplicate Claim" | "Suspicious Activity" | "Pattern Anomaly";
  severity: "High" | "Medium" | "Low";
  details: string;
  duplicateRef?: string;
  amount: number;
  date: string;
  status: "Active" | "Resolved" | "Under Review";
};

export default function FraudDetectionPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Admin") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    setTimeout(() => {
      setFraudAlerts([
        {
          id: "FA001",
          claimId: "CLM-5482",
          type: "Duplicate Claim",
          severity: "High",
          details: "Duplicate claim detected for same patient within 24 hours",
          duplicateRef: "CLM-5413",
          amount: 2400,
          date: "2024-01-15",
          status: "Active",
        },
        {
          id: "FA002",
          claimId: "CLM-5481",
          type: "Suspicious Activity",
          severity: "High",
          details: "Multiple claims from same provider in short duration",
          amount: 8500,
          date: "2024-01-14",
          status: "Under Review",
        },
        {
          id: "FA003",
          claimId: "CLM-5480",
          type: "Pattern Anomaly",
          severity: "Medium",
          details: "Claim amount significantly higher than patient's historical average",
          amount: 15000,
          date: "2024-01-13",
          status: "Active",
        },
        {
          id: "FA004",
          claimId: "CLM-5479",
          type: "Duplicate Claim",
          severity: "Medium",
          details: "Similar claim pattern detected with different patient ID",
          duplicateRef: "CLM-5420",
          amount: 3200,
          date: "2024-01-12",
          status: "Resolved",
        },
        {
          id: "FA005",
          claimId: "CLM-5478",
          type: "Suspicious Activity",
          severity: "Low",
          details: "Login from unusual geographic location",
          amount: 1800,
          date: "2024-01-11",
          status: "Resolved",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [router]);

  if (!userRole || loading) {
    return (
      <div className="grid gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="flex items-center justify-center p-8">
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  const activeAlerts = fraudAlerts.filter((a) => a.status === "Active");
  const totalAmount = fraudAlerts.reduce((acc, a) => acc + a.amount, 0);

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="space-y-6 p-6">
        {/* Header */}
        <motion.div
          className="glass-panel p-6 text-white bg-gradient-to-r from-red-600 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Fraud & Duplicate Claim Detection</h1>
          <p className="mt-2 text-red-100">
            Identify and flag suspicious transactions and duplicate insurance claims.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid gap-4 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass-panel p-4">
            <p className="text-sm font-semibold text-slate-600">Active Alerts</p>
            <p className="mt-2 text-3xl font-bold text-red-600">{activeAlerts.length}</p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-sm font-semibold text-slate-600">Total Fraud Value</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">${(totalAmount / 1000).toFixed(1)}K</p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-sm font-semibold text-slate-600">Detection Rate</p>
            <p className="mt-2 text-3xl font-bold text-green-600">94.2%</p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-sm font-semibold text-slate-600">Amount Recovered</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">$18.5K</p>
          </div>
        </motion.div>

        {/* Fraud Alerts Table */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <ShieldAlert size={20} className="text-red-600" />
            Fraud Alerts Log
          </h2>
          <div className="space-y-3">
            {fraudAlerts.map((alert, idx) => (
              <motion.div
                key={alert.id}
                className="flex items-start gap-4 rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Alert Icon & Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-slate-800">{alert.type}</p>
                      <p className="text-xs text-slate-600 mt-1">Claim ID: {alert.claimId}</p>
                    </div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        alert.severity === "High"
                          ? "bg-red-100 text-red-700"
                          : alert.severity === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 mb-2">{alert.details}</p>

                  {alert.duplicateRef && (
                    <p className="text-xs text-slate-600 mb-2 flex items-center gap-1">
                      <AlertTriangle size={12} />
                      Matched with {alert.duplicateRef}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex gap-4 text-xs">
                      <span className="text-slate-600">Amount: <strong className="text-slate-800">${alert.amount}</strong></span>
                      <span className="text-slate-600">Date: <strong className="text-slate-800">{alert.date}</strong></span>
                    </div>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                        alert.status === "Active"
                          ? "bg-red-100 text-red-700"
                          : alert.status === "Under Review"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                  <Button size="sm" variant="outline">
                    Block
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Fraud Trends */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <TrendingUp size={20} className="text-blue-600" />
            Fraud Detection Trends
          </h2>
          <div className="space-y-3">
            {[
              { category: "Duplicate Claims", count: 145, change: -12 },
              { category: "Suspicious Activities", count: 78, change: 8 },
              { category: "Pattern Anomalies", count: 32, change: -5 },
            ].map((trend, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">{trend.category}</p>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">{trend.count}</p>
                    <p
                      className={`text-xs ${
                        trend.change < 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {trend.change > 0 ? "+" : ""}{trend.change}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Action Buttons */}
        <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export Fraud Report
          </Button>
          <Button variant="outline">Configure Rules</Button>
          <Button>Block All Active Alerts</Button>
        </motion.div>
      </div>
    </div>
  );
}
