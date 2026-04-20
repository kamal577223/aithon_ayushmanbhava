"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pill, Clock, AlertCircle, CheckCircle2, Bell } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";

type Medicine = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  reason: string;
  sideEffects: string[];
  reminders: string[];
};

export default function MedicineRecommendationPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Patient") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    setTimeout(() => {
      setMedicines([
        {
          id: 1,
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily (Morning & Evening)",
          startDate: "2024-01-01",
          endDate: "Ongoing",
          reason: "Diabetes Management",
          sideEffects: ["Mild nausea", "Digestive issues"],
          reminders: ["08:00 AM", "08:00 PM"],
        },
        {
          id: 2,
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily (Morning)",
          startDate: "2024-01-01",
          endDate: "Ongoing",
          reason: "Blood Pressure Control",
          sideEffects: ["Dry cough", "Dizziness"],
          reminders: ["09:00 AM"],
        },
        {
          id: 3,
          name: "Atorvastatin",
          dosage: "20mg",
          frequency: "Once daily (Evening)",
          startDate: "2024-01-05",
          endDate: "2024-04-05",
          reason: "Cholesterol Management",
          sideEffects: ["Muscle pain"],
          reminders: ["08:30 PM"],
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
          className="glass-panel p-6 text-white bg-gradient-to-r from-green-600 to-emerald-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Medicine Recommendations</h1>
          <p className="mt-2 text-green-100">
            Your current prescribed medications with dosage and reminder schedules.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <motion.div className="glass-panel p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-slate-600">Active Medications</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{medicines.length}</p>
          </motion.div>
          <motion.div
            className="glass-panel p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm font-semibold text-slate-600">Daily Reminders</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {medicines.reduce((acc, m) => acc + m.reminders.length, 0)}
            </p>
          </motion.div>
          <motion.div
            className="glass-panel p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm font-semibold text-slate-600">Adherence Rate</p>
            <p className="mt-2 text-3xl font-bold text-green-600">92%</p>
          </motion.div>
        </div>

        {/* Medicines List */}
        <div className="space-y-4">
          {medicines.map((medicine, idx) => (
            <motion.div
              key={medicine.id}
              className="glass-panel p-6 border-l-4 border-green-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Pill className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{medicine.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{medicine.reason}</p>
                  </div>
                </div>
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Active
                </span>
              </div>

              {/* Dosage and Frequency */}
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-600">Dosage</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">{medicine.dosage}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-600">Frequency</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{medicine.frequency}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-600">Duration</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {medicine.endDate === "Ongoing" ? "Ongoing" : `Until ${medicine.endDate}`}
                  </p>
                </div>
              </div>

              {/* Reminder Times */}
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Clock size={16} />
                  Reminder Times
                </p>
                <div className="flex flex-wrap gap-2">
                  {medicine.reminders.map((reminder, ridx) => (
                    <span
                      key={ridx}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      <Bell size={14} />
                      {reminder}
                    </span>
                  ))}
                </div>
              </div>

              {/* Side Effects */}
              {medicine.sideEffects.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <AlertCircle size={16} className="text-amber-600" />
                    Possible Side Effects
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {medicine.sideEffects.map((effect, eidx) => (
                      <span key={eidx} className="rounded-lg bg-amber-100 px-3 py-1 text-xs text-amber-700">
                        {effect}
                      </span>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">
                  <CheckCircle2 size={14} className="mr-1" />
                  Mark as Taken
                </Button>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Adherence Tips */}
        <motion.section
          className="glass-panel p-6 bg-gradient-to-r from-green-50 to-emerald-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-800">
            <CheckCircle2 className="text-green-600" size={20} />
            Tips for Better Medication Adherence
          </h2>
          <ul className="space-y-2">
            {[
              "Set daily reminders at the same time each day",
              "Use a pill organizer to track your medication intake",
              "Take medications with food if they upset your stomach",
              "Keep medications in a visible place as a reminder",
              "Never skip doses without consulting your doctor",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-green-600" />
                {tip}
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
