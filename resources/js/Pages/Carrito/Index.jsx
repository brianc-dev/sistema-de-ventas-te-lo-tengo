import MainLayout from "@/Layouts/MainLayout";
import {Link, useForm} from "@inertiajs/react"
import {useMemo} from "react";

function CarritoItem({producto}) {
    const {data, setData, errors, patch, delete: destroy, processing} = useForm({
        productoId: producto.id,
        cantidad: producto.pivot.cantidad
    })

    const selectOptions = useMemo(() => {
        const selectOptions = []
        if (producto.cantidad > 0) {

            for (let x = 1; x <= producto.cantidad; x++) {
                const option = <option key={x} value={x}>{x}</option>
                selectOptions.push(option)
            }
        }
        return selectOptions
    }, [producto.cantidad])

    const onSelectListener = (e) => {
        // axios.patch()
        // setData('cantidad', e.target.value)
        // we don't setData 'cause it doesn't update data immediately
        data.cantidad = e.target.value
        patch("/carrito", {
            preserveScroll: true,
            only: ['productos', 'flash'],
            data: data
        })
    }

    const onRemoveListener = (e) => {
        destroy('/carrito', {
            preserveScroll: true,
            only: ['productos', 'flash']
        })
    }

    return (
        <li className={"carrito-item flex"}>
            <div className={"carrito-item__image w-32"}>
                <Link href={"/productos/" + producto.id}>
                    <img
                        className={"w-full border-2 border-slate-600 aspect-square object-contain bg-white"}
                        src={producto.imagenes[0]?.url ?? ''} alt={producto.nombre}/>
                </Link>
            </div>
            <div className={"carrito-item__description w-full ps-2"}>
                <Link href={"/productos/" + producto.id}><h5
                    className={"font-semibold underline text-amber-500"}>{producto.nombre}</h5></Link>

                <div className={"carrito-item"}>
                    <p><span className={"font-semibold"}>Precio: </span><span>{producto.precio}</span></p>
                </div>
                <div className={"options"}>
                    <div className="flex justify-between">
                        <div>
                            <label htmlFor={"quantity"}>Cantidad: </label>
                            <select id="quantity" value={data.cantidad} onChange={onSelectListener} autoComplete={"off"} disabled={processing} required>
                                {
                                    selectOptions
                                }
                            </select>
                            {/*<input className={"w-16"} type="number" value={data.quantity}*/}
                            {/*       onChange={e => setData('quantity', e.target.value)} required min={1}*/}
                            {/*       max={producto.cantidad}/>*/}
                        </div>
                        <button className={"secondary-button"} onClick={onRemoveListener}>Eliminar</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default function Index({auth, productos}) {
    return (
        <MainLayout title={"Carrito"}>
            <main className={"bg-slate-100"}>
                <div className={"grid grid-cols-3"}>
                    <div className="col-span-2">
                        <div className={"py-4 px-6"}>
                            <h1 className={"text-2xl font-bold"}>Carrito</h1>
                            <hr/>
                            <div>
                                <ul className={" py-4 px-4 bg-white"}>
                                    {productos.map(producto => <CarritoItem key={producto.id} producto={producto}/>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="h-fit bg-white w-full">
                            <div className="flex flex-col py-4 px-6 text-center h-full">
                                <h2 className={"text-2xl font-bold"}>Resumen</h2>
                                <hr/>
                                <div>
                                    <div className="flex justify-between"><span>Precio original</span><span>NaN</span>
                                    </div>
                                    <div className="flex justify-between"><span>Ahorros</span><span>NaN</span></div>
                                    <div className="flex justify-between"><span>Impuestos</span><span>NaN</span></div>
                                </div>
                                <hr/>
                                <div className={"py-2"}>
                                    <div className="flex justify-between"><strong
                                        className={"text-xl"}>Total</strong><strong className={"text-xl"}>NaN</strong>
                                    </div>
                                </div>
                                <div className={"py-4"}>
                                    <button className={"primary-button w-full"}>Comprar carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Grid container spacing={2}>*/}
                {/*    {Object.values(productos).map(producto => <Producto key={producto.id} producto={producto}/>)}*/}
                {/*</Grid>*/}
            </main>
        </MainLayout>
    )
}
