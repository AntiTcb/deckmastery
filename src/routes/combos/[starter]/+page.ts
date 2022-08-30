import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

interface Data {
    starter: Card;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const resp = await fetch(`/api/combos/${params.starter}`);
    const data: Data = await resp.json();

    if (data?.starter) {
        return {
            starter: data.starter,
        };
    }

    throw error(404, 'Not Found');
};
