interface DiscordInfo {
    username: string;
    email: string;
}

const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
const clientSecret = import.meta.env.VITE_DISCORD_CLIENT_SECRET;

export const getDiscordAccessToken = async (origin: string, code: string) => {
    const response = await fetch('https://discord.com/api/v10/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `${origin}/api/auth/discord`,
            scope: 'identify email',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    if (!response.ok) {
        return { accessCode: null, error: new Error(`Failed to get access token from Discord.`) };
    } else {
        const json = await response.json();
        return { accessToken: json.access_token, error: null };
    }
};

export const getDiscordInfo = async (accessToken: string) => {
    const response = await fetch('https://discord.com/api/v10/users/@me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        return { discordInfo: null, error: new Error(`Failed to get user info from Discord.`) };
    } else {
        const json: DiscordInfo = await response.json();
        return { discordInfo: json, error: null };
    }
};
