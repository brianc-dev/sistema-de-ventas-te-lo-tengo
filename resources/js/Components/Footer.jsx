import { Link } from '@inertiajs/react';
import { Container, Stack, Typography } from '@mui/material';

export default function Footer({ auth }) {
    return (
        <footer className={"pt-6 bg-gradient-to-b from-amber-400 to-orange-400"}>
            <Container>
                <Stack direction={'column'} spacing={2}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <Stack direction={'column'}>
                            <h1 className='text-2xl font-bold'>Te Lo Tengo C.A.</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, error corporis beatae officiis quaerat suscipit nostrum inventore veritatis deleniti architecto harum mollitia tenetur fugit a consequuntur libero nihil non maiores ducimus iusto. Maiores sint repellendus, voluptatem velit totam ex sit.</p>
                        </Stack>
                        <Stack>
                            <h2 className='text-2xl font-bold'>Contacto</h2>
                            <Link href='/'>Soporte</Link>
                        </Stack>
                        <Stack><h2 className='text-2xl font-bold'>Terminos</h2></Stack>
                    </Stack>
                    <hr />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni molestias iure quas culpa repellat doloremque numquam dignissimos voluptatum at possimus!</p>
                </Stack>
            </Container>
        </footer>
    )
}
