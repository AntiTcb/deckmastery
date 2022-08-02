import lucia from 'lucia-sveltekit'
import supabase from '@lucia-sveltekit/adapter-supabase'
import { dev } from '$app/env'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = dev ? import.meta.env.VITE_SUPABASE_PRIVATE_KEY : import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export const auth = lucia({
    adapter: supabase(supabaseUrl, supabaseKey),
    env: dev ? "DEV" : "PROD",
    secret: "OIEWURP#I$@#)($*Ksjaldksjdoiauoeijerw"
});
