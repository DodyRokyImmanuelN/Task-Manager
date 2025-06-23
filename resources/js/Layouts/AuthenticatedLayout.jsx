import React, { useState, useRef, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111827] text-white flex flex-col">
                <div className="px-6 py-4 font-bold text-xl border-b border-gray-700">
                    IDN TASK
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2 text-sm">
                    <Link
                        href="/"
                        className="block hover:bg-gray-800 p-2 rounded"
                    >
                        Dashboard
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
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto p-5">
                {/* Main Content Header */}
                <header className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
                    {/* Kiri */}
                    <div className="flex items-center space-x-4">
                        {/* Dropdown Recent */}
                        <div className="relative group">
                            <button className="text-gray-700 font-medium text-sm flex items-center space-x-1 hover:text-black">
                                <span>Recent</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
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
                            {/* TODO: Dropdown content here */}
                        </div>

                        {/* Create Button */}
                        <button className="text-sm font-medium text-gray-700 hover:text-black flex items-center space-x-1">
                            <span>＋</span>
                            <span>Create</span>
                        </button>
                    </div>

                    {/* Kanan */}
                    <div className="flex items-center space-x-6">
                        {/* Icon Jam */}
                        <button className="text-gray-400 hover:text-gray-600">
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
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>

                        {/* Notification Icon */}
                        <button className="text-gray-400 hover:text-gray-600">
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
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 00-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </button>

                        {/* Avatar + Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none hover:bg-gray-100 px-2 py-1 rounded transition"
                            >
                                <img
                                    src={`https://ui-avatars.com/api/?name=${auth.user?.name}`}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-sm text-gray-700 font-medium">
                                    {auth.user?.name}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 text-gray-500 transform transition-transform duration-200 ${
                                        dropdownOpen ? "rotate-180" : ""
                                    }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        method="post"
                                        href="/logout"
                                        as="button"
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Konten halaman */}
                {children}
            </main>
        </div>
    );
}
