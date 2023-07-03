import Producto from "@/Components/Producto";
import Modal from "@/Components/Modal";
import { Container, Grid } from "@mui/material";
import { Head } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import IndexLayout from "@/Layouts/Productos/IndexLayout";


export default function Index({ auth, productos, status }) {
    const modal = <p>{status}</p>
    const navbar = <NavBar />
    const content = 
    <div>
        <Grid container spacing={2}>
            {Object.values(productos).map(producto => <Producto key={producto.id} producto={producto} />)}
        </Grid>
    </div>
    const footer = <Footer />
    return (
        <IndexLayout auth={auth} navbar={navbar} content={content} footer={footer}>
            <Head title="Productos">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
        </IndexLayout>
    )
}