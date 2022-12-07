import type { RequestHandler } from './$types';

import { error, json } from '@sveltejs/kit';
import { supabase } from '$supabase';

export const GET: RequestHandler = async ({ url, params }) => {
    const cardIds = url.searchParams.get('cards')?.split(',').map(id => parseInt(id)) || [];

    let query = supabase
        .from('combos')
        .select(`
            id,
            title,
            created_at,
            description,
            replay_url,
            combos_cards!inner(
                cards!inner (
                    id,
                    name,
                    image_url
                )
            ),
            uploaded_by:user(username),
            likes:likes(liked_by:user(username)))
        `)
        .in('combos_cards.cards.id', cardIds);

    const { data, error: dbError } = await query;

    if (dbError) {
        throw error(500, JSON.stringify(dbError));
    }

    return json({ data });
};
