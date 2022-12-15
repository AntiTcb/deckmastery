import { createClient } from '@supabase/supabase-js';
import { dev } from '$app/environment';
import type { Lucia } from 'src/app';
import type { Database } from '$lib/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = dev
    ? import.meta.env.VITE_SUPABASE_PRIVATE_KEY
    : import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function searchCombos(cardIds: number[]) {
    const { data, error } = await supabase
        .from('combos')
        .select(`
            id,
            title,
            created_at,
            description,
            replay_url,
            cards:combos_cards!inner(
                cards!inner (
                    id,
                    name,
                    image_url
                )
            ),
            uploaded_by:user(id, username),
            combo_likes:likes(liked_by(id, username))
        `)
        .in('combos_cards.cards.id', cardIds);

        return { data: data?.map(r => {
            return {
                id: r.id,
                title: r.title,
                description: r.description,
                uploadedBy: r.uploaded_by?.username ?? null,
                replay: r.replay_url,
                likes: r.combo_likes?.length || 0,
                likedBy: r.combo_likes
            } satisfies SearchedCombo;
        }).sort((a, b) => (b.likes || 0 - a.likes || 0) || b.title?.localeCompare(a.title ?? '')) || new Array<SearchedCombo>, error };
};
interface SearchedCombo {
    id: number;
    title: string | null;
    description: string | null;
    uploadedBy: string;
    replay: string;
    likes: number;
    likedBy: [{username: string}];
}
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
            uploaded_by,
            status,
            likes(liked_by(id, username))`)
        .eq(`id`, id)
        .single();
};
type GetComboResponse = Awaited<ReturnType<typeof getCombo>>;
export type GetComboResponseSuccess = GetComboResponse['data'];
export type GetComboResponseError = GetComboResponse['error'];

export const getUserCombos = async (id: string) => {
    return await supabase
        .from('combos')
        .select(`
            id,
            title,
            created_at,
            description,
            replay_url,
            uploaded_by:user(id, username),
            likes(liked_by(id, username))`)
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
            likes(liked_by:user(username)))`)
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

export const likeCombo = async (id: number, userId: string) => {
    return await supabase.from('likes')
        .insert({ combo_id: id, liked_by: userId })
        .select();
}
type LikeComboResponse = Awaited<ReturnType<typeof likeCombo>>;
export type LikeComboResponseSuccess = LikeComboResponse['data'];
export type LikeComboResponseError = LikeComboResponse['error'];

export const unlikeCombo = async (id: number, userId: string) => {
    return await supabase.from('likes')
        .delete()
        .eq('combo_id', id)
        .eq('liked_by', userId)
        .select();
}
type UnlikeComboResponse = Awaited<ReturnType<typeof unlikeCombo>>;
export type UnlikeComboResponseSuccess = UnlikeComboResponse['data'];
export type UnlikeComboResponseError = UnlikeComboResponse['error'];

export const createCombo = async (options: {title: string, description: string, user: string, url: string, cards: number[] }) => {
    const { data, error } = await supabase
        .from('combos')
        .insert({
            title: options.title,
            description: options.description,
            cards: options.cards,
            uploaded_by: options.user,
            replay_url: options.url,
            status: 'pending'
        })
        .select()
        .single();

        if (error) return { data: null, error };

    await supabase.from('combos_cards')
        .insert(options.cards.map(card => ({ combo_id: data.id, card_id: card })));

    return { data, error };
}
type CreateComboResponse = Awaited<ReturnType<typeof createCombo>>;
export type CreateComboResponseSuccess = CreateComboResponse['data'];
export type CreateComboResponseError = CreateComboResponse['error'];

// db types
export type Card = Database['public']['Tables']['cards']['Row'];
export type Combo = Database['public']['Tables']['combos']['Row'];
export type Like = Database['public']['Tables']['likes']['Row'];
export type User = Database['public']['Tables']['user']['Row'];
