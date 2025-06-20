// resources/js/Pages/user/eventDetails.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Head } from '@inertiajs/react';

const EventDetails = ({ event, companies }: { event: any; companies: any[] }) => {
    return (
        <>
            <Head title={`Detalles del Evento: ${event.title}`} />

            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-semibold text-neutral-700">Detalles del Evento</h1>

                <Card>
                    <CardContent>
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <p>{event.description}</p>
                        <p>
                            <strong>Fecha:</strong> {event.event_date}
                        </p>
                        <p>
                            <strong>Hora de inicio:</strong> {event.start_time}
                        </p>
                        <p>
                            <strong>Hora de fin:</strong> {event.end_time}
                        </p>
                    </CardContent>
                </Card>

                <h2 className="mt-4 text-xl font-semibold">Empresas Asignadas al Evento</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {companies.map((company) => (
                        <Card key={company.id}>
                            <CardContent>
                                <h3 className="font-semibold">{company.name}</h3>
                                <p>{company.email}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EventDetails;
