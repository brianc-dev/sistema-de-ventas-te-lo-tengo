import MainLayout from "@/Layouts/MainLayout";
import {Link} from "@inertiajs/react";
import Categoria from "@/Components/Categoria";

export default function Index({categories}) {
    return (
        <MainLayout title={"Categorias"}>
            <main className="bg-slate-100 px-2 py-2">
                <h1 className={"font-bold text-2xl"}>Categorias</h1>
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-1">
                    <div className="col-span-12 md:col-span-1 lg:col-span-2">

                    </div>
                    <div className="col-span-12 md:col-span-3 lg:col-span-6">
                        <div className={"grid grid-cols-4 gap-2"}>
                            {categories.map(category => <Categoria key={category.id} categoria={category}/>)}
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}
