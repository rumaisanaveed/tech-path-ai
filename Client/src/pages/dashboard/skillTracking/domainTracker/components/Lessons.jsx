import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, BookOpen, ArrowLeft, Eye, Lock } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAllUserLessons } from "@/apis/skillTracking/lessonTracking/lessonTracking.services";
import ViewLessonModal from "./ViewLessonModal";
import BuddyLessons from "@/components/skillTracking/buddy/BuddyLessons";

import peekImg from "@/assets/mascot/peaking.webp";

const Lessons = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useAllUserLessons(moduleId);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500">Loading lessons...</div>
      </DashboardLayout>
    );

  if (isError || !data?.success)
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-red-500">
          Failed to load lessons.
        </div>
      </DashboardLayout>
    );

  const module = data;

  const handleViewLesson = (lesson) => {
    if (lesson.locked) return; // locked, do nothing
    setSelectedLesson(lesson);
    setIsViewModalOpen(true);
  };

  return (
    <DashboardLayout>
      <BuddyLessons />
      <div className="p-6 space-y-6">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back to Modules
          </Button>
        </div>

        {/* Module Header */}
        <Card className="rounded-2xl border border-gray-100 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                  {module.title}
                </h1>
                <p className="text-sm text-gray-600 max-w-2xl">
                  {module.description}
                </p>
              </div>
              <Badge className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {module.badge || "Module"}
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
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

        {/* Lessons List */}
        <h2 className="text-lg font-semibold text-gray-800">Lessons</h2>

        {module.lessons && module.lessons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {module.lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={`rounded-xl border border-gray-100 shadow-sm transition relative ${
                  lesson.locked
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-md"
                }`}
              >
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="flex justify-between text-xs text-gray-700 mb-3">
                    <span>{lesson.isMandatory ? "Mandatory" : "Optional"}</span>
                    <span className="font-medium">Seq: {lesson.sequence}</span>
                  </div>

                  {lesson.locked ? (
                    <div className="relative group select-none flex flex-col items-center">
                      {/* Mascot with tooltip */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <img
                            src={peekImg}
                            alt="Peek"
                            className="
            absolute -top-14 left-1/2 -translate-x-1/2 w-14
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            z-[50] pointer-events-auto
          "
                          />
                        </TooltipTrigger>

                        <TooltipContent
                          side="top"
                          className="z-[60] text-center"
                        >
                          Complete previous lesson
                        </TooltipContent>
                      </Tooltip>

                      {/* Lock label */}
                      <div className="flex items-center justify-center gap-1 text-gray-600 font-medium text-sm">
                        <Lock size={14} /> Locked
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-1"
                      onClick={() => handleViewLesson(lesson)}
                    >
                      <Eye size={14} /> View Lesson
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No lessons available.</div>
        )}
      </div>

      {/* View Modal */}
      <ViewLessonModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        lesson={selectedLesson}
      />
    </DashboardLayout>
  );
};

export default Lessons;
