'use client';

import React from 'react';
import { bouncy } from 'ldrs';
import { trio } from 'ldrs';
import { momentum } from 'ldrs';

export default function Loading() {
    // trio.register()
    momentum.register();

    return (
        <main className="text-center mt-10">
            <l-momentum size="40" speed="1.1" color="teal"></l-momentum>
            {/* 
        <l-trio
        size="40"
        speed="1.3" 
        color="black" 
        ></l-trio> */}
        </main>
    );
}
