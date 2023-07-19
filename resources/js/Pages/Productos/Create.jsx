import {useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import {useState} from "react";
import MainLayout from "@/Layouts/MainLayout";
import {ImagesPreview} from "@/Components/ImagesPreview";

export default function Create({auth}) {
    const {data, setData, post, processing, errors, progress} = useForm({
        codigo: '',
        nombre: '',
        cantidad: 0,
        precio: 0.0,
        gravado: false,
        pictures: null
    });

    const [images, setImages] = useState([])

    const onSubmit = (e) => {
        e.preventDefault();
        post('/admin/productos');
    }

    const onPicturesSelected = (e) => {
        const newFiles = Object.values(e.target.files)
        const files = [...images]
        files.push(...newFiles)
        setImages(files)
        setData('pictures', e.target.files)
    }

    const onPictureClicked = (imageNumber) => {
        const files = [...images]
        files.splice(imageNumber, 1)
        setImages(files)
        setData('pictures', files)
    }

    return (
            <MainLayout>
                <form onSubmit={onSubmit}>
                    <label htmlFor="codigo">Codigo</label>
                    <input className="block inputfield" id="codigo" placeholder='Codigo' type="text" value={data.codigo}
                           onChange={e => setData('codigo', e.target.value)}/>
                    {errors.codigo && <div>{errors.codigo}</div>}
                    <label htmlFor="nombre">Nombre</label>
                    <input className="block inputfield" id="nombre" placeholder='Nombre' type="text" value={data.nombre}
                           onChange={e => setData('nombre', e.target.value)}/>
                    {errors.nombre && <div>{errors.nombre}</div>}
                    <label htmlFor="cantidad">Cantidad disponible</label>
                    <input className="block inputfield" id="cantidad" placeholder='Cantidad' type="number"
                           value={data.cantidad} onChange={e => setData('cantidad', e.target.value)}/>
                    {errors.cantidad && <div>{errors.cantidad}</div>}
                    <label htmlFor="precio">Precio Unitario</label>
                    <input className="block inputfield" id="precio" placeholder='Precio' type="number" value={data.precio}
                           onChange={e => setData('precio', e.target.value)}/>
                    {errors.precio && <div>{errors.precio}</div>}
                    <input type="checkbox" checked={data.gravado}
                           onChange={e => setData('gravado', e.target.checked)}/> Gravado
                    <input className="block" type="file" id="pictures" multiple
                           accept={"image/jpeg,image/png"} onChange={onPicturesSelected}/>
                    {errors.pictures && <div>{errors.pictures}</div>}
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <PrimaryButton disabled={processing}>Crear</PrimaryButton>
                    <ImagesPreview key={crypto.randomUUID()} images={images} onClickListener={onPictureClicked}/>
                </form>
            </MainLayout>
    );
}
