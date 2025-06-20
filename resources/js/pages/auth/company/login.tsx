import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Login() {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Enviar formulario
    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route('company.login'));
    }

    return (
        <>
            {/* Banner superior 1440x413 */}
            <div className="h- max-w- relative mx-auto w-full overflow-hidden">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-full w-full object-cover" />
            </div>
            <Head title="Ingreso company" />

            <form onSubmit={submit} className="mx-auto max-w-md rounded bg-white p-6 shadow">
                <h1 className="mb-4 text-2xl">Ingreso company</h1>

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
                    {form.errors.email && <p className="mt-1 text-sm text-red-600">{form.errors.email}</p>}
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
                    {form.errors.password && <p className="mt-1 text-sm text-red-600">{form.errors.password}</p>}
                </div>

                {/* Recordarme */}
                <div className="mb-4 flex items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={form.data.remember} // Mantener el valor del checkbox sincronizado
                        //              onChange={(e) => form.setData('remember', e.target.checked)} // Actualizar el valor cuando el checkbox se marque
                        className="mr-2"
                    />
                    <label htmlFor="remember">Recordarme</label>
                </div>

                {/* Submit */}
                <button type="submit" disabled={form.processing} className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
                    {form.processing ? 'Ingresando…' : 'Ingresar'}
                </button>
            </form>
        </>
    );
}
