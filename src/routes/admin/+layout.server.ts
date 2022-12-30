import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async ({ parent, locals }) => {
    await parent();
    const { session, user } = await locals.validateUser();

    if (!session) {
        throw error(401, "You are not logged in.");
    }
    if (user.role !== 'admin') {
        throw error(403, "Forbidden");
    }

    return { user };
}) satisfies LayoutServerLoad
