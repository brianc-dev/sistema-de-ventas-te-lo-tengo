import {useEffect} from 'react';
import {enqueueSnackbar} from 'notistack';
import {usePage} from '@inertiajs/react';

export function GetFlashMessages() {
    const { flash } = usePage().props;
    useEffect(() => {
        flash.message && enqueueSnackbar(flash.message.message, { variant: flash.message.priority});
        flash.message = null;
    }, [flash])
    return;
}

const message = {
    status: 'success',
    message: ''
}
