import { Card } from '@/components/ui/card';
import { Head, useForm } from '@inertiajs/react'; // Importing useForm here

export default function camara_comercioLogin() {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route('camara_comercio.login'));
    }

    return (
        <>
            <Head title="Ingreso Camara Comercio" />

            {/* Banner superior 1440x413 */}
            <div className="h- max-w- relative mx-auto w-full overflow-hidden">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-full w-full object-cover" />
            </div>

            <div className="space-y-6 p-6">
                {/* Resumen general */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <form onSubmit={submit} className="mx-auto max-w-md rounded bg-white p-6 shadow">
                        <h1 className="mb-4 text-2xl">Ingreso Camara Comercio</h1>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="mb-1 block">
                                Correo
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                className="w-full rounded border px-3 py-2"
                                required
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="mb-4">
                            <label htmlFor="password" className="mb-1 block">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={form.data.password}
                                onChange={(e) => form.setData('password', e.target.value)}
                                className="w-full rounded border px-3 py-2"
                                required
                            />
                        </div>

                        {/* Recordarme */}
                        <div className="mb-4 flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={form.data.remember}
                                //         onChange={(e) => form.setData('remember', e.target.checked)} // Fixed the checkbox handler
                                className="mr-2"
                            />
                            <label htmlFor="remember">Recordarme</label>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={form.processing} className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
                            {form.processing ? 'Ingresando…' : 'Ingresar'}
                        </button>
                    </form>
                </div>

                {/* Banner de evento */}
                <Card className="overflow-hidden p-0">
                    <img src="/images/diplomado.png" alt="Diplomado" className="w-full object-cover" />
                </Card>
            </div>
        </>
    );
}
