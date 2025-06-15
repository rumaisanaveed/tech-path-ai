import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import React from "react";

const CareerExplorer = () => {
  usePageTitle("Admin Careers");
  return (
    <AdminDashboardLayout>
      <div className="career-explorer">
        <h1>Career Explorer Page</h1>
        <p>Explore various career paths and opportunities.</p>
      </div>
    </AdminDashboardLayout>
  );
};

export default CareerExplorer;
