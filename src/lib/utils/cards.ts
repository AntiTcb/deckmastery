import { supabase } from '$supabase';

export const nameToRoute = (name: string): string => {
    // remove all non alphanumeric characters
    return name.replace(/[^a-zA-Z0-9]/g, '');
};

export const routeToName = (route: string): string => {
    // humanize route
    return route.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ');
};

export const cardIdToName = async (id: number): Promise<string> => {
    const { data, error } = await supabase
        .from('cards')
        .select('name')
        .eq('id', id)
        .limit(1)
        .single();
    if (error) {
        console.error(error);
        return '';
    }
    return data.name;
};
