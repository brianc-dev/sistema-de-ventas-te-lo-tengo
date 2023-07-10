import {Grid, Stack, Card} from '@mui/material';
import React from 'react';
import {Link} from "@inertiajs/react";

export default function Producto({producto}) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Link href={"/productos/"+producto.id}>
                <Card>
                    <Stack>
                        <img width={200} height={200} src={producto.imagenes} alt={producto.nombre}/>
                        <h4>{producto.nombre}</h4>
                        <h3>$ {producto.precio}</h3>
                    </Stack>
                </Card>
            </Link>
        </Grid>
    );
}
