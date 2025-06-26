import { AppHeader } from '@/components/app-header';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    roles: Role[];
}

const Roles: React.FC<{ users: User[]; roles: Role[]; flashMessage?: string }> = ({ users, roles, flashMessage }) => {
    const [userRoles, setUserRoles] = useState<{ [key: number]: number | null }>({}); // Estado para los roles seleccionados de cada usuario
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el término de búsqueda

    // Filtrar los usuarios según el nombre
    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Asignar un rol a un usuario
    const assignRole = (userId: number, roleId: number) => {
        if (roleId === null) return;

        Inertia.post(
            `/users/${userId}/assign-role`,
            { role_id: roleId },
            {
                onSuccess: () => {
                    setModalMessage('Role assigned successfully!');
                    setShowModal(true);
                    setTimeout(() => {
                        Inertia.visit(window.location.href); // Recargar la página para actualizar los datos
                    }, 1500); // Esperar 1.5 segundos antes de recargar
                },
                onError: (errors) => {
                    setModalMessage('There was an error assigning the role!');
                    setShowModal(true);
                },
            },
        );
    };

    // Eliminar un rol de un usuario
    const removeRole = (userId: number, roleId: number) => {
        Inertia.post(
            `/users/${userId}/remove-role`,
            { role_id: roleId },
            {
                onSuccess: () => {
                    setModalMessage('Role removed successfully!');
                    setShowModal(true);
                    setTimeout(() => {
                        Inertia.visit(window.location.href); // Recargar la página para actualizar los datos
                    }, 1500); // Esperar 1.5 segundos antes de recargar
                },
                onError: (errors) => {
                    setModalMessage('There was an error removing the role!');
                    setShowModal(true);
                },
            },
        );
    };

    return (
        <>
            <div className="relative mx-auto w-full">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-auto w-full object-cover" />
            </div>
            <AppHeader />
            <Head title="Roles" />
            <div className="container mx-auto p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">Administrar usuarios y roles</h1>
                    {/* Campo de búsqueda */}
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
                        className="w-80 rounded-md border p-2 text-sm"
                    />
                </div>

                <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Usuarios</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Roles</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No hay usuarios
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                                        <td className="px-6 py-4">
                                            {user.roles.map((role) => (
                                                <span
                                                    key={role.id}
                                                    className="mr-2 inline-block rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white"
                                                >
                                                    {role.name}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* seleccionar rol */}
                                                <select
                                                    onChange={(e) => {
                                                        setUserRoles((prevRoles) => ({
                                                            ...prevRoles,
                                                            [user.id]: Number(e.target.value), // Actualizar solo el rol del usuario específico
                                                        }));
                                                    }}
                                                    value={userRoles[user.id] ?? ''}
                                                    className="rounded-md border border-gray-300 p-2 text-sm"
                                                >
                                                    <option value="">Asignar Rol</option>
                                                    {roles.map((role) => (
                                                        <option key={role.id} value={role.id}>
                                                            {role.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Asignar rol */}
                                                <button
                                                    className="btn btn-success rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                                    onClick={() => userRoles[user.id] && assignRole(user.id, userRoles[user.id])}
                                                >
                                                    Asignar
                                                </button>

                                                {/* Quitar rol */}
                                                {user.roles.map((role) => (
                                                    <button
                                                        key={role.id}
                                                        className="btn btn-danger rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                                        onClick={() => removeRole(user.id, role.id)}
                                                    >
                                                        Quitar {role.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal para mostrar el mensaje */}
            {showModal && (
                <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-gray-800">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-800">{modalMessage}</h2>
                        <button
                            className="mt-4 rounded-md bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
                            onClick={() => setShowModal(false)} // Cerrar el modal
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Roles;
