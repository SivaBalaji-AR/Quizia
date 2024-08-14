// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, children }) => 
{
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
