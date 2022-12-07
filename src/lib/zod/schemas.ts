import { z } from 'zod';

export const newComboSchema = z.object({
    title: z
        .string({required_error: 'Title is required'})
        .trim()
        .min(1, { message: 'Title must be at least 1 character long.' })
        .max(100, { message: 'Title must be no more than 100 characters long.' }),
    description: z
        .string({required_error: 'Description is required.'})
        .trim()
        .min(1, { message: 'Description must be at least 1 character long.'})
        .max(1000, { message: 'Description must be no more than 1000 characters long.'}),
    cards: z
        .array(
            z.number()
            .positive())
        .nonempty({ message: 'You must select at least one card.' }),
    replayUrl: z
        .string()
        .trim()
        .url({ message: "Replay URL must be a valid URL."})
        .regex(/https:\/\/(www\.)?duelingbook\.com\/replay\?id=/gi, { message: "Only Dueling Book Replays are supported at this time."}),
});
