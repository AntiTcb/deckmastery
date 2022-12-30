import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
    const resp = await fetch(`/api/cards/search?names=${params.cards}`);
    const { cards } = await resp.json();

    if (cards?.length <= 0) {
        throw error(404, 'Not found');
    }

    return {
        cards
    } satisfies { cards: string[] }
}) satisfies PageLoad;
