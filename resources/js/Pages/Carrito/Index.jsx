import Producto from "@/Components/Producto";
import { Head } from "@inertiajs/react";
import { Grid } from "@mui/material";

export default function Index({ auth, productos }) {
    return (
        <div>
            <Head title="Carrito"/>
            <Grid container spacing={2}>
                
            </Grid>
            {Object.values(productos).map(producto => <Producto key={producto.id} producto={producto} />)}
        </div>
    )
}