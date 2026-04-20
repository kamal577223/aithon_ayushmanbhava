"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, UserPlus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import { addPatient, deletePatient, getPatients } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Patient = {
  id: number;
  user_id: number;
  age: number;
  gender: string;
  medical_history: string;
  diagnosis: string;
  prescriptions: string;
};

export default function PatientPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [userId, setUserId] = useState("1");
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("Male");

  const loadPatients = () => getPatients().then(setPatients).catch(() => setPatients([]));

  useEffect(() => {
    loadPatients();
  }, []);

  const createPatient = async () => {
    await addPatient({
      user_id: Number(userId),
      age: Number(age),
      gender,
      medical_history: "",
      diagnosis: "",
      prescriptions: "",
    });
    await loadPatients();
  };

  const removePatient = async (id: number) => {
    await deletePatient(id);
    await loadPatients();
  };

  return (
    <div className="grid gap-4 md:grid-cols-[240px_1fr]">
      <Sidebar />
      <div className="space-y-4">
        <div className="glass-panel p-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
            <UserPlus size={18} className="text-blue-600" />
            Patient Management
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Create and manage patient profiles with secure healthcare records access.
          </p>
        </div>
        <motion.div
          className="glass-panel grid gap-3 p-4 sm:grid-cols-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
          <Input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
          <Input value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
          <Button onClick={createPatient}>
            <Plus size={16} className="mr-2" />
            Add Patient
          </Button>
        </motion.div>
        <Table rows={patients} />
        <div className="flex flex-wrap gap-2">
          {patients.map((p) => (
            <Button key={p.id} onClick={() => removePatient(p.id)} variant="danger" size="sm">
              <Trash2 size={14} className="mr-2" />
              Delete #{p.id}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
