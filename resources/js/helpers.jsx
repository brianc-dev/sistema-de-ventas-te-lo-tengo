import { IconButton, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from "@/Components/Icons";
import { enqueueSnackbar } from 'notistack';
import { usePage } from '@inertiajs/react';

export function GetFlashMessages() {
    const { flash } = usePage().props;
    useEffect(() => {
        flash.message && enqueueSnackbar(flash.message.message, { variant: flash.message.priority});
        flash.message = null;
    }, [flash])
    
    return;
    useEffect(() => {
        Object.values(flash).map(flashMessage => enqueueSnackbar(flashMessage.message, { variant: flashMessage.status}));
    })
}

const message = {
    status: 'success',
    message: ''
}