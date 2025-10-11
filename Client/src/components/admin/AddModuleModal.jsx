import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useAdminAllModulesFromDomain } from "@/apis/skillTracking/skillTracking.services";

const AddModuleModal = ({ open, setOpen, onSubmit, domainId }) => {

  //FIX: PREREQUESTMODULEID GOING NULL EVERYTIME AND TYPEID ALSO
  const { data: modulesData } = useAdminAllModulesFromDomain(domainId);

  const { register, handleSubmit, control, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      badge: "",
      totalXp: 0,
      typeId: 1,
      isFeatured: false,
      prerequisiteModuleId: "",
      sequence: 0,
    },
  });

  const handleFormSubmit = async (data) => {
    const payload = {
    ...data,
    typeId: Number(data.typeId),
    prerequisiteModuleId: data.prerequisiteModuleId ? Number(data.prerequisiteModuleId) : null,
  };
  await onSubmit(payload);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#59A4C0] hover:bg-[#59A4C0]/10 transition-all cursor-pointer h-56">
          <CardContent className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#59A4C0]/10">
              <Plus className="text-[#59A4C0]" size={24} />
            </div>
            <p className="text-[#59A4C0] font-medium text-sm">Add New Module</p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Add New Module</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Module Title</label>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter module title"
                {...register("title", { required: true })}
                className="flex-1"
              />
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#59A4C0]/20 text-[#59A4C0] font-bold">
                {control._formValues?.title?.[0]?.toUpperCase() || "?"}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              placeholder="Enter module description"
              {...register("description", { required: true })}
            />
          </div>

          {/* Badge */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Badge</label>
            <Input placeholder="Enter badge identifier" {...register("badge")} />
          </div>

          {/* Total XP */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Total XP</label>
            <Input
              type="number"
              placeholder="Enter total XP"
              {...register("totalXp", { valueAsNumber: true })}
            />
          </div>

          {/* Sequence */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Sequence</label>
            <Input
              type="number"
              placeholder="Enter sequence"
              {...register("sequence", { valueAsNumber: true })}
            />
          </div>

          {/* Module Type */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Module Type</label>
            <Controller
              name="typeId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#59A4C0]/50"
                >
                  <option value={1}>Beginner</option>
                  <option value={2}>Intermediate</option>
                  <option value={3}>Advanced</option>
                </select>
              )}
            />
          </div>

          {/* Prerequisite Module */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Prerequisite Module</label>
            <Controller
              name="prerequisiteModuleId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#59A4C0]/50"
                >
                  <option value="">None</option>
                  {modulesData?.modules?.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.title}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Featured Switch */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Featured</span>
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              {isSubmitting ? "Creating..." : "Create Module"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModuleModal;
