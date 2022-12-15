import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
    const { session, user } = await locals.validateUser();

    if (!session) {
        throw error(401, "Unauthorized");
    }
    if (user.role !== 'admin') {
        throw error(403, "Forbidden");
    }
}) satisfies LayoutServerLoad
