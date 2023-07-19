import {Link} from "@inertiajs/react";

export default function ({categoria}) {
    return (
        <div className={"bg-white w-full py-6 px-4"}>
            <Link href={"/categorias/" + categoria.id}>
                <div className={"w-full"}>
                    <img className={"object-contain w-full aspect-square"}
                         src={categoria.imagen} alt={categoria.nombre}/>
                </div>
                <div className={"pt-5"}>
                    <h2 className={"text-xl text-center font-semibold"}>{categoria.nombre}</h2>
                </div>
            </Link>
        </div>
    )
}
