'use client';

// import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Landingpage from '@/components/landingpage';

// components
import Header from '@/components/header';

import HomePage from '@/components/homepage';

// axios
//import axios from 'axios';

// import { refreshToken } from './api/refresh';

// import Googlebutton from '@/components/googlebutton';

// import { getGoogleTokens } from '../app/api/google-login';
// import { getGoogleToken } from '../app/api/google-login';
import useAuth from './api/useAuth';
// import headerlinks from '../components/headerlinks';
// import Headerlinks from '../components/headerlinks';

export default function Home() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const { user, loggedIn, loading, offline, error } = useAuth();

    useEffect(() => {
        if (loggedIn && user) {
            router.push(`/profile/${user.id}`);
        }
    }, [loggedIn, user, router]);

    if (offline) {
        return (
            // <div className="grid grid-rows-[20px_1fr_20px] min-h-screen gap-16 sm:p-3 font-[family-name:var(--font-geist-sans)]">
            //     <Header />

            <div className="flex justify-center flex-row w-full">
                <HomePage />
            </div>
            // </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen gap-16 sm:p-3 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <div className="flex justify-center flex-row w-full">
                <HomePage />
            </div>
        </div>
    );
}
