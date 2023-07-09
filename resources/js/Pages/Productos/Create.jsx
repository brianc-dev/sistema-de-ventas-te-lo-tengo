import {useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import NavBar from "@/Components/NavBar";
import {useEffect, useState} from "react";
import {SnackbarProvider} from "notistack";
import {GetFlashMessages} from "@/helpers";

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

    return (
        <>
            <NavBar/>
            <SnackbarProvider autoHideDuration={6000}/>
            <GetFlashMessages />
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
                <PreviewPanel key={crypto.randomUUID()} images={images}/>
            </form>1
        </>
    );
}

function PreviewPanel({images}) {

    const [imageNumber, setImageNumber] = useState(0)

    const [imageFrames, setImageFrame] = useState([])

    useEffect(() => {

        if (images.length !== 0) {
            const reader = new FileReader()
            reader.onload = (e) => {

                const img = <img className="w-1/6 image-preview" key={imageNumber} src={e.target.result} alt={`Image number ${imageNumber + 1} for product`}/>

                if (imageNumber < images.length - 1) {
                    const newNumber = imageNumber + 1
                    setImageNumber(newNumber)
                }

                const newArray = [...imageFrames, img]
                setImageFrame(newArray)

            }
            reader.readAsDataURL(images[imageNumber])
        }
    }, [imageNumber, images])

    return (
        <div className="flex">
            {imageFrames.map(image => image)}
        </div>
    )
}
