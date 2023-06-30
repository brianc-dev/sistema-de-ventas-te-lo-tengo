import Producto from "@/Components/Producto";
import Modal from "@/Components/Modal";
import { Grid } from "@mui/material";
import { Head } from "@inertiajs/react";


export default function Index({ auth, productos, status }) {
    const modal = <p>{ status }</p>

    return (
        <div>
            <Head title="Productos"/>
            <Grid container spacing={2}>
                { Object.values(productos).map( producto => <Producto key={ producto.id } producto={ producto }/>) }
            </Grid>
            
            { status && <Modal children={ modal }/>}
        </div>
    )
}