import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <AuthenticatedLayout>
            <Head title="Task Monitor" />
            <div className="p-6 text-gray-700 text-xl">
                Halaman Task Monitor
            </div>
        </AuthenticatedLayout>
    );
}
