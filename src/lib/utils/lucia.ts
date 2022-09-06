import lucia from 'lucia-sveltekit'
import supabase from '@lucia-sveltekit/adapter-supabase'
import { dev } from '$app/environment'

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey: string = import.meta.env.VITE_SUPABASE_PRIVATE_KEY;
const cookieSecret: string = import.meta.env.VITE_COOKIE_SECRET;

export const auth = lucia({
    adapter: supabase(supabaseUrl, supabaseKey),
    env: dev ? "DEV" : "PROD",
    secret: cookieSecret,
});
