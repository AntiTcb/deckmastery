import type { PageLoad } from "./$types";
import type { Card } from '$supabase'

export const load = (async ({ fetch, url }) => {
    if (!url.searchParams.get('cards')) { return; }

    const cardNames = url.searchParams.get('cards')!.split(',') || [];
    const cards = new Array<Card>();

    for (const cardName of cardNames) {
        const resp = await fetch(`/api/cards?name=${cardName}`);
        const [card] = [...await resp.json()] as Card[];

        if (!card) continue;

        cards.push(card);
    }

    return { cards };

}) satisfies PageLoad;
