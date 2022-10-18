import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getUserById } from '$supabase';

export const load: PageServerLoad = async ({ params }) => {
    const user = await getUserById(params.userId);

    console.log(user);

    if (user) {
        throw redirect(301, `/users/${user.username}`);
    }
    throw error(404, 'User not found');
}
