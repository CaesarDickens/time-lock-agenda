"use client";

import React from "react";

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label = "Progress",
  className = "",
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const getProgressColor = () => {
    if (clampedProgress >= 80) return "bg-green-500";
    if (clampedProgress >= 60) return "bg-blue-500";
    if (clampedProgress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getProgressText = () => {
    if (clampedProgress >= 80) return "Excellent";
    if (clampedProgress >= 60) return "Good";
    if (clampedProgress >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{clampedProgress}%</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getProgressColor().replace('bg-', 'bg-opacity-20 text-').replace('500', '700')}`}>
              {getProgressText()}
            </span>
          </div>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`${getProgressColor()} h-3 rounded-full transition-all duration-500 ease-out relative`}
          style={{ width: `${clampedProgress}%` }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
