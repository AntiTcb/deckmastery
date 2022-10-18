import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ parent, locals }) => {
    const session = locals.getSession();

    if (session?.user.Role !== 'admin') {
        throw error(403, 'Forbidden');
    }

    return { user: session.user };
};
