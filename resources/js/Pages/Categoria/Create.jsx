import MainLayout from "@/Layouts/MainLayout";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function Create() {

    const {data, setData, errors, post, processing} = useForm({
        name: ""
    })

    const handleChange = (e) => {
        setData(e.target.id, e.target.value)
    }

    const onSubmit = () => {
        post('/admin/categorias')
    }

    return (
        <MainLayout title={"Crear categoria"}>
            <main className={"bg-slate-100 px-6 py-6 grid grid-cols-4"}>
                <div className="col-span-1">
                    <h2>Categorias existentes</h2>
                </div>
                <div className="col-span-3">
                    <div className={"bg-white"}>
                        <h1 className={"main-header"}>Crear nueva categoria</h1>
                        <div className={"flex flex-col options"}>
                            <label htmlFor="name">Nombre de categoria</label>
                            <input id={"name"} type="text" required onChange={handleChange} minLength={"3"} maxLength={30} />
                            <InputError message={errors.name}/>
                            <button className={"primary-button"} disabled={processing} onClick={onSubmit}>Crear</button>
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    )
}
