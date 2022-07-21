import { supabase } from '$db'
import type { RequestHandler } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
    const { data, error } = await supabase.rpc('search_cards', { card_name: params.starter })

    if (error) {
        return {
            status: 500,
            body: { error }
        };
    }

    if (data.length === 0) {
        return {
            status: 404
        }
    }

    return {
        status: 303,
        headers: {
            location: `/combos/${data[0].id}`
        }
    };
}
