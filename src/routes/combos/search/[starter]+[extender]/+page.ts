import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';
import type { DeckMastery } from 'src/app';

interface StarterExtenderData {
    starter: DeckMastery.Card;
    extender: DeckMastery.Card;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const resp = await fetch(`/api/combos/${params.starter}+${params.extender}`);
    const data: StarterExtenderData = await resp.json();

    if (data?.starter && data?.extender) {
        return {
            starter: data.starter,
            extender: data.extender,
        };
    }

    throw error(404, 'Not Found');
};
