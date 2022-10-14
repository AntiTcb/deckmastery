import type { RequestHandler } from '@sveltejs/kit';

import { auth } from '$lucia';
import { LuciaError, setCookie } from 'lucia-sveltekit';
import { error as skError, redirect } from '@sveltejs/kit';
import { getDiscordAccessToken, getDiscordInfo } from './discordApi';

export const GET: RequestHandler = async ({ cookies, url }) => {
    const code = url.searchParams.get(`code`);
    const redirectTo = url.searchParams.get(`state`) || `/`;

    if (!code) {
        throw skError(400, JSON.stringify({ message: 'Invalid request URL parameters' }));
    }

    const { accessToken, error: accessTokenError } = await getDiscordAccessToken(url.origin, code);
    if (accessTokenError) {
        throw skError(500, JSON.stringify({ message: accessTokenError.message, step: 'GET_ACCESS_TOKEN' }));
    }

    const { discordInfo, error: discordInfoError } = await getDiscordInfo(accessToken);
    if (discordInfoError) {
        throw skError(500, JSON.stringify({ message: discordInfoError.message, step: 'GET_DISCORD_INFO' }));
    }

    const { username, email } = discordInfo;

    let user: User;
    try {
        user = await auth.getUserByProviderId(`discord`, email);
    }
    catch (e) {
        if (e instanceof LuciaError) {
            user = null;
        } else {
            throw skError(500, JSON.stringify(e));
        }
    }

    if (!user) {
        user = await auth.createUser(`discord`, email, {
            userData: {
                discordEmail: email,
                username: username,
                role: 'user',
            },
        });
    }

    try {
        const { tokens } = await auth.createSession(user.userId);
        setCookie(cookies, ...tokens.cookies);
    } catch (e) {
        throw skError(
            500,
            JSON.stringify({
                message: 'An unknown error occurred',
                error: e,
                step: 'AUTHENTICATE_USER',
            })
        );
    }
    throw redirect(302, redirectTo);
};
