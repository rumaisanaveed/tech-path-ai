import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; // ✅ import Separator
import { useParams } from "react-router-dom";
import { GetAllModulesFromDomain } from "@/apis/skillTracking/moduleTracking/moduleTracking.services";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

import { format } from "date-fns";
import { CalendarDays, Star } from "lucide-react";

const formatDate = (iso) =>
  iso ? format(new Date(iso), "MMM d, yyyy") : "—";

const Modules = () => {
  const { id: domainId } = useParams();
  const {
    data: allModulesData,
    isLoading: allModulesLoading,
    isError: allModulesError,
  } = GetAllModulesFromDomain(domainId);

  if (allModulesLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <Skeleton key={i} className="h-56 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (allModulesError) {
    return <p className="text-red-500 text-sm">Failed to load modules.</p>;
  }

  const modules = allModulesData?.modules || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((mod) => {
        const initial =
          (mod.badge && mod.badge.trim()[0]) ||
          (mod.title && mod.title.trim()[0]) ||
          "?";

        return (
          <Card
            key={mod.id}
            className="w-full rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition bg-white flex"
          >
            <CardContent className="p-5 flex flex-col h-full w-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-3 gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Initial circle */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow"
                    style={{
                      background:
                        "linear-gradient(135deg, #ED843B 0%, #F3B34E 50%, #59A4C0 100%)",
                    }}
                  >
                    {initial.toUpperCase()}
                  </div>

                  {/* Title + updatedAt */}
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {mod.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <CalendarDays size={12} />
                      <span>{formatDate(mod.updatedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="flex-shrink-0 ml-2">
                  <Badge className="text-xs bg-yellow-200 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full">
                    {mod.badge}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 line-clamp-3 mb-3 min-h-[48px]">
                {mod.description}
              </p>

              {/* ✅ Separator */}
              <Separator className="my-3" />

              {/* XP + Status */}
              <div className="flex justify-between items-center text-xs text-gray-700 mb-4 mt-auto">
                <div className="flex items-center gap-1 font-medium text-gray-800">
                  <Star size={12} className="text-yellow-500" />
                  <span>{mod.totalXP} XP</span>
                </div>
                <span className="text-teal-600 font-medium">
                  {mod.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex justify-between gap-3">
                <Button
                  variant="outline"
                  className="w-1/2 text-xs border-[#59A4C0] text-[#59A4C0] hover:bg-[#59A4C0]/10"
                >
                  View
                </Button>
                <SecondaryButton
                  title="Project"
                  textSmall
                  className="w-1/2 text-center"
                  variant="light"
                  onClickHandler={() => console.log("Project clicked")}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Modules;
