'use client';

import React from 'react';
import Signinlogic from '@/components/signinlogic';
import Link from 'next/link';

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="absolute top-5 left-5">
                <Link href="/">
                    <button className="bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition duration-300">
                        Home
                    </button>
                </Link>
            </div>
            <div className="bg-white shadow-lg border-2 border-purple-700 rounded-lg p-10 w-full max-w-md h-[650px] flex flex-col justify-center">
                <Signinlogic />
            </div>
        </div>
    );
}
