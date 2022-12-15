import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
    const session = await locals.validate();

    if (!session) {
        throw error(401, "Unauthorized");
    }
}) satisfies LayoutServerLoad
