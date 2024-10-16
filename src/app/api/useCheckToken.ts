import { useEffect } from 'react';
import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next'; // Import deleteCookie function

const useCookieToken = () => {
    useEffect(() => {
        const refreshToken = async () => {
            const access_token = getCookie('access_token');

            if (access_token) {
                console.log('found token');
                try {
                    const response = await axios.post(
                        'http://localhost:8000/api/check-token',
                        {
                            access_token,
                        },
                    );

                    if (response.status === 201) {
                        console.log('token was invalid');
                        setCookie('access_token', response.data.access_token, {
                            maxAge: 60 * 60 * 2,
                        });
                        setCookie(
                            'refresh_token',
                            response.data.refresh_token,
                            {
                                maxAge: 60 * 60 * 6,
                            },
                        );
                    }
                } catch (error) {
                    console.error('Not Logged in:', error);
                    deleteCookie('access_token');
                    deleteCookie('refresh_token');

                    if (getCookie('user_data')) {
                        deleteCookie('user_data');
                    }
                }
            }
        };

        const intervalId = setInterval(refreshToken, 30 * 60 * 1000); // 30 minutes
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);
};

export default useCookieToken;
