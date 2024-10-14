import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

async function refreshToken() {
    try {
        const accessToken = getCookie('access_token');
        const tokenCreated = getCookie('token_created');
        const tokenCreatedTimestamp = tokenCreated
            ? parseInt(tokenCreated, 10)
            : 0;

        if (accessToken && tokenCreated) {
            const now = Math.floor(Date.now() / 1000); // current time in seconds
            const tokenAge = now - tokenCreatedTimestamp;

            if (tokenAge < 3600) {
                // 1 hour
                console.log('Still have access token');
                return;
            }
        }

        const refresh = getCookie('refresh_token');
        if (refresh) {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/refresh/',
                { refresh },
            );

            setCookie('access_token', response.data.access, {
                maxAge: 60 * 60 * 1, // 1 hour
            });
            setCookie(
                'token_created',
                Math.floor(Date.now() / 1000).toString(),
                {
                    maxAge: 60 * 60 * 1, // 1 hour
                },
            );

            console.log('Access token refreshed');
        }
    } catch (error) {
        console.error('Token refresh failed:', error);
    }
}

export { refreshToken };

refreshToken();
