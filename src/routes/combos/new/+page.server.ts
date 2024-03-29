import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createCombo } from '$supabase';
import { newComboSchema } from '$lib/zod/schemas';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());

        const comboData = newComboSchema.safeParse({
            title: formData.title,
            description: formData.description,
            replayUrl: formData.replayUrl,
            cards: formData.cards.toString().split(',').map(c => parseInt(c))
        });

        const { user } = await locals.validateUser();
        const uploadedBy = user.id;

        if (!comboData.success && comboData.error) {
            console.error('Combo Data Validation Failed', comboData.error);
            const { fieldErrors: errors } = comboData.error.flatten();
            return fail(400, { data: formData, errors })
        }

        const { data, error } = await createCombo({
            title: comboData.data.title,
            description: comboData.data.description,
            url: comboData.data.replayUrl,
            user: uploadedBy,
            cards: comboData.data.cards,
        });

        throw redirect(301, `/combos/${data.id}`)
    },
}
