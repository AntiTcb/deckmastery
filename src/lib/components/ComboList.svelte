<script lang="ts">
    import { DataTable } from '@brainandbones/skeleton';
    import { searchCombos } from '$supabase'
    import { onMount } from 'svelte';
    import { page } from '$app/stores'
    import { goto } from '$app/navigation';
    import type { DeckMastery } from 'src/app'

    export let starter: DeckMastery.Card;
    export let extender: DeckMastery.Card | null = null;

    let replays : any[] = [{}];
    const searchForCombos: any = async () => {
        if (!starter) {
            replays = [{}];
            return;
        }
        const tempReplays = await searchCombos(starter, extender);

        replays = tempReplays.map(r => { return {
            id: r.id,
            title: r.title,
            uploadedBy: r.uploaded_by?.username ? `<a href="/users/${r.uploaded_by?.username}" target="_blank">${r.uploaded_by.username}</a>` : 'Unknown',
            replay: `<a href="${r.replay_url}" target="_blank">View</a>`,
            likes: r.likes?.length || 0,
        }})
        .sort((a, b) => b.likes - a.likes);
    }

    const goToCombo = ({ detail }: any) => {
        goto(`${$page.url.pathname}/${detail.id}`);
    }

    onMount(() => {
        searchForCombos();
    });
</script>

<section class="my-5">
    <DataTable
        class="replay-list"
        headings={['Id', 'Title', 'Uploaded By', 'Replay', 'Likes']}
        source={replays}
        interactive
        on:selected={goToCombo}>
    </DataTable>
</section>

<style>
    :global(.replay-list :is(thead, tbody) :is(th,td):first-child) {
        display: none;
    }
</style>
