import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Selamat datang, {auth.user.name}!
                </h1>

                <div className="text-gray-700 mb-2">
                    Anda login sebagai: <strong>{auth.user.role}</strong>
                </div>

                {/* Tambahkan tampilan berbeda berdasarkan role */}
                {auth.user.role === "superadmin" && (
                    <div className="mt-4">
                        <p className="text-indigo-600">
                            Anda dapat melihat seluruh statistik dan data task
                            seluruh branch.
                        </p>
                    </div>
                )}

                {auth.user.role === "admin" && (
                    <div className="mt-4">
                        <p className="text-green-600">
                            Anda dapat meng-assign tugas, memantau progress, dan
                            menerima request.
                        </p>
                    </div>
                )}

                {auth.user.role === "monitor" && (
                    <div className="mt-4">
                        <p className="text-orange-600">
                            Anda bisa menambahkan tugas, namun tidak bisa
                            mengeditnya.
                        </p>
                    </div>
                )}

                {auth.user.role === "user" && (
                    <div className="mt-4">
                        <p className="text-blue-600">
                            Anda hanya bisa menerima dan memperbarui tugas Anda.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
