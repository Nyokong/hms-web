import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshToken } from './refresh';

async function checkUserAuthentication() {
    const access_token = Cookies.get('access_token');
    const csrfToken = Cookies.get('csrftoken');

    if (!access_token) {
        console.log('No access token found.');
        return { loggedIn: false, user: null };
    } else {
        if (access_token) {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                },
            );

            console.log('created token');

            Cookies.set('access_token', response.data.access, { expires: 1 });
            Cookies.set('refresh_token', response.data.refresh, { expires: 7 });
        }

        try {
            // Attempt to get the user profile with the current access token
            const response = await axios.get(
                'http://127.0.0.1:8000/api/usr/profile',
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                },
            );

            console.log('API response data:', response.data); // Check if user data is returned
            return { loggedIn: false, user: response.data };
        } catch (error) {
            console.error(
                'Initial request failed:',
                error.response ? error.response.data : error,
            );

            if (error.response && error.response.status === 401) {
                console.log('Token expired, attempting to refresh...');

                await refreshToken(); // Call refresh token logic

                const newToken = Cookies.get('access_token');
                if (!newToken) {
                    console.log('Token refresh failed.');
                    return { loggedIn: false, user: null };
                }

                // Retry fetching user data with the new token
                try {
                    const response = await axios.get(
                        'http://127.0.0.1:8000/api/usr/profile',
                        {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                            },
                        },
                    );
                    console.log('User data after refresh:', response.data); // Check if user data is returned
                    return { loggedIn: true, user: response.data };
                } catch (err) {
                    console.error(
                        'Failed to fetch user data after refresh:',
                        err,
                    );
                    return { loggedIn: false, user: null };
                }
            } else {
                console.error('Failed to fetch user data:', error);
                return { loggedIn: false, user: null };
            }
        }
    }
}

export default checkUserAuthentication;
