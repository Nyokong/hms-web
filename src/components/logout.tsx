import React from 'react';

// router
import { useRouter } from 'next/navigation';

// cookies
import { getCookie, deleteCookie } from 'cookies-next';

// icons
import { MdOutlineLogout } from 'react-icons/md';

// ui components
import { Button } from './ui/button';

export default function logout() {
    const access_token = getCookie('access_token');
    const refresh_token = getCookie('refresh_token');

    const router = useRouter();

    const handleLogout = () => {
        if (access_token || refresh_token) {
            deleteCookie('access_token');
            deleteCookie('refresh_token');
            deleteCookie('user_data');
            deleteCookie('is_lect');
            deleteCookie('loggedin');
            router.push('/');
        } else {
            console.log('user not logged in');
            router.push('/');
        }
    };
    return (
        <div
            className="cursor-pointer
                            w-full h-[40px] "
        >
            <Button
                className="flex flex-row justify-between px-4 cursor-pointer
                            w-full h-[40px] bg-red-600 text-white hover:bg-red-700"
                onClick={handleLogout}
            >
                <p>Logout</p> <MdOutlineLogout />
            </Button>
        </div>
    );
}
