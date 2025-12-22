import { AddEditCareerForm } from "@/components/admin/careers/AddEditCareerForm";
import { EventsHeader } from "@/components/admin/events/EventsComponents";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Compass } from "lucide-react";
import React from "react";

const AddCareer = () => {
  usePageTitle("Add New Career");

  const handleSubmit = (data) => {
    // console.log("Add career form data", data);
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <EventsHeader
            icon={<Compass className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-orange-light"
            title="Add New Career"
            buttonTitle="Back to Careers"
            onAddButtonClick={() => navigate("/admin/dashboard/careers/add")}
            buttonClassName="bg-custom-orange-light"
            subtitle=""
          />

          <AddEditCareerForm onSubmit={handleSubmit} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AddCareer;
