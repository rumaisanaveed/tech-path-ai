import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import LessonItem from "./LessonItem";

const ModuleCard = ({
  module,
  expandedModuleId,
  toggleModule,
  isSmallScreen,
  index,
}) => {

  console.log("Rendering ModuleCard for module:", module);

  const isLeft = index % 2 === 0;
  const circleColor = isLeft ? "#ED843B" : "#F3B34E";

  return (
    <div
      className={`flex w-full ${
        isSmallScreen
          ? "justify-center"
          : isLeft
          ? "justify-start pr-6 md:pr-10"
          : "justify-end pl-6 md:pl-10"
      }`}
    >
      {/* Module block */}
      <div
        className="relative w-full md:w-5/12 p-5 rounded-lg shadow bg-card border-2 hover:shadow-lg transition cursor-pointer"
        style={{ borderColor: "#FFD272" }}
        onClick={() => toggleModule(module.id)}
      >
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg">
            {module.sequence}. {module.title}
          </h4>
          {expandedModuleId === module.id ? (
            <ChevronDown className="w-5 h-5 text-[#59a4c0]" />
          ) : (
            <ChevronRight className="w-5 h-5 text-[#59a4c0]" />
          )}
        </div>

        <p className="text-sm text-gray-600 mb-1">{module.description}</p>
        <p className="text-xs text-gray-500">
          Completion: {module.completionRate}% ({module.obtainedXP}/{module.totalXP} XP)
        </p>

        {/* Lessons */}
        {expandedModuleId === module.id && (
          <div className="mt-3 flex flex-col gap-2">
            {module.lessons?.length ? (
              module.lessons
                .sort((a, b) => a.sequence - b.sequence)
                .map((lesson) => <LessonItem key={lesson.id} lesson={lesson} />)
            ) : (
              <p className="text-xs text-gray-400">No lessons available.</p>
            )}
          </div>
        )}
      </div>

      {/* Sequence circle (hide on small screens) */}
      {!isSmallScreen && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 w-8 h-8 md:w-10 md:h-10 rounded-full text-white flex items-center justify-center font-bold shadow"
          style={{ backgroundColor: circleColor }}
        >
          {module.sequence}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
