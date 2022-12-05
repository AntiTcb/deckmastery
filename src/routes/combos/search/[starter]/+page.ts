import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';
import type { DeckMastery } from 'src/app';

interface StarterData {
    starter: DeckMastery.Card;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const resp = await fetch(`/api/combos/${params.starter}`);
    const data: StarterData = await resp.json();

    if (data?.starter) {
        return {
            starter: data.starter,
        };
    }

    throw error(404, 'Not Found');
};
