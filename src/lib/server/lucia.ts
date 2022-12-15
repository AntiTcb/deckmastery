import lucia from 'lucia-auth';
import supabase from '@lucia-auth/adapter-supabase';
import { dev } from '$app/environment';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey: string = import.meta.env.VITE_SUPABASE_PRIVATE_KEY;

export const auth = lucia({
    adapter: supabase(supabaseUrl, supabaseKey),
    env: dev ? 'DEV' : 'PROD',
    transformUserData: (userData) => {
        return {
            id: userData.id,
            createdAt: userData.created_at,
            discordEmail: userData.discord_email,
            username: userData.username,
            role: userData.role,
        };
    },
});

export type Auth = typeof auth;
