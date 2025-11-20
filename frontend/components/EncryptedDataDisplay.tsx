"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { ProgressBar } from "./ProgressBar";

interface EncryptedDataDisplayProps {
  targetGoals?: number;
  completedGoals?: number;
  completionRate?: number;
  avgPriority?: number;
  isLoading?: boolean;
}

export const EncryptedDataDisplay: React.FC<EncryptedDataDisplayProps> = ({
  targetGoals,
  completedGoals,
  completionRate,
  avgPriority,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Encrypted Study Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decrypted Study Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Target Goals</label>
            <p className="text-2xl font-bold text-blue-600">{targetGoals ?? "—"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Completed Goals</label>
            <p className="text-2xl font-bold text-green-600">{completedGoals ?? "—"}</p>
          </div>
        </div>

        {completionRate !== undefined && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Completion Rate
            </label>
            <ProgressBar progress={completionRate} />
            <p className="text-sm text-gray-600 mt-1">{completionRate}% completed</p>
          </div>
        )}

        {avgPriority !== undefined && (
          <div>
            <label className="text-sm font-medium text-gray-700">Average Priority</label>
            <p className="text-lg font-semibold">{avgPriority.toFixed(1)}/3</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
