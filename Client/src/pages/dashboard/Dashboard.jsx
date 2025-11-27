import React, { useEffect, useState } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Flame, Award, Star } from "lucide-react";
import { useDashboardData } from "@/apis/roadMaps/roadmap.services";
import axios from "axios";

export const Dashboard = () => {
  usePageTitle("Dashboard");

  // --- Static data ---
  const buddyImg = "/buddy.png"; // your buddy asset
  const user = {
    name: "Abdul Qasim",
    track: "Frontend Developer Track",
    level: 1, // default, will update with API
    xpToday: 20,
  };

  const stats = {
    xpTotal: 1220,
    xpGoal: 65,
    streak: 5,
    badges: ["UI Master", "Consistent Learner", "Quiz Pro"],
  };

  const moduleInfo = {
    title: "Module 3: React Essentials",
    nextLesson: "State Management Basics",
    progress: 45,
    lessons: 12,
    xp: 220,
    time: "2h 30m",
  };

  const activity = [
    { id: 1, text: "Completed Lesson: HTML Forms & Inputs", time: "2h ago" },
    { id: 2, text: "Earned Badge: UI Master", time: "Yesterday" },
    { id: 3, text: "Scored 8/10 on Quiz", time: "3 days ago" },
  ];

  // --- API data state ---
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/roadmaps/dashboard",
          { withCredentials: true }
        );

        console.log("Dashboard API Response:", res);

        // Axios already parses JSON, so use res.data
        const data = res.data;

        if (data.success && data.dashboardData) {
          setDashboardData(data.dashboardData);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  // --- Merge API data with static data ---
  const mergedModuleInfo = dashboardData?.continueLearning
    ? {
        title: dashboardData.continueLearning.moduleTitle,
        nextLesson: dashboardData.continueLearning.nextLesson?.title || "",
        progress: dashboardData.totalProgressRaw || moduleInfo.progress,
        lessons: moduleInfo.lessons,
        xp: dashboardData.continueLearning.totalXP || moduleInfo.xp,
        time: moduleInfo.time,
      }
    : moduleInfo;

  const mergedUser = {
    ...user,
    level: dashboardData?.level || user.level,
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* HERO SECTION */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {mergedUser.name}! 👋
          </h1>

          <div className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32">
              <img
                src={buddyImg}
                alt="Buddy"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-700">
                    Current Track
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{mergedUser.track}</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-700">
                    XP Earned Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">+{mergedUser.xpToday} XP</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-700">Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Level {mergedUser.level}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* MODULE BOX */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Continue Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-bold">{mergedModuleInfo.title}</h3>
            <p className="text-gray-600">
              Next Lesson: <strong>{mergedModuleInfo.nextLesson}</strong>
            </p>
            <Progress value={mergedModuleInfo.progress} />
            <p className="text-sm text-gray-500">
              {mergedModuleInfo.progress}% completed
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Lessons: {mergedModuleInfo.lessons}</span>
              <span>XP in module: {mergedModuleInfo.xp}</span>
              <span>Time: {mergedModuleInfo.time}</span>
            </div>
            <Button className="mt-2">Continue Lesson</Button>
          </CardContent>
        </Card>

        {/* XP / STREAK / BADGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" /> XP Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">{stats.xpTotal} XP Earned</p>
              <Progress value={stats.xpGoal} className="mt-3" />
              <p className="text-xs text-gray-500 mt-1">
                {stats.xpGoal}% of your monthly goal
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" /> Learning Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.streak} days 🔥</p>
              <p className="text-sm text-gray-600">
                Keep going! You're on fire.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" /> Badges Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {stats.badges.map((b, i) => (
                  <Badge key={i} variant="secondary">
                    {b}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RECENT ACTIVITY */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activity.map((item) => (
              <div key={item.id}>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{item.text}</p>
                  <Badge variant="secondary">{item.time}</Badge>
                </div>
                <Separator className="mt-3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
