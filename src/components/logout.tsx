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
            router.push('/');
        } else {
            console.log('user not logged in');
            router.push('/');
        }
    };
    return (
        <div>
            <Button
                className='flex flex-row ml-4 mr-4 justify-center
                            w-[120px] h-[50px] rounded-[50px] text-white hover:bg-slate-600"'
                onClick={handleLogout}
            >
                <p className="mx-2">Logout</p> <MdOutlineLogout />
            </Button>
        </div>
    );
}
