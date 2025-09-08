import React from "react";

const LessonItem = ({ lesson }) => {
  return (
    <div
      className="flex justify-between items-center bg-gray-50 p-2 rounded border"
      style={{ borderColor: "#FFD272" }}
    >
      <div>
        <h5 className="font-medium text-sm text-[#ED843B]">{lesson.title}</h5>
        <p className="text-xs text-gray-600">{lesson.description}</p>
      </div>
      <span
        className="text-xs px-2 py-1 rounded"
        style={{
          backgroundColor: lesson.isCompleted ? "#59a4c0" : "#F3B34E",
          color: lesson.isCompleted ? "white" : "#3A3A3A",
        }}
      >
        {lesson.isCompleted ? "Done" : "Pending"}
      </span>
    </div>
  );
};

export default LessonItem;
