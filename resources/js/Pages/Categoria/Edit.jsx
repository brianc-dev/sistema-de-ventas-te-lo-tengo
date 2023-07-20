import MainLayout from "@/Layouts/MainLayout";
import {useForm, usePage} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import SingleImagePreview from "@/Components/SingleImagePreview";
import {useState} from "react";

export default function Edit({categoria}) {
    // todo: clean up logic for changing picture
    const {data, setData, errors, post, processing, progress, setDefaults, reset} = useForm({
        _method: 'patch', // So it can receive PATCH request with file on back-end
        nombre: categoria.nombre,
        imagen: null,
        setToDefaultImage: false
    })

    const [imagenActual, setImagenActual] = useState(categoria.imagen)

    const handleChange = (e) => {
        setData(e.target.id, e.target.value)
    }

    const handleFiles = (e) => {
        console.log("handle files")
        console.log(data.setToDefaultImage)
        setData('setToDefaultImage', false)
        setData("imagen", e.target.files[0])
    }

    const onSubmit = () => {
        post(route('categorias.update', categoria), {
            onSuccess: () => { reset('imagen')},
            preserveState: false
        })
    }

    const onImageClick = () => {
        setData("imagen", null)
    }

    const setToDefaultImage = () => {
        const res = confirm('Estas seguro que deseas eliminar la imagen actual? Se usara la imagen por defecto')
        if (res) {
            setData('imagen', null)
            setData('setToDefaultImage', true)
            setImagenActual('/storage/images/resources/open-box.png')
        }
    }

    return (
        <MainLayout title={"Crear categoria"}>
            <main className={"bg-slate-100 px-6 py-6 grid grid-cols-4 gap-2"}>
                <div className="col-span-1">
                    <div className="bg-white p-4 h-full">
                        <h2 className={"font-semibold text-lg"}>Categorias existentes</h2>
                        <div>
                            <ul>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className={"bg-white py-4 px-4"}>
                        <h1 className={"main-header"}>Editar categoria</h1>
                        <div className={"grid grid-cols-4"}>
                            <div className="col-span-2 flex flex-col gap-2 pt-2">
                                <label htmlFor="name">Nombre de categoria</label>
                                <input className={"input-field"} id={"nombre"} type="text" required
                                       onChange={handleChange} minLength={3} maxLength={30} value={data.nombre}/>
                                <InputError message={errors.nombre}/>
                                <div>
                                    <p>Imagen actual</p>
                                    <div className={"flex gap-2"}>

                                        <div><img src={imagenActual} alt=""/></div>
                                        {imagenActual !== "/storage/images/resources/open-box.png" && <button className={"self-start"} onClick={setToDefaultImage}>x</button>}
                                    </div>
                                </div>
                                <div>
                                    <p>Nueva imagen (Haz click para eliminar)</p>
                                    <SingleImagePreview image={data.imagen} onClickListener={onImageClick}/>
                                    <input className={"flex-none"} type="file" accept={"image/png,image/jpeg"} onChange={handleFiles} />
                                    <InputError message={errors.imagen}/>
                                    {progress && (
                                        <progress value={progress.percentage} max="100">
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                </div>
                                <button className={"primary-button"} disabled={processing} onClick={onSubmit}>Guardar</button>
                            </div>
                            <div className={"col-start-4"}>
                                Instrucciones
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    )
}
