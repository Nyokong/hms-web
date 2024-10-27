'use client';

// import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    const { user, loggedIn, offline, error } = useAuth();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push(`/dashboard/${user.id}`);
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="w-full">
                <HomePage />
            </div>
        );
    }

    return (
        // grid grid-rows-[20px_1fr_20px] 
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
            <Header />
            <div className=" w-full">
                <HomePage />
            </div>
        </div>
    );
}
