import {Grid, Stack, Card} from '@mui/material';
import React from 'react';
import {Link, usePage} from "@inertiajs/react";

export default function Producto({producto}) {
    const host = usePage().props.ziggy.url
    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Link href={"/productos/"+producto.id}>
                <Card>
                    <Stack className={"px-4 py-4"}>
                        <img className={"flex-none border-2 border-slate-600 aspect-square object-contain bg-white w-full"} src={producto?.imagenes[0]?.url ?? host + "/storage/images/resources/no-photo.png"} alt={producto.nombre}/>
                        <h4 className={"text-lg font-bold"}>{producto.nombre}</h4>
                        <p className={"text-2xl"}><span className={"align-text-top text-sm"}>$</span> {producto.precio}</p>
                    </Stack>
                </Card>
            </Link>
        </Grid>
    );
}
