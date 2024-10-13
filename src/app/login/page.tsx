'use client';

import React from 'react';
import LoginLogic from '@/components/loginlogic';

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white shadow-lg border-2 border-purple-700 rounded-lg p-10 w-full max-w-md h-[550px] flex flex-col justify-center">
                <LoginLogic />
            </div>
        </div>
    );
}
