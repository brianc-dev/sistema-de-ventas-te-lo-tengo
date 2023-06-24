import React from 'react';

export default function Producto({ producto }) {
    return (
        <div>
            <img width={200} src="" alt="" />
            <h3>$ { producto.precio }</h3>
            <h4>{ producto.nombre }</h4>
        </div>
    );
}