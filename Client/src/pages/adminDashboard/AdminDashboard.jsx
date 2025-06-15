import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import React from "react";

export const AdminDashboard = () => {
  usePageTitle("Admin Dashboard");
  return <AdminDashboardLayout>Admin Dashboard</AdminDashboardLayout>;
};
