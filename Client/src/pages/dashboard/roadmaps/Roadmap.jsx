import { GetRoadmaps } from "@/apiService/Roadmaps";
import { BreadCrumb } from "@/components/careerAssessment/BreadCrumb";
import { useGlobalContext } from "@/context/GlobalContext";
import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Roadmap = () => {
  usePageTitle("Roadmaps");
  const { setBreadcrumbText } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    setBreadcrumbText("Roadmaps");
  }, []);

  const { data, isLoading: domainsLoading } = GetRoadmaps();

  return (
    <DashboardLayout>
      <div className="px-5 md:px-10 pt-5 pb-10 flex flex-col gap-8">
        {/* Breadcrumb & Heading */}
        <div className="flex flex-col gap-2">
          <BreadCrumb />
          <h2 className="text-2xl font-bold">Career Roadmaps</h2>
          <p className="text-gray-600 text-sm">
            Choose a domain to explore its roadmap.
          </p>
        </div>

        {/* Career Domains */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainsLoading && <p>Loading career domains...</p>}
          {data?.roadmaps?.map((domain) => (
            <div
              key={domain.id}
              onClick={() => navigate(`/user/dashboard/roadmaps/${domain.id}`)}
              className="p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition bg-card border border-border"
            >
              {domain.coverImage ? (
                <img
                  src={domain.coverImage}
                  alt={domain.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-3">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
              <h3 className="font-bold text-lg">{domain.title}</h3>
              <p className="text-sm text-gray-600">{domain.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Roadmap;
