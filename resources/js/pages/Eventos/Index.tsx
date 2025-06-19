// app/Pages/Eventos/Index.tsx

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

type Event = {
    id: number;
    title: string;
    description: string;
    event_date: string;
};

type Props = {
    events: Event[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Eventos',
        href: '/eventos',
    },
];
// En la vista Index.tsx
export default function Index({ events }: Props) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Eventos" />

            <div className="h-max-w relative mx-auto w-full overflow-hidden">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-full w-full object-cover" />
            </div>

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-6">
                    <div className="text-xl font-semibold text-neutral-700">
                        Hola, <span className="font-bold text-primary">{auth.user.name}</span>
                        <br /> Bienvenido/a
                    </div>

                    <h1 className="mb-4 text-xl font-semibold">Eventos Disponibles</h1>
                    {auth.user.role === 'persona_natural' && (
                        <div>
                            {/* Lógica para Persona Natural */}
                            <ul>
                                {events.map((event) => (
                                    <li key={event.id}>
                                        <h2>{event.title}</h2>
                                        <p>{event.description}</p>
                                        <button>Agendar cita</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {auth.user.role === 'empresa' && (
                        <div>
                            {/* Lógica para Empresas */}
                            <ul>
                                {events.map((event) => (
                                    <li key={event.id}>
                                        <h2>{event.title}</h2>
                                        <p>{event.description}</p>
                                        <button>Postularse al evento</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {auth.user.role === 'ccc' && (
                        <div>
                            {/* Lógica para CCC */}
                            <ul>
                                {events.map((event) => (
                                    <li key={event.id}>
                                        <h2>{event.title}</h2>
                                        <p>{event.description}</p>
                                        <button>Aceptar/Rechazar Empresas</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}
