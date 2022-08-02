import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const redirectUri = encodeURIComponent(`${url.origin}/api/auth/discord`);

    return {
        status: 302,
        headers: {
            location: `https://discord.com/api/oauth2/authorize?client_id=1004051425824886947&redirect_uri=${redirectUri}&response_type=code&scope=email%20identify%20guilds.join`
        }
    }
}
