import { useEffect, useState } from 'react';
import axios from 'axios';
import { refreshToken } from '@/app/api/refresh';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { User } from '@/types';

interface AuthState {
    user: User | null;
    error: string | null;
}

const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        error: null,
    });

    const csrfToken = getCookie('csrftoken');

    const checkUserAuthentication = async () => {
        const accessToken = getCookie('access_token');
        const refresh_token = getCookie('refresh_token');

        if (!accessToken) {
            console.log('No access token found.');
            setAuthState(prevState => ({
                ...prevState,
                error: 'No access token found.',
            }));
            deleteCookie('user_data');
            deleteCookie('refresh_token');
            return;
        } else {
            try {
                if (accessToken) {
                    const checktoken = await axios.post(
                        'http://localhost:8000/api/check-token',
                        {
                            accessToken,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        },
                    );

                    if (checktoken.status === 401) {
                        console.log('token was invalid');
                        setCookie(
                            'access_token',
                            checktoken.data.access_token,
                            {
                                maxAge: 60 * 60 * 2,
                            },
                        );
                        setCookie(
                            'refresh_token',
                            checktoken.data.refresh_token,
                            {
                                maxAge: 60 * 60 * 6,
                            },
                        );
                    }
                    // "message":"Token has wrong type"
                    if (checktoken.data.message == 'Token has wrong type') {
                        console.log('Wrong type hooowww');
                    }

                    if (checktoken.data.message == 'Token is valid') {
                        console.log('Still Valid: Logged in');

                        if (!getCookie('loggedin')) {
                            setCookie('loggedin', 'true', {
                                maxAge: 60 * 60 * 2,
                            });
                        }

                        if (!getCookie('user_data')) {
                            const response = await axios.get<User>(
                                'http://127.0.0.1:8000/api/usr/profile',
                                {
                                    headers: {
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                },
                            );

                            // console.log(response.data);
                            setCookie(
                                'user_data',
                                JSON.stringify(response.data),
                                {
                                    maxAge: 3600,
                                },
                            ); // 1 hour
                            setAuthState({
                                user: response.data,
                                error: null,
                            });
                        } else {
                            setAuthState({
                                user: JSON.parse(getCookie('user_data')),
                                error: null,
                            });
                        }
                    } else {
                        console.log('token was invalid');

                        const checktoken = await axios.post(
                            'http://localhost:8000/api/check-token',
                            {
                                accessToken,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            },
                        );

                        console.log(checktoken.data);

                        if (getCookie('user_data')) {
                            deleteCookie('user_data');
                            deleteCookie('refresh_token');
                            deleteCookie('access_token');
                            deleteCookie('loggedin');

                            setAuthState({
                                user: null,
                                error: null,
                            });

                            if (getCookie('loggedin')) {
                                deleteCookie('loggedin');
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Not Logged in:', error);

                const timer = setTimeout(() => {
                    if (!getCookie('access_token')) {
                        deleteCookie('access_token');
                        deleteCookie('refresh_token');

                        if (getCookie('user_data')) {
                            deleteCookie('user_data');
                        }
                    }
                }, 5000);
            }
        }
    };

    useEffect(() => {
        checkUserAuthentication();
    }, []);

    return authState;
};

export default useAuth;
