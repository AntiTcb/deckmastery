import { supabase } from '$supabase'
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ url }) => {
    const cardNames = [...url.searchParams.get('names')?.split(' ') || []];
    const cards = [];

    for (const cardName of cardNames) {
        const { data, error: sbError } = await supabase.rpc('search_cards', {
            card_name: cardName
        });

        if (sbError)
            throw error(500, JSON.stringify(sbError));

        if (!data || !data[0]) continue;

        cards.push(data[0]);
    }

    return json({ cards });
};
