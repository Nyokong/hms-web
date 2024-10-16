import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getCookie, setCookie } from 'cookies-next';
import { refreshToken } from './refresh'; // Adjust the import path as needed

const isTokenExpired = token => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Assume expired if decoding fails
    }
};

const checkUserAuthentication = async () => {
    const access_token = getCookie('access_token');
    const csrfToken = getCookie('csrftoken');

    if (!access_token) {
        console.log('No access token found.');
        return { loggedIn: false, user: null };
    }

    if (isTokenExpired(access_token)) {
        console.log('Access token expired. Attempting to refresh...');
        await refreshToken(); // Call refresh token logic
        const newAccessToken = getCookie('access_token');
        if (!newAccessToken) {
            console.log('Token refresh failed.');
            return { loggedIn: false, user: null };
        }
    }

    try {
        // Attempt to get the user profile with the current access token
        const response = await axios.get(
            'http://127.0.0.1:8000/api/usr/profile',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'X-CSRFToken': csrfToken,
                },
            },
        );
        console.log('API response data:', response.data);
        return { loggedIn: true, user: response.data };
    } catch (error) {
        console.error(
            'Initial request failed:',
            error.response ? error.response.data : error,
        );
        if (error.response && error.response.status === 401) {
            console.log('Token expired, attempting to refresh...');
            await refreshToken(); // Call refresh token logic again if needed
            const newAccessToken = getCookie('access_token');
            if (!newAccessToken) {
                console.log('Token refresh failed.');
                return { loggedIn: false, user: null };
            }
            // Retry fetching user data with the new token
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8000/api/usr/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                            'X-CSRFToken': csrfToken,
                        },
                    },
                );
                console.log('User data after refresh:', response.data);
                return { loggedIn: true, user: response.data };
            } catch (err) {
                console.error('Failed to fetch user data after refresh:', err);
                return { loggedIn: false, user: null };
            }
        } else {
            console.error('Failed to fetch user data:', error);
            return { loggedIn: false, user: null };
        }
    }
};

export default checkUserAuthentication;
