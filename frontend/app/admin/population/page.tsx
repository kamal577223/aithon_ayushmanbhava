"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, TrendingUp, MapPin, Activity } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";

type RegionData = {
  region: string;
  population: number;
  totalPatients: number;
  diseaseCases: number;
  healthScore: number;
  trend: "up" | "down" | "stable";
};

export default function PopulationHealthPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Admin") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    setTimeout(() => {
      setRegionData([
        {
          region: "North",
          population: 450000,
          totalPatients: 1250,
          diseaseCases: 342,
          healthScore: 78,
          trend: "up",
        },
        {
          region: "South",
          population: 380000,
          totalPatients: 980,
          diseaseCases: 210,
          healthScore: 82,
          trend: "up",
        },
        {
          region: "East",
          population: 520000,
          totalPatients: 1450,
          diseaseCases: 480,
          healthScore: 65,
          trend: "down",
        },
        {
          region: "West",
          population: 390000,
          totalPatients: 1020,
          diseaseCases: 198,
          healthScore: 85,
          trend: "stable",
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
          className="glass-panel p-6 text-white bg-gradient-to-r from-emerald-600 to-teal-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Population-Level Health Dashboard</h1>
          <p className="mt-2 text-emerald-100">
            Monitor regional health statistics, disease patterns, and healthcare utilization.
          </p>
        </motion.div>

        {/* Overall Statistics */}
        <motion.div
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="mb-4 text-lg font-bold text-slate-800">Overall Population Metrics</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <p className="text-sm font-semibold text-slate-600">Total Population Covered</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {regionData.reduce((acc, r) => acc + r.population, 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <p className="text-sm font-semibold text-slate-600">Active Patients</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                {regionData.reduce((acc, r) => acc + r.totalPatients, 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
              <p className="text-sm font-semibold text-slate-600">Total Disease Cases</p>
              <p className="mt-2 text-2xl font-bold text-amber-600">
                {regionData.reduce((acc, r) => acc + r.diseaseCases, 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 border border-purple-200">
              <p className="text-sm font-semibold text-slate-600">Avg Health Score</p>
              <p className="mt-2 text-2xl font-bold text-purple-600">
                {Math.round(regionData.reduce((acc, r) => acc + r.healthScore, 0) / regionData.length)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Regional Breakdown */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-4 text-lg font-bold text-slate-800">Regional Health Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Region</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Population</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Patients</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Disease Cases</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Health Score</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Trend</th>
                </tr>
              </thead>
              <tbody>
                {regionData.map((region, idx) => (
                  <motion.tr
                    key={idx}
                    className="border-b border-slate-100 hover:bg-blue-50 transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-800">{region.region}</td>
                    <td className="px-4 py-3 text-slate-700">{region.population.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-700">{region.totalPatients}</td>
                    <td className="px-4 py-3 text-slate-700">{region.diseaseCases}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${region.healthScore}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-700">{region.healthScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          region.trend === "up"
                            ? "bg-green-100 text-green-700"
                            : region.trend === "down"
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {region.trend === "up" ? "↑ Improving" : region.trend === "down" ? "↓ Declining" : "→ Stable"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Healthcare Utilization */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <Activity className="text-cyan-600" size={20} />
            Healthcare Utilization Rate
          </h2>
          <div className="space-y-3">
            {regionData.map((region, idx) => {
              const utilizationRate = Math.round((region.totalPatients / region.population) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <p className="font-medium text-slate-700">{region.region}</p>
                    <p className="text-slate-600">{utilizationRate}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${utilizationRate}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Action Buttons */}
        <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button variant="outline">
            <BarChart3 size={16} className="mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <MapPin size={16} className="mr-2" />
            View Map
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
