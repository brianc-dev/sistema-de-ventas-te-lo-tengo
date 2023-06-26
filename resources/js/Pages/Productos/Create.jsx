import { useForm } from '@inertiajs/react';

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
            <input type="text" value={data.codigo} onChange={e => setData('codigo', e.target.value)}/>
            {errors.codigo && <div>{errors.codigo}</div>}
            <input type="checkbox" checked={data.gravado} onChange={e => setData('gravado', e.target.checked)} /> Gravado
            <button type="submit" disabled={processing}>Crear</button>
        </form>
    );
}