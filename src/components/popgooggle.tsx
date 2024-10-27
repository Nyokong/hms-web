import React from 'react';
import { Button } from './ui/button';

// import axios from 'axios';

// import for cookies
import Cookies from 'js-cookie';

const RedirectPopUp = () => {
    const handleOpenPopUp = () => {
        const url =
            'http://localhost:8000/accounts/google/login/?process=login'; // URL to redirect
        const width = 400;
        const height = 550;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        const popup = window.open(
            url,
            'popupWindow',
            `width=${width},height=${height},top=${top},left=${left}`,
        );

        // Check if the popup is closed
        const checkPopupClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkPopupClosed);
                console.log('Popup is closed');
                // check for session
                console.log(Cookies.get('sessionid'));
            }
        }, 1000);

        // Run code before the popup closes
        popup.onbeforeunload = () => {
            console.log('Popup is about to close');

            // my logic i thiink
        };
    };

    return (
        <div>
            <Button
                className="flex flex-row justify-center ml-4 mr-4 
                            w-[130px] h-[50px] rounded-[40px] text-white hover:bg-slate-900"
                onClick={handleOpenPopUp}
            >
                google auth
            </Button>
        </div>
    );
};

export default RedirectPopUp;
