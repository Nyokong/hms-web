// app/api/google-login.js
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

import { useState, useEffect } from 'react';

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    student_number: string;
}

const useGoogleToken = (code: string) => {
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const callbackUrl = 'http://localhost:3000/success/';

                const tokenResponse = await axios.post(
                    'https://oauth2.googleapis.com/token',
                    {
                        code: code,
                        client_id: process.env.CLIENT_ID,
                        client_secret: process.env.CLIENT_SECRET,
                        redirect_uri: `${callbackUrl}`,
                        grant_type: 'authorization_code',
                    },
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                );

                const { access_token, id_token } = tokenResponse.data;

                console.log(access_token);

                if (access_token && id_token) {
                    const response = await axios.post(
                        'http://localhost:8000/dj-rest-auth/google/',
                        {
                            access_token,
                            id_token,
                        },
                    );

                    const tokens = response.data;

                    const user: User = tokens.user;

                    if (tokens.access_token) {
                        setCookie('access_token', tokens.access_token, {
                            maxAge: 60 * 60 * 2,
                        });
                        setCookie('refresh_token', tokens.refresh_token, {
                            maxAge: 60 * 60 * 6,
                        });
                    } else {
                        setError(tokens.id);
                        setCookie('id', tokens.id, { maxAge: 60 * 60 * 1 });
                        setCookie('is_lect', tokens.is_lecturer, {
                            maxAge: 60 * 60 * 1,
                        });
                    }

                    setUserData(user);
                } else {
                    console.error(
                        'No access_token or id_token found in token response.',
                    );
                    setError('No access token found');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
                setError('Authentication failed');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [code]);

    return { userData, error, loading };
};

export default useGoogleToken;
