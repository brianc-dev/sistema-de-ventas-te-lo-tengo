import InputError from "@/Components/InputError";
import NavBar from "@/Components/NavBar";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { GetFlashMessages } from "@/helpers";
import { SnackbarProvider } from 'notistack';

export default function Edit({ user, cliente }) {

    const { flash } = usePage().props

    const userForm = useForm({
        'form': 'user',
        'email': user.email
    });

    const submitUserForm = (e) => {
        e.preventDefault();
        userForm.patch('/perfil', {
            preserveScroll: true,
        });
    }

    const perfilForm = useForm({
        'form': 'perfil',
        'nombre': cliente.nombre,
        'apellido': cliente.apellido,
        'telefono': cliente.telefono
    })

    const submitPerfilForm = (e) => {
        e.preventDefault();
        perfilForm.patch('/perfil', {
            preserveScroll: true
        });
    }

    return (
        <>
            <NavBar />
            <section>
                <header className="bg-orange-200 py-6 px-6">
                    <h2 className="text-xl font-medium text-gray-900">Informacion de usuario</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Actualiza la informacion de usuario
                    </p>
                </header>
                <div className="md:container mx-auto px-6 py-4">
                    <div className="card">
                        <form onSubmit={submitUserForm}>
                            <label className="block" htmlFor="username">Usuario</label>
                            <input className="inputfield block mt-1" type="text" name="username" id="username" value={user.username} disabled/>
                            <label className="block mt-3" htmlFor="email">Correo Electronico</label>
                            <input className="inputfield block mt-1" type="email" name="email" id="email" value={userForm.data.email} onChange={e => userForm.setData('email', e.target.value)}/>
                            <InputError className="mt-2" message={userForm.errors.email} />
                            <PrimaryButton className="block mt-4" disabled={userForm.processing}>Guardar</PrimaryButton>
                        </form>
                    </div>
                </div>
            </section>
            <section>
                <header className="bg-orange-200 py-6 px-6">
                    <h2 className="text-xl font-medium text-gray-900">Informacion de perfil</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Actualiza la informacion de perfil
                    </p>
                </header>
                <div className="md:container mx-auto px-6 py-4">
                    <div className="card">
                        <form onSubmit={submitPerfilForm}>
                            <label className="block" htmlFor="nombre">Nombre</label><sub>Debe coincidir con su cedula</sub>
                            <input className="inputfield block mt-1" type="text" name="nombre" id="nombre" value={perfilForm.data.nombre} onChange={e => perfilForm.setData('nombre', e.target.value)} required/>
                            <InputError className="mt-2" message={perfilForm.errors.nombre} />
                            <label className="block mt-2" htmlFor="apellido">Apellido</label><sub>Debe coincidir con su cedula</sub>
                            <input className="inputfield block mt-1" type="text" name="apellido" id="apellido" value={perfilForm.data.apellido} onChange={e => perfilForm.setData('apellido', e.target.value)} required/>
                            <InputError className="mt-2" message={perfilForm.errors.apellido} />
                            <label className="block mt-2" htmlFor="telefono">Telefono</label><sub>Ejemplo: 0281-1234567 / 0414-1234567</sub>
                            <div>
                                <input className="inputfield inline mt-1" type="text" name="telefono" id="telefono" value={perfilForm.data.telefono || ""} onChange={e => perfilForm.setData('telefono', e.target.value)} placeholder="Ej: 0281-1234567" maxLength={12} pattern="^02[0-9]{2}-[0-9]{7}$"/>
                                <InputError className="mt-2" message={perfilForm.errors.telefono} />
                            </div>
                            <PrimaryButton className="block mt-4" disabled={perfilForm.processing}>Modificar</PrimaryButton>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
