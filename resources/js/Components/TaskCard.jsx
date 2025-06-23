import React from "react";

export default function TaskCard({ task }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition">
            <div className="font-semibold text-gray-800 text-sm mb-1">
                {task.title}
            </div>
            {task.description && (
                <div className="text-xs text-gray-500">{task.description}</div>
            )}
            <div className="mt-2 text-xs text-gray-400">
                Assigned to:{" "}
                <span className="font-medium text-gray-600">
                    {task.assignee?.name || "N/A"}
                </span>
            </div>
        </div>
    );
}
