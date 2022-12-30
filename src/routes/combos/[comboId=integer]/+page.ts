import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Combo } from '$supabase';

export const load: PageLoad = async ({ fetch, params }) => {
    const resp = await fetch(`/api/combos/${params.comboId}`);
    const data: Combo & {
        uploaded_by: {
            username: string;
        },
        likes: [{liked_by: {
            username: string;
        }}],
        combos_cards: [{
            cards: {
                id: number;
                name: string;
                image_url: string;
            }
        }]
    } = await resp.json();

    if (data.title) {
        return {
            combo: data,
        };
    }

    throw error(404, 'Not Found');
}
