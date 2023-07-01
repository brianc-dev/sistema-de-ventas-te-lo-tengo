import Producto from "@/Components/Producto";
import Modal from "@/Components/Modal";
import { Grid } from "@mui/material";
import { Head } from "@inertiajs/react";
import Footer from "@/Components/Footer";


export default function Index({ auth, productos, status }) {
    const modal = <p>{status}</p>

    return (
        <div>
            <Head title="Productos">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <Grid container spacing={2}>
                {Object.values(productos).map(producto => <Producto key={producto.id} producto={producto} />)}
            </Grid>

            {status && <Modal children={modal} />}
            <Footer />
        </div>
    )
}