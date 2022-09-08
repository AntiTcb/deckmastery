import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ parent }) => {
    const { lucia } = await parent();

    if (lucia?.user.Role !== 'admin') {
        throw error(403, 'Forbidden');
    }

    return { user: lucia.user };
}
