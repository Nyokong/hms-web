import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

const useCookieChecker = (cookieName: string): boolean => {
    const [isCookieFound, setIsCookieFound] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const cookie = getCookie(cookieName);
            if (cookie) {
                setIsCookieFound(true);
                clearInterval(interval); // Stop the interval if the cookie is found
            } else {
                console.log('Checking for cookie...');
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [cookieName]);

    return isCookieFound;
};

export default useCookieChecker;
