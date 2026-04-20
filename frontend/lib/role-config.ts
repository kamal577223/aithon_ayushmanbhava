export type UserRole = "Patient" | "Doctor" | "Admin";

export function getUserRole(): UserRole | null {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem("user_role") as UserRole) || null;
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_role");
}

export const roleConfig: Record<
  UserRole,
  {
    displayName: string;
    basePath: string;
    dashboardPath: string;
    icon: string;
  }
> = {
  Patient: {
    displayName: "Patient Portal",
    basePath: "/patient",
    dashboardPath: "/patient/dashboard",
    icon: "👤",
  },
  Doctor: {
    displayName: "Doctor Portal",
    basePath: "/doctor",
    dashboardPath: "/doctor/dashboard",
    icon: "🏥",
  },
  Admin: {
    displayName: "Admin Portal",
    basePath: "/admin",
    dashboardPath: "/admin/dashboard",
    icon: "🛡️",
  },
};

export const patientFeatures = [
  { id: "dashboard", label: "Dashboard", path: "/patient/dashboard" },
  { id: "prediction", label: "Disease Prediction", path: "/patient/prediction" },
  { id: "medicines", label: "Medicine Recommendation", path: "/patient/medicines" },
  { id: "health-tips", label: "Health Recommendation", path: "/patient/health-tips" },
  { id: "alerts", label: "Alerts", path: "/patient/alerts" },
  { id: "records", label: "Medical Records", path: "/patient/records" },
  { id: "profile", label: "Profile", path: "/patient/profile" },
];

export const doctorFeatures = [
  { id: "dashboard", label: "Dashboard", path: "/doctor/dashboard" },
  { id: "diagnosis", label: "Patient Diagnosis", path: "/doctor/diagnosis" },
  { id: "treatment", label: "Treatment Recommendation", path: "/doctor/treatment" },
  { id: "risk-scores", label: "Risk Scores", path: "/doctor/risk-scores" },
  { id: "cdss", label: "Clinical Decision Support", path: "/doctor/cdss" },
  { id: "records", label: "Patient Records", path: "/doctor/records" },
  { id: "messages", label: "Messages", path: "/doctor/messages" },
  { id: "profile", label: "Profile", path: "/doctor/profile" },
];

export const adminFeatures = [
  { id: "dashboard", label: "Dashboard", path: "/admin/dashboard" },
  { id: "population", label: "Population Health", path: "/admin/population" },
  { id: "fraud", label: "Fraud Detection", path: "/admin/fraud" },
  { id: "hotspot", label: "Disease Hotspot Prediction", path: "/admin/hotspot" },
  { id: "reports", label: "Reports", path: "/admin/reports" },
  { id: "monitoring", label: "System Monitoring", path: "/admin/monitoring" },
  { id: "settings", label: "Settings", path: "/admin/settings" },
  { id: "profile", label: "Profile", path: "/admin/profile" },
];

export function getFeaturesByRole(role: UserRole) {
  switch (role) {
    case "Patient":
      return patientFeatures;
    case "Doctor":
      return doctorFeatures;
    case "Admin":
      return adminFeatures;
    default:
      return [];
  }
}
