import { IconButton, Snackbar } from '@mui/material';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from "@/Components/Icons";

export function FlashMessage() {
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <XMarkIcon />
            </IconButton>
        </>
    );

    const modal = <Snackbar open={open} message="This is a flash message" action={action} onClose={handleClose} autoHideDuration={6000} />
    return (<>
        {createPortal(modal, document.body)}
    </>)
}