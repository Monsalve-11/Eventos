import { AppHeader } from '@/components/app-header';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';

interface Event {
    id: number;
    name: string;
    description: string;
}

interface Props {
    events: Event[];
    flashMessage?: string;
}

const PostulationsIndex: React.FC<Props> = ({ events, flashMessage }) => {
    const handlePostulate = (eventId: number) => {
        Inertia.post(`/postulations/${eventId}`);
    };

    const handleRemovePostulation = (eventId: number) => {
        Inertia.delete(`/postulations/${eventId}`);
    };

    return (
        <>
            {/* Banner afuera del div principal */}
            <div className="relative mx-auto w-full">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-auto w-full object-cover" />
            </div>
            <Head title="Postulaciones" />
            <AppHeader />
            <div className="p-6">
                <h1 className="mb-8 text-center text-3xl font-bold">Eventos Disponibles para Postularse</h1>

                {/* Mensaje Flash */}
                {flashMessage && <div className="alert alert-success mb-4">{flashMessage}</div>}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events.length === 0 ? (
                        <p className="text-center text-gray-500">No hay eventos disponibles.</p>
                    ) : (
                        events.map((event) => (
                            <div key={event.id} className="event-card rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                                <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
                                <p className="my-4 text-sm text-gray-600">{event.description}</p>

                                {/* Botones para postularse y eliminar la postulación */}
                                <div className="flex justify-center gap-4">
                                    <button
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
                                        onClick={() => handlePostulate(event.id)}
                                    >
                                        Postularse
                                    </button>
                                    <button
                                        className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                        onClick={() => handleRemovePostulation(event.id)}
                                    >
                                        Eliminar Postulación
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default PostulationsIndex;
