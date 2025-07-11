import { AppHeader } from '@/components/app-header';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import SuccessModal from './SuccessModal'; // Import the modal component

interface Event {
    id: number;
    name: string;
    fecha_inicio: string;
    fecha_fin: string;
}

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
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');

    const loadUsersForEvent = async (eventId: number) => {
        const response = await fetch(`/get-users-for-event/${eventId}`);
        const data = await response.json();
        setUsers(data);
    };

    const handleEventChange = (eventId: number) => {
        const event = events.find((event) => event.id === eventId);
        if (event) {
            setSelectedEvent(eventId);
            setEventStartDate(event.fecha_inicio);
            setEventEndDate(event.fecha_fin);
        }
    };

    const generateTimeSlots = (startTime: string, endTime: string) => {
        const slots = [];
        let currentTime = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        while (currentTime < end) {
            const slot = new Date(currentTime);
            slots.push(slot.toTimeString().slice(0, 5));
            currentTime.setMinutes(currentTime.getMinutes() + 20);
        }

        return slots;
    };

    const timeSlots = generateTimeSlots('08:00', '18:00');

    const handleStartTimeChange = (start: string) => {
        setStartTime(start);

        const startDate = new Date(`1970-01-01T${start}:00`);
        startDate.setMinutes(startDate.getMinutes() + 20);
        const endFormatted = startDate.toTimeString().slice(0, 5);
        setEndTime(endFormatted);
    };

    const handleBookAppointment = () => {
        if (!selectedCompany) {
            setError('Por favor, selecciona una empresa.');
            return;
        }

        if (new Date(selectedDate) < new Date()) {
            setError('La fecha seleccionada no es válida');
            return;
        }

        const startDateTime = new Date(`${selectedDate}T${startTime}`);
        const endDateTime = new Date(`${selectedDate}T${endTime}`);
        const event = events.find((event) => event.id === selectedEvent);

        if (event) {
            const eventStartDateTime = new Date(`${selectedDate}T${event.fecha_inicio}`);
            const eventEndDateTime = new Date(`${selectedDate}T${event.fecha_fin}`);

            if (startDateTime < eventStartDateTime || endDateTime > eventEndDateTime) {
                setError('Las horas seleccionadas no están dentro del rango del evento');
                return;
            }
        }

        Inertia.post('/appointments', {
            event_id: selectedEvent,
            date: selectedDate,
            start_time: startTime,
            end_time: endTime,
            company_id: selectedCompany,
        });

        setSuccess('Cita agendada con éxito');
        setIsModalVisible(true);
        setError(null);
    };

    useEffect(() => {
        if (selectedEvent) {
            loadUsersForEvent(selectedEvent);
        }
    }, [selectedEvent]);

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div className="relative mx-auto w-full">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-auto w-full object-cover" />
            </div>
            <AppHeader />
            <Head title="Agendar Citas" />
            <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-white p-6 shadow-lg">
                {error && <div className="text-red-600">{error}</div>}
                {success && <div className="text-green-600">{success}</div>}

                <div className="mb-6">
                    <label className="mb-2 block text-xl font-medium text-gray-700">Selecciona un Evento</label>
                    <select
                        onChange={(e) => handleEventChange(Number(e.target.value))}
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
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2 block text-xl font-medium text-gray-700">Selecciona la Fecha</label>
                            <input
                                type="date"
                                onChange={(e) => setSelectedDate(e.target.value)}
                                value={selectedDate}
                                min={eventStartDate}
                                max={eventEndDate}
                                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="mb-2 block text-xl font-medium text-gray-700">Selecciona la Hora</label>
                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    onChange={(e) => handleStartTimeChange(e.target.value)}
                                    value={startTime}
                                    className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Hora de inicio</option>
                                    {timeSlots.map((time, index) => (
                                        <option key={index} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    value={endTime}
                                    disabled
                                    className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

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

            <SuccessModal isVisible={isModalVisible} onClose={handleCloseModal} />
        </>
    );
};

export default AppointmentPage;
