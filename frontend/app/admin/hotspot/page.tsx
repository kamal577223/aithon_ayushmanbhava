"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, TrendingUp, Zap, Download, Eye } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";

type Hotspot = {
  id: string;
  location: string;
  disease: string;
  riskLevel: "Critical" | "High" | "Moderate" | "Low";
  predictedCases: number;
  trend: "Increasing" | "Decreasing" | "Stable";
  coordinates: { lat: number; lng: number };
  affectedPopulation: number;
  recommendation: string;
};

export default function DiseaseHotspotPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Admin") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    setTimeout(() => {
      setHotspots([
        {
          id: "HS001",
          location: "District North - Urban Area",
          disease: "COVID-19",
          riskLevel: "Critical",
          predictedCases: 450,
          trend: "Increasing",
          coordinates: { lat: 40.7128, lng: -74.006 },
          affectedPopulation: 125000,
          recommendation:
            "Urgent: Increase testing centers and mobile clinics in this area. Distribute N95 masks and implement targeted vaccination drive.",
        },
        {
          id: "HS002",
          location: "Region East - Rural Area",
          disease: "Dengue Fever",
          riskLevel: "High",
          predictedCases: 320,
          trend: "Increasing",
          coordinates: { lat: 40.758, lng: -73.9855 },
          affectedPopulation: 95000,
          recommendation:
            "Deploy vector control teams immediately. Conduct surveillance for Aedes mosquitoes. Establish fever clinics.",
        },
        {
          id: "HS003",
          location: "District South - Suburban",
          disease: "Influenza",
          riskLevel: "Moderate",
          predictedCases: 180,
          trend: "Stable",
          coordinates: { lat: 40.7489, lng: -73.968 },
          affectedPopulation: 78000,
          recommendation: "Monitor situation closely. Ensure adequate flu vaccine supply at health centers.",
        },
        {
          id: "HS004",
          location: "Region West - Mixed Urban-Rural",
          disease: "Tuberculosis",
          riskLevel: "High",
          predictedCases: 220,
          trend: "Decreasing",
          coordinates: { lat: 40.6892, lng: -74.0445 },
          affectedPopulation: 112000,
          recommendation:
            "Continue DOT programs. Increase awareness campaigns about TB transmission. Ensure supply of anti-TB drugs.",
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

  const criticalHotspots = hotspots.filter((h) => h.riskLevel === "Critical");

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="space-y-6 p-6">
        {/* Header */}
        <motion.div
          className="glass-panel p-6 text-white bg-gradient-to-r from-orange-600 to-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Disease Hotspot Prediction</h1>
          <p className="mt-2 text-orange-100">
            Predictive analytics for disease outbreaks and risk zones at regional and area levels.
          </p>
        </motion.div>

        {/* Critical Alert */}
        {criticalHotspots.length > 0 && (
          <motion.div
            className="glass-panel p-4 bg-red-50 border-l-4 border-red-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 text-red-600" size={20} />
              <div>
                <p className="font-bold text-red-700">Critical Hotspots Detected!</p>
                <p className="text-sm text-red-600 mt-1">
                  {criticalHotspots.length} area(s) identified with critical disease risk. Immediate action required.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Statistics */}
        <motion.div
          className="grid gap-4 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass-panel p-4">
            <p className="text-sm font-semibold text-slate-600">Total Hotspots</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{hotspots.length}</p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-sm font-semibold text-slate-600">Critical Zones</p>
            <p className="mt-2 text-3xl font-bold text-red-600">{criticalHotspots.length}</p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-sm font-semibold text-slate-600">Predicted Cases</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">
              {hotspots.reduce((acc, h) => acc + h.predictedCases, 0)}
            </p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-sm font-semibold text-slate-600">At-Risk Population</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {Math.round(hotspots.reduce((acc, h) => acc + h.affectedPopulation, 0) / 1000)}K
            </p>
          </div>
        </motion.div>

        {/* Hotspots Grid */}
        <div className="space-y-4">
          {hotspots.map((hotspot, idx) => (
            <motion.div
              key={hotspot.id}
              className={`glass-panel p-6 border-l-4 ${
                hotspot.riskLevel === "Critical"
                  ? "border-red-600"
                  : hotspot.riskLevel === "High"
                    ? "border-orange-600"
                    : hotspot.riskLevel === "Moderate"
                      ? "border-amber-600"
                      : "border-yellow-600"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-lg p-3 text-white ${
                      hotspot.riskLevel === "Critical"
                        ? "bg-red-600"
                        : hotspot.riskLevel === "High"
                          ? "bg-orange-600"
                          : hotspot.riskLevel === "Moderate"
                            ? "bg-amber-600"
                            : "bg-yellow-600"
                    }`}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">{hotspot.location}</p>
                    <p className="text-sm text-slate-600 mt-0.5">Disease: {hotspot.disease}</p>
                  </div>
                </div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    hotspot.riskLevel === "Critical"
                      ? "bg-red-100 text-red-700"
                      : hotspot.riskLevel === "High"
                        ? "bg-orange-100 text-orange-700"
                        : hotspot.riskLevel === "Moderate"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {hotspot.riskLevel}
                </span>
              </div>

              {/* Metrics */}
              <div className="mb-4 grid gap-3 md:grid-cols-4">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-600">Predicted Cases</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">{hotspot.predictedCases}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-600">Affected Population</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">
                    {(hotspot.affectedPopulation / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-600">Trend</p>
                  <p
                    className={`mt-1 text-lg font-bold ${
                      hotspot.trend === "Increasing"
                        ? "text-red-600"
                        : hotspot.trend === "Decreasing"
                          ? "text-green-600"
                          : "text-slate-600"
                    }`}
                  >
                    {hotspot.trend === "Increasing" ? "↑" : hotspot.trend === "Decreasing" ? "↓" : "→"}{" "}
                    {hotspot.trend}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-600">Transmission Rate</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">
                    {hotspot.riskLevel === "Critical"
                      ? "3.2%"
                      : hotspot.riskLevel === "High"
                        ? "2.1%"
                        : hotspot.riskLevel === "Moderate"
                          ? "1.2%"
                          : "0.5%"}
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <div className="mb-4 rounded-lg bg-blue-50 p-3 border border-blue-200">
                <p className="text-xs font-semibold text-blue-700 mb-1">Recommended Actions</p>
                <p className="text-sm text-blue-600">{hotspot.recommendation}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="sm">
                  <Eye size={14} className="mr-1" />
                  View on Map
                </Button>
                <Button size="sm" variant="outline">
                  Deploy Resources
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preventive Measures */}
        <motion.section
          className="glass-panel p-6 bg-gradient-to-r from-green-50 to-emerald-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <Zap className="text-green-600" size={20} />
            Recommended Preventive Measures
          </h2>
          <ul className="space-y-2">
            {[
              "Increase surveillance frequency in hotspot areas",
              "Deploy mobile health clinics to high-risk zones",
              "Conduct mass vaccination campaigns",
              "Distribute prevention materials and educational content",
              "Coordinate with local health authorities for rapid response",
              "Monitor hospital capacity and readiness",
            ].map((measure, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-green-600" />
                {measure}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Export & Report */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export Hotspot Report
          </Button>
          <Button variant="outline">Generate Alert Notification</Button>
        </motion.div>
      </div>
    </div>
  );
}
