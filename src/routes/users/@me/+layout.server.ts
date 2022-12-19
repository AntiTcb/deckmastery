import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async ({ parent, locals }) => {
    await parent();
    const session = await locals.validate();

    if (!session) {
        throw error(401, "You are not logged in");
    }
}) satisfies LayoutServerLoad
