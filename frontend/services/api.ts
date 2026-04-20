import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function loginUser(email: string, password: string) {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  const response = await api.post("/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
}

export async function getProfile() {
  const response = await api.get("/profile");
  return response.data;
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const response = await api.post("/register", payload);
  return response.data;
}

export async function getPatients() {
  const response = await api.get("/patients");
  return response.data;
}

export async function addPatient(payload: Record<string, unknown>) {
  const response = await api.post("/patients", payload);
  return response.data;
}

export async function updatePatient(id: number, payload: Record<string, unknown>) {
  const response = await api.put(`/patients/${id}`, payload);
  return response.data;
}

export async function deletePatient(id: number) {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
}

export async function getDashboard() {
  const response = await api.get("/admin/dashboard");
  return response.data;
}

export async function detectAttack(identifier: string, suspicious: boolean) {
  const response = await api.post("/ghostnet/detect", { identifier, suspicious });
  return response.data;
}
