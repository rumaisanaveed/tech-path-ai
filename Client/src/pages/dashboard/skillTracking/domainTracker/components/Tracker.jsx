import { OutlinedActionButton } from "@/components/buttons/OutlinedActionButton";
import { ActionDropdown } from "@/components/dropdowns/ActionDropdown";
import CertificationModal from "@/components/modals/CertificationModal";
import ProjectModal from "@/components/modals/ProjectModal";
import { OrangeProgressBar } from "@/components/OrangeProgressBar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { domainSkillDropdownItems, individualSkills } from "@/constants";
import { useScreenSize } from "@/hooks/useScreenSize";
import axiosReq from "@/services/axiosHelper";
import { Ellipsis, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Tracker = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddCertificationModalOpen, setIsAddCertificationModalOpen] =
    useState(false);
  return (
    <div className="flex flex-col lg:flex-row justify-around gap-10">
      {/* domain tracker */}
      <DomainTracker
        setIsAddProjectModalOpen={setIsAddProjectModalOpen}
        setIsAddCertificationModalOpen={setIsAddCertificationModalOpen}
      />
      {/* domain skill tracker */}
      <SkillTracker />
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
          <OrangeProgressBar variant="rounded" value={55} />
        </div>
        <h2 className="text-lg md:text-xl font-medium text-black">
          Frontend Development
        </h2>
        <div className="flex justify-between w-full gap-5 text-black text-sm font-normal">
          <div className="flex-1">
            <p>Skills Completed</p>
            <p>Projects Built</p>
            <p>Certification</p>
          </div>
          <div className="flex-1 text-right">
            <p>3/10</p>
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

const SkillTracker = () => {
  const { isMediumScreen, isSmallScreen, isLargeScreen } = useScreenSize();

  const [module, setModules] = useState([]);

  const navigate = useNavigate();
  const handleActions = (action, moduleId) => {
  switch (action) {
    case "lesson":
      navigate(`/user/dashboard/skill-tracker/lesson-tracker/${moduleId}`);
      break;
    case "delete":
      // TODO: Add delete logic
      break;
  }
};


  useEffect(() => {
    const fetchAllModuleOfSkills = async () => {
      try {
        const response = await axiosReq(
          "GET",
          "/skill-modules/module/enrolled"
        );
        console.log("fetchAllModuleOfSkills",response.data);
        setModules(response.data.modules);
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.log(
          "Something went wrong on fetchAllModuleOfSkills",
          error.message
        );
      }
    };
    fetchAllModuleOfSkills();
  }, []);

  //console.log("module", module);

  return (
    <div className="w-full md:w-3/4 bg-custom-light-white rounded-md p-5 flex flex-col gap-4 h-fit">
      <div className="flex items-center justify-between">
        <h1 className="text-black font-medium text-lg md:text-xl">
          {module[0]?.careerDomain?.title || "Skill Modules"}
        </h1>
        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
          {module[0]?.badge}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {module.map((mod) => {
          const progressPercent = Math.round(
            (mod.obtainedXP / mod.totalXP) * 100
          );
          return (
            <div
              key={mod.id}
              className="flex flex-col gap-1 bg-white p-3 rounded-xl shadow-sm"
            >
              {/* Sequence */}
              <span className="text-xs text-gray-500 mb-1">
                Module {mod.sequence}
              </span>

              {/* Title */}
              <h2 className="text-black font-medium text-base md:text-lg">
                {mod.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {mod.description}
              </p>

              {/* Progress bar and XP */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col gap-1 w-full">
                  <OrangeProgressBar value={progressPercent} />
                  <span className="text-xs text-muted-foreground">
                    {mod.obtainedXP}/{mod.totalXP} XP
                  </span>
                </div>

                {/* Dropdown menu */}
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
        })}
      </div>
    </div>
  );
};
