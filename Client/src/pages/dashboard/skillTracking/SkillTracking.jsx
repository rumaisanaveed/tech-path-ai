import { BreadCrumb } from "@/components/careerAssessment/BreadCrumb";
import { useGlobalContext } from "@/context/GlobalContext";
import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect } from "react";
import { Heading } from "./components/Heading";
import { OutlinedActionButton } from "@/components/buttons/OutlinedActionButton";
import { BookOpenCheck, Ellipsis, Plus, Trash2 } from "lucide-react";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import {
  careerDomainDropdownItem,
  careerDomains,
  individualSkills,
  skillDropDownItems,
} from "@/constants";
import { OrangeProgressBar } from "@/components/OrangeProgressBar";
import Domain from "@/assets/images/domain.webp";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "@/hooks/useScreenSize";
import { SelectionDropdown } from "@/components/dropdowns/SelectionDropdown";
import { ActionDropdown } from "@/components/dropdowns/ActionDropdown";

export const SkillTracking = () => {
  usePageTitle("Skills Tracking");
  const { setBreadcrumbText } = useGlobalContext();
  const { isSmallScreen, isLargeScreen } = useScreenSize();

  useEffect(() => {
    setBreadcrumbText("Skill Tracker");
  }, []);

  return (
    <DashboardLayout>
      <div className="px-5 md:px-10 pt-5 pb-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <BreadCrumb />
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Heading heading="Your Career Domains" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <OutlinedActionButton
                    title={isLargeScreen ? "Add" : "Add Career Domain"}
                    icon={<Plus size={isSmallScreen ? 15 : 18} color="black" />}
                  />
                </DropdownMenuTrigger>
                <SelectionDropdown items={careerDomains} />
              </DropdownMenu>
            </div>
            {/* domains */}
            <Domains />
          </div>
        </div>
        {/* individual skills */}
        <IndividualSkills />
      </div>
    </DashboardLayout>
  );
};

const Domains = () => {
  const navigate = useNavigate();

  const handleActions = (action) => {
    switch (action) {
      case "delete":
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4 text-black">
          <div className="relative">
            <img
              alt="career domain"
              src={Domain}
              className="w-full h-full object-cover rounded-md"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis
                  color="#FDFDFD"
                  size={20}
                  className="absolute top-2 right-2 cursor-pointer"
                />
              </DropdownMenuTrigger>
              <ActionDropdown
                items={careerDomainDropdownItem}
                onAction={handleActions}
                variant="light"
              />
            </DropdownMenu>
          </div>
          <div>
            <h1 className="font-medium text-base md:text-xl">
              Frontend Developer
            </h1>
            <p className="font-normal text-xs md:text-sm">
              Designs intuitive user experiences and interfaces
            </p>
          </div>
          <SecondaryButton
            variant="dark"
            title="View Domain"
            className="py-1"
            textSmall
            onClickHandler={() =>
              navigate(
                "/user/dashboard/skill-tracker/domain/frontend-development"
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

const IndividualSkills = () => {
  const navigate = useNavigate();
  const { isSmallScreen } = useScreenSize();
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between w-full">
        <Heading heading="Individual Skills" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <OutlinedActionButton
              title={isSmallScreen ? "Add" : "Add Skills"}
              icon={<Plus size={isSmallScreen ? 15 : 18} color="black" />}
            />
          </DropdownMenuTrigger>
          <SelectionDropdown items={skillDropDownItems} />
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-4 mt-5 w-full">
        {individualSkills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between w-full">
            <div className="w-7/12 lg:w-5/6">
              <h2 className="font-normal text-base md:text-lg">{skill.name}</h2>
              <OrangeProgressBar value={skill.value} />
            </div>
            <div className="flex items-center gap-2 w-fit">
              <OutlinedActionButton
                title="Take Quiz"
                handleClick={() =>
                  navigate("/user/dashboard/skill-tracker/skill-assessment")
                }
                className="px-3"
                icon={
                  <BookOpenCheck size={isSmallScreen ? 15 : 18} color="black" />
                }
              />
              <Trash2 color="black" size={18} className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
