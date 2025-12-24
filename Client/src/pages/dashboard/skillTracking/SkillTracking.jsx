import {
  GetAllCareerDomains,
  GetUserEnrolledDomains,
} from "@/apiService/SkillTracking";
import { OutlinedActionButton } from "@/components/buttons/OutlinedActionButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { BreadCrumb } from "@/components/careerAssessment/BreadCrumb";
import { ActionDropdown } from "@/components/dropdowns/ActionDropdown";
import { SelectionDropdown } from "@/components/dropdowns/SelectionDropdown";
import { OrangeProgressBar } from "@/components/OrangeProgressBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  careerDomainDropdownItem,
  individualSkills,
  skillDropDownItems,
} from "@/constants";
import { useGlobalContext } from "@/context/GlobalContext";
import usePageTitle from "@/hooks/usePageTitle";
import { useScreenSize } from "@/hooks/useScreenSize";
import DashboardLayout from "@/layouts/DashboardLayout";
import { BookOpenCheck, Check, Ellipsis, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "./components/Heading";

const SkillTracking = () => {
  usePageTitle("Skills Tracking");
  const { setBreadcrumbText } = useGlobalContext();
  const { isSmallScreen, isLargeScreen } = useScreenSize();

  useEffect(() => {
    setBreadcrumbText("Skill Tracker");
  }, []);

  const { data } = GetAllCareerDomains();

  const { mutate: enrollDomain } = GetUserEnrolledDomains();

  const handleDomainSelect = (domainId) => {
    enrollDomain(domainId);
  };

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
                <DropdownMenuContent>
                  {data?.careerDomains?.length === 0 ? (
                    <DropdownMenuItem disabled>
                      No domains available
                    </DropdownMenuItem>
                  ) : (
                    data?.careerDomains?.map((domain) => (
                      <DropdownMenuItem
                        key={domain.id}
                        onSelect={() => handleDomainSelect(domain.id)}
                        className="flex items-center justify-between"
                      >
                        <span>{domain.title}</span>
                        {domain.isEnrolled && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Domains />
          </div>
        </div>
        <IndividualSkills />
      </div>
    </DashboardLayout>
  );
};

export default SkillTracking;

const Domains = () => {
  const navigate = useNavigate();
  const { data, isLoading } = GetUserEnrolledDomains();
  const enrolledDomains = data?.careerDomains || [];

  const handleActions = (action, id) => {
    if (action === "delete") {
      // console.log("Delete domain with id:", id);
    }
  };

  return (
    <div>
      {isLoading ? (
        // 🔹 Skeleton loader
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <Skeleton className="h-40 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="px-4 pb-4">
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : enrolledDomains.length === 0 ? (
        // 🔹 Empty state
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="/public/domainImageFallback.svg"
            alt="No domains"
            className="w-20 h-20 mb-4 opacity-80"
          />
          <h2 className="text-lg font-semibold">
            You're not enrolled in any field yet
          </h2>
          <p className="text-sm text-muted-foreground">
            Start exploring and enroll in a domain to begin your journey 🚀
          </p>
        </div>
      ) : (
        // 🔹 Actual data
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enrolledDomains.map((domain) => (
            <div
              key={domain.id}
              className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className="relative h-40 w-full">
                <img
                  alt={domain.title}
                  src={domain.coverImage || "/fallback.jpg"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis
                      color="#FDFDFD"
                      size={20}
                      className="absolute top-2 right-2 cursor-pointer z-10"
                    />
                  </DropdownMenuTrigger>
                  <ActionDropdown
                    items={careerDomainDropdownItem}
                    onAction={(action) => handleActions(action, domain.id)}
                    variant="light"
                  />
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-1 p-4">
                <h1 className="text-lg font-semibold truncate">
                  {domain.title}
                </h1>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {domain.description}
                </p>
              </div>
              <div className="px-4 pb-4">
                <SecondaryButton
                  variant="dark"
                  title="View Domain"
                  className="w-full py-1"
                  textSmall
                  onClickHandler={() =>
                    navigate(
                      `/user/dashboard/skill-tracker/domain/${domain.id}`
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
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

const DomainsSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Title skeleton */}
      <Skeleton className="h-6 w-40 mb-6" />

      {/* Responsive skeleton grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col bg-gray-50 rounded-xl overflow-hidden"
          >
            {/* Image skeleton */}
            <Skeleton className="h-40 w-full" />

            {/* Text skeleton */}
            <div className="p-4 flex flex-col gap-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Button skeleton */}
            <div className="px-4 pb-4">
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
