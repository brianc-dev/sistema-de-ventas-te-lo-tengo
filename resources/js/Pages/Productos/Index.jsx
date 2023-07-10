import Producto from "@/Components/Producto";
import {Grid} from "@mui/material";
import MainLayout from "@/Layouts/MainLayout";

export default function Index({auth, productos}) {
    const content =
        <div>
            <Grid container spacing={2}>
                {Object.values(productos).map(producto => <Producto key={producto.id} producto={producto}/>)}
            </Grid>
        </div>
    const sidebar = <div className="bg-sky-500">sidebar</div>
    return (
        <MainLayout title={"Productos"}>
            <div className="">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-1">
                    <div className="col-span-12 md:col-span-1 lg:col-span-2">
                        {sidebar}
                    </div>
                    <div className="col-span-12 md:col-span-3 lg:col-span-6">
                        {content}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
