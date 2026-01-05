import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import usePageTitle from "@/hooks/usePageTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Lock,
  Clock,
  Star,
  Target,
  Award,
  TrendingUp,
  Medal,
} from "lucide-react";
import { FetchLeaderBoard, FetchProgressAchievements } from "@/apiService/achievement";
import { GetUserEnrolledDomains } from "@/apiService/SkillTracking";
import { Badge } from "@/components/ui/badge";

const TABS = ["In Progress", "Completed", "Unlocked"];
const MAIN_TABS = ["My Achievements", "Leaderboard"];

const Achievements = () => {
  usePageTitle("Achievements");
  const [mainTab, setMainTab] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDomainId, setSelectedDomainId] = useState(null);

  const { data: enrolledDomains, isLoading: isEnrolledDomainsLoading } =
    GetUserEnrolledDomains();

  useEffect(() => {
    if (!selectedDomainId && enrolledDomains?.careerDomains?.length > 0) {
      setSelectedDomainId(enrolledDomains.careerDomains[0].id);
    }
  }, [enrolledDomains, selectedDomainId]);

  const { data, isLoading, error, refetch } = FetchProgressAchievements({
    careerDomain: selectedDomainId,
  });

  const { data: leaderboard, isLoading: isLeaderboardLoading } = FetchLeaderBoard({ 
    careerDomain: selectedDomainId 
  });

  useEffect(() => {
    if (selectedDomainId) refetch();
  }, [selectedDomainId, refetch]);

  const currentAchievements = () => {
    if (!data) return [];
    switch (activeTab) {
      case 0:
        return data.achievements.inProgress;
      case 1:
        return data.achievements.completed;
      case 2:
        return data.achievements.unlocked;
      default:
        return [];
    }
  };

  const achievementsToShow = currentAchievements();
  const progressPercentage = data
    ? Math.floor((data.userCompletedXP / data.totalDomainXP) * 100)
    : 0;

  // Process leaderboard data from API
  const leaderboardData = leaderboard?.topUsers?.map(user => ({
    rank: user.rank,
    name: user.username,
    xp: user.totalXP,
    userId: user.userId,
    level: user.level,
    avatar: user.username.split(' ').map(n => n[0]).join('').toUpperCase(),
    isUser: leaderboard?.yourRank?.userId === user.userId
  })) || [];

  const yourRankData = leaderboard?.yourRank;
  const totalUsers = leaderboard?.topUsers?.length || 0;

  return (
    <DashboardLayout>
      <div className="space-y-8 px-2 py-2 md:px-6 md:py-6">
        {/* MAIN NAVIGATION TABS */}
        <div className="border-b border-gray-200">
          <div className="flex gap-10">
            {MAIN_TABS.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setMainTab(index)}
                className={`pb-5 px-3 text-base font-semibold transition-all relative ${
                  mainTab === index
                    ? "text-[#F3B34E]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {mainTab === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F3B34E] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Domain Selection */}
        <div className="flex flex-wrap gap-3">
          {enrolledDomains?.careerDomains?.map((domain) => (
            <Button
              key={domain.id}
              variant="outline"
              size="sm"
              onClick={() => setSelectedDomainId(domain.id)}
              className={`rounded-full border-2 transition-all px-6 py-2 ${
                selectedDomainId === domain.id
                  ? "bg-[#F3B34E] text-white border-[#F3B34E] hover:bg-[#e5a23f] shadow-md"
                  : "border-gray-300 hover:border-[#F3B34E] hover:text-[#F3B34E]"
              }`}
            >
              {domain.title}
            </Button>
          ))}
        </div>

        {/* MY ACHIEVEMENTS TAB */}
        {mainTab === 0 && (
          <>
            {/* PROGRESS OVERVIEW CARD */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl">
              <CardContent className="p-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-center">
                  {/* Circular Progress */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="#f3f4f6"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="#F3B34E"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 70}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 70 * (1 - progressPercentage / 100)
                          }`}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-[#F3B34E]">
                          {progressPercentage}%
                        </span>
                        <span className="text-sm text-gray-500 mt-1">Complete</span>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-base font-semibold text-gray-800">
                        {data ? Math.floor(data.userCompletedXP) : 0} /{" "}
                        {data?.totalDomainXP || 0} XP
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Total Experience
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-7 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">
                            {data?.statusCounts.completed ?? 0}
                          </p>
                          <p className="text-sm text-gray-600 mt-2 font-medium">
                            Completed
                          </p>
                        </div>
                        <div className="bg-green-200 p-3 rounded-xl">
                          <Trophy className="w-6 h-6 text-green-700" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-7 border-2 border-[#FFD272] shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">
                            {data?.statusCounts.active ?? 0}
                          </p>
                          <p className="text-sm text-gray-600 mt-2 font-medium">
                            In Progress
                          </p>
                        </div>
                        <div className="bg-[#FFD272] p-3 rounded-xl">
                          <Target className="w-6 h-6 text-[#F3B34E]" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-7 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">
                            {data?.statusCounts.pending ?? 0}
                          </p>
                          <p className="text-sm text-gray-600 mt-2 font-medium">Locked</p>
                        </div>
                        <div className="bg-gray-300 p-3 rounded-xl">
                          <Lock className="w-6 h-6 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ACHIEVEMENTS SECTION */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8 pb-6 border-b-2">
                  <div className="flex gap-2 bg-gray-100 rounded-xl p-2">
                    {TABS.map((tab, index) => (
                      <Button
                        key={tab}
                        variant="ghost"
                        onClick={() => setActiveTab(index)}
                        className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                          activeTab === index
                            ? "bg-white text-[#F3B34E] shadow-md"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab}
                      </Button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        setActiveTab((prev) => (prev === 0 ? 2 : prev - 1))
                      }
                      className="rounded-xl hover:bg-gray-50 border-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        setActiveTab((prev) => (prev === 2 ? 0 : prev + 1))
                      }
                      className="rounded-xl hover:bg-gray-50 border-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2">
                  {isLoading && (
                    <div className="col-span-full flex items-center justify-center py-16">
                      <p className="text-gray-500 text-lg">Loading achievements...</p>
                    </div>
                  )}

                  {!isLoading && achievementsToShow.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-16">
                      <Lock className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">
                        No achievements in this section yet.
                      </p>
                    </div>
                  )}

                  {!isLoading &&
                    achievementsToShow.map((item) => {
                      const itemProgress = (item.progress / item.totalXP) * 100;
                      return (
                        <Card
                          key={item.moduleId}
                          className="border-2 border-gray-200 rounded-2xl hover:shadow-lg transition-all overflow-hidden hover:border-[#F3B34E]"
                        >
                          <CardContent className="p-6">
                            <div className="mb-4">
                              <Badge className="bg-[#F3B34E]/10 hover:bg-[#F3B34E]/20 text-[#F3B34E] border-0 px-4 py-1.5 rounded-full text-xs font-semibold">
                                {item.badge}
                              </Badge>
                            </div>

                            <h3 className="font-bold text-lg text-gray-900 mb-3">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-2 font-medium">
                                  <Star className="w-5 h-5 text-[#F3B34E] fill-[#F3B34E]" />
                                  {item.progress} / {item.totalXP} XP
                                </span>
                                <span className="font-bold text-[#F3B34E] text-base">
                                  {Math.floor(itemProgress)}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-[#F3B34E] to-[#FFD272] h-full rounded-full transition-all duration-500 shadow-sm"
                                  style={{ width: `${itemProgress}%` }}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* LEADERBOARD TAB */}
        {mainTab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Leaderboard */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <Trophy className="w-7 h-7 text-[#F3B34E]" />
                      Rankings
                    </h2>
                    <Badge className="bg-[#F3B34E]/10 text-[#F3B34E] border-0 px-4 py-2 rounded-full font-semibold">
                      Current Rankings
                    </Badge>
                  </div>

                  {isLeaderboardLoading ? (
                    <div className="flex items-center justify-center py-16">
                      <p className="text-gray-500 text-lg">Loading leaderboard...</p>
                    </div>
                  ) : leaderboardData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <Trophy className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">No leaderboard data available.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leaderboardData.map((user) => (
                        <div
                          key={user.userId}
                          className={`flex items-center gap-5 p-5 rounded-2xl transition-all ${
                            user.isUser
                              ? "bg-gradient-to-r from-[#F3B34E]/10 to-[#FFD272]/10 border-3 border-[#F3B34E] shadow-md"
                              : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200"
                          }`}
                        >
                          {/* Rank Badge */}
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm ${
                              user.rank === 1
                                ? "bg-gradient-to-br from-[#F3B34E] to-[#FFD272] text-white"
                                : user.rank === 2
                                ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                                : user.rank === 3
                                ? "bg-gradient-to-br from-[#ED846B] to-[#e06a4f] text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {user.rank <= 3 ? (
                              <Medal className="w-6 h-6" />
                            ) : (
                              user.rank
                            )}
                          </div>

                          {/* Avatar */}
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm ${
                              user.isUser
                                ? "bg-[#F3B34E] text-white"
                                : "bg-gradient-to-br from-[#59A4C0] to-[#4a8da8] text-white"
                            }`}
                          >
                            {user.avatar}
                          </div>

                          {/* Name & XP */}
                          <div className="flex-1">
                            <p
                              className={`font-bold text-base ${
                                user.isUser ? "text-[#F3B34E]" : "text-gray-900"
                              }`}
                            >
                              {user.name}
                              {user.isUser && (
                                <span className="ml-2 text-xs font-normal text-gray-600">(You)</span>
                              )}
                            </p>
                            <p className="text-sm text-gray-600 font-medium mt-0.5">
                              {user.xp.toFixed(2)} XP • Level {user.level}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Your Stats Sidebar */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-[#F3B34E] to-[#FFD272] text-white rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold">Your Rank</h3>
                  </div>
                  <p className="text-6xl font-bold mb-3">
                    #{yourRankData?.rank || "—"}
                  </p>
                  <p className="text-base opacity-90 font-medium">
                    {yourRankData ? `${yourRankData.totalXP.toFixed(2)} XP • Level ${yourRankData.level}` : "No rank data"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">
                    Your Progress
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-gray-600 font-medium">Total XP</span>
                        <span className="font-bold text-gray-900 text-base">
                          {yourRankData?.totalXP.toFixed(2) || 0}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-[#F3B34E] to-[#FFD272] h-full rounded-full shadow-sm"
                          style={{ width: "68%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-gray-600 font-medium">Achievements</span>
                        <span className="font-bold text-gray-900 text-base">
                          {data?.statusCounts.completed ?? 0} / {(data?.statusCounts.completed ?? 0) + (data?.statusCounts.active ?? 0) + (data?.statusCounts.pending ?? 0)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-[#59A4C0] to-[#4a8da8] h-full rounded-full shadow-sm"
                          style={{ width: `${data ? (data.statusCounts.completed / ((data.statusCounts.completed + data.statusCounts.active + data.statusCounts.pending) || 1)) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Achievements;