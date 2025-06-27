import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <>
            {/* Banner afuera del div principal */}
            <div className="relative mx-auto w-full">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-auto w-full object-cover" />
            </div>

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />

                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Tarjeta de "Agendar Cita" */}
                        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-md transition-all hover:shadow-lg">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white">
                                <span className="text-2xl">📅</span>
                            </div>
                            <h3 className="text-xl font-semibold">Agendar Cita</h3>
                            <p className="text-center text-sm text-gray-600">Programa reuniones con otras empresas.</p>
                            <Link href="/appointments" className="mt-4 text-blue-600 hover:underline">
                                Ir a Agendar
                            </Link>
                        </div>

                        {/* Tarjeta de "Información General" */}
                        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-md transition-all hover:shadow-lg">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
                                <span className="text-2xl">📋</span>
                            </div>
                            <h3 className="text-xl font-semibold">Información General</h3>
                            <p className="text-center text-sm text-gray-600">Consulta la información básica de la empresa.</p>
                            <Link href="/info" className="mt-4 text-blue-600 hover:underline">
                                Ver Información
                            </Link>
                        </div>

                        {/* Tarjeta de "Eventos" */}
                        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-md transition-all hover:shadow-lg">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white">
                                <span className="text-2xl">🎉</span>
                            </div>
                            <h3 className="text-xl font-semibold">Eventos</h3>
                            <p className="text-center text-sm text-gray-600">Mantente al tanto de los eventos y actividades.</p>
                            <Link href="/eventos" className="mt-4 text-blue-600 hover:underline">
                                Ver Eventos
                            </Link>
                        </div>

                        {/* Tarjeta de "Roles" */}
                        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-md transition-all hover:shadow-lg">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-white">
                                <span className="text-2xl">🔑</span>
                            </div>
                            <h3 className="text-xl font-semibold">Roles</h3>
                            <p className="text-center text-sm text-gray-600">Gestiona los roles de los usuarios.</p>
                            <Link href="/roles" className="mt-4 text-blue-600 hover:underline">
                                Ver Roles
                            </Link>
                        </div>

                        {/* Tarjeta de "postulaciones" */}
                        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-md transition-all hover:shadow-lg">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-500 text-white">
                                <span className="text-2xl">💼</span>
                            </div>
                            <h3 className="text-xl font-semibold">Postulaciones</h3>
                            <p className="text-center text-sm text-gray-600">Gestiona las postulaciones de las empresas.</p>
                            <Link href="/postulations" className="mt-4 text-blue-600 hover:underline">
                                Ver Postulaciones
                            </Link>
                        </div>

                        {/* Tarjeta de "respuestas de postulaciones" */}
                        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-md transition-all hover:shadow-lg">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-white">
                                <span className="text-2xl">🚨</span>
                            </div>
                            <h3 className="text-xl font-semibold">Respuestas De Postulaciones</h3>
                            <p className="text-center text-sm text-gray-600">Responde a las postulaciones de las empresas.</p>
                            <Link href="/response-postulations" className="mt-4 text-blue-600 hover:underline">
                                Responder Postulaciones
                            </Link>
                        </div>
                    </div>

                    {/* Banner de evento */}
                    <Card className="overflow-hidden p-0">
                        <img src="/images/diplomado.png" alt="Diplomado" className="w-full object-cover" />
                    </Card>
                </div>
            </AppLayout>
        </>
    );
}
