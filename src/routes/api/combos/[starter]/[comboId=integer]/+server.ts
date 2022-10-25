import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { supabase } from '$supabase';

export const GET: RequestHandler = async ({ params }) => {
    const { data, error: dbError } = await supabase
        .from('combos')
        .select('*,uploaded_by:user(username),starter_card_id:cards!combos_starter_card_id_fkey(*)')
        .eq('id', params.comboId)
        .single();

    if (dbError) {
        throw error(500, JSON.stringify(dbError));
    }

    return json({ combo: data });
}
