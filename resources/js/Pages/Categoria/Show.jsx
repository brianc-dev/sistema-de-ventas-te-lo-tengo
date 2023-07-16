import MainLayout from "@/Layouts/MainLayout";
import Producto from "@/Components/Producto";

export default function Show({categoria}) {


    return (
        <MainLayout title={categoria.nombre}>
            <main className={"grid grid-cols-4 bg-slate-100 px-6 py-6"}>
                <h1 className={"main-header"}>{categoria.nombre}</h1>
                <div className={"categoria-container"}>
                    {categoria.productos.map( producto => <Producto key={producto.id} producto={producto}/>)}
                </div>
            </main>
        </MainLayout>
    )
}
