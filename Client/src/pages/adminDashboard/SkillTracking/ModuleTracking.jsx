import ModuleTrackingBox from '@/components/admin/ModuleTrackingBox'
import AdminDashboardLayout from '@/layouts/AdmindashboardLayout'
import React from 'react'

const ModuleTracking = () => {
  return (
     <AdminDashboardLayout>
      <div className="p-4">
        <ModuleTrackingBox />
      </div>
    </AdminDashboardLayout>
  )
}

export default ModuleTracking