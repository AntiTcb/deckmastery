import { createClient } from '@supabase/supabase-js';
import { dev } from '$app/environment';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = dev
    ? import.meta.env.VITE_SUPABASE_PRIVATE_KEY
    : import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

export const searchReplays = async (starter: Card, extender: Card | null = null) => {
    let query = supabase
        .from('replays')
        .select(`
            id,
            title,
            replay_url,
            votes:replay_votes(vote, voter_id)`)
        .eq('status', 'approved')
        .eq('starter_card_id', starter.id);

    if (extender) {
        query = query.eq('extender_card_id', extender.id);
    }

    const { data, error } = await query;

    if (error) {
        console.error(`Supabase SearchReplays Error:`, error);
        return [];
    }

    return data as SearchResults.ReplaySearchResults[];
};

export const getReplays = async () => {
    const { data, error } = await supabase
        .from(`replays`)
        .select(`id,created_at,replay_url,title,uploaded_by`);

    if (error) {
        console.error(`Supabase GetReplays Error:`, error);
        return [];
    }

    return data as Replay[];
};

export const getReplay = async (id: number) => {
    const { data, error } = await supabase
        .from(`replays`)
        .select(`id,created_at,replay_url,title,uploaded_by`)
        .eq(`id`, id);

    if (error) {
        console.error(`Supabase GetReplay Error:`, error);
        return null;
    }

    return data[0] as Replay;
};
// export const searchReplays = async (titleName: string, tagName: string = '', tagIds: number[] = []) => {
//     const { data, error } = await supabase.from(`replays`).select(`id,created_at,replay_url,title,uploaded_by,tags(name)`).ilike('title', `%${titleName}%`);

//     if (error) {
//         console.error(error);
//         return [];
//     }

//     return data as Replay[];
// }

// export const voteSubscription = () => supabase.from('replay_votes')
// .on('*', p => {
//     console.log('Vote changed:', p);
// }).subscribe();

export const supabase = createClient(supabaseUrl, supabaseKey);
