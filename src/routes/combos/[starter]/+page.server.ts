import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

interface Data {
    starter: Card;
}

export const load : PageServerLoad = async ({ params }) => {
    const resp = await fetch(`/api/combos/${params.starter}`);
    const data : Data = await resp.json();

    if (data?.starter) {
        return data.starter;
    }

    throw error(404, 'Not Found');
}
