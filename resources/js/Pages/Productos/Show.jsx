export default function Show({ auth, producto }) {
    // todo: move to its own component
    return (
        <div>
            <h2>{producto.nombre}</h2>
            <p>Cantidad: {producto.cantidad}</p>
            <p>Precio: {producto.precio}</p>
        </div>
    );
}