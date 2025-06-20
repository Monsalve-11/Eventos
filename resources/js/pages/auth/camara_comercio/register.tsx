import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function camara_comercioRegister() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route('camara_comercio.register'));
    }

    return (
        <>
            {/* Banner superior 1440x413 */}
            <div className="h- max-w- relative mx-auto w-full overflow-hidden">
                <img src="/images/banner.png" alt="Panorámica de Cúcuta" className="h-full w-full object-cover" />
            </div>
            <Head title="Registro camara_comercio" />

            <form onSubmit={submit} className="mx-auto max-w-md rounded bg-white p-6 shadow">
                <h1 className="mb-4 text-2xl">Registro camara_comercio</h1>

                {/* Nombre */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-1 block">
                        Nombre completo
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                        required
                    />
                    {form.errors.name && <p className="mt-1 text-sm text-red-600">{form.errors.name}</p>}
                </div>

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

                {/* Confirmar contraseña */}
                <div className="mb-4">
                    <label htmlFor="password_confirmation" className="mb-1 block">
                        Confirma contraseña
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={form.data.password_confirmation}
                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                        required
                    />
                    {form.errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{form.errors.password_confirmation}</p>}
                </div>

                <button type="submit" disabled={form.processing} className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700">
                    {form.processing ? 'Registrando…' : 'Registrarme'}
                </button>
            </form>
        </>
    );
}
