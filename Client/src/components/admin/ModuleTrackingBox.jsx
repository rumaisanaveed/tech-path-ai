import {
  CreateAdminModule,
  DeleteAdminModule,
  GetAdminAllModulesFromDomain,
} from "@/apiService/SkillTracking";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { CalendarDays, Star } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddModuleModal from "./AddModuleModal";

const formatDate = (iso) => (iso ? format(new Date(iso), "MMM d, yyyy") : "—");

const ModuleTrackingBox = () => {
  const { domainId } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [modules, setModules] = useState([]);
  const limit = 5;
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError, isFetching } = GetAdminAllModulesFromDomain(
    domainId,
    page,
    limit
  );
  const createModuleMutation = CreateAdminModule(domainId);
  const deleteModuleMutation = DeleteAdminModule(domainId);

  React.useEffect(() => {
    if (data?.modules?.length) {
      setModules((prev) => [...prev, ...data.modules]);
    }
  }, [data]);

  if (isLoading && modules.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Modules <span className="text-sm text-gray-500">(Loading...)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-56 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-sm">Failed to load modules.</p>;
  }

  const handleDelete = (moduleId) => {
    deleteModuleMutation.mutate(moduleId, {
      onSuccess: () => {
        setModules((prev) => prev.filter((m) => m.id !== moduleId));
      },
    });
  };

  const handleManage = (moduleId) => {
    navigate(`/admin/dashboard/lesson-tracking/${moduleId}`);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Modules
          <span className="ml-2 text-sm text-gray-500">
            ({modules.length} of {data?.totalModules ?? 0})
          </span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((mod, index) => {
          const initial =
            (mod.badge && mod.badge.trim()[0]) ||
            (mod.title && mod.title.trim()[0]) ||
            "?";

          return (
            <Card
              key={`${mod.id}-${index}`}
              className="rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition bg-white flex"
            >
              <CardContent className="p-5 flex flex-col h-full w-full">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow"
                      style={{
                        background:
                          "linear-gradient(135deg, #ED846B 0%, #F3B34E 50%, #FFD272 100%)",
                      }}
                    >
                      {initial.toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {mod.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <CalendarDays size={12} />
                        <span>{formatDate(mod.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <Badge className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                    {mod.badge || "No Badge"}
                  </Badge>
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 mb-3 min-h-[48px]">
                  {mod.description}
                </p>

                <Separator className="my-3" />

                <div className="flex justify-between items-center text-xs text-gray-700 mb-4 mt-auto">
                  <div className="flex items-center gap-1 font-medium text-gray-800">
                    <Star size={12} className="text-yellow-500" />
                    <span>{mod.totalXP ?? 0} XP</span>
                  </div>
                  <span
                    className={`font-medium ${
                      mod.isActive ? "text-teal-600" : "text-gray-400"
                    }`}
                  >
                    {mod.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <Button
                    variant="outline"
                    className="w-1/2 text-xs border-[#59A4C0] text-[#59A4C0] hover:bg-[#59A4C0]/10"
                    onClick={() => handleDelete(mod.id)}
                    disabled
                  >
                    Delete
                  </Button>
                  <SecondaryButton
                    title="Manage"
                    textSmall
                    className="w-1/2 text-center"
                    variant="dark"
                    onClickHandler={() => handleManage(mod.id)}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}

        <AddModuleModal
          open={open}
          setOpen={setOpen}
          onSubmit={createModuleMutation.mutate}
          domainId={domainId}
        />
      </div>

      {/* Load More Button */}
      {data && data.currentPage < data.totalPages && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* Add Module Modal */}
    </div>
  );
};

export default ModuleTrackingBox;
