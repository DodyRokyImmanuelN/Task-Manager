import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <AuthenticatedLayout>
            <Head title="Task User" />
            <div className="p-6 text-gray-700 text-xl">Halaman Task User</div>
        </AuthenticatedLayout>
    );
}
