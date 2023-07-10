import MainLayout from "@/Layouts/MainLayout";
import {useState} from "react";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function Show({auth, producto}) {

    const {data, setData, errors, processing, post, } = useForm({
        producto: producto,
        cantidad: 1
    })
    const onSecondaryClickListener = () => {
        post("carrito")
    }
    const onPrimaryClickListener = () => {
        // post("")
    }
    return (
        <MainLayout title={producto.nombre}>
            <main className={"container px-12 py-6 grid grid-cols-3 gap-4"}>
                <div className={"col-span-2"}>
                    <Gallery images={producto.imagenes}/>
                </div>
                <div className={"card flex flex-col gap-y-2"}>
                    <h2 className={"text-4xl font-bold capitalize"}>{producto.nombre}</h2>
                    <hr/>
                    <p>Disponibilidad: {producto.cantidad}</p>
                    <p>Precio: <span>$ </span>{producto.precio}</p>
                    <p>Cantidad: </p><input className={"w-fit min-w-min max-w-fit"} type="number" value={data.cantidad} onChange={(e) => setData('cantidad', e.target.value)} required min={1} max={producto.cantidad}/>
                    {errors.cantidad && <InputError message={errors.cantidad}/>}
                    <div className="grid grid-cols-2 gap-2">
                        <button className={"secondary-button"} onClick={onSecondaryClickListener} disabled={processing}>Agregar al carrito</button>
                        <button className={"primary-button"} onClick={onPrimaryClickListener} disabled={processing}>Comprar</button>
                    </div>
                </div>
            </main>
            <section className={"container px-12 h-fit min-h-min"}>
                <div className="card">
                    <header>
                        <h3 className={"font-bold text-2xl"}>Descripcion</h3>
                    </header>
                    <hr/>
                    <div className={""}></div>
                </div>
            </section>
        </MainLayout>
    );
}

export function Gallery({images = []}) {
    const [currentImage, setCurrentImage] = useState(images[0] ?? {})

    const onMouseOverListener = (image) => {
        setCurrentImage(image)
    }

    return (
        <div className="grid grid-cols-4 gap-4 max-h-full">
            <div className="col-span-1 px-4 flex flex-col items-center overflow-y-auto gap-2 h-fit snap-y">
                {images?.map(image => <img className={"flex-none border-2 border-slate-600 aspect-square object-contain bg-white w-1/2 snap-normal snap-start"} key={image.id} src={image.url} onMouseOver={(e) => onMouseOverListener(image)}/>)}
            </div>
            <div className={"col-span-3 bg-orange h-fit max-h-min"}><img className={"border-2 border-slate-600 aspect-square object-contain bg-white min-w-full"} src={currentImage.url} alt="" /></div>
        </div>
    )
}
