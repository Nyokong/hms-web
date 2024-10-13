// app/api/google-login.js
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

export function getGoogleToken(code: string): void {
    // console.log(code);

    const fetchData = async () => {
        try {
            const callbackUrl = 'http://localhost:3000/success/';
            // Exchange the authorization code for an access token
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

            console.log(tokenResponse.data.access_token);

            const { access_token, id_token } = tokenResponse.data;

            // Send the tokens to your Django backend
            const response = await axios.post(
                'http://localhost:8000/dj-rest-auth/google/',
                {
                    access_token,
                    id_token,
                },
            );

            console.log('User authenticated:', response.data);

            const user = response.data;

            // first check for lecturer status
            if (user.is_lecturer == true) {
                // create a cookie
                setCookie('access_token', response.data.access_token, {
                    maxAge: 60 * 60 * 2,
                }); // Expires in 2 hours
                setCookie('refresh_token', response.data.refresh_token, {
                    maxAge: 60 * 60 * 6,
                }); // Expires in 2 hours
                setCookie('is_lect', user.is_lecturer, { maxAge: 60 * 60 * 2 });
            } else {
                setCookie('is_lect', user.is_lecturer, { maxAge: 60 * 60 * 2 });
            }

            // return response.data;
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    fetchData();
}
