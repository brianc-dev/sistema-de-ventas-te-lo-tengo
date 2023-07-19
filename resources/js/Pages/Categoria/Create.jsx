import MainLayout from "@/Layouts/MainLayout";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import {useEffect} from "react";

export default function Create({categories}) {

    const {data, setData, errors, post, processing, setDefaults, reset} = useForm({
        nombre: "",
        imagen: null
    })

    const handleChange = (e) => {
        setData(e.target.id, e.target.value)
    }

    const handleFiles = (e) => {
        const file = e.target.files[0]
        setData('imagen', file)
    }

    const onSubmit = () => {
        post('/admin/categorias')
    }

    return (
        <MainLayout title={"Crear categoria"}>
            <main className={"bg-slate-100 px-6 py-6 grid grid-cols-4 gap-2"}>
                <div className="col-span-1">
                    <div className="bg-white p-4 h-full">
                        <h2 className={"font-semibold text-lg"}>Categorias existentes</h2>
                        <div>
                            <ul>
                                {categories.map(category => <li key={category.id}>{category.nombre}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className={"bg-white py-4 px-4"}>
                        <h1 className={"main-header"}>Crear nueva categoria</h1>
                        <div className={"grid grid-cols-4"}>
                            <div className="col-span-2 flex flex-col gap-2 pt-2">
                                <label htmlFor="name">Nombre de categoria</label>
                                <input className={"input-field"} id={"nombre"} type="text" required
                                       onChange={handleChange} minLength={"3"} maxLength={30} />
                                <InputError message={errors.nombre}/>
                                <input className={"flex-none"} type="file" accept={"image/png,image/jpeg"} onChange={handleFiles}/>
                                <button className={"primary-button"} disabled={processing} onClick={onSubmit}>Crear
                                </button>
                            </div>
                            <div className={"col-start-4"}>
                                asd
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    )
}
