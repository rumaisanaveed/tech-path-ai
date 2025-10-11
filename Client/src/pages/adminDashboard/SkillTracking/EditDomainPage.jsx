import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import DomainEdit from "@/components/admin/DomainEdit";
import ModuleTrackingBox from "@/components/admin/ModuleTrackingBox";

const EditDomainPage = () => {
  const navigate = useNavigate();

  return (
    <AdminDashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="border-[#59A4C0] text-[#59A4C0] hover:bg-[#59A4C0]/10"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Button>
          </div>
        </div>

        {/* Domain Info */}
        <DomainEdit />

        {/* Modules Grid */}
        <ModuleTrackingBox />
      </div>
    </AdminDashboardLayout>
  );
};

export default EditDomainPage;
