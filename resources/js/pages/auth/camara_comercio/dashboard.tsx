import CreateEvent from '@/components/CreateEventForm';
import Events from '@/components/events_camara_comercio';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/dashboard',
    },
];

const quickLinks = [
    { label: 'Agendar Cita', href: '/citas' },
    { label: 'Historial', href: '/historial' },
    { label: 'Eventos', href: '/camara_comercio/events' },
    { label: 'Perfil', href: '/perfil' },
    { label: 'Crear Usuario', href: '/usuarios/crear' },
];

const Dashboard = () => {
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-6">
                    {/* Bienvenida */}
                    <div className="text-xl font-semibold text-neutral-700">Hola, Bienvenido/a</div>

                    {/* Accesos rápidos */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {quickLinks.map(({ label, href }) => (
                            <Link href={href} key={label}>
                                <Card className="cursor-pointer transition-colors hover:bg-accent">
                                    <CardContent className="p-4 text-center font-medium">{label}</CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Mostrar el componente de eventos */}

                    <div className="mt-8">
                        <CreateEvent />
                    </div>
                    <div className="mt-8">
                        <Events />
                    </div>

                    {/* Banner de evento */}
                    <Card className="overflow-hidden p-0">
                        <img src="/images/diplomado.png" alt="Diplomado" className="w-full object-cover" />
                    </Card>
                </div>
            </AppLayout>
        </>
    );
};

export default Dashboard;
