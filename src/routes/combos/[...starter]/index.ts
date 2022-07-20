import { supabase } from '$db'
import type { RequestHandler } from '@sveltejs/kit';

export async function get({params}) {
    console.log(params);
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
        status: 200,
        body: {
            data
        }
    };
}
