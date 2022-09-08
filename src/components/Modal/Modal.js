import React, { useEffect } from 'react'
import { func, node } from 'prop-types';
import classes from './Modal.module.css'

import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {

    const handleClose = (e) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    }
        
    useEffect(() => {

        const handleKeyDown = (e) => {
            if (e.code === 'Escape') {
                onClose();
            }
        }
        
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    return createPortal(
        <div onClick={handleClose} className={classes.root}>
            <div className={classes.modal}>
                {children}
            </div>
        </div>,
        modalRoot,
    )

};

Modal.propsTypes = { 
    onClose: func.isRequired,
    children: node.isRequired
}
export default Modal;