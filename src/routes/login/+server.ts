import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET = (async (e) => {
    const redirectUri = encodeURIComponent(`${e.url.origin}/api/auth/discord`);
    const returnTo = encodeURIComponent(e.cookies.get('previous-url') ?? e.url.searchParams.get('u') ?? '/');
    throw redirect(
        302,
        `https://discord.com/api/oauth2/authorize?client_id=1004051425824886947&redirect_uri=${redirectUri}&response_type=code&scope=email%20identify%20guilds.join&state=${returnTo}`
    );
}) satisfies RequestHandler;
