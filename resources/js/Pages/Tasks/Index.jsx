import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function TaskModal({
    show,
    onClose,
    onSubmit,
    title,
    setTitle,
    description,
    setDescription,
    project,
    list,
}) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 overflow-auto">
            <div className="bg-white w-full max-w-4xl min-h-[500px] rounded-md shadow-lg flex flex-row overflow-hidden relative">
                {/* HEADER */}
                <div className="absolute top-0 left-0 w-full border-b px-6 py-4 flex justify-between items-center bg-white z-10">
                    <h2 className="text-sm text-gray-600 font-semibold">
                        {project?.name} / {list?.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* CONTENT LEFT */}
                <div className="flex-1 px-6 pt-20 pb-6">
                    <input
                        type="text"
                        placeholder="Task title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-lg font-bold text-gray-800 w-full mb-2 focus:outline-none border border-gray-300 rounded px-3 py-2"
                    />
                    <textarea
                        placeholder="Tambahkan deskripsi..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded text-sm mb-4"
                        rows={3}
                    ></textarea>

                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={onSubmit}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Checklist */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-2">
                            Checklist
                        </h3>
                        <button className="text-xs text-indigo-600 hover:underline">
                            ＋ Add Item
                        </button>
                    </div>

                    {/* Comments */}
                    <div>
                        <h3 className="text-sm font-semibold mb-2">
                            Comments 0
                        </h3>
                        <textarea
                            placeholder="Write a comment"
                            className="w-full border px-3 py-2 rounded text-sm mb-2"
                            rows={2}
                        />
                        <button className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
                            Comment
                        </button>
                    </div>
                </div>

                {/* SIDEBAR RIGHT */}
                <div className="w-64 border-l border-gray-200 px-6 pt-20 pb-6">
                    <div className="text-sm text-gray-700 space-y-6">
                        <InfoItem label="Time" value="00:00:00" />
                        <InfoItem label="Project List" value={list?.name} />
                        <InfoItem
                            label="Assignee"
                            value={
                                <span className="text-indigo-600 font-medium cursor-pointer">
                                    + Add
                                </span>
                            }
                        />
                        <InfoItem label="Due Date" value="No due date" />
                        <InfoItem
                            label="Labels"
                            value={
                                <span className="text-indigo-600 font-medium cursor-pointer">
                                    + Add
                                </span>
                            }
                        />
                        <InfoItem
                            label="Repeat"
                            value={
                                <span className="text-indigo-600 font-medium cursor-pointer">
                                    + Add
                                </span>
                            }
                        />
                        <InfoItem
                            label="Delete"
                            value={
                                <button className="text-red-600 font-medium">
                                    Delete
                                </button>
                            }
                        />
                        <InfoItem
                            label="Share"
                            value={
                                <a
                                    href="#"
                                    className="text-indigo-600 text-sm hover:underline"
                                >
                                    Open in new tab ↗
                                </a>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
function InfoItem({ label, value }) {
    return (
        <div>
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div>{value}</div>
        </div>
    );
}
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
    const { taskLists, projectId, project } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [currentListId, setCurrentListId] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDesc, setModalDesc] = useState("");
    const [checklists, setChecklists] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [listToDelete, setListToDelete] = useState(null);

    const [newListTitle, setNewListTitle] = useState("");

    const handleModalSubmit = () => {
        if (!modalTitle.trim()) return;

        router.post(
            "/tasks",
            {
                title: modalTitle,
                description: modalDesc,
                project_id: projectId,
                task_list_id: currentListId,
                assigned_to: 1, // default user sementara
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    setModalTitle("");
                    setModalDesc("");
                    setCurrentListId(null);
                },
            }
        );
    };
    const handleDeleteList = (list) => {
        if (!list) return;

        router.delete(`/task-lists/${list.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                console.log(`List "${list.name}" deleted.`);
            },
        });
    };

    const confirmDeleteList = () => {
        if (!listToDelete) return;

        router.delete(`/task-lists/${listToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteModal(false);
                setListToDelete(null);
            },
        });
    };

    const handleAddList = () => {
        if (!newListTitle.trim()) return;

        router.post(
            "/task-lists",
            {
                name: newListTitle,
                project_id: projectId,
            },
            {
                preserveScroll: true,
                onSuccess: () => setNewListTitle(""),
            }
        );
    };
    return (
        <AuthenticatedLayout>
            <Head title="Project Tasks" />
            <div className="px-6 py-4 bg-[#f9fafb] min-h-screen">
                <div className="flex items-center space-x-3 mb-6">
                    <span
                        className="inline-block w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: project.color }}
                    ></span>
                    <h1 className="text-xl font-bold text-gray-800">
                        {project.name}
                    </h1>
                </div>

                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {taskLists.map((list) => (
                        <div
                            key={list.id}
                            className="w-64 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-xl p-4"
                        >
                            <div className="flex justify-between items-center mb-3 relative">
                                <h2 className="text-sm font-semibold text-gray-700">
                                    {list.name}
                                </h2>

                                {/* Tombol delete (hover = X, klik = hapus) */}
                                <div className="relative group">
                                    <button
                                        onClick={() => {
                                            setListToDelete(list); // ← ini penting!
                                            setShowDeleteModal(true);
                                        }}
                                        className="text-gray-400 hover:text-red-600 transition duration-150"
                                        title="Delete list"
                                    >
                                        <span className="group-hover:hidden">
                                            ⋮
                                        </span>
                                        <span className="hidden group-hover:inline-block">
                                            ✕
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 mb-3">
                                {(list.tasks || []).map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    setCurrentListId(list.id);
                                    setShowModal(true);
                                }}
                                className="mt-2 text-xs text-gray-500 hover:text-indigo-600 flex items-center space-x-1"
                            >
                                <span>＋</span>
                                <span>Add task</span>
                            </button>
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

            <TaskModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleModalSubmit}
                title={modalTitle}
                setTitle={setModalTitle}
                description={modalDesc}
                setDescription={setModalDesc}
                project={project}
                list={taskLists.find((list) => list.id === currentListId)}
            />
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-2 text-gray-900">
                            Hapus Daftar?
                        </h2>
                        <p className="text-sm text-gray-600">
                            Yakin ingin menghapus list{" "}
                            <span className="font-semibold text-red-600">
                                {listToDelete?.name}
                            </span>
                            ? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setListToDelete(null);
                                }}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDeleteList}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
//debug
