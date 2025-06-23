import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    openTasks,
    completedTasks,
    totalProjects,
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatCard
                    title="Open Tasks"
                    value={openTasks}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Completed Tasks"
                    value={completedTasks}
                    color="bg-green-500"
                />
                <StatCard
                    title="Total Projects"
                    value={totalProjects}
                    color="bg-yellow-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Placeholder chart panel */}
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Weekly Progress
                    </h2>
                    <div className="h-40 flex items-center justify-center text-gray-400">
                        (Chart here - optional later)
                    </div>
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Monthly Productivity
                    </h2>
                    <div className="h-40 flex items-center justify-center text-gray-400">
                        (Chart here - optional later)
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value, color }) {
    return (
        <div className={`p-6 rounded-xl shadow text-white ${color}`}>
            <div className="text-sm uppercase font-medium">{title}</div>
            <div className="text-3xl font-bold mt-1">{value}</div>
        </div>
    );
}
