import Producto from "@/Components/Producto";

export default function Index({ auth, productos }) {
    return (
        <div>
            {Object.values(productos).map(producto => <Producto key={producto.id} producto={producto} />)}
        </div>
    )
}