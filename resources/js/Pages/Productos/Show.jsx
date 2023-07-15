import MainLayout from "@/Layouts/MainLayout";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import {Gallery} from "@/Components/Gallery";

export default function Show({auth, producto}) {

    const {data, setData, errors, processing, post, } = useForm({
        productoId: producto.id,
        cantidad: 1
    })
    const onSecondaryClickListener = () => {
        post("/carrito", {
            preserveScroll: true,
        })
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

