import { supabase } from '$db';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {

    let query = supabase.from('cards').select('*');

    if (url.searchParams.get('name')) {
        query = query.ilike('name', `%${url.searchParams.get('name')}%`);
    }

    const { data, error } = await query;

    return error ?  {
        status: 500,
        body: { error }
    } : {
        status: 200,
        body: { data }
    }
}
