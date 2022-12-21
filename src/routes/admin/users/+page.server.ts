import type { PageServerLoad } from "./$types";
import { supabase, type User } from '$supabase';

export const load = (async () => {
    const { data: users, error } = await supabase.from('user').select('*');

    return { users: users } as { users: User[] };
}) satisfies PageServerLoad;
