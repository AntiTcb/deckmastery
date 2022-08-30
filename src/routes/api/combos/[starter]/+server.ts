import type { RequestHandler } from './$types';

import { error, json } from '@sveltejs/kit';
import { supabase } from '$supabase';

export const GET: RequestHandler = async ({ params }) => {
    const { data, error: dbError } = await supabase.rpc('search_cards', {
        card_name: params.starter,
    });

    if (dbError) {
        throw error(500, JSON.stringify(dbError));
    }

    return json({ starter: data[0] });
};
