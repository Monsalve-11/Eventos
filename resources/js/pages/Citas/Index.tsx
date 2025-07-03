import { AppHeader } from '@/components/app-header';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Definir el tipo de Evento
interface Event {
    id: number;
    name: string;
    fecha_inicio: string;
    fecha_fin: string;
}

// Definir el tipo de Usuario
interface User {
    id: number;
    name: string;
}

const AppointmentPage = ({ events }: { events: Event[] }) => {
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null); // Para seleccionar la empresa

    // Función para cargar los usuarios aceptados para el evento seleccionado
    const loadUsersForEvent = async (eventId: number) => {
        const response = await fetch(`/get-users-for-event/${eventId}`);
        const data = await response.json();
        setUsers(data);
    };

    const handleBookAppointment = () => {
        if (!selectedCompany) {
            alert('Por favor, selecciona una empresa.');
            return;
        }

        if (new Date(selectedDate) < new Date()) {
            alert('La fecha seleccionada no es válida');
            return;
        }

        // Validar que la hora de inicio y fin estén dentro de las horas disponibles
        const startDateTime = new Date(`${selectedDate}T${startTime}`);
        const endDateTime = new Date(`${selectedDate}T${endTime}`);
        const event = events.find((event) => event.id === selectedEvent);

        if (event) {
            const eventStartDate = new Date(`${selectedDate}T${event.fecha_inicio}`);
            const eventEndDate = new Date(`${selectedDate}T${event.fecha_fin}`);

            if (startDateTime < eventStartDate || endDateTime > eventEndDate) {
                alert('Las horas seleccionadas no están dentro del rango del evento');
                return;
            }
        }

        Inertia.post('/appointments', {
            event_id: selectedEvent,
            date: selectedDate,
            start_time: startTime,
            end_time: endTime,
            company_id: selectedCompany, // ID de la empresa
        });
    };

    useEffect(() => {
        if (selectedEvent) {
            loadUsersForEvent(selectedEvent);
        }
    }, [selectedEvent]);

    return (
        <>
            <div className="relative mx-auto w-full">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-auto w-full object-cover" />
            </div>
            <AppHeader />
            <Head title="Agendar Citas" />
            <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-white p-6 shadow-lg">
                {/* Selección de Evento */}
                <div className="mb-6">
                    <label className="mb-2 block text-xl font-medium text-gray-700">Selecciona un Evento</label>
                    <select
                        onChange={(e) => setSelectedEvent(Number(e.target.value))}
                        value={selectedEvent ?? ''}
                        className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Selecciona un evento</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedEvent && (
                    <>
                        {/* Mostrar las empresas aceptadas para el evento */}
                        <div className="mb-6">
                            <label className="mb-2 block text-xl font-medium text-gray-700">Selecciona la Empresa</label>
                            <select
                                onChange={(e) => setSelectedCompany(Number(e.target.value))}
                                value={selectedCompany ?? ''}
                                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Selecciona una Empresa</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} (ID: {user.id})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Selección de Fecha */}
                        <div className="mb-6">
                            <label className="mb-2 block text-xl font-medium text-gray-700">Selecciona la Fecha</label>
                            <input
                                type="date"
                                onChange={(e) => setSelectedDate(e.target.value)}
                                value={selectedDate}
                                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Selección de Hora */}
                        <div className="mb-6">
                            <label className="mb-2 block text-xl font-medium text-gray-700">Selecciona la Hora</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="time"
                                    onChange={(e) => setStartTime(e.target.value)}
                                    value={startTime}
                                    className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <input
                                    type="time"
                                    onChange={(e) => setEndTime(e.target.value)}
                                    value={endTime}
                                    className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Agendar Cita */}
                        {startTime && endTime && (
                            <div className="text-center">
                                <button
                                    onClick={handleBookAppointment}
                                    className="focus:ring-opacity-50 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    Agendar Cita
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default AppointmentPage;
