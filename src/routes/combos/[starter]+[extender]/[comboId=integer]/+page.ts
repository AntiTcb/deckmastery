import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getCombo } from '$supabase';

interface ComboData {}

export const load: PageLoad = async ({ fetch, params }) => {
    const combo = await getCombo(parseInt(params.comboId));

    console.log(combo);

    return {
        combo: combo,
    };
};
