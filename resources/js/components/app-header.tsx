import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const mainNavItems: NavItem[] = [
    { title: 'Inicio', href: '/dashboard' },
    { title: 'Información General', href: '/informacion-general' },
    { title: 'Agendamiento de citas', href: '/citas' },
    { title: 'Eventos', href: '/eventos' },
    { title: 'Gestión de Usuarios y Empresas', href: '/usuarios/crear' },
    { title: 'Historial', href: '/historial' },
    { title: 'Estadísticas', href: '/estadisticas' },
];

const activeItemStyles = 'text-blue-600 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <>
            <div className="border-b border-sidebar-border/80 bg-white shadow-md">
                <div className="mx-auto flex h-16 items-center space-x-6 px-4 md:max-w-7xl">
                    <div className="flex items-center space-x-4 rounded-xl bg-gray-200 px-3 py-2 shadow-lg">
                        <div className="flex items-center space-x-4">
                            <img src="/images/logo.png" alt="Logo" className="h-12" />
                            <Link href="/dashboard" prefetch className="flex items-center space-x-2"></Link>
                        </div>

                        <div className="flex h-full flex-1 items-center justify-center space-x-6">
                            <div className="flex items-center space-x-4">
                                {mainNavItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={`h-9 px-4 text-sm font-medium ${page.url === item.href ? activeItemStyles : 'text-gray-700'} hover:text-blue-600`}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Usuario y campanita */}
                    <div className="flex items-center space-x-4 rounded-xl bg-gray-200 px-3 py-2 shadow-lg">
                        {/* Nombre del usuario con DropdownMenu */}
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <Button variant="ghost" size="icon" className="group h-9 w-auto cursor-pointer">
                                    <span className="text-xl font-semibold text-neutral-800">{auth.user.name}</span>
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content className="mt-2 w-56 rounded-md bg-white p-2 shadow-lg">
                                {/* Mostrar la inicial del usuario */}
                                <DropdownMenu.Item className="flex cursor-pointer items-center space-x-2 p-2 text-sm hover:bg-gray-200">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white">
                                        {auth.user.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </span>
                                    <div>
                                        <div>{auth.user.name}</div>
                                        <div className="text-xs text-gray-500">{auth.user.email}</div>
                                    </div>
                                </DropdownMenu.Item>

                                {/* Opciones de menú */}
                                <DropdownMenu.Item className="cursor-pointer p-2 text-sm hover:bg-gray-200">
                                    <Link href="/perfil">Cambiar de nombre</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="cursor-pointer p-2 text-sm hover:bg-gray-200">
                                    <Link href="/cambiar-contraseña">Cambiar contraseña</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="cursor-pointer p-2 text-sm hover:bg-gray-200">
                                    <Link href="/cambiar-apariencia">Cambiar apariencia</Link>
                                </DropdownMenu.Item>

                                {/* Cerrar sesión */}
                                <DropdownMenu.Item
                                    onClick={() => inertia.visit('/logout')} // Reutiliza la lógica de logout predeterminada
                                    className="cursor-pointer p-2 text-sm hover:bg-gray-200"
                                >
                                    Log out
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>

                    {/* Campanita con imagen personalizada */}
                    <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer bg-transparent">
                        <img src="images/campana.png" alt="Notificación" className="h-6 w-6 object-contain" />
                    </Button>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
