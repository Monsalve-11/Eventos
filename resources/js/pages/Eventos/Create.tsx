import { AppHeader } from '@/components/app-header';
import { Card } from '@/components/ui/card';
import { useForm } from '@inertiajs/react';
import React from 'react';

interface FormData {
    name: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    [key: string]: string;
}

const Create: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/eventos', {
            onSuccess: () => alert('Evento creado con éxito'),
        });
    };

    return (
        <>
            {/* Banner afuera del div principal */}
            <div className="relative mx-auto w-full">
                <img
                    src="/images/banner.png"
                    alt="Panorámica de Cúcuta"
                    className="h-auto w-full object-cover" // Hacemos que la altura sea automática
                />
            </div>
            <AppHeader />
            {/* Contenedor principal */}
            <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-semibold">Crear Evento</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre del evento */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <input
                            type="text"
                            id="descripcion"
                            name="descripcion"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.descripcion && <p className="mt-2 text-sm text-red-500">{errors.descripcion}</p>}
                    </div>

                    {/* Fecha Inicio */}
                    <div>
                        <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700">
                            Fecha Inicio
                        </label>
                        <input
                            type="date"
                            id="fecha_inicio"
                            name="fecha_inicio"
                            value={data.fecha_inicio}
                            onChange={(e) => setData('fecha_inicio', e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.fecha_inicio && <p className="mt-2 text-sm text-red-500">{errors.fecha_inicio}</p>}
                    </div>

                    {/* Fecha Fin */}
                    <div>
                        <label htmlFor="fecha_fin" className="block text-sm font-medium text-gray-700">
                            Fecha Fin
                        </label>
                        <input
                            type="date"
                            id="fecha_fin"
                            name="fecha_fin"
                            value={data.fecha_fin}
                            onChange={(e) => setData('fecha_fin', e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {errors.fecha_fin && <p className="mt-2 text-sm text-red-500">{errors.fecha_fin}</p>}
                    </div>

                    {/* Botón de submit */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="focus:ring-opacity-50 w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            {processing ? 'Creando...' : 'Crear Evento'}
                        </button>
                    </div>
                </form>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Banner de evento */}
                <Card className="overflow-hidden p-0">
                    <img src="/images/diplomado.png" alt="Diplomado" className="w-full object-cover" />
                </Card>
            </div>
        </>
    );
};

export default Create;
