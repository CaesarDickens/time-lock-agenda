"use client";

import React from "react";

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  className?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label = "Progress",
  className = "",
  showPercentage = true,
  color = 'blue',
  size = 'md',
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const getColorClasses = () => {
    switch (color) {
      case 'green': return 'bg-green-600';
      case 'yellow': return 'bg-yellow-600';
      case 'red': return 'bg-red-600';
      default: return 'bg-blue-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-1.5';
      case 'lg': return 'h-4';
      default: return 'h-2.5';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-500">{clampedProgress}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${getSizeClasses()}`}>
        <div
          className={`${getColorClasses()} ${getSizeClasses()} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
    </div>
  );
};
