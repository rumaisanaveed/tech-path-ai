import React from "react";
import { Progress } from "./ui/progress";

export const CustomLessonProgressBar = ({ xpearned, totalXP }) => {
  const progressValue = totalXP ? (xpearned / totalXP) * 100 : 0;
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3 mt-8 w-full 3xl:w-[650px]">
     <p className="text-gray-800 font-medium text-sm md:text-base whitespace-nowrap">
        {xpearned} / {totalXP} XP
      </p>

      <div className="w-full p-[2px] h-3 rounded-full bg-gradient-to-r from-[#F3B34E] via-[#FFD272] to-[#59A4C0] overflow-hidden">
        <Progress
          value={progressValue}
          className="w-full h-full bg-white rounded-full"
          indicatorClassName="rounded-l-full"
          indicatorStyle={{
            background: "linear-gradient(90deg, #F3B34E, #FFD272, #59A4C0)",
          }}
        />
      </div>
    </div>
  );
};
