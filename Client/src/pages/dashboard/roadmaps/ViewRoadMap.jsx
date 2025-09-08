import { BreadCrumb } from "@/components/careerAssessment/BreadCrumb";
import { useGlobalContext } from "@/context/GlobalContext";
import usePageTitle from "@/hooks/usePageTitle";
import { useRoadmaps } from "@/apis/roadMaps/roadmap.services";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEnrollInCareerDomain } from "@/apis/skillTracking/skillTracking.services";
import { useScreenSize } from "@/hooks/useScreenSize";
import ModuleCard from "@/components/roadmap/ModuleCard";


const ViewRoadMap = () => {
  const { id } = useParams();
  usePageTitle("Roadmap Tracking");
  const { setBreadcrumbText } = useGlobalContext();
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  const { isSmallScreen } = useScreenSize();

  useEffect(() => {
    setBreadcrumbText("Roadmaps");
  }, []);

  const { data: roadmapData, isLoading } = useRoadmaps(id);
  const { mutate: enrollDomain, isPending: enrolling } =
    useEnrollInCareerDomain();

  const toggleModule = (moduleId) => {
    setExpandedModuleId((prev) => (prev === moduleId ? null : moduleId));
  };

  const handleEnroll = () => {
    if (!id) return;
    enrollDomain(id);
  };

  return (
    <DashboardLayout>
      <div className="px-4 md:px-8 lg:px-12 pt-5 pb-10 flex flex-col gap-8">
        {/* Breadcrumb & Heading */}
        <div className="flex flex-col gap-2">
          <BreadCrumb />
          <h2 className="text-xl md:text-2xl font-bold">
            Roadmap Details of {roadmapData?.domain?.title}
          </h2>

          {/* Enroll button */}
          {roadmapData?.isEnrolled ? (
            <Button disabled variant="secondary" className="w-full md:w-auto">
              Already Enrolled
            </Button>
          ) : (
            <Button
              onClick={handleEnroll}
              disabled={enrolling}
              className="w-full md:w-auto"
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </Button>
          )}
        </div>

        {/* Roadmap Content */}
        {isLoading ? (
          <p>Loading roadmap...</p>
        ) : roadmapData?.roadmap?.length ? (
          <div className="relative">
            {!isSmallScreen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-[#59a4c0]" />
            )}

            <div className="flex flex-col gap-12 relative">
              {roadmapData.roadmap
                .sort((a, b) => a.sequence - b.sequence)
                .map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    expandedModuleId={expandedModuleId}
                    toggleModule={toggleModule}
                    isSmallScreen={isSmallScreen}
                    index={index}
                  />
                ))}
            </div>
          </div>
        ) : (
          <p>No roadmap found for this domain.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewRoadMap;
