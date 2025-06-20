import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface Event {
    id: number;
    title: string;
    description: string;
    event_date: string;
    start_time: string;
    end_time: string;
}

interface Props {
    events: Event[];
}

const Events = ({ events }: Props) => {
    return (
        <>
            <Head title="Eventos" />
            <AppLayout>
                <div className="space-y-6 p-6">
                    <h1 className="text-xl font-semibold text-neutral-700">Eventos</h1>

                    {/* Lista de eventos */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.isArray(events) && events.length > 0 ? (
                            events.map((event) => (
                                <Card key={event.id}>
                                    <CardContent>
                                        <h3 className="font-semibold">{event.title}</h3>
                                        <p>{event.description}</p>
                                        <p>{event.event_date}</p>
                                        <p>
                                            {event.start_time} - {event.end_time}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p>No hay eventos disponibles</p>
                        )}
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default Events;
