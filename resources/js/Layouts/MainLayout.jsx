import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import {Head} from "@inertiajs/react";

export default function MainLayout({title = 'MyApp',children}) {
    return (
        <>
            <Head title={title}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}
