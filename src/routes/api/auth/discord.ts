import type { RequestHandler } from '@sveltejs/kit'
import type { Error } from 'lucia-sveltekit'
import { auth } from '$lib/lucia'

const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
const clientSecret = import.meta.env.VITE_DISCORD_CLIENT_SECRET

export const GET: RequestHandler = async({ url }) => {
    const code = url.searchParams.get(`code`);

    if (!code) {
        return {
            status: 400,
            body: JSON.stringify({
                message: 'Invlaid request URL parameters'
            }),
        };
    }

    const getAccessTokenResponse = await fetch(`https://discord.com/api/v10/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: `${url.origin}/api/auth/discord`,
        })
    })

    if (!getAccessTokenResponse.ok) {
        console.log('Response:', (await getAccessTokenResponse.text()))
        console.log('Request Body:', {
            grant_type: 'authorization_code',
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: `${url.origin}/api/auth/discord`,
        })
        return {
            status: 500,
            body: JSON.stringify({
                message: 'Failed to fetch data from Discord',
                step: 'GET_ACCESS_TOKEN',
            }),
        };
    }

    const getAccessToken = await getAccessTokenResponse.json();
    const accessToken = getAccessToken.access_token;

    const getUserEmailResponse = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (!getUserEmailResponse.ok) {
        console.log((await getUserEmailResponse.text()))
        return {
            status: 500,
            body: JSON.stringify({
                message: 'Failed to fetch data from Discord',
                step: 'GET_USER_EMAIL'
            }),
        };
    }

    const { username, email } = await getUserEmailResponse.json() as {
        username: string;
        email: string;
    };

    const user = await auth.getUser(`discord`, email);

    if (user) {
        try {
            const authenticateUser = await auth.authenticateUser(`discord`, email);
            return {
                status: 302,
                headers: {
                    location: `/`,
                    "set-cookie": authenticateUser.cookies,
                }
            }
        }
        catch (e) {
            return {
                status: 500,
                body: JSON.stringify({
                    message: 'An unknown error occurred',
                    error: e,
                    step: 'AUTHENTICATE_USER'
                }),
            };
        }
    }

    try {
        const createUser = await auth.createUser(`discord`, email, {
            user_data: {
                discord_email: email,
                username: username,
            }
        });
        return {
            status: 302,
            headers: {
                location: `/`,
                "set-cookie": createUser.cookies,
            }
        }
    }
    catch (e) {
        const error = e as Error;

        if (error.message === `AUTH_DUPLICATE_USER_DATA`) {
            return {
                status: 400,
                body: JSON.stringify({
                    message: 'Email already in use'
                }),
            }
        }

        return {
            status: 500,
            body: JSON.stringify({
                message: 'An unknown error occurred',
                error,
                step: 'CREATE_USER'
            }),
        }
    }
};
