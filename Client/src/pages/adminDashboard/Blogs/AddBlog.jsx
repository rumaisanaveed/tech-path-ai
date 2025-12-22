import { EventsHeader } from "@/components/admin/events/EventsComponents";
import { AddEditBlogForm } from "@/components/blogs/BlogForm";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  usePageTitle("Add New Blog");
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    // console.log("Add blog form data", data);
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <EventsHeader
            icon={<Book className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-light-blue"
            buttonClassName="bg-custom-light-blue"
            title={"Add New Blog"}
            buttonTitle="Back to Blogs"
            onAddButtonClick={() => navigate("/admin/dashboard/blogs")}
            subtitle=""
          />

          <AddEditBlogForm onSubmit={handleSubmit} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AddBlog;
