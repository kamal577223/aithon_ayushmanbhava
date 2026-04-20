"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowUp, Download, TrendingUp } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";

type PredictionRecord = {
  date: string;
  disease: string;
  riskLevel: "Low" | "Medium" | "High";
  confidence: number;
  status: "Active" | "Resolved" | "Monitoring";
};

export default function DiseasePredictionPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Patient") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    setTimeout(() => {
      setPredictions([
        {
          date: "2024-01-15",
          disease: "Type 2 Diabetes",
          riskLevel: "Medium",
          confidence: 0.72,
          status: "Active",
        },
        {
          date: "2024-01-10",
          disease: "Hypertension",
          riskLevel: "Low",
          confidence: 0.35,
          status: "Monitoring",
        },
        {
          date: "2024-01-05",
          disease: "High Cholesterol",
          riskLevel: "Medium",
          confidence: 0.58,
          status: "Active",
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

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="space-y-6 p-6">
        {/* Header */}
        <motion.div
          className="glass-panel p-6 text-white bg-gradient-to-r from-amber-600 to-orange-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Disease Prediction Analysis</h1>
          <p className="mt-2 text-amber-100">
            AI-powered disease risk assessment based on your medical history and current health metrics.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <motion.div className="glass-panel p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-slate-600">Total Predictions</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{predictions.length}</p>
          </motion.div>
          <motion.div
            className="glass-panel p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm font-semibold text-slate-600">High Risk Conditions</p>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {predictions.filter((p) => p.riskLevel === "High").length}
            </p>
          </motion.div>
          <motion.div
            className="glass-panel p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm font-semibold text-slate-600">Average Confidence</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {Math.round((predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length) * 100)}%
            </p>
          </motion.div>
        </div>

        {/* Prediction Table */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 text-xl font-bold text-slate-800">Prediction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Disease</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Risk Level</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Confidence</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred, idx) => (
                  <motion.tr
                    key={idx}
                    className="border-b border-slate-100 hover:bg-blue-50 transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <td className="px-4 py-3 text-sm text-slate-700">{pred.date}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">{pred.disease}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          pred.riskLevel === "Low"
                            ? "bg-green-100 text-green-700"
                            : pred.riskLevel === "Medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {pred.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${pred.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">{Math.round(pred.confidence * 100)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          pred.status === "Active"
                            ? "bg-blue-100 text-blue-700"
                            : pred.status === "Monitoring"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {pred.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Trends Section */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-cyan-600" size={20} />
            <h2 className="text-xl font-bold text-slate-800">Health Trends</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Blood Glucose Trend", change: -5, unit: "mg/dL" },
              { label: "Blood Pressure Trend", change: 2, unit: "mmHg" },
              { label: "Weight Trend", change: -2, unit: "kg" },
            ].map((trend, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-700">{trend.label}</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1 ${trend.change < 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    <ArrowUp size={14} style={{ transform: `rotate(${trend.change < 0 ? "180deg" : "0deg"})` }} />
                    <span className="text-sm font-semibold">
                      {Math.abs(trend.change)} {trend.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Action Buttons */}
        <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Download Report
          </Button>
          <Button>Schedule with Doctor</Button>
        </motion.div>
      </div>
    </div>
  );
}
