import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  ChangeModuleStatus,
  GetUserEnrolledModule,
} from "@/apiService/ModuleTracking";
import { format } from "date-fns";
import { AlertCircle, CalendarDays, Star } from "lucide-react";
import { CustomPagination } from "../CustomPagination";
import ModulesSkeletons from "../skeletons/skillTracking/modules/ModulesSkeletons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formatDate = (iso) => (iso ? format(new Date(iso), "MMM d, yyyy") : "—");

const Modules = () => {
  const { id: domainId } = useParams();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = GetUserEnrolledModule(domainId, page);
  const { mutate: changeStatus, isPending } = ChangeModuleStatus();

  const [statusMap, setStatusMap] = useState({});

  const userModules = data?.userModules || {};
  const modules = userModules?.modules || [];
  const totalPages = userModules?.totalPages || 1;

  const [selectedModule, setSelectedModule] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    if (modules.length > 0) {
      const map = {};
      modules.forEach((m) => {
        map[m.id] = m.status;
      });
      setStatusMap(map);
    }
  }, [modules]);

  const handleView = (module) => {
    setSelectedModule(module);
    setIsViewOpen(true);
  };

  const handleStatusChange = (moduleId, newStatus) => {
    const previousStatus = statusMap[moduleId];

    // Optimistically update UI
    setStatusMap((prev) => ({
      ...prev,
      [moduleId]: newStatus,
    }));

    changeStatus(
      { moduleId, status: newStatus },
      {
        onError: () => {
          // 🔙 Rollback UI on error
          setStatusMap((prev) => ({
            ...prev,
            [moduleId]: previousStatus,
          }));
        },
      }
    );
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Early returns
  if (isLoading) {
    return <ModulesSkeletons />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Oops! Something went wrong.
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          We encountered an error while fetching your modules. Please try again.
        </p>
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          You haven't enrolled in any modules yet
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          To get started, enroll in your career domain modules and track your
          progress.
        </p>
        <Button
          variant="outline"
          className="mt-4 px-4 py-2 text-sm text-[#59A4C0] border-[#59A4C0] hover:bg-[#59A4C0]/10"
        >
          Explore Modules
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Domain Header */}
      <h2 className="text-lg sm:text-xl font-semibold mb-6">
        {userModules.careerDomain || "Modules"} ({userModules.totalModules})
      </h2>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {modules.map((mod) => {
          const initial =
            (mod.badge && mod.badge.trim()[0]) ||
            (mod.title && mod.title.trim()[0]) ||
            "?";

          return (
            <Card
              key={mod.id}
              className="w-full rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition bg-white flex flex-col"
            >
              <CardContent className="p-5 flex flex-col h-full w-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Initial Circle */}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shadow flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, #ED843B 0%, #F3B34E 50%, #59A4C0 100%)",
                      }}
                    >
                      {initial.toUpperCase()}
                    </div>

                    {/* Title + Enrolled At */}
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {mod.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                        <CalendarDays size={14} />
                        <span>{formatDate(mod.enrolledAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <Badge className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full hover:bg-yellow-300 hover:text-yellow-900">
                    {mod.badge}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 line-clamp-3 mb-3 min-h-[48px]">
                  {mod.description}
                </p>

                <Separator className="my-3" />

                {/* XP + Status */}
                <div className="flex justify-between items-center text-xs text-gray-700 mb-4 mt-auto">
                  <div className="flex items-center gap-1 font-medium text-gray-800">
                    <Star size={14} className="text-yellow-500" />
                    <span>{mod.totalXp} XP</span>
                  </div>
                  <Select
                    value={statusMap[mod.id]}
                    onValueChange={(value) => handleStatusChange(mod.id, value)}
                    disabled={isPending}
                  >
                    <SelectTrigger className="h-7 w-[110px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-3 mt-auto">
                  <Button
                    variant="outline"
                    className="w-1/2 text-xs border-[#59A4C0] text-[#59A4C0] hover:bg-[#59A4C0]/10"
                    onClick={() => handleView(mod)}
                  >
                    View
                  </Button>
                  <SecondaryButton
                    title="Project"
                    textSmall
                    className="w-1/2 text-center"
                    variant="dark"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      <CustomPagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedModule?.title || "Module"}</DialogTitle>
          </DialogHeader>

          {/* Empty for now */}
          <div className="text-sm text-gray-500 text-center py-10">
            Module details will appear here
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modules;
