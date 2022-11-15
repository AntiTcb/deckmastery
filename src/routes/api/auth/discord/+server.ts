import { error, type RequestHandler } from '@sveltejs/kit';

import { auth } from '$lucia';
import { LuciaError } from 'lucia-auth';
import { error as skError, redirect } from '@sveltejs/kit';
import { getDiscordAccessToken, getDiscordInfo } from './discordApi';
import type { Lucia } from 'src/app';

export const GET: RequestHandler = async ({ cookies, locals, url }) => {
    const code = url.searchParams.get(`code`);
    const redirectTo = url.searchParams.get(`state`) || `/`;

    if (!code) {
        throw skError(400, JSON.stringify({ message: 'Invalid request URL parameters' }));
    }

    const { accessToken, error: accessTokenError } = await getDiscordAccessToken(url.origin, code);
    if (accessTokenError) {
        throw skError(
            500,
            JSON.stringify({ message: accessTokenError.message, step: 'GET_ACCESS_TOKEN' })
        );
    }

    const { discordInfo, error: discordInfoError } = await getDiscordInfo(accessToken);
    if (discordInfoError) {
        throw skError(
            500,
            JSON.stringify({ message: discordInfoError.message, step: 'GET_DISCORD_INFO' })
        );
    }

    const { username, email } = discordInfo;

    let user: Lucia.UserAttributes | null;
    try {
        user = await auth.getUserByProviderId(`discord`, email);
        console.debug(`User found:`, user);
    } catch (e) {
        if (e instanceof LuciaError) {
            user = null;
        } else {
            throw skError(500, JSON.stringify(e));
        }
    }

    if (!user) {
        user = await auth.createUser(`discord`, email, {
            attributes: {
                discord_email: email,
                username: username,
                role: 'user',
            },
        });
        console.debug(`User created:`, user);
    }

    try {
        const session = await auth.createSession(user.id as string);
        const sessionCookies = await auth.createSessionCookies(session);
        const serializedCookies = sessionCookies.map((cookie) => cookie.serialize());

        return new Response(null, {
            status: 302,
            headers: {
                location: redirectTo,
                "set-cookie": serializedCookies.toString()
            }
        })
    } catch (e) {
        throw skError(
            500,
            JSON.stringify({
                message: 'An unknown error occurred',
                error: JSON.stringify(e),
                step: 'AUTHENTICATE_USER',
            })
        );
    }

    throw skError(500);
};
