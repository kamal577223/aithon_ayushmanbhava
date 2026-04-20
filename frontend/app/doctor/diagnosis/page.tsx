"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, Search, TrendingUp, AlertTriangle, CheckCircle2, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PatientDiagnosis = {
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  medicalHistory: string;
  symptoms: string[];
  suggestedDiagnosis: string[];
  confidence: number;
  recommendations: string[];
};

export default function DiagnosisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [patientId, setPatientId] = useState(searchParams.get("patientId") || "");
  const [diagnosis, setDiagnosis] = useState<PatientDiagnosis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Doctor") {
      router.push("/login");
      return;
    }
    setUserRole(role);
  }, [router]);

  const handleSearch = async () => {
    if (!patientId) {
      setError("Please enter a patient ID");
      return;
    }
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setDiagnosis({
        patientId,
        patientName: "John Doe",
        age: 45,
        gender: "Male",
        medicalHistory: "Type 2 Diabetes, Hypertension, High Cholesterol",
        symptoms: ["Frequent urination", "Fatigue", "Blurred vision", "Slow healing"],
        suggestedDiagnosis: [
          "Uncontrolled Diabetes (85% confidence)",
          "Diabetic Neuropathy (72% confidence)",
          "Hyperglycemic Hyperosmolar State (45% confidence)",
        ],
        confidence: 0.85,
        recommendations: [
          "Increase metformin dosage",
          "Order HbA1c and fasting glucose tests",
          "Refer to endocrinologist",
          "Implement strict diet control",
        ],
      });
      setLoading(false);
    }, 1200);
  };

  if (!userRole) return null;

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
          <h1 className="text-3xl font-bold">Patient Diagnosis</h1>
          <p className="mt-2 text-blue-100">Enter patient ID to retrieve medical history and diagnosis suggestions.</p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="mb-3 text-sm font-semibold text-slate-700">Search Patient by ID</p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={loading}>
              <Search size={16} className="mr-2" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </motion.div>

        {/* Diagnosis Results */}
        {diagnosis && (
          <>
            {/* Patient Info */}
            <motion.section
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="mb-4 text-xl font-bold text-slate-800">Patient Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-600">Name</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">{diagnosis.patientName}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-600">Age & Gender</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">
                    {diagnosis.age} years, {diagnosis.gender}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 md:col-span-2">
                  <p className="text-sm font-semibold text-slate-600">Medical History</p>
                  <p className="mt-1 text-sm text-slate-700">{diagnosis.medicalHistory}</p>
                </div>
              </div>
            </motion.section>

            {/* Symptoms */}
            <motion.section
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="mb-3 text-lg font-bold text-slate-800">Current Symptoms</h2>
              <div className="flex flex-wrap gap-2">
                {diagnosis.symptoms.map((symptom, idx) => (
                  <span
                    key={idx}
                    className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Suggested Diagnosis */}
            <motion.section
              className="glass-panel p-6 border-l-4 border-green-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="text-green-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">Suggested Diagnosis</h2>
              </div>
              <div className="space-y-2">
                {diagnosis.suggestedDiagnosis.map((diag, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-lg bg-green-50 p-3 border border-green-200">
                    <CheckCircle2 className="mt-0.5 text-green-600" size={18} />
                    <span className="text-sm font-medium text-slate-700">{diag}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Recommendations */}
            <motion.section
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">Clinical Recommendations</h2>
              </div>
              <div className="space-y-2">
                {diagnosis.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-lg bg-blue-50 p-3 border border-blue-200">
                    <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-sm text-slate-700">{rec}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => router.push(`/doctor/treatment?patientId=${patientId}`)}
              >
                <Plus size={16} className="mr-2" />
                Create Treatment Plan
              </Button>
              <Button variant="outline">Generate Report</Button>
              <Button variant="outline">Schedule Follow-up</Button>
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {!diagnosis && !loading && (
          <motion.div
            className="glass-panel p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Stethoscope className="mx-auto mb-3 text-slate-400" size={32} />
            <p className="text-slate-600">Enter a patient ID above to view diagnosis suggestions</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
