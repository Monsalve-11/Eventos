import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/dashboard',
    },
];

type PageProps = {
    auth: {
        user: {
            name: string;
        };
    };
};

const quickLinks = [
    { label: 'Agendar Cita', href: '/citas' },
    { label: 'Historial', href: '/historial' },
    { label: 'Eventos', href: '/eventos' },
    { label: 'Perfil', href: '/perfil' },
    { label: 'Crear Usuario', href: '/usuarios/crear' },
];

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Dashboard" />
            {/* Banner superior 1440x413 */}Add commentMore actions
            <div className="h- max-w- relative mx-auto w-full overflow-hidden">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-full w-full object-cover" />
            </div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-6">
                    {/* Bienvenida */}
                    <div className="text-xl font-semibold text-neutral-700">
                        Hola, <span className="font-bold text-primary">{auth.user.name}</span>
                        <br /> Bienvenido/a
                    </div>

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

                    {/* Resumen general */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Card className="p-4">
                            <h3 className="mb-2 font-semibold">Resumen General</h3>
                            <div className="space-y-2">
                                <div className="text-sm text-neutral-600">
                                    Empresas Registradas: <span className="text-green-600">101</span>
                                </div>
                                <div className="text-sm text-neutral-600">
                                    Eventos Activos: <span className="text-purple-600">22</span>
                                </div>
                                <div className="text-sm text-neutral-600">
                                    Citas Agendadas: <span className="text-blue-600">187</span>
                                </div>
                            </div>
                            <Button className="mt-4" variant="outline">
                                Ver detalladamente
                            </Button>
                        </Card>

                        <Card className="p-4">
                            <h3 className="mb-2 font-semibold">Tasa de Usuarios Nuevos</h3>
                            <div className="text-2xl font-bold text-red-600">54</div>
                            <Button className="mt-4" variant="outline">
                                Ver detalladamente
                            </Button>
                        </Card>
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
