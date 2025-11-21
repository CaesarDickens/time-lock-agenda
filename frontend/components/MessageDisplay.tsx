"use client";

import React, { useState, useEffect } from "react";

interface MessageDisplayProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  className?: string;
  dismissible?: boolean;
  autoHide?: boolean;
  duration?: number;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  type = "info",
  className = "",
  dismissible = false,
  autoHide = false,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, isVisible]);

  if (!message || !isVisible) return null;

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

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div className={`p-4 border rounded-lg ${getStyles()} ${className} relative`}>
      <div className="flex items-start justify-between">
        <p className="text-sm flex-1">{message}</p>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
