import { supabase } from '$db'

export async function get( { params }) {
    const { data: starter, error: starterError } = await supabase.rpc('search_cards', { card_name: params.starter });
    const { data: extender, error: extenderError } = await supabase.rpc('search_cards', { card_name: params.extender });

    const error = starterError || extenderError ? { starterError, extenderError } : null;

    return error ? {
        status: 500,
        body: { error }
    } : {
        status: 200,
        body: { starter: starter[0], extender: extender[0] }
    }
}
