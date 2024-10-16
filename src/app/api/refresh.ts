// import axios from 'axios';
// import { getCookie, setCookie } from 'cookies-next';

// async function refreshToken() {
//     try {
//         const accessToken = getCookie('access_token');
//         const tokenCreated = getCookie('token_created');
//         const tokenCreatedTimestamp = tokenCreated
//             ? parseInt(tokenCreated, 10)
//             : 0;

//         if (accessToken || tokenCreated) {
//             const now = Math.floor(Date.now() / 1000); // current time in seconds
//             const tokenAge = now - tokenCreatedTimestamp;

//             if (tokenAge < 3600) {
//                 // 1 hour
//                 console.log('Still have access token');
//                 return;
//             }
//         }

//         const refresh = getCookie('refresh_token');

//         if (!accessToken) {
//             if (refresh) {
//                 const response = await axios.post(
//                     'http://127.0.0.1:8000/api/token/refresh/',
//                     { refresh },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${refresh}`,
//                         },
//                     },
//                 );

//                 setCookie('access_token', response.data.access, {
//                     maxAge: 60 * 60 * 1, // 1 hour
//                 });
//                 setCookie(
//                     'token_created',
//                     Math.floor(Date.now() / 1000).toString(),
//                     {
//                         maxAge: 60 * 60 * 1, // 1 hour
//                     },
//                 );

//                 console.log('Access token refreshed');
//             }
//         }
//     } catch (error) {
//         console.error('Token refresh failed:', error);
//     }
// }

// export { refreshToken };

// refreshToken();
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode'; // Install this package if you haven't already

const isTokenExpired = token => {
    try {
        const decoded = jwtDecode(token);
        if (!decoded.exp) {
            console.log('No expiration time on token');
            return true;
        }
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Assume expired if decoding fails
    }
};

async function refreshToken() {
    try {
        const refresh = getCookie('refresh_token');
        if (!refresh) {
            console.log('No refresh token found.');
            return null;
        }

        const response = await axios.post(
            'http://127.0.0.1:8000/api/token/refresh/',
            { refresh },
        );

        const newAccessToken = response.data.access;
        setCookie('access_token', newAccessToken, {
            maxAge: 60 * 60 * 1, // 1 hour
        });

        setCookie('token_created', Math.floor(Date.now() / 1000).toString(), {
            maxAge: 60 * 60 * 1, // 1 hour
        });

        console.log('Access token refreshed');
        return newAccessToken;
    } catch (error) {
        console.error(
            'Token refresh failed:',
            error.response ? error.response.data : error,
        );
        return null;
    }
}

export { refreshToken, isTokenExpired };
