import {
  ChangeModuleStatus,
  GetUserEnrolledModule,
} from "@/apiService/ModuleTracking";
import { OutlinedActionButton } from "@/components/buttons/OutlinedActionButton";
import { ActionDropdown } from "@/components/dropdowns/ActionDropdown";
import CertificationModal from "@/components/modals/CertificationModal";
import ProjectModal from "@/components/modals/ProjectModal";
import { OrangeProgressBar } from "@/components/OrangeProgressBar";
import TrackerSkeletons from "@/components/skeletons/skillTracking/tracker/TrackerSkeletons";
import { BuddyConversation } from "@/components/skillTracking/buddy/BuddyConversation";
import Modules from "@/components/skillTracking/Modules";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { domainSkillDropdownItems } from "@/constants";
import { AlertCircle, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const Tracker = () => {
  const { id: domainId } = useParams();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddCertificationModalOpen, setIsAddCertificationModalOpen] =
    useState(false);
  const [showBuddy, setShowBuddy] = useState(false);
  const [userResponses, setUserResponses] = useState([]);

  const { data, isLoading, isError } = GetUserEnrolledModule(domainId);

  useEffect(() => {
    if (!isLoading && !isError) {
      const activeModules = data?.userModules?.modules || [];
      setShowBuddy(activeModules.length === 0); // show buddy only if no modules
    }
  }, [data, isLoading, isError]);

  const onProjectSubmit = (payload) => {
    // console.log("Project form data", payload);
  };

  const onCertificationSubmit = (payload) => {
    console.log("Certification form data", payload);
  };

  return (
    <div className="flex flex-col gap-10">
      {showBuddy && (
        <BuddyConversation
          userResponses={userResponses}
          setUserResponses={setUserResponses}
          domainId={domainId}
          setShowBuddy={setShowBuddy} // hide buddy after enrollment
        />
      )}

      <div className="flex flex-col lg:flex-row justify-around gap-10">
        <DomainInfo
          setIsAddProjectModalOpen={setIsAddProjectModalOpen}
          setIsAddCertificationModalOpen={setIsAddCertificationModalOpen}
        />
        <SkillTracker />
      </div>

      <Modules />

      <ProjectModal
        mode="add"
        open={isAddProjectModalOpen}
        setOpen={setIsAddProjectModalOpen}
        onSubmit={onProjectSubmit}
      />
      <CertificationModal
        mode="add"
        open={isAddCertificationModalOpen}
        setOpen={setIsAddCertificationModalOpen}
        onSubmit={onCertificationSubmit}
      />
    </div>
  );
};

const DomainInfo = ({
  setIsAddProjectModalOpen,
  setIsAddCertificationModalOpen,
}) => {
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

  // calculate stats
  const totalXP = modules.reduce((acc, m) => acc + m.totalXP, 0);
  const obtainedXP = modules.reduce((acc, m) => acc + m.obtainedXP, 0);
  const progressPercent = totalXP
    ? Math.round((obtainedXP / totalXP) * 100)
    : 0;

  const completedModules = modules.filter((m) => m.isCompleted).length;
  const totalModules = modules.length;

  const isLoading = false;

  if (isLoading) {
    return <DomainInfoSkeleton />;
  }

  return (
    <div className="w-full md:w-[400px] flex flex-col gap-3">
      <div
        className="w-full rounded-2xl p-10 flex flex-col items-center justify-center gap-4"
        style={{
          background:
            "linear-gradient(107deg, rgba(243, 179, 78, 0.40) 0%, rgba(255, 210, 114, 0.40) 50%, rgba(89, 164, 192, 0.40) 100%)",
        }}
      >
        {/* Replace circle with buddy image */}
        <div className="bg-white rounded-full h-52 w-52 flex items-center justify-center overflow-hidden shadow">
          <img
            src="/buddy.png"
            alt="Lumo"
            className="object-contain h-full w-full"
          />
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
            <p>02</p>
            <p>01</p>
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

const DomainInfoSkeleton = () => {
  return (
    <div className="w-full md:w-[400px] flex flex-col gap-3">
      {/* Main Card */}
      <div className="w-full rounded-2xl p-10 flex flex-col items-center justify-center gap-4 bg-gray-50">
        {/* Buddy Image Skeleton */}
        <Skeleton className="bg-white rounded-full h-44 w-44" />

        {/* Career Domain Title Skeleton */}
        <Skeleton className="h-6 w-32 md:w-40 rounded-md" />

        {/* Stats Skeleton */}
        <div className="flex justify-between w-full gap-5 text-black text-sm font-normal">
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
          <div className="flex-1 flex flex-col gap-2 items-end">
            <Skeleton className="h-4 w-10 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
        </div>
      </div>

      {/* Buttons Skeleton */}
      <Skeleton className="h-12 w-full rounded-full" />
      <Skeleton className="h-12 w-full rounded-full" />
    </div>
  );
};

const SkillTracker = () => {
  const navigate = useNavigate();
  const { id: domainId } = useParams();

  const { data, isLoading, isError } = GetUserEnrolledModule(domainId);
  const { mutate: changeStatus, isPending } = ChangeModuleStatus();

  const activeModules = data?.userModules?.activeModules || [];

  // Only show first 3 active modules
  const displayModules = activeModules.slice(0, 3);

  const handleActions = (action, moduleId) => {
    console.log("Action selected:", action, moduleId);
    switch (action) {
      case "lesson":
        navigate(`/user/dashboard/skill-tracker/lesson-tracker/${moduleId}`);
        break;

      case "deactivate":
        changeStatus(
          { moduleId, status: "pending" },
          {
            onSuccess: () => {
              toast.success("Module removed from active");
            },
            onError: (error) => {
              toast.error(
                error?.response?.data?.message ||
                  "Failed to update module status"
              );
            },
          }
        );
        break;
    }
  };

  if (isLoading) {
    return <TrackerSkeletons />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Oops! Something went wrong.
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          We encountered an error while fetching your active modules. Please try
          again.
        </p>
      </div>
    );
  }

  if (displayModules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          You don't have any active skill modules
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          To get started, please enroll in any of the skill modules available in
          your selected domain.
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
    <div className="w-full md:w-3/4 bg-custom-light-white rounded-md p-5 flex flex-col gap-4 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-black font-medium text-lg md:text-xl">
          {data?.userModules?.careerDomain || "Skill Modules"}
        </h1>
      </div>

      {/* Display first 3 active modules */}
      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {displayModules.map((mod, idx) => {
          const progressPercent = Math.round((mod.progress / 100) * 100); // Or calculate properly

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

              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <OrangeProgressBar value={progressPercent} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Ellipsis
                        color="black"
                        size={18}
                        className={`cursor-pointer ml-2 ${
                          isPending ? "opacity-50 pointer-events-none" : ""
                        }`}
                      />
                    </DropdownMenuTrigger>
                    <ActionDropdown
                      items={domainSkillDropdownItems}
                      onAction={(action) => handleActions(action, mod.id)}
                    />
                  </DropdownMenu>
                </div>
                <span className="text-xs text-muted-foreground">
                  {mod.totalXp} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
