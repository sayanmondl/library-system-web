"use client";

import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!show) return null;

    return (
        <div className="fixed p-6 bg-blue-100 bottom-24 md:bottom-4 right-4 border shadow-lg">
            <p className="font-old text-white-100">{message}</p>
        </div>
    );
}

export default Toast;