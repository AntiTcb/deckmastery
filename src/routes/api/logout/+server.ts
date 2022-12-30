import type { RequestHandler } from '@sveltejs/kit';

import { signOut } from '@lucia-auth/sveltekit/client';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        await signOut();
    } catch (e) {
        console.error(e);
        console.log('Error signing out');
    } finally {
        throw redirect(302, '/');
    }
};
