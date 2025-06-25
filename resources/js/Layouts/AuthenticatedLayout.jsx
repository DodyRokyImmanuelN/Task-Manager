import React, { useState } from "react";
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
            {/* Sidebar */}
            <aside className="w-64 bg-[#111827] text-white flex flex-col">
                <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
                    IDN TASK
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 text-sm">
                    {/* Static Navigation */}
                    <Link
                        href="/"
                        className="block p-2 rounded hover:bg-gray-800"
                    >
                        Home
                    </Link>
                    <Link
                        href="/tasks"
                        className="block p-2 rounded hover:bg-gray-800"
                    >
                        My Tasks
                    </Link>
                    <Link
                        href="/members"
                        className="block p-2 rounded hover:bg-gray-800"
                    >
                        Team Members
                    </Link>

                    {/* Section Header */}
                    <div className="mt-6 uppercase text-xs tracking-wider text-gray-400">
                        Favorites
                    </div>

                    {/* Projects Section */}
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

                    {/* Project List */}
                    {projectOpen && (
                        <div className="space-y-1">
                            {projects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.id}`}
                                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 text-sm"
                                >
                                    <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{
                                            backgroundColor: project.color,
                                        }}
                                    ></span>
                                    <span>{project.name}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </nav>
            </aside>

            {/* Create Project Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900">
                            Create Project
                        </h2>
                        <form onSubmit={submitProject}>
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="Project name"
                                className="w-full p-2 border rounded text-gray-900 mb-4"
                                required
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center text-sm text-gray-700 font-medium hover:text-indigo-600">
                            Recent
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        <button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded font-medium transition">
                            + Create
                        </button>
                    </div>

                    {/* Notification & Profile */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405M19 13V11a7 7 0 10-14 0v2l-1.405 1.405A2.032 2.032 0 004 18h16a2.032 2.032 0 00.405-1.595L19 13z"
                                />
                            </svg>
                        </button>

                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm uppercase">
                            {auth.user.name?.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="">{children}</div>
            </main>
        </div>
    );
}
