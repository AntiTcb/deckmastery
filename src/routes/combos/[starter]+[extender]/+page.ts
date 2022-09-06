import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

interface StarterExtenderData {
    starter: Card;
    extender: Card;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const resp = await fetch(`/api/combos/${params.starter}+${params.extender}`);
    const data: StarterExtenderData = await resp.json();

    console.log(data);

    if (data?.starter && data?.extender) {
        return {
            starter: data.starter,
            extender: data.extender,
        };
    }

    throw error(404, 'Not Found');
};
