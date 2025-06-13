import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import React from "react";

export const AdminDashboard = () => {
  usePageTitle("admin-dashboard");
  return <AdminDashboardLayout>Admin Dashboard</AdminDashboardLayout>;
};
