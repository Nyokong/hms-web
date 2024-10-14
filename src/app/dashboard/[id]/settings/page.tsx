'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/app/loading';

export default function Settings() {
    const { id } = useParams();

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <div>
                    <Link
                        href={`/dashboard/${id}/`}
                        className="flex shrink-0 items-center justify-center gap-2  bg-transparent text-white md:text-base"
                    >
                        Go Back
                    </Link>
                </div>
                <h1>Settings for User {id}</h1>
            </Suspense>
        </div>
    );
}
