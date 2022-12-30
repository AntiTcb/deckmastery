import type { PageServerLoad } from "./$types";
import { getUserCombos, getUserFavoriteCombos} from '$supabase';

export const load = (async ({ locals }) => {
    const { user } = await locals.validateUser();
    const { count: uploadedCount } = await getUserCombos(user.id, true);
    const { count: favoriteCount } = await getUserFavoriteCombos(user.id, true);

    return {
        uploadedCount,
        favoriteCount
    }
}) satisfies PageServerLoad;
