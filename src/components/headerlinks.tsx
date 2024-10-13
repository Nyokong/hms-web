import React from 'react';
import Link from 'next/link';

import RedirectPopUp from './popgooggle';
import Googlebutton from './googlebutton';
import { Label } from '@radix-ui/react-label';

export default function headerlinks() {
    return (
        <div className="flex justify-between items-center py-4 px-8 bg-gray-100">
            <div className="flex items-center">
                <Label className="text-purple-600 font-bold text-3xl mr-16">
                    HMS
                </Label>
            </div>

            <div className="flex flex-row items-center">
                <div className="flex justify-center ml-4 mr-4 w-[130px] h-[50px] rounded-[40px] text-black hover:bg-slate-200">
                    <Link href="/" className="flex flex-col justify-center">
                        Home
                    </Link>
                </div>

                <div className="flex justify-center ml-4 mr-4 w-[130px] h-[50px] rounded-[40px] text-black hover:bg-slate-300">
                    <Link
                        href="/login"
                        className="flex flex-col justify-center"
                    >
                        Login here
                    </Link>
                </div>

                <Googlebutton />
            </div>
        </div>
    );
}
