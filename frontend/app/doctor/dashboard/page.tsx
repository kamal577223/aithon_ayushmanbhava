"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck2,
  HeartPulse,
  Microscope,
  Stethoscope,
  Users,
  TrendingUp,
  AlertCircle,
  Brain,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";

type DoctorMetric = {
  label: string;
  value: number | string;
  icon: React.ElementType;
  tone: "blue" | "green" | "rose" | "amber" | "cyan";
};

export default function DoctorDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DoctorMetric[]>([]);
  const [recentPatients, setRecentPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Doctor") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    setTimeout(() => {
      setMetrics([
        { label: "Appointments Today", value: 14, icon: CalendarCheck2, tone: "blue" },
        { label: "Critical Cases", value: 3, icon: HeartPulse, tone: "rose" },
        { label: "Diagnostics Pending", value: 7, icon: Microscope, tone: "amber" },
        { label: "Risk Assessments", value: 5, icon: TrendingUp, tone: "cyan" },
      ]);

      setRecentPatients([
        {
          id: 1,
          name: "John Doe",
          lastVisit: "2024-01-14",
          condition: "Type 2 Diabetes",
          riskLevel: "Medium",
          status: "Stable",
        },
        {
          id: 2,
          name: "Jane Smith",
          lastVisit: "2024-01-13",
          condition: "Hypertension",
          riskLevel: "Low",
          status: "Stable",
        },
        {
          id: 3,
          name: "Robert Johnson",
          lastVisit: "2024-01-12",
          condition: "High Cholesterol",
          riskLevel: "Medium",
          status: "Needs Adjustment",
        },
      ]);

      setLoading(false);
    }, 1000);
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
          className="glass-panel p-6 text-white bg-gradient-to-r from-blue-600 to-cyan-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="mt-2 text-blue-100">
            Clinical decision support, patient diagnosis, and treatment planning tools.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card title={metric.label} icon={metric.icon} tone={metric.tone}>
                {metric.value}
              </Card>
            </motion.div>
          ))}
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
            onClick={() => router.push("/doctor/diagnosis")}
          >
            <Stethoscope size={20} />
            <span className="text-xs text-center">Patient Diagnosis</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => router.push("/doctor/treatment")}
          >
            <HeartPulse size={20} />
            <span className="text-xs text-center">Treatment Plan</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => router.push("/doctor/risk-scores")}
          >
            <TrendingUp size={20} />
            <span className="text-xs text-center">Risk Scores</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => router.push("/doctor/cdss")}
          >
            <Brain size={20} />
            <span className="text-xs text-center">CDSS</span>
          </Button>
        </motion.div>

        {/* Recent Patients */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              <h2 className="text-xl font-bold text-slate-800">Recent Patients</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/doctor/records")}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentPatients.map((patient, idx) => (
              <motion.div
                key={patient.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-blue-50 transition cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => router.push(`/doctor/diagnosis?patientId=${patient.id}`)}
              >
                <div>
                  <p className="font-semibold text-slate-800">{patient.name}</p>
                  <p className="text-sm text-slate-600">{patient.condition}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      patient.riskLevel === "Low"
                        ? "bg-green-100 text-green-700"
                        : patient.riskLevel === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {patient.riskLevel}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Clinical Alerts */}
        <motion.section
          className="glass-panel p-6 border-l-4 border-amber-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="text-amber-600" size={20} />
            <h2 className="text-lg font-bold text-slate-800">Clinical Alerts</h2>
          </div>
          <div className="space-y-2">
            {[
              "Patient #102: High glucose reading detected - requires review",
              "Patient #156: Medication adjustment recommended",
              "Patient #203: Lab results available for review",
            ].map((alert, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-slate-700 bg-amber-50 p-2 rounded">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
                {alert}
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
