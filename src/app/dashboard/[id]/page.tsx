'use client';

import React from 'react';
import useAuth from '@/app/api/useAuth';
import { useRouter } from 'next/navigation';

// components
import Logout from '@/components/logout';
import { Label } from '@/components/ui/label';
import ProfileDestNav from '../../../components/profileDestNav';
import Viewassignments from '../../../components/viewassignments';

export default function profile() {
    const { user, loggedIn, offline, error } = useAuth();

    const router = useRouter();

    if (user) {
        console.log(user);
        return (
            <div className="flex flex-col items-center w-full">
                <ProfileDestNav />

                <h1>
                    {user.id} {user?.student_number} - {user?.email}
                </h1>

                <Viewassignments />
            </div>
        );
    }
}
