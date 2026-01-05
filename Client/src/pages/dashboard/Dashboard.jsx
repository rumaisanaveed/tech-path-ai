import { Button } from "@/components/ui/button";
import { Award, Flame, Star, BookOpen, TrendingUp, Calendar } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useDashboardData } from "@/apiService/achievement";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data, isLoading, error } = useDashboardData();
  const { user } = useAuth();

  const navigate = useNavigate();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error loading dashboard: {error.message}</div>;

  const dashboardData = data?.dashboardData || {};
  const buddyImg = "/buddy.png";

  const mergedModuleInfo = dashboardData?.continueLearning
    ? {
        id: dashboardData.continueLearning.moduleId, // <-- ensure correct ID
        title: dashboardData.continueLearning.moduleTitle,
        nextLesson: dashboardData.continueLearning.nextLesson?.title || "",
        progress: dashboardData.totalProgressRaw || 0,
        xp: dashboardData.continueLearning.totalXP || 0,
      }
    : null;

  // Handlers
  const handleContinueLearning = (moduleId) => {
    navigate(`/user/dashboard/skill-tracker/lesson-tracker/${moduleId}`);
  };

  const handleViewDomain = (domainId) => {
    navigate(`/user/dashboard/skill-tracker/domain/${domainId}`);
  };

  console.log("Dashboard Data:", dashboardData);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* HERO SECTION */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Welcome back, {user?.firstName} 👋
              </h1>
              <p className="mt-2 text-gray-600">Continue your learning journey</p>
            </div>

            {/* LEVEL / XP / DOMAINS */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#59A4C0] to-[#ED846B] p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img
                      src={buddyImg}
                      alt="Buddy"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="bg-gradient-to-br from-[#59A4C0]/10 to-[#59A4C0]/5 rounded-2xl p-4 border border-[#59A4C0]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-[#59A4C0]" />
                    <p className="text-sm font-medium text-gray-600">Level</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData?.level || 1}</p>
                </div>

                <div className="bg-gradient-to-br from-[#F3B34E]/10 to-[#F3B34E]/5 rounded-2xl p-4 border border-[#F3B34E]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-4 h-4 text-[#F3B34E]" />
                    <p className="text-sm font-medium text-gray-600">Total XP</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{mergedModuleInfo?.xp || 0}</p>
                </div>

                <div className="bg-gradient-to-br from-[#ED846B]/10 to-[#ED846B]/5 rounded-2xl p-4 border border-[#ED846B]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-[#ED846B]" />
                    <p className="text-sm font-medium text-gray-600">Domains</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData?.domains?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTINUE LEARNING MODULE */}
          {mergedModuleInfo && (
            <div className="bg-gradient-to-br from-[#59A4C0] to-[#59A4C0]/90 rounded-3xl p-6 sm:p-8 shadow-lg text-white">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" />
                <Button
                  variant="ghost"
                  className="text-lg font-semibold p-0"
                  onClick={() => handleContinueLearning(mergedModuleInfo.id)}
                >
                  Continue Learning
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold">{mergedModuleInfo.title}</h3>
                  {mergedModuleInfo.nextLesson && (
                    <p className="mt-2 text-white/90">
                      Next Lesson: <span className="font-semibold">{mergedModuleInfo.nextLesson}</span>
                    </p>
                  )}
                </div>

                <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-[#FFD272] rounded-full transition-all duration-500"
                    style={{ width: `${mergedModuleInfo.progress}%` }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-medium">{mergedModuleInfo.progress.toFixed(1)}% completed</span>
                    <span className="text-white/80">•</span>
                    <span className="text-white/90">{mergedModuleInfo.xp} XP earned</span>
                  </div>

                  <Button
                    onClick={() => handleContinueLearning(mergedModuleInfo.id)}
                    className="bg-white text-[#59A4C0] hover:bg-white/90 font-semibold shadow-lg"
                  >
                    Continue Lesson →
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ENROLLED DOMAINS */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Paths</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dashboardData?.domains?.map((domain, index) => {
                const colors = [
                  { from: '#ED846B', to: '#ED846B/90', border: '#ED846B/20', bg: '#ED846B/10' },
                  { from: '#F3B34E', to: '#F3B34E/90', border: '#F3B34E/20', bg: '#F3B34E/10' }
                ];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={domain.id}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center`}
                           style={{ background: `linear-gradient(to bottom right, ${color.from}, ${color.to})` }}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDomain(domain.id)}
                      >
                        Active
                      </Button>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{domain.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{domain.description}</p>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Enrolled {new Date(domain.enrolledAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full font-semibold hover:bg-gray-50"
                      style={{ borderColor: color.border }}
                      onClick={() => handleViewDomain(domain.id)}
                    >
                      View Domain
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STATS OVERVIEW */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Progress Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-2xl bg-gray-50">
                <Star className="w-6 h-6 text-[#F3B34E] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.level || 1}</p>
                <p className="text-sm text-gray-600">Current Level</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gray-50">
                <BookOpen className="w-6 h-6 text-[#59A4C0] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.totalModules || 0}</p>
                <p className="text-sm text-gray-600">Total Modules</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gray-50">
                <Flame className="w-6 h-6 text-[#ED846B] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mergedModuleInfo?.xp || 0}</p>
                <p className="text-sm text-gray-600">XP Earned</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gray-50">
                <TrendingUp className="w-6 h-6 text-[#F3B34E] mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mergedModuleInfo?.progress.toFixed(0)}%</p>
                <p className="text-sm text-gray-600">Completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
