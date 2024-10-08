'use client';

import useAuth from '@/app/api/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react';

// components
import Logout from '@/components/logout';
import { Label } from '@/components/ui/label';
import ProfileDestNav from '../../../components/profileDestNav';
import Viewassignments from '../../../components/viewassignments';

export default function profile() {
    const { user, loggedIn, loading, offline, error } = useAuth();

    const router = useRouter();

    if (loggedIn) {
        return (
            <div className="flex flex-col items-center w-full">
                <ProfileDestNav />

                <Viewassignments />
            </div>
        );
    }
}
