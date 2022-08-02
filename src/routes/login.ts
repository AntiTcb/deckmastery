import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    return {
        status: 302,
        headers: {
            location: `https://discord.com/api/oauth2/authorize?client_id=1004051425824886947&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fapi%2Fauth%2Fdiscord&response_type=code&scope=email%20identify%20guilds.join`
        }
    }
}
