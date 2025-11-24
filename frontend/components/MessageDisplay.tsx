"use client";

import React from "react";

interface MessageDisplayProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  className?: string;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  type = "info",
  className = "",
}) => {
  if (!message) return null;

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className={`p-4 border rounded-lg transition-all duration-300 animate-in slide-in-from-top-2 ${getStyles()} ${className}`}>
      <div className="flex items-start space-x-3">
        <span className="text-lg flex-shrink-0">{getIcon()}</span>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
          {type === "error" && (
            <p className="text-xs mt-1 opacity-75">
              If this problem persists, please refresh the page or contact support.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
