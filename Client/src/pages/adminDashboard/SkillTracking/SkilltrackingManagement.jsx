import SkillTrackingBox from "@/components/admin/SkillTrackingBox";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import React from "react";

const SkilltrackingManagement = () => {
  usePageTitle("Skill Tracking Management");
  return (
    <AdminDashboardLayout>
      <div className="p-4">
        <SkillTrackingBox />
      </div>
    </AdminDashboardLayout>
  );
};

export default SkilltrackingManagement;
