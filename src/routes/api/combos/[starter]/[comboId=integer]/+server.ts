import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { supabase } from '$supabase';

export const GET: RequestHandler = async ({ params }) => {
    const { data, error: dbError } = await supabase
        .from('combos')
        .select('*,uploaded_by:user(username)')
        .eq('id', params.comboId)
        .maybeSingle();

    if (dbError) {
        console.error(dbError);
        throw error(500, dbError);
    }

    return json({ combo: data });
}
