import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

interface Data {
    starter: Card;
    extender: Card;
}

export const load : PageServerLoad = async ({ params }) => {
    const resp = await fetch(`/api/combos/${params.starter}-${params.extender}`);
    const data : Data = await resp.json();

    if (data?.starter && data?.extender) {
        return {
            starter: data.starter,
            extender: data.extender
        };
    }

    throw error(404, 'Not Found');
}
