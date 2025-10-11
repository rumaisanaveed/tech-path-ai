import Lesson from '@/components/admin/Lessons'
import AdminDashboardLayout from '@/layouts/AdmindashboardLayout'
import React from 'react'

const LessonPage = () => {
  return (
    <AdminDashboardLayout>
      <Lesson/>
    </AdminDashboardLayout>
  )
}

export default LessonPage