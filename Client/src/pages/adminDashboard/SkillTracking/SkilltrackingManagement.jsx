import SkilltrckingBox from "@/components/admin/SkilltrckingBox";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import React from "react";

const SkilltrackingManagement = () => {
  return (
    <AdminDashboardLayout>
      <div className="p-4">
        <SkilltrckingBox />
      </div>
    </AdminDashboardLayout>
  );
};

export default SkilltrackingManagement;
