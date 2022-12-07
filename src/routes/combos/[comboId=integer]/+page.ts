import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { DeckMastery } from 'src/app';

interface ComboData {
    combo: DeckMastery.Combo;
    starter: DeckMastery.Card;
}

export const load: PageLoad = async({ fetch, params }) => {
    const resp = await fetch(`/api/combos/${params.comboId}`);
    const data: ComboData = await resp.json();

    if (data?.combo.title) {
        return {
            combo: data.combo,
        };
    }

    throw error(404, 'Not Found');
}
