import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function TaskCard({ task }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-sm hover:shadow-md transition">
            <div className="font-semibold text-gray-800">{task.title}</div>
            <p className="text-gray-500 mt-1 text-xs">{task.description}</p>
            <div className="text-xs text-gray-400 mt-2">
                Assigned to:{" "}
                <span className="text-indigo-600 font-medium">
                    {task.assignee?.name || "N/A"}
                </span>
            </div>
        </div>
    );
}
export default function TaskBoard() {
    const { tasksByCategory } = usePage().props;
    const categories = Object.keys(tasksByCategory);

    const [newListTitle, setNewListTitle] = useState("");
    const [newTaskTitle, setNewTaskTitle] = useState({});
    const [newTaskDesc, setNewTaskDesc] = useState({});
    const [activeAddTask, setActiveAddTask] = useState(null);

    const handleAddList = () => {
        if (!newListTitle.trim()) return;

        // Tambah list kosong (tidak langsung ke backend karena list = category)
        tasksByCategory[newListTitle] = [];
        setNewListTitle("");
    };

    const handleAddTask = (category) => {
        const title = newTaskTitle[category];
        const description = newTaskDesc[category];

        if (!title?.trim()) return;

        router.post(
            "/tasks",
            {
                title,
                description,
                category,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setNewTaskTitle({ ...newTaskTitle, [category]: "" });
                    setNewTaskDesc({ ...newTaskDesc, [category]: "" });
                    setActiveAddTask(null);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Tasks" />
            <div className="px-6 py-4 bg-[#f9fafb] min-h-screen">
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="w-64 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-xl p-4"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-sm font-semibold text-gray-700">
                                    {category}
                                </h2>
                            </div>

                            <div className="space-y-3 mb-3">
                                {(tasksByCategory[category] || []).map(
                                    (task) => (
                                        <TaskCard key={task.id} task={task} />
                                    )
                                )}
                            </div>

                            {activeAddTask === category ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 text-sm border rounded"
                                        placeholder="Task title..."
                                        value={newTaskTitle[category] || ""}
                                        onChange={(e) =>
                                            setNewTaskTitle({
                                                ...newTaskTitle,
                                                [category]: e.target.value,
                                            })
                                        }
                                    />
                                    <textarea
                                        className="w-full px-2 py-1 text-sm border rounded"
                                        placeholder="Task description..."
                                        rows={2}
                                        value={newTaskDesc[category] || ""}
                                        onChange={(e) =>
                                            setNewTaskDesc({
                                                ...newTaskDesc,
                                                [category]: e.target.value,
                                            })
                                        }
                                    />
                                    <div className="flex space-x-2 text-sm">
                                        <button
                                            onClick={() =>
                                                handleAddTask(category)
                                            }
                                            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                                        >
                                            Add Task
                                        </button>
                                        <button
                                            onClick={() =>
                                                setActiveAddTask(null)
                                            }
                                            className="text-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setActiveAddTask(category)}
                                    className="mt-2 text-xs text-gray-500 hover:text-indigo-600 flex items-center space-x-1"
                                >
                                    <span>＋</span>
                                    <span>Add task</span>
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add List Column */}
                    <div className="w-64 flex-shrink-0 border-2 border-dashed border-gray-300 rounded-xl p-4 bg-white">
                        <input
                            type="text"
                            placeholder="Enter list title..."
                            className="w-full px-3 py-2 text-sm border rounded outline-none focus:ring-2 focus:ring-indigo-500"
                            value={newListTitle}
                            onChange={(e) => setNewListTitle(e.target.value)}
                        />
                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={handleAddList}
                                className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700"
                            >
                                Add list
                            </button>
                            <button
                                onClick={() => setNewListTitle("")}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
