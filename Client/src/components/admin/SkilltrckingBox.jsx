import React, { useState } from "react";
import {
  useAdminAllCareerDomains,
  useDeleteCareerDomain,
  useStatusToggleDomain,
  useCreateCareerDomain,
} from "@/apis/skillTracking/skillTracking.services";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Message } from "../Message";
import { useNavigate } from "react-router-dom";

const SkilltrckingBox = () => {

  const  navigate  = useNavigate();

  // Queries & Mutations
  const { data } = useAdminAllCareerDomains();
  const { mutate: toggleDomainStatus } = useStatusToggleDomain();
  const { mutate: deleteDomain } = useDeleteCareerDomain();
  const { mutate: createDomain, isLoading: creating } = useCreateCareerDomain();

  const domains = data?.domains || [];

  // Form dialog state
  const [open, setOpen] = useState(false);

  // useForm hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit form
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", data.file[0]); // file comes as array

    createDomain(formData, {
      onSuccess: () => {
        setOpen(false);
        reset(); // clears the form
      },
    });
  };

  // Delete handler
  const handleDeleteDomain = (domainId) => {
    deleteDomain(domainId);
  };

  return (
    <div className="p-6">
      {/* Header with Add button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Career Domains</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Career Domain</DialogTitle>
            </DialogHeader>

            {/* Form with react-hook-form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                placeholder="Domain Title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <Message variant="error" message={errors.title.message} />
              )}

              <Textarea
                placeholder="Description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && (
                <Message variant="error" message={errors.description.message} />
              )}

              <Input
                type="file"
                accept="image/*"
                {...register("file", { required: "Cover image is required" })}
              />
              {errors.file && (
                <Message variant="error" message={errors.file.message} />
              )}

              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? "Creating..." : "Submit"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Boxes grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {domains.map((domain) => (
        <div
          key={domain.id}
          className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          {/* Cover Image */}
          <div className="relative h-40 w-full">
            <img
              alt={domain.title}
              src={domain.coverImage || "/fallback.jpg"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1 p-4">
            <h1 className="text-lg font-semibold truncate">{domain.title}</h1>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {domain.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 pb-4">
            {/* Toggle Active/Inactive */}
            <div className="flex items-center gap-2">
              <Switch
                checked={domain.isActive}
                onCheckedChange={() => toggleDomainStatus(domain.id)}
              />
              <span className="text-sm">Active</span>
            </div>

            {/* Buttons: Edit + Delete */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/admin/dashboard/skill-tracking/edit/${domain.id}`)}
              >
                Edit
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteDomain(domain.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SkilltrckingBox;
