import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import React from "react";

const CareerAssessmentManager = () => {
  usePageTitle("Career Assessment Manager");
  return (
    <AdminDashboardLayout>
      <h1>Career Assessment Manager</h1>
    </AdminDashboardLayout>
  );
};

export default CareerAssessmentManager;
