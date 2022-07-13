import { writable } from 'svelte/store';
import { supabase } from '$db';

let initialized = false;

export const getCards = async () => {
    const { data, error } = await supabase.from('cards').select('*');
    cards.set(error ? [] : data);
    return error ? [] : data;
}

export const searchCardsByName = async (name: string) => {
    const { data, error } = await supabase.from('cards').select('*').ilike('name', `%${name}%`);
    cards.set(error ? [] : data);
    return error ? [] : data;
}

export const cards = writable([]);
