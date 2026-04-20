"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Apple, Activity, Zap, TrendingUp, Target } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/role-config";
import { Button } from "@/components/ui/button";

type HealthTip = {
  id: number;
  category: "Lifestyle" | "Diet" | "Exercise" | "Prevention";
  title: string;
  description: string;
  benefit: string;
  duration: string;
};

export default function HealthRecommendationPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [tips, setTips] = useState<HealthTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "Patient") {
      router.push("/login");
      return;
    }
    setUserRole(role);

    setTimeout(() => {
      setTips([
        {
          id: 1,
          category: "Exercise",
          title: "Morning Jog or Brisk Walk",
          description: "Start your day with 30 minutes of moderate cardio exercise",
          benefit: "Improves cardiovascular health and blood glucose control",
          duration: "30 minutes daily",
        },
        {
          id: 2,
          category: "Diet",
          title: "Reduce Sugar and Refined Carbs",
          description: "Replace white bread and sugary drinks with whole grains and water",
          benefit: "Better blood glucose management and weight control",
          duration: "Ongoing lifestyle change",
        },
        {
          id: 3,
          category: "Lifestyle",
          title: "Stress Management Through Meditation",
          description: "Practice 10 minutes of mindfulness meditation daily",
          benefit: "Reduces cortisol levels and improves mental health",
          duration: "10 minutes daily",
        },
        {
          id: 4,
          category: "Diet",
          title: "Increase Fiber Intake",
          description: "Eat vegetables, fruits, and whole grains rich in fiber",
          benefit: "Improves digestion and blood sugar levels",
          duration: "30g daily",
        },
        {
          id: 5,
          category: "Exercise",
          title: "Strength Training",
          description: "Perform weight training or resistance exercises 3x per week",
          benefit: "Builds muscle mass and improves metabolism",
          duration: "45 minutes, 3x weekly",
        },
        {
          id: 6,
          category: "Prevention",
          title: "Regular Health Checkups",
          description: "Schedule comprehensive health screening every 6 months",
          benefit: "Early detection of health issues",
          duration: "Quarterly or as needed",
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

  const categoryIcons: Record<string, React.ElementType> = {
    Lifestyle: Heart,
    Diet: Apple,
    Exercise: Activity,
    Prevention: Target,
  };

  const categoryColors: Record<string, string> = {
    Lifestyle: "from-pink-600 to-rose-600",
    Diet: "from-green-600 to-emerald-600",
    Exercise: "from-blue-600 to-cyan-600",
    Prevention: "from-purple-600 to-indigo-600",
  };

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="space-y-6 p-6">
        {/* Header */}
        <motion.div
          className="glass-panel p-6 text-white bg-gradient-to-r from-cyan-600 to-blue-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Health Recommendations</h1>
          <p className="mt-2 text-cyan-100">
            Personalized lifestyle, diet, and exercise recommendations for better health outcomes.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div className="glass-panel p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-slate-600">Total Recommendations</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{tips.length}</p>
          </motion.div>
          <motion.div
            className="glass-panel p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm font-semibold text-slate-600">Compliance Rate</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">78%</p>
          </motion.div>
          <motion.div
            className="glass-panel p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm font-semibold text-slate-600">Health Score Gained</p>
            <p className="mt-2 text-3xl font-bold text-green-600">+12 pts</p>
          </motion.div>
          <motion.div
            className="glass-panel p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm font-semibold text-slate-600">Days Consistent</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">34 days</p>
          </motion.div>
        </div>

        {/* Filter by Category */}
        <motion.div
          className="glass-panel p-4 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm font-semibold text-slate-600">Filter by Category</p>
          <div className="flex flex-wrap gap-2">
            {["All", "Lifestyle", "Diet", "Exercise", "Prevention"].map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={cat === "All" ? "default" : "outline"}
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Health Tips Grid */}
        <div className="grid gap-4 lg:grid-cols-2">
          {tips.map((tip, idx) => {
            const IconComponent = categoryIcons[tip.category];
            const colors = categoryColors[tip.category];

            return (
              <motion.div
                key={tip.id}
                className="glass-panel overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`h-2 bg-gradient-to-r ${colors}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-lg p-3 text-white bg-gradient-to-r ${colors}`}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{tip.title}</h3>
                        <p className="mt-0.5 text-xs font-semibold text-slate-500">{tip.category}</p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-700">{tip.description}</p>

                  <div className="mt-4 space-y-2">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs font-semibold text-slate-600">Benefit</p>
                      <p className="mt-1 text-sm text-slate-700">{tip.benefit}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs font-semibold text-slate-600">Duration</p>
                      <p className="mt-1 text-sm text-slate-700">{tip.duration}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1">
                      <TrendingUp size={14} className="mr-1" />
                      Start Tracking
                    </Button>
                    <Button size="sm" variant="outline">
                      More Info
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Weekly Goals */}
        <motion.section
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-amber-600" size={20} />
            <h2 className="text-xl font-bold text-slate-800">This Week's Goals</h2>
          </div>
          <div className="space-y-3">
            {[
              { icon: "🏃", goal: "Complete 5 workouts", progress: 3 },
              { icon: "🥗", goal: "Maintain healthy diet", progress: 4 },
              { icon: "💧", goal: "Drink 8 glasses of water daily", progress: 20 },
              { icon: "😴", goal: "Get 7+ hours of sleep", progress: 5 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-sm font-medium text-slate-700">{item.goal}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-20 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      style={{ width: `${(item.progress / (item.goal.includes("daily") ? 8 : 7)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{item.progress}/7</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
