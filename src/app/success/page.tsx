'use client';

// import Image from "next/image";
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { refreshToken } from '@/app/api/refresh';

import checkUserAuthentication from '@/app/api/authentication';

// lazy component
const Loading = React.lazy(() => import('@/app/loading'));
// hooks
import useAuth from '@/app/api/useAuth';
// my components
import { getGoogleToken } from '@/app/api/google-login';
import { getCookie, setCookie } from 'cookies-next';

import CookieChecker from '@/components/cookiechecker';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function Success() {
    const csrfToken = getCookie('csrfToken');
    const [oops, setError] = useState('');

    const { user, loggedIn, loading, offline, error } = useAuth();

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                console.log(code);
                try {
                    await getGoogleToken(code);
                } catch (err) {
                    console.error('Error fetching Google token:', err);
                }
            } else {
                console.log('no need to run');
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     const checkAccessToken = async () => {
    //         if (loggedIn) {
    //             if (user) {
    //                 router.push(`/profile/${user.id}`);
    //             }
    //         }
    //     };

    //     checkAccessToken();
    // }, [router]);

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the default form submission (which would be a GET request)

        const userID = getCookie('id');

        console.log(`User ID: ${userID}`);

        const data = {
            student_number: e.target.student_number.value,
            id: userID,
        };

        console.log(data);

        // let  me try to use axios
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/usr/update-std-number/',
                data,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                },
            );

            // get token
            if (response.data) {
                // Handle successful response
                console.log(response.data);
                setError('Success'); // Clear any previous errors

                // create a cookie
                setCookie('access_token', response.data.access_token, {
                    maxAge: 60 * 60 * 2,
                }); // Expires in 2 hours
                setCookie('refresh_token', response.data.refresh_token, {
                    maxAge: 60 * 60 * 6,
                }); // Expires in 2 hours

                // wait 3 seconds before redirecting
                const timer = setTimeout(() => {
                    router.push(`/dashboard/${userID}`);
                }, 500);
            } else {
                // console.log("Log in failed!");
                setError('oops: Log in failed!');
            }
        } catch (oops) {
            if (axios.isAxiosError(oops)) {
                if (oops.response) {
                    console.error('Response data:', oops.response.data.error);
                    console.error('Response status:', oops.response.status);

                    // set the error for alert
                    setError(`${oops.response.data.error}`);

                    // wait a second and remove the
                    const timer = setTimeout(() => {
                        // e.target.username.value = '';
                        e.target.student_number.value = '';
                    }, 300);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    // if (user) {
    //     return <CookieChecker />;
    // }

    return (
        <div className="container h-svh">
            <div className="flex flex-row justify-center items-center h-[100px] w-full">
                <div
                    className="flex flex-row justify-center ml-4 mr-4 
            w-[130px] h-[50px] rounded-[40px] text-white hover:bg-slate-700"
                >
                    <Link href="/" className="flex flex-col justify-center">
                        Go back
                    </Link>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-5 w-full ">
                <div className="flex flex-col h-[400px] w-[350px] items-center justify-center rounded-[40px]">
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-[40px]">Last Check</h1>
                            <h4>Are you a lecturer - please check below</h4>
                        </div>
                        {oops && (
                            <Alert className="mt-4 mb-3 rounded-[40px] h-auto w-[80%]">
                                <AlertTitle className="font-semibold text-red-600">
                                    ooops
                                </AlertTitle>
                                <AlertDescription className="text-red-500">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center"
                    >
                        <Input
                            className="w-[300px] h-[40px] text-black bg-slate-100 rounded-[40px] mt-3 mb-3"
                            placeholder="enter your student number here:"
                            type="text"
                            name="student_number"
                        />
                        <Button className="h-[50px] w-[200px] rounded-[50px]">
                            check here
                        </Button>
                    </form>
                    <div className="h-auto w-full flex flex-row items-center mt-4 justify-center">
                        <p className="h-[50px] flex flex-col items-center justify-center mx-3">
                            remember me
                        </p>
                        <div className="h-[50px] flex flex-col items-center justify-center">
                            <Checkbox className=" bg-slate-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
