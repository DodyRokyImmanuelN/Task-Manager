import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <AuthenticatedLayout>
            <Head title="Task Admin" />
            <div className="p-6 text-gray-700 text-xl">Halaman Task Admin</div>
        </AuthenticatedLayout>
    );
}
