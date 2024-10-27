'use client';

import useAuth from '@/app/api/useAuth';
import React, { useEffect, useState } from 'react';

// icons
import {
    // File,
    // Home,
    // LineChart,
    // ListFilter,
    // MoreHorizontal,
    // Package,
    // Package2,
    // PanelLeft,
    // PlusCircle,
    // Search,
    // Settings,
    // ShoppingCart,
    // Users2,
    User,
    X,
} from 'lucide-react';
import Updateuserdata from './updateuserdata';
import { Label } from '@radix-ui/react-label';

export default function usertab() {
    const { user, loggedIn, offline, error } = useAuth();

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        if (user) {
            if (!user.first_name) {
                setIsOverlayOpen(true);
            }
        }
    }, []);

    const handleOpenOverlay = () => {
        setIsOverlayOpen(true);
    };

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
        console.log('close close close');
    };

    if (user) {
        return (
            <div className="relative">
                {isOverlayOpen && (
                    <div className="relative w-full">
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black w-full">
                            <div className="bg-white p-8 rounded shadow-lg relative sm:w-[400px] sm:mx-[5%]">
                                <button
                                    onClick={handleCloseOverlay}
                                    className="absolute top-2 right-2"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                                <Updateuserdata />
                            </div>
                        </div>
                    </div>
                )}
                <div className="m-5 bg-white text-black rounded-lg h-[150px] md:h-[120px] sm:h-[100px] flex flex-row justify-center items-center">
                    <div className="md:h-[100px] md:w-[100px] rounded-full md:flex items-center justify-center bg-slate-950 opacity-35 mx-2 hidden">
                        <User color="white" className="h-4 w-4 " />
                    </div>

                    <h1 className="text-6xl font-bold text-black-600 drop-shadow-md md:text-3xl sm:text-2xl">
                        Hi {user.first_name}
                    </h1>
                    <button
                        onClick={handleOpenOverlay}
                        className="h-[40px] w-[150px] flex flex-row justify-center items-center cursor-pointer mx-4 rounded-3xl hover:bg-red-700 hover:text-white"
                    >
                        <User className="h-6 w-6" />
                        <Label className="cursor-pointer">update my info</Label>
                    </button>
                </div>
            </div>
        );
    }
}
