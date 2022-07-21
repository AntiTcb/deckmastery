import { supabase } from '$db'
import type { RequestHandler } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
    const { data: starter, error: starterError } = await supabase.rpc('search_cards', { card_name: params.starter });
    const { data: extender, error: extenderError } = await supabase.rpc('search_cards', { card_name: params.extender });

    if (starterError || extenderError) {
        return {
            status: 500,
            body: { starterError, extenderError }
        };
    }

    if (starter.length === 0 || extender.length === 0) {
        return {
            status: 404
        }
    }

    return {
        status: 303,
        headers: {
            location: `/combos/${starter[0].id}/${extender[0].id}`
        }
    };
}
