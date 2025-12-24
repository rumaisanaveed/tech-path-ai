import { AddEditCareerForm } from "@/components/admin/careers/AddEditCareerForm";
import { EventsHeader } from "@/components/admin/events/EventsComponents";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Compass } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const initialData = {
  name: "Sample Career Title",
  description:
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This is a sample career description."}]}]}',
  coverImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLf2mXAcFRF-oD0L5-9kHMZ-9bFSWcrBXLfw&s",
};

const EditCareer = () => {
  usePageTitle("Edit Career");

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    // console.log("Edit career form data", data);
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <EventsHeader
            icon={<Compass className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-orange-light"
            title="Edit Career"
            buttonTitle="Back to Careers"
            onAddButtonClick={() => navigate("/admin/dashboard/careers/add")}
            buttonClassName="bg-custom-orange-light"
            subtitle=""
          />

          <AddEditCareerForm
            initialData={initialData}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default EditCareer;
