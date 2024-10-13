import axios from 'axios';
import Cookies from 'js-cookie';

async function refreshToken() {
    try {
        const access_token = Cookies.get('access_token');

        const refresh = Cookies.get('refresh_token');

        if (refresh) {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/refresh/',
                {
                    refresh,
                },
            );

            Cookies.set('access_token', response.data.access, { expires: 1 });
        }
    } catch (error) {
        console.error('Token refresh failed:', error);
    }
}

export { refreshToken };

// refreshToken();
