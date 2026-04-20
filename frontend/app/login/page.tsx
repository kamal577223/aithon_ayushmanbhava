"use client";

import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { getProfile, loginUser } from "@/services/api";
import { clearToken, setToken, setUserRole } from "@/services/auth";
import { Activity, LockKeyhole, Mail, ShieldCheck, Stethoscope, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PortalRole = "Patient" | "Doctor" | "Admin";

const roleMeta: Record<PortalRole, { subtitle: string; redirect: string }> = {
  Patient: { subtitle: "Access your health profile and records.", redirect: "/patient" },
  Doctor: { subtitle: "Manage patient care and treatment flow.", redirect: "/doctor" },
  Admin: { subtitle: "Track system metrics and security alerts.", redirect: "/admin" },
};

const roleIcon = { Patient: UserRound, Doctor: Stethoscope, Admin: ShieldCheck };

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<PortalRole>("Patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const SelectedRoleIcon = roleIcon[selectedRole];

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(email, password);
      setToken(data.access_token);
      const profile = await getProfile();
      if (profile.role !== selectedRole) {
        clearToken();
        setError(`This account is not authorized for the ${selectedRole} portal.`);
        return;
      }
      setUserRole(profile.role);
      router.push(roleMeta[selectedRole].redirect);
    } catch {
      setError("Login failed. Please check email and password.");
      clearToken();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-[1fr_420px]">
      <motion.article
        className="glass-panel space-y-4 p-6"
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          Secure Role-Based Access
        </p>
        <h2 className="text-3xl font-bold text-slate-800">Choose your portal and sign in</h2>
        <p className="text-slate-600">
          Separate login channels for Patients, Doctors, and Admins. GhostNet monitors all
          suspicious login attempts in real-time.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {(Object.keys(roleMeta) as PortalRole[]).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                selectedRole === role
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                {role === "Patient" ? <UserRound size={14} /> : null}
                {role === "Doctor" ? <Stethoscope size={14} /> : null}
                {role === "Admin" ? <ShieldCheck size={14} /> : null}
                <p className="font-semibold">{role}</p>
              </div>
              <p className="mt-1 text-xs">{roleMeta[role].subtitle}</p>
            </button>
          ))}
        </div>
      </motion.article>

      <motion.div
        className="gradient-ring"
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="glass-panel space-y-4 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              {selectedRole} Portal
            </p>
            <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
              <SelectedRoleIcon size={20} />
              Login
            </h3>
          </div>
          <form className="space-y-3" onSubmit={onSubmit}>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-3.5 text-slate-400" />
              <Input
                className="pl-9"
                type="email"
                placeholder={`${selectedRole.toLowerCase()}@ayushman.local`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <LockKeyhole size={15} className="absolute left-3 top-3.5 text-slate-400" />
              <Input
                className="pl-9"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button className="w-full" size="lg" type="submit" disabled={loading}>
              <Activity size={16} className="mr-2" />
              {loading ? "Signing in..." : `Login as ${selectedRole}`}
            </Button>
          </form>
          <p className="text-xs text-slate-500">
            Demo password for seeded accounts: <span className="font-semibold">Admin@123</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
