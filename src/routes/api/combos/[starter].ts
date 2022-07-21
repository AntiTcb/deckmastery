import { supabase } from '$db'

export async function get( { params }) {
    const { data, error } = await supabase.rpc('search_cards', { card_name: params.starter });

    return error ? {
        status: 500,
        body: { error }
    } : {
        status: 200,
        body: { starter: data[0] }
    }
}
