// app/Pages/Eventos/Create.tsx

import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <>
            <Head title="Crear Evento" />
            <div className="p-6">
                <h1 className="text-xl font-semibold">Crear Evento</h1>

                {/* Aquí podrías agregar un formulario para crear eventos */}
                <form action="/eventos" method="POST">
                    <input type="text" name="title" placeholder="Título del evento" required />
                    <textarea name="description" placeholder="Descripción del evento" required></textarea>
                    <input type="date" name="event_date" required />

                    <Button type="submit" className="mt-4">
                        Crear Evento
                    </Button>
                </form>
            </div>
        </>
    );
}
