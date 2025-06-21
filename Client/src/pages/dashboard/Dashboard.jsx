import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

export const Dashboard = () => {
  usePageTitle("Dashboard");
  return <DashboardLayout>Dashboard Page</DashboardLayout>;
};
