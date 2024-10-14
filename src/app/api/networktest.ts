import { useState, useEffect } from 'react';

const useNetworkStatus = () => {
    const [connectionType, setConnectionType] = useState<string | undefined>(
        undefined,
    );

    useEffect(() => {
        const updateConnectionStatus = () => {
            if (navigator.connection) {
                setConnectionType(navigator.connection.effectiveType);
            }
        };

        updateConnectionStatus();

        if (navigator.connection) {
            navigator.connection.addEventListener(
                'change',
                updateConnectionStatus,
            );
        }

        return () => {
            if (navigator.connection) {
                navigator.connection.removeEventListener(
                    'change',
                    updateConnectionStatus,
                );
            }
        };
    }, []);

    return connectionType;
};

export default useNetworkStatus;
