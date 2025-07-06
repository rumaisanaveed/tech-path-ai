import React from "react";
import { Progress } from "./ui/progress";

export const OrangeProgressBar = ({
  // TODO : Fix the stylings of the circular progress bar
  value,
  variant = "default",
  size = 180, // Size for circular progress (width and height)
  strokeWidth = 8, // Stroke width for circular progress
  showPercentage = true, // Whether to show percentage text in circular variant
}) => {
  // Circular progress bar variant
  if (variant === "rounded") {
    const radius = size / 2; // Radius of the circle
    const adjustedStrokeWidth = strokeWidth;
    const normalizedRadius = radius - adjustedStrokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Background circle */}
        <svg
          height={size}
          width={size}
          className="absolute transform -rotate-90"
        >
          <circle
            stroke="#f3f4f6" // Light gray background
            fill="transparent"
            strokeWidth={adjustedStrokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#F7BC59" // Orange color (matching custom-orange-dark)
            fill="transparent"
            strokeWidth={adjustedStrokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-300 ease-in-out"
          />
        </svg>

        {/* Center percentage text */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-medium text-gray-800">{value}%</span>
          </div>
        )}
      </div>
    );
  }

  // Default linear progress bar
  return (
    <div className="w-full p-[2px] h-3 rounded-full bg-custom-orange-dark overflow-hidden">
      <Progress
        value={value}
        className="w-full h-full bg-white rounded-full"
        indicatorClassName="rounded-l-full border-none bg-custom-orange-dark"
      />
    </div>
  );
};
