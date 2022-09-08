<script lang="ts">
    import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
    import { searchReplays } from '$supabase'

    import { DataTable, Link, Toolbar, ToolbarContent, ToolbarSearch } from 'carbon-components-svelte'

    export let starter: Card;
    export let extender: Card | null = null;

    let replays : SearchResults.ReplaySearchResults[] = [];

    $: console.log(replays);

    $: dataTableRows = replays.map(r => {
        return {
            id: r.id,
            title: r.title,
            replay_url: r.replay_url,
            uploaded_by: r.uploaded_by || "Unknown",
            rating: r.votes?.reduce((i, v) => i + v.vote, 0) ?? 0,
        }
    })

    let search = '';

    $: {
        if (starter) {
            searchForCombos();
        }
    }

    const searchForCombos = async () => {
        replays = await searchReplays(starter, extender);
    }

    const filterRows = (row: DataTableRow, value: string | number) : boolean => row.title.toLowerCase().includes((value as string).toLowerCase());
</script>

<div>
    <DataTable sortable zebra stickyHeader headers={[
        { key: "title", value: "Name" },
        { key: "uploaded_by", value: "Uploaded By" },
        { key: "replay_url", value: "Replay" },
        { key: "rating", value: "Rating" }]}
        rows={dataTableRows}>
        <svelte:fragment slot="cell" let:row let:cell>
            {#if cell.key === "replay_url"}
                <Link href={cell.value} target="_blank">View DB Replay</Link>
            {:else}
                {cell.value}
            {/if}
        </svelte:fragment>
        <Toolbar>
            <ToolbarContent>
                <ToolbarSearch persistent shouldFilterRows={filterRows} bind:value={search}  />
            </ToolbarContent>
        </Toolbar>
    </DataTable>
</div>

<style>
    div {
        margin: 1rem 0;
    }
</style>
