import React, { useState, useEffect } from 'react';

const cookiesPrompt = () => {
    const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            setCookiesAccepted(true);
        }
    }, []);

    const handleAcceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setCookiesAccepted(true);
    };

    if (cookiesAccepted) {
        return null; // Do not show the prompt if cookies are accepted
    }

    return (
        <div className="cookie-prompt">
            <p>We use cookies to improve your experience on our site.</p>
            <button onClick={handleAcceptCookies}>Accept</button>
            <a href="/privacy-policy">Learn More</a>
        </div>
    );
};


export default cookiesPrompt;
