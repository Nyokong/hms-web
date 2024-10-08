'use client';

import React from 'react';
import { Button } from './ui/button';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleLoginButton() {
    const google = () => {
        const clientID = process.env.CLIENT_ID;
        const callbackUrl = 'http://localhost:3000/';
        window.location.replace(
            `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callbackUrl}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=online`,
        );
    };

    return (
        <div>
            <Button
                className="flex flex-row justify-center ml-4 mr-4 
                            w-[50px] h-[50px] rounded-[50px] text-white hover:bg-slate-700"
                onClick={google}
            >
                <FcGoogle />
            </Button>
        </div>
    );
}
