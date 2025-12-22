import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

const Achievements = () => {
  usePageTitle("Achievements");
  return (
    <DashboardLayout>
      <div>Achievements</div>
    </DashboardLayout>
  );
};

export default Achievements;
