import { Card } from '@/components/ui/card';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Banner afuera del div principal */}
            <div className="relative mx-auto w-full">
                <img
                    src="/images/banner.png"
                    alt="Panorámica de Cúcuta"
                    className="h-auto w-full object-cover" // Hacemos que la altura sea automática
                />
            </div>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="text-center">
                    <h2 className="mb-4 text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">Bienvenido a la Cámara de Comercio</h2>
                    <p className="mb-6 text-sm text-[#6b6b6b] dark:text-[#B4B4B4]">
                        Explora todos los eventos que tenemos disponibles, registra tu empresa y empieza a generar ingresos de forma legal. Únete a
                        nosotros y accede a oportunidades únicas para el crecimiento de tu negocio.
                    </p>

                    <p className="mb-6 text-lg text-[#4a4a4a] dark:text-[#EDEDEC]">
                        No solo tendrás acceso a eventos exclusivos, sino que también disfrutarás de beneficios VIP que te permitirán posicionar tu
                        empresa en el mercado de manera efectiva. ¡Prepárate para llevar tu negocio al siguiente nivel con nosotros!
                    </p>

                    <p className="mb-6 text-sm text-[#6b6b6b] dark:text-[#B4B4B4]">
                        Al registrarte, tendrás acceso a una amplia gama de actividades, talleres y seminarios diseñados para potenciar tu
                        crecimiento. ¡Es momento de crecer y producir legalmente!
                    </p>

                    <div className="mt-4">
                        <Link href="/eventos" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
                            Ver Eventos
                        </Link>
                    </div>
                </div>

                <br />
                {/* Banner de evento */}
                <Card className="overflow-hidden p-0">
                    <img src="/images/diplomado.png" alt="Diplomado" className="w-full object-cover" />
                </Card>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
