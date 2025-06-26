import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <div className="relative mx-auto w-full">
                <img src="/images/banner.png" alt="Panorámica" className="mb-2 h-auto w-full object-cover" />{' '}
            </div>

            <AuthLayout title="" description="">
                <Head title="Log in" />

                <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                    <header className="mb-4 w-full max-w-[335px] text-sm lg:max-w-4xl">
                        {' '}
                        <nav className="flex items-center justify-end gap-4">
                            <div className="w-full text-center">
                                <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">Bienvenido de nuevo</h2>
                                <p className="mb-4 text-sm text-gray-500 dark:text-gray-300">Inicia sesión para acceder a tu cuenta.</p>
                            </div>
                        </nav>
                    </header>

                    <form className="mt-2 flex w-full max-w-[400px] flex-col gap-6 rounded-xl bg-white p-6 shadow-lg" onSubmit={submit}>
                        {' '}
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-700">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-gray-700">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink href={route('password.request')} className="text-sm text-red-600 hover:text-red-700">
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button type="submit" className="mt-4 w-full bg-red-600 text-white hover:bg-red-700" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <TextLink href={route('register')} tabIndex={5} className="text-red-600 hover:text-red-700">
                                Sign up
                            </TextLink>
                        </div>
                    </form>
                </div>

                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
            </AuthLayout>

            {/* Banner en la parte inferior */}
            <div className="relative mx-auto mt-4 w-full">
                <img src="/images/diplomado.png" alt="Diplomado" className="w-full object-cover" />
            </div>
        </>
    );
}
