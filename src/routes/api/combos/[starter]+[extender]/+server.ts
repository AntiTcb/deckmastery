import type { RequestHandler } from './$types';

import { error, json } from '@sveltejs/kit';
import { supabase } from '$supabase';

export const GET: RequestHandler = async ({ params }) => {
    const { data: starter, error: starterError } = await supabase.rpc('search_cards', {
        card_name: params.starter,
    });
    const { data: extender, error: extenderError } = await supabase.rpc('search_cards', {
        card_name: params.extender,
    });

    const hasError = starterError || extenderError ? { starterError, extenderError } : null;

    if (hasError) {
        throw error(500, JSON.stringify(hasError));
    }

    return json({ starter: starter![0], extender: extender![0] });
};
