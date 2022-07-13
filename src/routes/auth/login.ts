import type { RequestHandler } from '@sveltejs/kit';

import { supabase } from '$lib/utils/db';

export const post: RequestHandler = async({ request }) => {
    const form = await request.formData();
    const email = form.get('email');

    if (typeof email !== 'string' || !email) {
        return {
            status: 400,
            body: {
                error: 'Invalid credentials',
            }
        }
    }

    const { error } = await supabase.auth.signIn({ email });

    if (error) {
        return {
            status: 400,
            body: {
                error: error?.message,
            }
        }
    }

    return {
        status: 200,
        body: {
            message: 'Check your email for a login link!'
        }
    }
}
