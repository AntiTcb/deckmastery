import type { RequestHandler } from './$types'

import { error, json } from '@sveltejs/kit'
import { supabase } from '$supabase';

export const GET: RequestHandler = async ({ url }) => {

    let query = supabase.from('cards').select('*');

    if (url.searchParams.get('name')) {
        query = query.ilike('name', `%${url.searchParams.get('name')}%`);
    }

    const { data, error } = await query;

    if (error) {
        throw error(500, JSON.stringify(error));
    }

    return json(data);
}
