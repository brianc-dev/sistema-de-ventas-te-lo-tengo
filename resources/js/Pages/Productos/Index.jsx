import Producto from "@/Components/Producto";
import Modal from "@/Components/Modal";


export default function Index({ auth, productos, status }) {
    const modal = <p>{ status }</p>

    return (
        <div>
            { Object.values(productos).map( producto => <Producto key={ producto.id } producto={ producto }/>) }
            { status && <Modal children={ modal }/>}
        </div>
    )
}