import { IconButton, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from "@/Components/Icons";
import { enqueueSnackbar } from 'notistack';
import { usePage } from '@inertiajs/react';

export function GetFlashMessages() {
    const { flash } = usePage().props;
    useEffect(() => {
        flash.message && enqueueSnackbar(flash.message, { variant: 'success'})
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