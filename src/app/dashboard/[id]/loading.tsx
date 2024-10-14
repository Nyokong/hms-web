'use client';

import React from 'react';
import { bouncy } from 'ldrs';
import { trio } from 'ldrs';
import { momentum } from 'ldrs';

export default function Loading() {
    trio.register();
    momentum.register();

    return (
        <main className="text-center text-white mt-10 w-svw h-svh flex flex-col justify-center items-center">
            {/* <l-momentum size="40" speed="1.1" color="teal"></l-momentum> */}
            <div className="flex text-white flex-col justify-center items-center bg-slate-200 opacity-25">
                <l-trio size="40" speed="1.3" color="white"></l-trio>
            </div>
        </main>
    );
}
