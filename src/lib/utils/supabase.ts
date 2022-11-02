import { createClient } from '@supabase/supabase-js';
import { dev } from '$app/environment';
import type { DeckMastery, Lucia } from 'src/app';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = dev
    ? import.meta.env.VITE_SUPABASE_PRIVATE_KEY
    : import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export const searchCombos = async (
    starter: DeckMastery.Card,
    extender: DeckMastery.Card | null = null
) => {
    let query = supabase
        .from('combos')
        .select(
            `
            id,
            title,
            replay_url,
            uploaded_by:user(username),
            likes:likes(liked_by))`
        )
        .eq('status', 'approved')
        .eq('starter_card', starter.id);

    if (extender) {
        query = query.eq('extender_card', extender.id);
    }

    const { data, error } = await query;

    if (error) {
        console.error(`Supabase SearchCombos Error:`, error);
        return [];
    }

    return data as DeckMastery.SearchResults.ReplaySearchResults[];
};

export const getCombos = async () => {
    const { data, error } = await supabase
        .from(`combos`)
        .select(`id,created_at,replay_url,title,description,uploaded_by`);

    if (error) {
        console.error(`Supabase GetReplays Error:`, error);
        return [];
    }

    return data as DeckMastery.Combo[];
};

export const getCombo = async (id: number) => {
    const { data, error } = await supabase
        .from(`combos`)
        .select(`id,created_at,replay_url,title,description,uploaded_by`)
        .eq(`id`, id);

    if (error) {
        console.error(`Supabase GetReplay Error:`, error);
        return null;
    }

    return data[0] as DeckMastery.Combo;
};

export const getUserCombos = async (id: string) => {
    const { data, error } = await supabase
        .from('combos')
        .select(`id,created_at,replay_url,title,description`)
        .eq('uploaded_by', id);

    if (error) {
        console.error(`Supabase GetUserReplays Error:`, error);
        return [];
    }

    return data as DeckMastery.Combo[];
};
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

export const supabase = createClient(supabaseUrl, supabaseKey);
