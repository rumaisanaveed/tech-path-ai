import { EventsHeader } from "@/components/admin/events/EventsComponents";
import { AddEditBlogForm } from "@/components/blogs/BlogForm";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Book } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const initialData = {
  title: "Sample Blog Title",
  description:
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This is a sample blog description."}]}]}',
  coverImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLf2mXAcFRF-oD0L5-9kHMZ-9bFSWcrBXLfw&s",
  tags: ["Sample", "Blog", "Test"],
};

const EditBlog = () => {
  usePageTitle("Edit Blog");
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    // console.log("Edit blog form data", data);
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <EventsHeader
            icon={<Book className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-light-blue"
            buttonClassName="bg-custom-light-blue"
            title={"Edit Blog"}
            buttonTitle="Back to Blogs"
            onAddButtonClick={() => navigate("/admin/dashboard/blogs")}
            subtitle=""
          />

          <AddEditBlogForm initialData={initialData} onSubmit={handleSubmit} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};
export default EditBlog;
