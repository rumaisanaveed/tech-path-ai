import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddNewLessonAdmin } from "@/apis/skillTracking/lessonTracking/lessonTracking.services";

const AddLessonModal = ({ open, onClose, moduleId }) => {
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    isMandatory: true,
  });

  const { mutateAsync: addLesson, isLoading } = useAddNewLessonAdmin(moduleId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLesson = async () => {
    try {
      await addLesson(newLesson);
      onClose();
    } catch (err) {
      console.error("Error adding lesson:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Lesson</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Lesson Title
            </label>
            <Input
              name="title"
              value={newLesson.title}
              onChange={handleInputChange}
              placeholder="Enter lesson title"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              name="description"
              value={newLesson.description}
              onChange={handleInputChange}
              placeholder="Write a short description"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-[#59A4C0]"
            onClick={handleAddLesson}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Lesson"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonModal;
