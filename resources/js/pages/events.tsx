// resources/js/Pages/user/events.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

const Events = ({ events }: { events: any[] }) => {
    return (
        <>
            <Head title="Eventos Disponibles" />

            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-semibold text-neutral-700">Eventos Disponibles</h1>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Link href={`/user/events/${event.id}`} key={event.id}>
                            <Card className="cursor-pointer transition-colors hover:bg-accent">
                                <CardContent className="p-4">
                                    <h3 className="text-xl font-semibold">{event.title}</h3>
                                    <p>{event.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Events;
