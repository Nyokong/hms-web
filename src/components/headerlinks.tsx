import React from 'react';
import Link from 'next/link';

import RedirectPopUp from './popgooggle';

export default function headerlinks() {
    return (
        <div>
            <div className="flex flex-row justify-start">
                <div
                    className="flex flex-row justify-center ml-4 mr-4 
            w-[130px] h-[50px] rounded-[40px] text-white hover:bg-slate-700"
                >
                    <Link href="/" className="flex flex-col justify-center">
                        Home
                    </Link>
                </div>

                <div
                    className="flex flex-row justify-center ml-4 mr-4 
            w-[130px] h-[50px] rounded-[40px] text-white hover:bg-slate-900"
                >
                    <Link
                        href="/login"
                        className="flex flex-col justify-center"
                    >
                        Login here
                    </Link>
                </div>
                {/* <div
                    className="flex flex-row justify-center ml-4 mr-4 
                            w-[130px] h-[50px] rounded-[40px] text-white hover:bg-slate-900"
                >
                    <Link
                        href="http://localhost:8000/accounts/google/login/?process=login"
                        className="flex flex-col justify-center"
                    >
                        google auth
                    </Link>
                </div> */}

                <RedirectPopUp />
            </div>
        </div>
    );
}