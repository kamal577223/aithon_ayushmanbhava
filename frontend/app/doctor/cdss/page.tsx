"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Lightbulb, CheckCircle2, AlertTriangle, BookOpen, ThumbsUp } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CDSSRecommendation = {
  title: string;
  description: string;
  confidence: number;
  evidence: string[];
  actionItems: string[];
  riskLevel: "Low" | "Moderate" | "High";
};

export default function CDSSPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState("");
  const [recommendations, setRecommendations] = useState<CDSSRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Doctor") {
      router.push("/login");
      return;
    }
    setUserRole(role);
  }, [router]);

  const handleAnalyze = async () => {
    if (!symptoms) return;
    setLoading(true);

    setTimeout(() => {
      setRecommendations([
        {
          title: "Diabetes Screening Recommended",
          description:
            "Based on symptoms and patient profile, comprehensive diabetes screening is advised.",
          confidence: 0.89,
          evidence: [
            "Frequent urination reported",
            "Fatigue and tiredness",
            "Blurred vision",
            "Family history of diabetes",
          ],
          actionItems: [
            "Order HbA1c test",
            "Perform fasting glucose test",
            "Calculate HOMA-IR index",
            "Assess kidney function",
          ],
          riskLevel: "High",
        },
        {
          title: "Cardiovascular Risk Assessment",
          description: "Evaluate cardiovascular risk given presenting symptoms and medical history.",
          confidence: 0.76,
          evidence: [
            "Age over 40 years",
            "Family history of heart disease",
            "Elevated blood pressure",
            "Obesity indicators",
          ],
          actionItems: [
            "Order ECG",
            "Calculate Framingham risk score",
            "Check lipid panel",
            "Consider stress test if abnormalities found",
          ],
          riskLevel: "Moderate",
        },
        {
          title: "Thyroid Disorder Screening",
          description: "Fatigue and weight changes warrant thyroid function evaluation.",
          confidence: 0.62,
          evidence: [
            "Unexplained fatigue",
            "Recent weight changes",
            "Temperature sensitivity",
          ],
          actionItems: [
            "Order TSH test",
            "Check free T3 and T4 levels",
            "Assess anti-TPO antibodies if needed",
          ],
          riskLevel: "Low",
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  if (!userRole) return null;

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="space-y-6 p-6">
        {/* Header */}
        <motion.div
          className="glass-panel p-6 text-white bg-gradient-to-r from-purple-600 to-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <Brain size={28} />
            <h1 className="text-3xl font-bold">Clinical Decision Support System</h1>
          </div>
          <p className="mt-2 text-purple-100">AI-driven recommendations based on clinical guidelines and evidence.</p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="mb-3 text-sm font-semibold text-slate-700">Patient Symptoms & Chief Complaint</p>
          <textarea
            className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none"
            rows={3}
            placeholder="Enter patient symptoms, vital signs, and chief complaint..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <Button onClick={handleAnalyze} disabled={loading} className="mt-3 w-full">
            <Brain size={16} className="mr-2" />
            {loading ? "Analyzing..." : "Get AI Recommendations"}
          </Button>
        </motion.div>

        {/* Guidelines Reference */}
        <motion.div
          className="glass-panel p-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen size={16} />
            Diabetes Guidelines
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen size={16} />
            Cardiovascular Guidelines
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen size={16} />
            Treatment Protocols
          </Button>
        </motion.div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm font-semibold text-slate-700">AI-Generated Recommendations</p>
            {recommendations.map((rec, idx) => (
              <motion.div
                key={idx}
                className="glass-panel p-6 border-l-4 border-purple-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 text-yellow-600" size={20} />
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{rec.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{rec.description}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                      rec.riskLevel === "Low"
                        ? "bg-green-100 text-green-700"
                        : rec.riskLevel === "Moderate"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {rec.riskLevel} Risk
                  </span>
                </div>

                {/* Confidence Score */}
                <div className="mb-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-600">AI Confidence</p>
                    <span className="text-xs font-bold text-slate-700">{Math.round(rec.confidence * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                      style={{ width: `${rec.confidence * 100}%` }}
                    />
                  </div>
                </div>

                {/* Evidence */}
                <div className="mb-4 space-y-2">
                  <p className="text-sm font-semibold text-slate-700">Supporting Evidence</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.evidence.map((evidence, eidx) => (
                      <span
                        key={eidx}
                        className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700"
                      >
                        {evidence}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-700">Recommended Actions</p>
                  <div className="space-y-1">
                    {rec.actionItems.map((action, aidx) => (
                      <div key={aidx} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 text-purple-600" size={16} />
                        <span className="text-sm text-slate-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Approval Buttons */}
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1">
                    <ThumbsUp size={14} className="mr-1" />
                    Approve Recommendation
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {recommendations.length === 0 && !loading && (
          <motion.div
            className="glass-panel p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Brain className="mx-auto mb-3 text-slate-400" size={32} />
            <p className="text-slate-600">Enter patient symptoms to receive AI-powered clinical recommendations</p>
          </motion.div>
        )}

        {/* Information Panel */}
        <motion.div
          className="glass-panel p-4 bg-blue-50 border border-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs font-semibold text-blue-700 mb-2">ℹ️ Clinical Decision Support Notice</p>
          <p className="text-xs text-blue-600 leading-relaxed">
            CDSS recommendations are generated based on clinical guidelines and patient data. Final clinical decisions
            should be made by the treating physician after careful evaluation of all available clinical information.
            These recommendations do not replace professional medical judgment.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
