import lucia from 'lucia-sveltekit'
import supabase from '@lucia-sveltekit/adapter-supabase'
import { dev } from '$app/env'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PRIVATE_KEY;

export const auth = lucia({
    adapter: supabase(supabaseUrl, supabaseKey),
    env: dev ? "DEV" : "PROD",
    secret: import.meta.env.VITE_COOKIE_SECRET,
});
