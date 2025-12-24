import {
  AdminCareerCard,
  AdminCareersSkeleton,
} from "@/components/admin/careers/AdminCareersComponents";
import { careers } from "@/components/admin/careers/constants";
import { EventsHeader } from "@/components/admin/events/EventsComponents";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminCareers = () => {
  usePageTitle("Admin Careers");

  const navigate = useNavigate();

  const isLoading = false;

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-4">
          <EventsHeader
            icon={<Compass className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-orange-light"
            title="Career Explorer Management"
            buttonTitle="Add Career"
            onAddButtonClick={() => navigate("/admin/dashboard/careers/add")}
            buttonClassName="bg-custom-orange-light"
            subtitle="Create, update, or manage career paths and guidance"
          />

          {isLoading ? (
            <AdminCareersSkeleton />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {careers.map((career) => (
                <AdminCareerCard key={career.id} career={career} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminCareers;
