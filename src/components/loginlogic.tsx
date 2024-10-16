'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// importing axios
import { useState, useEffect } from 'react';
// import useHistory  from 'react-dom';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// import for cookies
// import useAuth from '@/app/api/useAuth';

import { getCookie, setCookie } from 'cookies-next';
import GoogleLoginButton from './googlebutton';

const csrfToken = getCookie('csrfToken');

interface Props {
    onSubmit: string;
    e: string;
    error: any;
    username: string;
}

const loginlogic = ({ onSubmit }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setID] = useState(0);

    // const { user } = useAuth();

    const [formData, setFormData] = useState<Props[]>({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const router = useRouter();

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const loggedIn = getCookie('access_token');
        if (loggedIn) {
            // set is logged in true
            setIsLoggedIn(true);

            if (id > 0) {
                const time = setTimeout(() => {
                    router.push(`/dashboard/${id}`);
                }, 500);
            }
        }
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the default form submission (which would be a GET request)

        const data = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        // let  me try to use axios
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',
                data,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                },
            );

            setCookie('access_token', response.data.access, {
                maxAge: 60 * 60 * 2,
            });
            setCookie('refresh_token', response.data.access, {
                maxAge: 60 * 60 * 6,
            });

            // get token
            if (response.data.access) {
                console.log('user logged in');
                const cookie = getCookie('access_token');

                const response = await axios.get(
                    'http://127.0.0.1:8000/api/usr/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${cookie}`,
                            'X-CSRFToken': csrfToken || '',
                        },
                    },
                );

                if (response.data) {
                    setID(response.data.id);
                    const time = setTimeout(() => {
                        router.push(`/dashboard/${response.data.id}`);
                    }, 500);
                }
                // Handle successful response
                // setError('Success'); // Clear any previous errors
                // wait 3 seconds before redirecting
                // const timer = setTimeout(() => {
                //     // if (user) {
                //         // router.push(`/dashboard/${user.id}`);
                //     }
                // }, 500);
            } else {
                // console.log("Log in failed!");
                setError('error: Log in failed!');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // console.error('Axios error message:', error.message);
                // console.error('Axios error code:', error.code);
                // console.error('Axios error config:', error.config);
                // console.error('Axios error request:', error.request);
                // console.error('Axios error response:', error.response);
                // Accessing specific parts of the response
                if (error.response) {
                    console.error('Response data:', error.response.data.error);
                    if (error.response.status == 401) {
                        console.log('wrong password or username');
                        setError(
                            `${error.response.data.error} wrong password or username`,
                        );
                    }
                    console.error('Response status:', error.response.status);

                    // set the error for alert
                    setError(`${error.response.data.error}`);

                    // wait a second and remove the
                    const timer = setTimeout(() => {
                        // e.target.username.value = '';
                        e.target.password.value = '';
                    }, 1000);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center"
            >
                <Label className="text-2xl font-bold text-purple-600 mb-8">
                    Login Here:
                </Label>
                <Input
                    placeholder="Username"
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <Input
                    placeholder="Password"
                    className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-lg mt-4 shadow-md transition duration-300 ease-in-out"
                >
                    Login
                </Button>
                {error && (
                    <Alert className="mt-4">
                        <AlertTitle className="font-semibold text-red-600">
                            Alert
                        </AlertTitle>
                        <AlertDescription className="text-red-500">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}
            </form>
            <div className="flex flex-col items-center mt-4">
                <a href="#" className="text-purple-600 hover:underline mb-2">
                    Forgot Password?
                </a>
                <span className="text-gray-600">Don't have an account?</span>
                {/* <a href="#" className="text-purple-600 hover:underline">Sign in here</a> */}
                <div className="w-full h-[60px] flex flex-row justify-center items-center mt-3 mb-3">
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
    );
};

export default loginlogic;
