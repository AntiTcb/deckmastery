import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { supabase } from '$supabase';

export const GET: RequestHandler = async ({ params }) => {
    const { data, error: dbError } = await supabase
        .from('combos')
        .select(`
            id,
            created_at,
            replay_url,
            title,
            status,
            description,
            combos_cards (
                cards (
                    id,
                    name,
                    image_url
                )
            ),
            uploaded_by:user(username),
            likes(liked_by:user(username))`)
        .eq('id', params.comboId)
        .maybeSingle();

    if (dbError) {
        console.error(`Database Error`, dbError);
        throw error(500, dbError);
    }

    return json(data);
}
