"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Heart, Pill, Zap, TrendingUp } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";

type HealthMetric = {
  label: string;
  value: string | number;
  status: "normal" | "warning" | "critical";
};

type PredictionData = {
  predicted_disease: string;
  risk_level: "Low" | "Medium" | "High";
  confidence: number;
  recommendations: string[];
};

export default function PatientDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<PredictionData | null>(null);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Patient") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    // Simulate fetching patient data
    setTimeout(() => {
      setPredictions({
        predicted_disease: "Type 2 Diabetes",
        risk_level: "Medium",
        confidence: 0.72,
        recommendations: [
          "Increase physical activity to 150 min/week",
          "Reduce sugar intake",
          "Monitor blood glucose levels regularly",
        ],
      });

      setHealthMetrics([
        { label: "Blood Pressure", value: "120/80 mmHg", status: "normal" },
        { label: "BMI", value: "24.5", status: "normal" },
        { label: "Blood Glucose", value: "115 mg/dL", status: "warning" },
        { label: "Cholesterol", value: "200 mg/dL", status: "normal" },
      ]);

      setAlerts([
        "Missed medication: Blood pressure medication at 2 PM",
        "Upcoming appointment: Dr. Smith - Jan 15, 2:00 PM",
        "Lab results available: Blood work from Jan 10",
      ]);

      setLoading(false);
    }, 1000);
  }, [router]);

  if (!userRole || loading) {
    return (
      <div className="grid gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="flex items-center justify-center p-8">
          <p className="text-slate-500">Loading your dashboard...</p>
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
          className="glass-panel p-6 text-white bg-gradient-to-r from-blue-600 to-cyan-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="mt-2 text-blue-100">Welcome back! Here's your health overview.</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Total Appointments" icon={Zap} tone="blue">
            12
          </Card>
          <Card title="Active Prescriptions" icon={Pill} tone="green">
            3
          </Card>
          <Card title="Health Score" icon={Heart} tone="rose">
            82
          </Card>
          <Card title="Alert Count" icon={AlertCircle} tone="amber">
            {alerts.length}
          </Card>
        </div>

        {/* Disease Prediction Section */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="text-amber-600" size={20} />
            <h2 className="text-xl font-bold text-slate-800">Disease Prediction</h2>
          </div>
          {predictions && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-4 border border-amber-200">
                  <p className="text-sm font-semibold text-slate-600">Predicted Condition</p>
                  <p className="mt-1 text-2xl font-bold text-amber-700">{predictions.predicted_disease}</p>
                </div>
                <div
                  className={`rounded-lg p-4 border ${
                    predictions.risk_level === "Low"
                      ? "bg-green-50 border-green-200"
                      : predictions.risk_level === "Medium"
                        ? "bg-amber-50 border-amber-200"
                        : "bg-red-50 border-red-200"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-600">Risk Level</p>
                  <p
                    className={`mt-1 text-2xl font-bold ${
                      predictions.risk_level === "Low"
                        ? "text-green-700"
                        : predictions.risk_level === "Medium"
                          ? "text-amber-700"
                          : "text-red-700"
                    }`}
                  >
                    {predictions.risk_level}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {Math.round(predictions.confidence * 100)}% Confidence
                  </p>
                </div>
              </div>

              {/* Confidence Indicator */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700">Prediction Confidence</p>
                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${predictions.confidence * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700">Recommendations</p>
                <ul className="space-y-2">
                  {predictions.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 rounded-lg bg-blue-50 p-3">
                      <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-blue-600" />
                      <span className="text-sm text-slate-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.section>

        {/* Health Metrics Section */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Heart className="text-rose-600" size={20} />
            <h2 className="text-xl font-bold text-slate-800">Health Metrics</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {healthMetrics.map((metric, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                  <div
                    className={`h-3 w-3 rounded-full ${
                      metric.status === "normal"
                        ? "bg-green-500"
                        : metric.status === "warning"
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                  />
                </div>
                <p className="mt-2 text-lg font-bold text-slate-800">{metric.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Medicine Recommendation Section - Link to dedicated page */}
        <motion.section
          className="glass-panel p-6 cursor-pointer hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => router.push("/patient/medicines")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="text-green-600" size={20} />
              <h2 className="text-xl font-bold text-slate-800">Medicine Recommendations</h2>
            </div>
            <span className="text-sm text-blue-600 font-medium">View All →</span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            You have 3 active prescriptions. Click to view dosage and reminders.
          </p>
        </motion.section>

        {/* Alerts Section */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="text-amber-600" size={20} />
            <h2 className="text-xl font-bold text-slate-800">Recent Alerts</h2>
          </div>
          <div className="space-y-2">
            {alerts.map((alert, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-lg bg-amber-50 p-3 border border-amber-200">
                <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-amber-600" />
                <p className="text-sm text-slate-700">{alert}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Health Tips Section - Link to dedicated page */}
        <motion.section
          className="glass-panel p-6 cursor-pointer hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => router.push("/patient/health-tips")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-cyan-600" size={20} />
              <h2 className="text-xl font-bold text-slate-800">Daily Health Tips</h2>
            </div>
            <span className="text-sm text-blue-600 font-medium">View More →</span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Get personalized lifestyle, diet, and exercise recommendations.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
