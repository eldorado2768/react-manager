import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap'; // Import Bootstrap Alert
import Icon from './Icon';

const CustomAlert = ({ message, type, onClose }) => {
    // Move variable declarations before any conditional returns
    let alertVariant = 'info'; // Bootstrap Alert variant
    let iconPath = '';

    // Use useEffect before any conditional returns
    useEffect(() => {
        if (!message) return;
        
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    // Early return after the hooks
    if (!message) return null;

    switch (type) {
        case 'error':
            alertVariant = 'danger'; // Corresponds to red
            iconPath = 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z';
            break;
        case 'success':
            alertVariant = 'success'; // Corresponds to green
            iconPath = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
            break;
        default: // info
            alertVariant = 'info'; // Corresponds to blue
            iconPath = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
            break;
    }

    return (
        <Alert variant={alertVariant} onClose={onClose} dismissible className="backdrop-blur-sm">
            <div className="d-flex align-items-center"> {/* Use d-flex for flexbox */}
                <Icon path={iconPath} className="w-5 h-5 me-3" /> {/* Bootstrap 'me-3' for margin-right */}
                <span>{message}</span>
            </div>
        </Alert>
    );
};

export default CustomAlert;
