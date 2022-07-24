import { supabase } from '$db'
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ( { params }) => {
    const { data, error } = await supabase.rpc('search_cards', { card_name: params.starter });

    return error ? {
        status: 500,
        body: { error }
    } : {
        status: 200,
        body: { starter: data[0] }
    }
}
