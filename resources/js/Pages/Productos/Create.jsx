import { useForm } from '@inertiajs/react';
import {  } from '@mui/material';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        codigo: '',
        nombre: '',
        cantidad: 0,
        precio: 0.0,
        gravado: false
      });

      const onSubmit = (e) => {
        e.preventDefault();
        post('/productos');
      }

    return (
        <form onSubmit={ onSubmit }>
            <input placeholder='Codigo' type="text" value={data.codigo} onChange={e => setData('codigo', e.target.value)}/>
            {errors.codigo && <div>{errors.codigo}</div>}
            <input placeholder='Nombre' type="text" value={data.nombre} onChange={e => setData('nombre', e.target.value)}/>
            {errors.nombre && <div>{errors.nombre}</div>}
            <input placeholder='Cantidad' type="number" value={data.cantidad} onChange={e => setData('cantidad', e.target.value)}/>
            {errors.cantidad && <div>{errors.cantidad}</div>}
            <input placeholder='Precio' type="number" value={data.precio} onChange={e => setData('precio', e.target.value)}/>
            {errors.precio && <div>{errors.precio}</div>}
            <input type="checkbox" checked={data.gravado} onChange={e => setData('gravado', e.target.checked)} /> Gravado
            <button type="submit" disabled={processing}>Crear</button>
        </form>
    );
}