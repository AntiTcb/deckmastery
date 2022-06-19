import { createClient } from '@supabase/supabase-js';
import { dev } from '$app/env';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = dev ? import.meta.env.VITE_SUPABASE_PRIVATE_KEY : import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

interface Replay {
    id: number;
    created_at: Date;
    replay_url: string;
    title: string;
    uploaded_by: number;
}

export const getReplays = async () => {
    const { data, error } = await supabase.from(`replays`).select(`id,created_at,replay_url,title,uploaded_by`);

    if (error) {
        console.error(error);
        return [];
    }

    return data as Replay[];
}
export const getReplay = async (id: number) => {
    const { data, error } = await supabase.from(`replays`).select(`id,created_at,replay_url,title,uploaded_by`).eq(`id`, id);

    if (error) {
        console.error(error);
        return null;
    }

    return data[0] as Replay;
}

export const voteSubscription = () => supabase.from('replay_votes')
.on('*', p => {
    console.log('Vote changed:', p);
}).subscribe();

export const supabase = createClient(supabaseUrl, supabaseKey);
