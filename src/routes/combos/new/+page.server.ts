import type { Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { createCombo } from '$supabase';
import { z } from 'zod';

const newComboSchema = z.object({
    title: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(1000),
    starterId: z.number().positive(),
    extenderId: z.number().positive().optional(),
    replayUrl: z.string().trim().url().startsWith("https://duelingbook.com", { message: "Only Dueling Book Replays are supported at this time."}),
});

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const comboData = newComboSchema.safeParse({
            title: formData.get('title'),
            description: formData.get('description'),
            starterId: parseInt(formData.get('starterId')?.toString() || '0'),
            extenderId: parseInt(formData.get('extenderId')?.toString() || '0'),
            replayUrl: formData.get('replayUrl'),
        });
        const { user } = await locals.getSessionUser();
        const uploadedBy = user.id;

        console.log(`Combo Data`, comboData);

        if (!comboData.success && comboData.error) {
            const errors = comboData.error.issues.map(i => {
                return {
                    field: i.path[0],
                    message: i.message,
                }
            });
            return invalid(400, { saved: false, errors })
        }

        const { data, error } = await createCombo({
            title: comboData.data.title,
            description: comboData.data.description,
            starter: comboData.data.starterId,
            extender: comboData.data.extenderId,
            url: comboData.data.replayUrl,
            user: comboData.data.uploadedBy,
        });

        console.log(`New Combo`, data);
        console.log(`New Combo Error`, error);

        return { saved: true, comboId: 0 }
    },
}
