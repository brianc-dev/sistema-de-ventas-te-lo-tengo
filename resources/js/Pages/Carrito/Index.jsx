import {Producto, Footer} from "@/Components";
import {Head} from "@inertiajs/react";
import {Grid} from "@mui/material";
import MainLayout from "@/Layouts/MainLayout";

export default function Index({auth, productos}) {
    return (
        <MainLayout title={"Carrito"}>
            <main>
                <Grid container spacing={2}>
                    {Object.values(productos).map(producto => <Producto key={producto.id} producto={producto}/>)}
                </Grid>
            </main>
        </MainLayout>
    )
}
