import { useEffect, useState } from 'react';
import axios from 'axios';
import { refreshToken } from '@/app/api/refresh';
import { getCookie, setCookie } from 'cookies-next';

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    student_number: string;
    // Add other user fields if needed
}

interface AuthState {
    user: User | null;
    loggedIn: boolean;
    loading: boolean;
    offline: boolean;
    error: string | null;
}

const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loggedIn: false,
        loading: true,
        offline: true,
        error: null,
    });
    const csrfToken = getCookie('csrftoken');
    const access_token = getCookie('access_token');

    const checkUserAuthentication = async () => {
        const accessToken = getCookie('access_token');
        const userData = getCookie('user_data');

        if (!accessToken) {
            // If there's no access token, do nothing
            return;
        }

        if (userData) {
            // If user data is already stored in the cookie, use it
            setAuthState({
                user: JSON.parse(userData),
                loggedIn: true,
                loading: false,
                offline: false,
                error: null,
            });

            // console.log(authState);
            // console.log(JSON.parse(userData));
            return;
        }

        /** 
        try {
            const response = await axios.get<User>('http://127.0.0.1:8000/api/usr/profile', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'X-CSRFToken': csrfToken || '', // Include CSRF token if needed
                },
            });
    
            // On successful response, update the state with user data and store it in a cookie
            setAuthState({
                user: response.data,
                loggedIn: true,
                loading: false,
                offline: false,
                error: null,
            });
            setCookie('user_data', JSON.stringify(response.data), 1); 
    
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                // Attempt to refresh token if authentication fails
                try {
                    await refreshToken();
                    const newAccessToken = getCookie('access_token');
    
                    if (newAccessToken) {
                        const retryResponse = await axios.get<User>('http://127.0.0.1:8000/api/usr/profile', {
                            headers: {
                                'Authorization': `Bearer ${newAccessToken}`,
                                'X-CSRFToken': csrfToken || '',
                            },
                        });
                        setAuthState({
                            user: retryResponse.data,
                            loggedIn: true,
                            loading: false,
                            offline: false,
                            error: null,
                        });
                        setCookie('user_data', JSON.stringify(retryResponse.data), 1); // Store user data in a cookie for 1 day
                    } else {
                        setAuthState({ user: null, loggedIn: false, loading: false, offline: true, error: 'Token refresh failed' });
                    }
                } catch (refreshError) {
                    setAuthState({ user: null, loggedIn: false, loading: false, offline: true, error: 'Token refresh failed' });
                }
            } else {
                setAuthState({
                    user: null,
                    loggedIn: false,
                    loading: false,
                    offline: true,
                    error: error.message || 'Error fetching user data',
                });
            }
        }*/
    };

    // Run checkUserAuthentication when the component mounts
    useEffect(() => {
        checkUserAuthentication();
    }, []);

    return authState;
};

export default useAuth;
