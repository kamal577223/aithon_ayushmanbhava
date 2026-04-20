"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, Zap, BarChart3, Home } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";

type RiskScoreData = {
  patientId: string;
  patientName: string;
  overallRisk: number;
  riskLevel: "Low" | "Medium" | "High";
  riskFactors: Array<{
    factor: string;
    score: number;
    severity: "Green" | "Yellow" | "Red";
  }>;
  trend: "Improving" | "Stable" | "Worsening";
  recommendations: string[];
};

export default function RiskScoresPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [riskScores, setRiskScores] = useState<RiskScoreData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Doctor") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    setTimeout(() => {
      setRiskScores([
        {
          patientId: "P001",
          patientName: "John Doe",
          overallRisk: 72,
          riskLevel: "High",
          trend: "Worsening",
          riskFactors: [
            { factor: "Blood Glucose Level", score: 85, severity: "Red" },
            { factor: "Blood Pressure", score: 68, severity: "Yellow" },
            { factor: "BMI", score: 72, severity: "Yellow" },
            { factor: "Medication Adherence", score: 45, severity: "Green" },
          ],
          recommendations: [
            "Increase medication dose",
            "Urgent lifestyle intervention",
            "Schedule immediate review",
          ],
        },
        {
          patientId: "P002",
          patientName: "Jane Smith",
          overallRisk: 38,
          riskLevel: "Low",
          trend: "Improving",
          riskFactors: [
            { factor: "Blood Glucose Level", score: 28, severity: "Green" },
            { factor: "Blood Pressure", score: 35, severity: "Green" },
            { factor: "BMI", score: 42, severity: "Yellow" },
            { factor: "Medication Adherence", score: 85, severity: "Green" },
          ],
          recommendations: [
            "Continue current treatment",
            "Encourage lifestyle maintenance",
            "Routine follow-up at 3 months",
          ],
        },
        {
          patientId: "P003",
          patientName: "Robert Johnson",
          overallRisk: 58,
          riskLevel: "Medium",
          trend: "Stable",
          riskFactors: [
            { factor: "Blood Glucose Level", score: 65, severity: "Yellow" },
            { factor: "Blood Pressure", score: 55, severity: "Yellow" },
            { factor: "BMI", score: 58, severity: "Yellow" },
            { factor: "Medication Adherence", score: 62, severity: "Yellow" },
          ],
          recommendations: [
            "Optimize treatment plan",
            "Increase physical activity",
            "Follow-up in 6 weeks",
          ],
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
          className="glass-panel p-6 text-white bg-gradient-to-r from-cyan-600 to-blue-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Patient Risk Scores</h1>
          <p className="mt-2 text-cyan-100">Monitor treatment risk levels and track health trends during treatment.</p>
        </motion.div>

        {/* Risk Summary */}
        <motion.div
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="mb-4 text-lg font-bold text-slate-800">Risk Score Distribution</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <p className="text-sm font-semibold text-slate-600">Low Risk Patients</p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {riskScores.filter((r) => r.riskLevel === "Low").length}
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
              <p className="text-sm font-semibold text-slate-600">Medium Risk Patients</p>
              <p className="mt-2 text-3xl font-bold text-amber-600">
                {riskScores.filter((r) => r.riskLevel === "Medium").length}
              </p>
            </div>
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <p className="text-sm font-semibold text-slate-600">High Risk Patients</p>
              <p className="mt-2 text-3xl font-bold text-red-600">
                {riskScores.filter((r) => r.riskLevel === "High").length}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Risk Scores List */}
        <div className="space-y-4">
          {riskScores.map((score, idx) => (
            <motion.div
              key={score.patientId}
              className="glass-panel p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Patient Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{score.patientName}</h3>
                  <p className="text-sm text-slate-600">Patient ID: {score.patientId}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-slate-800">{score.overallRisk}</div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      score.riskLevel === "Low"
                        ? "bg-green-100 text-green-700"
                        : score.riskLevel === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {score.riskLevel}
                  </span>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="mb-4 space-y-2">
                <p className="text-sm font-semibold text-slate-700">Risk Factors</p>
                {score.riskFactors.map((factor, fidx) => (
                  <div key={fidx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          factor.severity === "Green"
                            ? "bg-green-500"
                            : factor.severity === "Yellow"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm text-slate-700">{factor.factor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-slate-200">
                        <div
                          className={`h-1.5 rounded-full ${
                            factor.severity === "Green"
                              ? "bg-green-500"
                              : factor.severity === "Yellow"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${factor.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 w-8 text-right">{factor.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trend */}
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp
                  size={16}
                  className={
                    score.trend === "Improving"
                      ? "text-green-600"
                      : score.trend === "Stable"
                        ? "text-slate-600"
                        : "text-red-600"
                  }
                />
                <span
                  className={`text-sm font-semibold ${
                    score.trend === "Improving"
                      ? "text-green-700"
                      : score.trend === "Stable"
                        ? "text-slate-700"
                        : "text-red-700"
                  }`}
                >
                  {score.trend}
                </span>
              </div>

              {/* Recommendations */}
              <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
                <p className="mb-2 text-xs font-semibold text-slate-600">Action Items</p>
                <ul className="space-y-1">
                  {score.recommendations.map((rec, ridx) => (
                    <li key={ridx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="mt-0.5 inline-block h-1 w-1 rounded-full bg-blue-600" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <Button size="sm" variant="outline" className="w-full">
                  View Detailed Analysis
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
