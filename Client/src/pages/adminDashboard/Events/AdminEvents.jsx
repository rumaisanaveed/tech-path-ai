import React from "react";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import usePageTitle from "@/hooks/usePageTitle";

const AdminEvents = () => {
  usePageTitle("Admin Events");
  return (
    <AdminDashboardLayout>
      <div className="admin-events">
        <h1>Admin Events Page</h1>
        {/* Add your event management components here */}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminEvents;
