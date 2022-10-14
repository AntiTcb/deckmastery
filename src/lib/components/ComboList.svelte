<script lang="ts">
    import { DataTable } from '@brainandbones/skeleton';
    import { searchReplays } from '$supabase'
    import { onMount } from 'svelte';

    export let starter: Card;
    export let extender: Card | null = null;

    let replays : any[] = [{}];
    const searchForCombos: any = async () => {
        if (!starter) {
            replays = [{}];
            return;
        }
        const tempReplays = await searchReplays(starter, extender);

        console.log(tempReplays)

        replays = tempReplays.map(r => { return {
            title: r.title,
            uploadedBy: r.uploaded_by || 'Unknown',
            replay: `<a href="${r.replay_url}" target="_blank">View</a>`,
            rating: r.votes?.reduce((i, v) => i + v.vote, 0) || 0,
        }});
    }

    onMount(() => {
        searchForCombos();
    });
</script>

<section class="my-5">
    <DataTable
        headings={['Title', 'Uploaded By', 'Replay', 'Rating']}
        source={replays}
        interactive>
    </DataTable>
</section>
