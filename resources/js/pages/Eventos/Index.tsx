import { AppHeader } from '@/components/app-header';
import { Inertia } from '@inertiajs/inertia'; // Importar Inertia
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Evento {
    id: number;
    name: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
}

interface Props {
    eventos: Evento[];
}

const Index: React.FC<Props> = ({ eventos }) => {
    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
            // Usar Inertia para eliminar el evento
            Inertia.delete(`/eventos/${id}`, {
                onSuccess: () => {
                    // Redirige a la lista de eventos tras la eliminación
                    Inertia.visit('/eventos');
                },
            });
        }
    };

    return (
        <>
            {/* Banner afuera del div principal */}
            <div className="relative mx-auto w-full">
                <img
                    src="/images/banner.png"
                    alt="Panorámica de Cúcuta"
                    className="h-auto w-full object-cover" // Hacemos que la altura sea automática
                />
            </div>
            <AppHeader />
            <Head title="Eventos" />
            {/* Contenedor principal */}
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-semibold">Lista de Eventos</h1>

                <div className="mb-4 flex justify-between">
                    <Link href="/eventos/create" className="btn btn-primary rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700">
                        Crear Evento
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-separate border-spacing-0 border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Descripción</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha Inicio</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha Fin</th>
                                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-2 text-center text-sm text-gray-500">
                                        No hay eventos disponibles
                                    </td>
                                </tr>
                            ) : (
                                eventos.map((evento) => (
                                    <tr key={evento.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm font-medium text-gray-800">{evento.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{evento.descripcion}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{evento.fecha_inicio}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{evento.fecha_fin}</td>
                                        <td className="px-4 py-2 text-center">
                                            <Link
                                                href={`/eventos/${evento.id}/edit`}
                                                className="btn btn-warning rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                            >
                                                ✍️
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(evento.id)}
                                                className="btn btn-danger ml-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                            >
                                                ✘
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Index;
