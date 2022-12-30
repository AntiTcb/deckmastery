import type { RequestHandler } from './$types';

import { error, json } from '@sveltejs/kit';
import { supabase } from '$supabase';

export const GET: RequestHandler = async ({ url }) => {
    let query = supabase.from('cards').select('*');

    if (url.searchParams.get('name')) {
        query = query.ilike('name', `%${url.searchParams.get('name')}%`);
    } else {
        query = query.eq('id', url.searchParams.get('id'));
    }

    const { data, error: dbError } = await query;

    if (dbError) {
        throw error(500, JSON.stringify(dbError));
    }

    return json(data);
};
