"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Pill, Calendar, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TreatmentPlan = {
  patientId: string;
  patientName: string;
  condition: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    purpose: string;
  }>;
  lifestyle: string[];
  monitoring: string[];
  followUp: string;
};

export default function TreatmentRecommendationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [patientId, setPatientId] = useState(searchParams.get("patientId") || "");
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Doctor") {
      router.push("/login");
      return;
    }
    setUserRole(role);
  }, [router]);

  const handleGeneratePlan = async () => {
    if (!patientId) return;
    setLoading(true);

    setTimeout(() => {
      setTreatmentPlan({
        patientId,
        patientName: "John Doe",
        condition: "Uncontrolled Type 2 Diabetes",
        medications: [
          {
            name: "Metformin",
            dosage: "1000mg",
            frequency: "Twice daily",
            duration: "Ongoing",
            purpose: "Blood glucose control",
          },
          {
            name: "Glipizide",
            dosage: "10mg",
            frequency: "Once daily before meals",
            duration: "8 weeks",
            purpose: "Enhanced glucose management",
          },
          {
            name: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
            duration: "Ongoing",
            purpose: "Blood pressure management",
          },
        ],
        lifestyle: [
          "Reduce caloric intake to 1800 kcal/day",
          "Increase physical activity to 150 min/week",
          "Eliminate sugary beverages and processed foods",
          "Maintain consistent meal times",
          "Aim for 8 hours of sleep nightly",
        ],
        monitoring: [
          "Blood glucose monitoring 2x daily",
          "HbA1c test every 3 months",
          "Blood pressure monitoring weekly",
          "Weight tracking monthly",
          "Kidney function tests quarterly",
        ],
        followUp: "4 weeks - Reassess glucose control and medication side effects",
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
          className="glass-panel p-6 text-white bg-gradient-to-r from-pink-600 to-rose-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Treatment Recommendations</h1>
          <p className="mt-2 text-pink-100">Create and manage comprehensive treatment plans for patients.</p>
        </motion.div>

        {/* Generate Plan */}
        <motion.div
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="mb-3 text-sm font-semibold text-slate-700">Patient ID</p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter patient ID to generate treatment plan"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <Button onClick={handleGeneratePlan} disabled={loading}>
              <Plus size={16} className="mr-2" />
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </motion.div>

        {/* Treatment Plan */}
        {treatmentPlan && (
          <>
            {/* Patient & Condition */}
            <motion.section
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-600">Patient</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">{treatmentPlan.patientName}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-600">Condition</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">{treatmentPlan.condition}</p>
                </div>
              </div>
            </motion.section>

            {/* Medications */}
            <motion.section
              className="glass-panel p-6 border-l-4 border-green-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Pill className="text-green-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">Prescribed Medications</h2>
              </div>
              <div className="space-y-3">
                {treatmentPlan.medications.map((med, idx) => (
                  <div key={idx} className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{med.name}</p>
                        <p className="text-sm text-slate-600">{med.purpose}</p>
                      </div>
                      <CheckCircle2 className="text-green-600" size={20} />
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Dosage</p>
                        <p className="text-sm font-medium text-slate-800">{med.dosage}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Frequency</p>
                        <p className="text-sm font-medium text-slate-800">{med.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Duration</p>
                        <p className="text-sm font-medium text-slate-800">{med.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Lifestyle Modifications */}
            <motion.section
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart className="text-rose-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">Lifestyle Modifications</h2>
              </div>
              <div className="space-y-2">
                {treatmentPlan.lifestyle.map((mod, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-lg bg-rose-50 p-3 border border-rose-200">
                    <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-rose-600" />
                    <span className="text-sm text-slate-700">{mod}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Monitoring Plan */}
            <motion.section
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-amber-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">Monitoring Plan</h2>
              </div>
              <div className="space-y-2">
                {treatmentPlan.monitoring.map((monitor, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-lg bg-amber-50 p-3 border border-amber-200">
                    <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-amber-600" />
                    <span className="text-sm text-slate-700">{monitor}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Follow-up */}
            <motion.section
              className="glass-panel p-6 bg-gradient-to-r from-blue-50 to-cyan-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-blue-600" size={20} />
                <p className="font-semibold text-slate-800">Follow-up Appointment</p>
              </div>
              <p className="mt-1 text-sm text-slate-700">{treatmentPlan.followUp}</p>
            </motion.section>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button>Save & Send to Patient</Button>
              <Button variant="outline">Generate PDF</Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
