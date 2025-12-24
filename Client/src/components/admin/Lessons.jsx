import {
  DeleteAdminLesson,
  GetAllAdminLessonModules,
} from "@/apiService/LessonTracking";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Eye, Plus, Star, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddLessonModal from "./AddLessonModal";
import ViewLessonModal from "./ViewLessonModal";

const Lesson = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } =
    GetAllAdminLessonModules(moduleId);
  const deleteLessonMutation = DeleteAdminLesson();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  if (isLoading)
    return (
      <div className="p-6 text-center text-gray-500">Loading module...</div>
    );

  if (isError || !data?.success)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load module data.
      </div>
    );

  const module = data;

  const handleViewLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsViewModalOpen(true);
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      //await deleteLessonMutation.mutateAsync(lessonId);
      await refetch();
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Modules</span>
          </Button>
        </div>

        {/* --- Module Overview --- */}
        <Card className="rounded-2xl border border-gray-100 shadow-md bg-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
                  {module.title}
                </h1>
                <p className="text-sm text-gray-600 max-w-2xl">
                  {module.description}
                </p>
              </div>
              <Badge className="text-xs sm:text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full self-start sm:self-center">
                {module.badge || "No Badge"}
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                <span>{module.totalXp ?? 0} XP</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={14} className="text-blue-500" />
                <span>
                  {module.lessons?.length || 0}{" "}
                  {module.lessons?.length === 1 ? "Lesson" : "Lessons"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* --- Lessons Header --- */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-800">Lessons</h2>
          <Button
            className="flex items-center gap-1 bg-[#59A4C0] hover:bg-[#4b8aa5] w-full sm:w-auto"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            Add Lesson
          </Button>
        </div>

        {/* --- Lessons List --- */}
        {module.lessons && module.lessons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {module.lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-5 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                      {lesson.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-700 mb-3">
                      <span>
                        {lesson.isMandatory ? "Mandatory" : "Optional"}
                      </span>
                      <span className="font-medium">
                        Seq: {lesson.sequence}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-1"
                      onClick={() => handleViewLesson(lesson)}
                    >
                      <Eye size={14} /> View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full mt-2 flex items-center justify-center gap-1"
                      onClick={() => handleDeleteLesson(lesson.id)}
                      disabled={deleteLessonMutation.isLoading}
                    >
                      <Trash size={14} />
                      {deleteLessonMutation.isLoading
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm text-center">
            No lessons available.
          </div>
        )}
      </div>

      {/* --- Modals --- */}
      <AddLessonModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        moduleId={moduleId}
      />

      <ViewLessonModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        lesson={selectedLesson}
      />
    </>
  );
};

export default Lesson;
