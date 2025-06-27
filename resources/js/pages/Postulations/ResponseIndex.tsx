import { AppHeader } from '@/components/app-header';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Definir las interfaces de Postulación, usuario y evento
interface User {
    name: string;
}

interface Event {
    name: string;
}

interface Postulation {
    id: number;
    user: User;
    event: Event;
    response: boolean | null; // null es para las pendientes
}

// Propiedades que recibirá la vista
interface ResponsePostulationsIndexProps {
    pending: Postulation[];
    accepted: Postulation[];
    rejected: Postulation[];
}

const ResponsePostulationsIndex = ({ pending, accepted, rejected }: ResponsePostulationsIndexProps) => {
    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    const handleAccept = (postulationId: number) => {
        Inertia.post(`/response-postulations/${postulationId}/accept`);
    };

    const handleReject = (postulationId: number) => {
        Inertia.post(`/response-postulations/${postulationId}/reject`);
    };

    // Filtrar las postulaciones por el nombre del usuario
    const filterPostulations = (postulations: Postulation[]) => {
        return postulations.filter((postulation) => postulation.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    return (
        <>
            {/* Banner afuera del div principal */}
            <div className="relative mx-auto w-full">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-auto w-full object-cover" />
            </div>
            <Head title="Postulaciones" />
            <AppHeader />
            <br />
            <div className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Gestión de Postulaciones</h1>

                {/* Campo de búsqueda */}
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Buscar por nombre de usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Postulaciones Pendientes */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-700">Postulaciones Pendientes</h2>
                    <div className="space-y-4">
                        {filterPostulations(pending).map((postulation) => (
                            <div key={postulation.id} className="rounded-lg bg-gray-50 p-4 shadow-md transition-all hover:shadow-lg">
                                <h3 className="text-xl font-medium text-gray-800">
                                    {postulation.user ? postulation.user.name : 'Usuario no disponible'} se postuló para el evento{' '}
                                    {postulation.event ? postulation.event.name : 'Evento no disponible'}
                                </h3>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={() => handleAccept(postulation.id)}
                                        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none"
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        onClick={() => handleReject(postulation.id)}
                                        className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none"
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Postulaciones Aceptadas */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-700">Postulaciones Aceptadas</h2>
                    <div className="space-y-4">
                        {filterPostulations(accepted).map((postulation) => (
                            <div key={postulation.id} className="rounded-lg bg-green-50 p-4 shadow-md transition-all hover:shadow-lg">
                                <h3 className="text-xl font-medium text-green-700">
                                    {postulation.user ? postulation.user.name : 'Usuario no disponible'} ha sido aceptado para el evento{' '}
                                    {postulation.event ? postulation.event.name : 'Evento no disponible'}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Postulaciones Rechazadas */}
                <div>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-700">Postulaciones Rechazadas</h2>
                    <div className="space-y-4">
                        {filterPostulations(rejected).map((postulation) => (
                            <div key={postulation.id} className="rounded-lg bg-red-50 p-4 shadow-md transition-all hover:shadow-lg">
                                <h3 className="text-xl font-medium text-red-700">
                                    {postulation.user ? postulation.user.name : 'Usuario no disponible'} ha sido rechazado para el evento{' '}
                                    {postulation.event ? postulation.event.name : 'Evento no disponible'}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResponsePostulationsIndex;
