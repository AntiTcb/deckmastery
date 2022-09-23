<script lang="ts">
    import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
    import { searchReplays } from '$supabase'

    import { DataTable, Link, Toolbar, ToolbarContent, ToolbarSearch } from 'carbon-components-svelte'
    import { DataTable as SkeletonDataTable } from '@brainandbones/skeleton';

    export let starter: Card;
    export let extender: Card | null = null;

    let replays : SearchResults.ReplaySearchResults[] = [];

    $: dataTableRows = replays.map(r => {
        return {
            id: r.id,
            title: r.title,
            replay_url: r.replay_url,
            uploaded_by: r.uploaded_by?.username || "Unknown",
            rating: r.votes?.reduce((i, v) => i + v.vote, 0) ?? 0,
        }
    })

    $: skeletonTableRows = replays.map(r => {
        return {
            rating: r.votes?.reduce((i, v) => i + v.vote, 0) ?? 0,
            name: r.title,
            uploaded_by: r.uploaded_by?.username || "Unknown",
            url: r.replay_url,
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
        console.log(replays);
    }

    const filterRows = (row: DataTableRow, value: string | number) : boolean => row.title.toLowerCase().includes((value as string).toLowerCase());

    const tableServer: any = {
        search: undefined,
        sort: undefined,
        headings: ['Title', 'Replay', 'Uploaded By', 'Rating'],
        count: 0
    };

    const getTableSource: any = async () => {
        const replays = await searchReplays(starter, extender);

        if (replays.length === 0) return;

        tableServer.sort = 'name';

        const mappedReplays = replays.map(r => {
            return {
                title: r.title,
                replay_url: r.replay_url,
                uploaded_by: r.uploaded_by?.username || "Unknown",
                rating: r.votes?.reduce((i, v) => i + v.vote, 0) ?? 0,
            }
        });

        return mappedReplays;
    }
    let tablePromise: Promise<any> = getTableSource();
</script>

<div>
    <DataTable sortable zebra stickyHeader headers={[
        { key: "rating", value: "Rating" },
        { key: "title", value: "Name" },
        { key: "uploaded_by", value: "Uploaded By" },
        { key: "replay_url", value: "Replay" },
        ]}
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

    {#await tablePromise}
        <p>Loading...</p>
    {:then promisedReplays}
        <SkeletonDataTable
            headings={tableServer.headings}
            search={tableServer.search}
            sort={tableServer.sort}
            bind:count={tableServer.count}
            source={promisedReplays}
            interactive>
        </SkeletonDataTable>
    {/await}

</div>

<style>
    div {
        margin: 1rem 0;
    }
</style>
