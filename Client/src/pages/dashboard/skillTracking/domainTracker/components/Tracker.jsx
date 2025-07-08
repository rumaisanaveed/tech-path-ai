import { OutlinedActionButton } from "@/components/buttons/OutlinedActionButton";
import { ActionDropdown } from "@/components/dropdowns/ActionDropdown";
import { OrangeProgressBar } from "@/components/OrangeProgressBar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { domainSkillDropdownItems, individualSkills } from "@/constants";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Ellipsis, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Tracker = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-around gap-10">
      {/* domain tracker */}
      <DomainTracker />
      {/* domain skill tracker */}
      <SkillTracker />
    </div>
  );
};

const DomainTracker = () => {
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
      <OutlinedActionButton size="lg" title="Add Project" />
      <OutlinedActionButton size="lg" title="Add Certification" />
    </div>
  );
};

const SkillTracker = () => {
  const { isMediumScreen, isSmallScreen, isLargeScreen } = useScreenSize();
  const navigate = useNavigate();
  const handleActions = (action) => {
    switch (action) {
      case "quiz":
        navigate("/user/dashboard/skill-tracker/skill-assessment");
        break;
      case "delete":
        // delete api call
        break;
    }
  };
  return (
    <div className="w-full md:w-3/4 bg-custom-light-white rounded-md p-5 flex flex-col gap-4 h-fit">
      <div className="flex items-center justify-between">
        <h1 className="text-black font-medium text-lg md:text-xl">
          Frontend Development Skills
        </h1>
        <OutlinedActionButton
          size="sm"
          icon={<Plus color="black" size={isSmallScreen ? 15 : 18} />}
          title={isLargeScreen ? "Add" : "Add Skill"}
          className="text-xs md:text-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        {individualSkills.map((skill, index) => (
          <div key={index} className="flex flex-col gap-0">
            <h2 className="text-black font-normal text-sm md:base">
              {skill.name}
            </h2>
            <div className="flex items-center gap-5 justify-between">
              <OrangeProgressBar value={skill.value} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis
                    color="black"
                    size={18}
                    className="cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <ActionDropdown
                  items={domainSkillDropdownItems}
                  onAction={handleActions}
                />
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
