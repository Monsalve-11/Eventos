import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';

import React, { useState } from 'react';

const CreateEvent = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        event_date: '',
        start_time: '',
        end_time: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Enviar la solicitud POST a la ruta de creación de eventos
        Inertia.post('/camara_comercio/events', form);
    };

    return (
        <>
            <Head title="Crear Evento" />
            <AppLayout>
                <div className="space-y-6 p-6">
                    <h1 className="text-xl font-semibold text-neutral-700">Crear Evento</h1>

                    <form onSubmit={handleSubmit}>
                        {/* Título */}
                        <div className="mb-4">
                            <Input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Título del evento" required />
                        </div>

                        {/* Descripción */}
                        <div className="mb-4">
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Descripción del evento"
                                className="w-full border border-neutral-300 p-2"
                            />
                        </div>

                        {/* Fecha del evento */}
                        <div className="mb-4">
                            <Input type="date" name="event_date" value={form.event_date} onChange={handleChange} required />
                        </div>

                        {/* Hora de inicio */}
                        <div className="mb-4">
                            <Input type="time" name="start_time" value={form.start_time} onChange={handleChange} required />
                        </div>

                        {/* Hora de finalización */}
                        <div className="mb-4">
                            <Input type="time" name="end_time" value={form.end_time} onChange={handleChange} required />
                        </div>

                        {/* Botón para enviar el formulario */}
                        <Button type="submit">Crear Evento</Button>
                    </form>
                </div>
            </AppLayout>
        </>
    );
};

export default CreateEvent;
