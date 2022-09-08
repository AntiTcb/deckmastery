import type { RequestHandler } from '@sveltejs/kit';
import type { Error } from 'lucia-sveltekit';

import { auth } from '$lucia';
import { error, redirect } from '@sveltejs/kit';

const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
const clientSecret = import.meta.env.VITE_DISCORD_CLIENT_SECRET;

export const GET: RequestHandler = async ({ cookies, url }) => {
    const code = url.searchParams.get(`code`);
    const redirectTo = url.searchParams.get(`state`) || `/`;

    if (!code) {
        throw error(400, JSON.stringify({ message: 'Invalid request URL parameters' }));
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
        }),
    });

    if (!getAccessTokenResponse.ok) {
        console.log('Response:', await getAccessTokenResponse.text());
        console.log('Request Body:', {
            grant_type: 'authorization_code',
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: `${url.origin}/api/auth/discord`,
        });
        throw error(
            500,
            JSON.stringify({
                message: 'Failed to fetch data from Discord',
                step: 'GET_ACCESS_TOKEN',
            })
        );
    }

    const getAccessToken = await getAccessTokenResponse.json();
    const accessToken = getAccessToken.access_token;

    const getUserEmailResponse = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!getUserEmailResponse.ok) {
        console.log(`Get Email Response`, await getUserEmailResponse.text());
        throw error(
            500,
            JSON.stringify({
                message: 'Failed to fetch data from Discord',
                step: 'GET_USER_EMAIL',
            })
        );
    }

    const { username, email } = (await getUserEmailResponse.json()) as {
        username: string;
        email: string;
    };

    const user = await auth.getUser(`discord`, email);

    if (user) {
        try {
            const authenticateUser = await auth.authenticateUser(`discord`, email, '');

            return new Response(null, {
                status: 302,
                headers: {
                    'set-cookie': authenticateUser.cookies.join(),
                    location: redirectTo,
                },
            });
        } catch (e) {
            throw error(
                500,
                JSON.stringify({
                    message: 'An unknown error occurred',
                    error: e,
                    step: 'AUTHENTICATE_USER',
                })
            );
        }
    }

    try {
        const createUser = await auth.createUser(`discord`, email, {
            password: '',
            user_data: {
                discord_email: email,
                username: username,
                role: 'user',
            },
        });

        return new Response(null, {
            status: 302,
            headers: {
                'set-cookie': createUser.cookies.join(),
                location: redirectTo,
            },
        });
    } catch (e) {
        const luciaError = e as Error;

        if (luciaError?.message === `AUTH_DUPLICATE_USER_DATA`) {
            throw error(400, JSON.stringify({ message: 'Email already in use' }));
        }

        throw error(
            500,
            JSON.stringify({
                message: 'An unknown error occurred',
                error: e,
                step: 'CREATE_USER',
            })
        );
    }
};
