import React, { useState, useEffect, useRef } from "react";
import { Link, usePage, router } from "@inertiajs/react";

export default function AuthenticatedLayout({ children }) {
    const { auth, projects } = usePage().props;
    const [projectOpen, setProjectOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [projectName, setProjectName] = useState("");

    const submitProject = (e) => {
        e.preventDefault();
        router.post(
            "/projects",
            { name: projectName },
            {
                onSuccess: () => {
                    setProjectName("");
                    setModalOpen(false);
                },
            }
        );
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-[#111827] text-white flex flex-col">
                <div className="px-6 py-4 font-bold text-xl border-b border-gray-700">
                    IDN TASK
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2 text-sm">
                    <Link
                        href="/"
                        className="block hover:bg-gray-800 p-2 rounded"
                    >
                        Home
                    </Link>
                    <Link
                        href="/tasks"
                        className="block hover:bg-gray-800 p-2 rounded"
                    >
                        My Tasks
                    </Link>
                    <Link
                        href="/members"
                        className="block hover:bg-gray-800 p-2 rounded"
                    >
                        Team Members
                    </Link>

                    <div
                        className="mt-6 text-gray-400 uppercase text-xs tracking-wider cursor-pointer"
                        onClick={() => setProjectOpen(!projectOpen)}
                    >
                        Favorites
                    </div>

                    <div className="flex items-center justify-between text-gray-400 text-xs uppercase my-2">
                        <button
                            className="flex items-center gap-1"
                            onClick={() => setProjectOpen(!projectOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7h18M3 12h18m-7 5h7"
                                />
                            </svg>
                            Projects
                        </button>
                        <button
                            className="hover:text-white"
                            onClick={() => setModalOpen(true)}
                        >
                            +
                        </button>
                    </div>

                    {projectOpen &&
                        projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.id}`}
                                className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded text-sm"
                            >
                                <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: project.color }}
                                ></span>
                                <span>{project.name}</span>
                            </Link>
                        ))}
                </nav>
            </aside>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                        <h2 className="text-lg font-semibold mb-4 text-black">
                            Create Project
                        </h2>
                        <form onSubmit={submitProject}>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="Project name"
                                className="w-full p-2 border rounded mb-4 text-black"
                                required
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="text-sm text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <main className="flex-1 overflow-y-auto p-5">{children}</main>
        </div>
    );
}
