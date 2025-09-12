import {
  GetAllModulesFromDomain,
  GetUserEnrolledModule,
} from "@/apis/skillTracking/moduleTracking/moduleTracking.services";
import { OutlinedActionButton } from "@/components/buttons/OutlinedActionButton";
import { ActionDropdown } from "@/components/dropdowns/ActionDropdown";
import CertificationModal from "@/components/modals/CertificationModal";
import ProjectModal from "@/components/modals/ProjectModal";
import { OrangeProgressBar } from "@/components/OrangeProgressBar";
import Modules from "@/components/skillTracking/Modules";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { domainSkillDropdownItems } from "@/constants";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const Tracker = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddCertificationModalOpen, setIsAddCertificationModalOpen] =
    useState(false);
  return (
    <div className="flex flex-col gap-10">
      {/* top row: domain + skill trackers */}
      <div className="flex flex-col lg:flex-row justify-around gap-10">
        <DomainTracker
          setIsAddProjectModalOpen={setIsAddProjectModalOpen}
          setIsAddCertificationModalOpen={setIsAddCertificationModalOpen}
        />
        <SkillTracker />
      </div>

      {/* bottom row: modules */}
      <Modules />

      {/* modals */}
      <ProjectModal
        mode="add"
        open={isAddProjectModalOpen}
        setOpen={setIsAddProjectModalOpen}
      />
      <CertificationModal
        mode="add"
        open={isAddCertificationModalOpen}
        setOpen={setIsAddCertificationModalOpen}
      />
    </div>
  );
};

const DomainTracker = ({
  setIsAddProjectModalOpen,
  setIsAddCertificationModalOpen,
}) => {
  const { id: domainId } = useParams();

  // keep hooks (not used, but preserved for now)
  const { data, isLoading, isError } = GetUserEnrolledModule(domainId);
  const {
    data: allModulesData,
    isLoading: allModulesLoading,
    isError: allModulesError,
  } = GetAllModulesFromDomain(domainId);

  // --- Mock data ---
  const modules = [
    {
      id: 1,
      title: "Frontend Fundamentals",
      description: "Learn the basics of HTML, CSS, and JavaScript.",
      totalXP: 500,
      obtainedXP: 350,
      isCompleted: false,
      badge: "Frontend Hero",
      careerDomain: { title: "Web Development" },
    },
    {
      id: 2,
      title: "React Essentials",
      description: "Dive deep into React and component-based design.",
      totalXP: 600,
      obtainedXP: 600,
      isCompleted: true,
      badge: "React Pro",
      careerDomain: { title: "Web Development" },
    },
  ];

  // calculate overall stats
  const totalXP = modules.reduce((acc, m) => acc + m.totalXP, 0);
  const obtainedXP = modules.reduce((acc, m) => acc + m.obtainedXP, 0);
  const progressPercent = totalXP
    ? Math.round((obtainedXP / totalXP) * 100)
    : 0;

  const completedModules = modules.filter((m) => m.isCompleted).length;
  const totalModules = modules.length;

  return (
    <div className="w-full md:w-[400px] flex flex-col gap-3">
      <div
        className="w-full rounded-2xl p-10 flex flex-col items-center justify-center gap-4"
        style={{
          background:
            "linear-gradient(107deg, rgba(243, 179, 78, 0.40) 0%, rgba(255, 210, 114, 0.40) 50%, rgba(89, 164, 192, 0.40) 100%)",
        }}
      >
        <div className="bg-white rounded-full h-52 w-52 flex flex-col items-center justify-center">
          <OrangeProgressBar variant="rounded" value={progressPercent} />
        </div>
        <h2 className="text-lg md:text-xl font-medium text-black">
          {modules[0]?.careerDomain?.title || "Career Domain"}
        </h2>
        <div className="flex justify-between w-full gap-5 text-black text-sm font-normal">
          <div className="flex-1">
            <p>Modules</p>
            <p>Projects Built</p>
            <p>Certification</p>
          </div>
          <div className="flex-1 text-right">
            <p>
              {completedModules}/{totalModules}
            </p>
            <p>02</p> {/* placeholder for projects count */}
            <p>01</p> {/* placeholder for certifications count */}
          </div>
        </div>
      </div>
      <OutlinedActionButton
        size="lg"
        title="Add Project"
        handleClick={() => setIsAddProjectModalOpen(true)}
      />
      <OutlinedActionButton
        size="lg"
        title="Add Certification"
        handleClick={() => setIsAddCertificationModalOpen(true)}
      />
    </div>
  );
};

const SkillTracker = () => {
  const navigate = useNavigate();
  const { id: domainId } = useParams();

  // API hook
  const { data, isLoading, isError } = GetUserEnrolledModule(domainId);
  const modules = data?.modules || [];

  const activeModules = modules.filter((mod) => mod.isActive);

  const handleActions = (action, moduleId) => {
    switch (action) {
      case "lesson":
        navigate(`/user/dashboard/skill-tracker/lesson-tracker/${moduleId}`);
        break;
      case "delete":
        toast.info("Delete logic not implemented yet.");
        break;
    }
  };

  // --- Skeleton loader ---
  if (isLoading) {
    return (
      <div className="w-full md:w-3/4 bg-custom-light-white rounded-md p-5 flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 bg-white p-3 rounded-xl shadow-sm min-h-[120px]"
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-2 w-full mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full md:w-3/4 bg-custom-light-white rounded-md p-5 h-[400px] flex items-center justify-center">
        <p className="text-red-500 text-sm">Failed to load modules.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4 bg-custom-light-white rounded-md p-5 flex flex-col gap-4 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-black font-medium text-lg md:text-xl">
          {modules[0]?.careerDomainTitle || "Skill Modules"}
        </h1>
        {modules[0]?.badge && (
          <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
            {modules[0]?.badge}
          </span>
        )}
      </div>

      {/* Active Modules or Empty State */}
      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {activeModules.length > 0 ? (
          activeModules.map((mod, idx) => {
            const progressPercent = Math.round(
              (mod.obtainedXP / mod.totalXP) * 100
            );

            return (
              <div
                key={mod.id}
                className="flex flex-col gap-1 bg-white p-3 rounded-xl shadow-sm min-h-[120px]"
              >
                <span className="text-xs text-gray-500 mb-1">
                  Module {idx + 1}
                </span>

                <h2 className="text-black font-medium text-base md:text-lg">
                  {mod.title}
                </h2>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {mod.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col gap-1 w-full">
                    <OrangeProgressBar value={progressPercent} />
                    <span className="text-xs text-muted-foreground">
                      {mod.obtainedXP}/{mod.totalXP} XP
                    </span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Ellipsis
                        color="black"
                        size={18}
                        className="cursor-pointer ml-2"
                      />
                    </DropdownMenuTrigger>
                    <ActionDropdown
                      items={domainSkillDropdownItems}
                      onAction={(action) => handleActions(action, mod.id)}
                    />
                  </DropdownMenu>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-[300px] bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">
              No active modules found. Enroll to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
