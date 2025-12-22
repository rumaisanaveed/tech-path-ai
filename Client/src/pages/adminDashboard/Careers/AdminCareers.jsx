import { EventsHeader } from "@/components/admin/events/EventsComponents";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Compass, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const careers = [
  {
    id: 1,
    name: "Software Engineer",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },
  {
    id: 2,
    name: "Data Scientist",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },
  {
    id: 3,
    name: "Data Scientist",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },
  {
    id: 4,
    name: "Data Scientist",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },
];

const AdminCareers = () => {
  usePageTitle("Admin Careers");
  const navigate = useNavigate();
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

          {/* Career Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {careers.map((career) => (
              <div
                key={career.id}
                className="group flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-4"
              >
                {/* Left: Image + Name */}
                <div className="flex items-center gap-4">
                  <img
                    src={career.image}
                    alt={career.name}
                    className="h-16 w-16 rounded-lg object-cover border"
                  />

                  <h3 className="text-lg font-medium text-custom-black-dark group-hover:text-custom-orange-dark transition truncate">
                    {career.name}
                  </h3>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                  <button
                    className="p-2 rounded-md border border-custom-orange-dark/30 text-custom-orange-dark hover:bg-custom-orange-dark hover:text-white transition"
                    title="Edit"
                    onClick={() =>
                      navigate(`/admin/dashboard/careers/edit/${career.id}`)
                    }
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="p-2 rounded-md border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminCareers;
