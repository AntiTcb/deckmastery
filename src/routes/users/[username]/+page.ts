import type { PageLoad } from './$types';
import { supabase } from '$supabase';
import { error } from '@sveltejs/kit'

export const load = (async ({ params: { username }}) => {
    const { data, error: sbError } = await supabase
        .from('user')
        .select('id, username')
        .ilike('username', `%${username}%`)
        .single();

    if (sbError)
        throw error(500, JSON.stringify(sbError));

    return { user: data }
}) satisfies PageLoad;
