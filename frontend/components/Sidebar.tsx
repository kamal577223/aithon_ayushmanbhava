"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ShieldAlert,
  Stethoscope,
  LogOut,
  AlertCircle,
  Heart,
  Pill,
  BarChart3,
  Users,
  TrendingUp,
  MessageSquare,
  FileText,
  AlertTriangle,
  Settings,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { clearToken, clearAuth } from "@/services/auth";
import { getUserRole, getFeaturesByRole, UserRole } from "@/lib/role-config";

// Use a simple component for Brain icon since it might not exist in lucide-react
const Brain = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
    <path d="M12 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
    <path d="M15 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
    <path d="M9 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
  </svg>
);

const roleIcons: Record<string, React.ElementType> = {
  dashboard: LayoutDashboard,
  prediction: AlertCircle,
  medicines: Pill,
  "health-tips": Heart,
  alerts: AlertTriangle,
  records: FileText,
  profile: User,
  diagnosis: Stethoscope,
  treatment: Heart,
  "risk-scores": TrendingUp,
  cdss: Brain,
  messages: MessageSquare,
  population: BarChart3,
  fraud: ShieldAlert,
  hotspot: AlertTriangle,
  reports: FileText,
  monitoring: Activity,
  settings: Settings,
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  const features = userRole ? getFeaturesByRole(userRole) : [];

  const handleLogout = () => {
    clearToken();
    clearAuth();
    router.push("/login");
  };

  if (!userRole) {
    return null;
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : 260 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="glass-panel sticky top-0 h-screen overflow-y-auto p-4"
    >
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Portal Name */}
      {!collapsed && (
        <div className="mb-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-3">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">
            {userRole === "Patient" && "Patient Portal"}
            {userRole === "Doctor" && "Doctor Portal"}
            {userRole === "Admin" && "Admin Portal"}
          </p>
        </div>
      )}

      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {collapsed ? "Menu" : "Navigation"}
      </p>

      <ul className="space-y-2">
        {features.map((feature) => {
          const IconComponent = roleIcons[feature.id] || LayoutDashboard;
          const isActive = pathname === feature.path || pathname.startsWith(feature.path);

          return (
            <li key={feature.id}>
              <Link
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-700"
                }`}
                href={feature.path}
              >
                <IconComponent size={16} />
                {!collapsed ? <span>{feature.label}</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        className="mt-8 flex w-full items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <LogOut size={16} />
        {!collapsed ? "Logout" : null}
      </motion.button>
    </motion.aside>
  );
}
