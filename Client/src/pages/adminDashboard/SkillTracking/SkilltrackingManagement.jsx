import SkillTrackingBox from "@/components/admin/SkillTrackingBox";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import React from "react";

const SkilltrackingManagement = () => {
  return (
    <AdminDashboardLayout>
      <div className="p-4">
        <SkillTrackingBox />
      </div>
    </AdminDashboardLayout>
  );
};

export default SkilltrackingManagement;
