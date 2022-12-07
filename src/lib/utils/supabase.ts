import { createClient } from '@supabase/supabase-js';
import { dev } from '$app/environment';
import type { DeckMastery, Lucia } from 'src/app';
import type { Database } from '$lib/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = dev
    ? import.meta.env.VITE_SUPABASE_PRIVATE_KEY
    : import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export const searchCombos = async (cardIds: number[]) => {
    let query = supabase
        .from('combos')
        .select(`
            id,
            title,
            created_at,
            description,
            replay_url,
            combos_cards!inner(
                cards!inner (
                    id,
                    name,
                    image_url
                )
            ),
            uploaded_by:user(username),
            likes:likes(liked_by:user(username)))
        `)
        .in('combos_cards.cards.id', cardIds);

    return await query;
};
type SearchCombosResponse = Awaited<ReturnType<typeof searchCombos>>;
export type SearchCombosResponseSuccess = SearchCombosResponse['data'];
export type SearchCombosResponseError = SearchCombosResponse['error'];

export const getCombos = async () => {
    return await supabase
        .from(`combos`)
        .select(`id,created_at,replay_url,title,description,uploaded_by`);
};
type GetCombosResponse = Awaited<ReturnType<typeof getCombos>>;
export type GetCombosResponseSuccess = GetCombosResponse['data'];
export type GetCombosResponseError = GetCombosResponse['error'];

export const getCombo = async (id: number) => {
    return await supabase
        .from(`combos`)
        .select(`
            id,
            created_at,
            replay_url,
            title,
            description,
            uploaded_by`)
        .eq(`id`, id);
};
type GetComboResponse = Awaited<ReturnType<typeof getCombo>>;
export type GetComboResponseSuccess = GetComboResponse['data'];
export type GetComboResponseError = GetComboResponse['error'];

export const getUserCombos = async (id: string) => {
    return await supabase
        .from('combos')
        .select(`
            id,
            created_at,
            replay_url,
            title,
            description,
            likes:likes(liked_by:user(username)))`)
        .eq('uploaded_by', id);
};
type GetUserCombosResponse = Awaited<ReturnType<typeof getUserCombos>>;
export type GetUserCombosResponseSuccess = GetUserCombosResponse['data'];
export type GetUserCombosResponseError = GetUserCombosResponse['error'];

export const getUserFavoriteCombos = async(id: string) => {
    return await supabase
        .from('combos')
        .select(`
            id,
            created_at,
            replay_url,
            title,
            description,
            uploaded_by:user(username),
            likes:likes(liked_by:user(username)))`)
        .eq('likes.liked_by', id);
}
type GetUserFavoriteCombosResponse = Awaited<ReturnType<typeof getUserFavoriteCombos>>;
export type GetUserFavoriteCombosResponseSuccess = GetUserFavoriteCombosResponse['data'];
export type GetUserFavoriteCombosResponseError = GetUserFavoriteCombosResponse['error'];

export const getUserById = async (userId: string) => {
    const { data, error } = await supabase
        .from('user')
        .select(`id,created_at,username,role,provider_id,discord_email,patreon_email`)
        .eq('id', userId);

    if (error) {
        console.error(`Supabase GetUserById Error:`, error);
        return null;
    }

    return data[0] as Lucia.UserAttributes;
};

export const changeComboLike = async (id: number, userId: string, direction: 'like' | 'unlike') => {
    if (direction === 'unlike') {
        const { data, error } = await supabase
            .from('likes')
            .delete()
            .eq('combo_id', id)
            .eq('liked_by', userId);
    } else {
        const { data, error } = await supabase
            .from('likes')
            .insert({ combo_id: id, liked_by: userId });
    }
}

export const createCombo = async (options: {title: string, description: string, starter: number, extender: number, user: string, url: string, cards: number[] }) => {
    return await supabase
        .from('combos')
        .insert({
            title: options.title,
            description: options.description,
            starter_card: options.starter,
            extender_card: options.extender,
            cards: options.cards,
            uploaded_by: options.user,
            replay_url: options.url,
            status: 'pending'
        })
        .select()
        .single();
}
type CreateComboResponse = Awaited<ReturnType<typeof createCombo>>;
export type CreateComboResponseSuccess = CreateComboResponse['data'];
export type CreateComboResponseError = CreateComboResponse['error'];

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
