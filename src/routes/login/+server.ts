import type { RequestHandler } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    const redirectUri = encodeURIComponent(`${url.origin}/api/auth/discord`);
    const returnTo = encodeURIComponent(url.searchParams.get('u') ?? '/');

    throw redirect(
        302,
        `https://discord.com/api/oauth2/authorize?client_id=1004051425824886947&redirect_uri=${redirectUri}&response_type=code&scope=email%20identify%20guilds.join&state=${returnTo}`
    );
};
