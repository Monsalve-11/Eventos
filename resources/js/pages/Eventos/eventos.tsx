import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Inertia, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Eventos',
        href: '/Eventos',
    },
];

type PageProps = {
    auth: {
        user: {
            name: string;
            role: string; // Role del usuario (debería ser 'main_company' o 'secondary_company')
        };
    };
};

export default function Eventos() {
    const { auth } = usePage<PageProps>().props;

    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        // company_id: auth.user.company_id, // Aseguramos que la empresa principal cree el evento
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí se puede agregar la lógica de validación si es necesario

        // Enviar los datos al servidor usando Inertia
        Inertia.post('/events', eventData); // Se supone que la ruta '/events' maneja la creación de eventos en el backend
    };

    return (
        <>
            <Head title="Eventos" />

            {/* Banner superior 1440x413 */}
            <div className="h-max-w relative mx-auto w-full overflow-hidden">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-full w-full object-cover" />
            </div>

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-6">
                    <h2 className="text-2xl font-semibold">Crear Evento</h2>

                    {/* Formulario para crear evento */}
                    {auth.user.role === 'main_company' && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Card className="p-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Título del Evento</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={eventData.title}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Descripción del Evento</label>
                                    <textarea
                                        name="description"
                                        value={eventData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha del Evento</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={eventData.date}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                        required
                                    />
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                        Crear Evento
                                    </button>
                                </div>
                            </Card>
                        </form>
                    )}

                    {/* Mensaje si el usuario no es la empresa principal */}
                    {auth.user.role !== 'main_company' && <p className="text-red-500">Solo la empresa principal puede crear eventos.</p>}
                </div>
            </AppLayout>
        </>
    );
}
