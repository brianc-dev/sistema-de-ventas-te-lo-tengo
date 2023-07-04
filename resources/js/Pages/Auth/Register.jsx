import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        condicion: '',
        cedula: '',
        nombre: '',
        apellido: '',
        telefono: ''
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                <InputLabel htmlFor="cedula" value="Cédula" />
                    <div className="flex gap-6">
                        <div className='w-1/6'>
                            <select name="condicion" id="condicion" className='mt-1 inputfield' onChange={(e) => setData('condicion', e.target.value)}>
                                <option value="">-</option>
                                <option value="V">V</option>
                                <option value="E">E</option>
                            </select>
                            <InputError message={errors.condicion} className="mt-2" />
                        </div>
                        <div className='w-5/6'>
                            <TextInput
                                id="cedula"
                                type="number"
                                name="cedula"
                                value={data.cedula}
                                className="mt-1 block w-full"
                                autoComplete="cedula"
                                onChange={(e) => setData('cedula', e.target.value)}
                                required
                            />
                            <InputError message={errors.cedula} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nombre" value="Nombre" />

                    <TextInput
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        className="mt-1 block w-full"
                        autoComplete="nombre"
                        onChange={(e) => setData('nombre', e.target.value)}
                        required
                    />

                    <InputError message={errors.nombre} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="apellido" value="Apellido" />

                    <TextInput
                        id="apellido"
                        type="text"
                        name="apellido"
                        value={data.apellido}
                        className="mt-1 block w-full"
                        autoComplete="apellido"
                        onChange={(e) => setData('apellido', e.target.value)}
                        required
                    />

                    <InputError message={errors.apellido} className="mt-2" />
                </div>

                <div className="mt-4">

                    <InputLabel htmlFor="telefono" value="Teléfono" />

                    <TextInput
                        id="telefono"
                        type="text"
                        name="telefono"
                        value={data.telefono}
                        className="mt-1 block w-full"
                        autoComplete="telefono"
                        onChange={(e) => setData('telefono', e.target.value)}
                    />

                    <InputError message={errors.telefono} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
