'use client';

// import Image from "next/image";
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { refreshToken } from '@/app/api/refresh';

import checkUserAuthentication from '@/app/api/authentication';

// import for cookies
import Cookies from 'js-cookie';

// lazy component
const Loading = React.lazy(() => import('@/app/loading'));
// hooks
import useAuth from '@/app/api/useAuth';
// my components
import Headerlinks from './headerlinks';
// import { getGoogleToken } from '@/app/api/google-login';
import { getCookie } from 'cookies-next';
// import Googlebutton from './googlebutton';

export default function Header() {
    const { user, loggedIn, loading, offline, error } = useAuth();

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                console.log(code);
                try {
                    // await getGoogleToken(code);
                    // console.log(data);
                } catch (err) {
                    console.error('Error fetching Google token:', err);
                }
            } else {
                console.log('no need to run');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = getCookie('access_token');

            if (accessToken) {
                if (user) {
                    router.push(`/profile/${user.id}`);
                }
            }
        };

        checkAccessToken();
    }, [router]);

    if (offline) {
        return (
            <div className="flex flex-row justify-center items-center h-[80px] w-full">
                <Headerlinks />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-row justify-center items-center h-[80px] w-full">
                <Headerlinks />
            </div>
        );
    }
}
