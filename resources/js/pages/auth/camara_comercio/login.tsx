// resources/js/pages/auth/camara_comercio/login.tsx
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

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
                        //         onChange={(e) => form.setData('remember', e.target.checked)}
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
