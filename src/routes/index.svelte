<script lang="ts">
    import ReplayPreview from '$components/Replays/ReplayPreview.svelte'
    import debounce from 'just-debounce-it'

    import { searchReplays } from "$lib/utils/db"
    import { Search } from 'carbon-components-svelte'

    $: searchResults = [] as Replay[];
    $: {
        console.log('searchResults', searchResults)
    }

    const handleSearchInput = debounce(async (e: any) => {
        searchResults = [];
        if (!e.target?.value.trim()) return;

        const replays = await searchReplays(e.target!.value);

        searchResults = replays;
    }, 250, false);
</script>

<Search size="lg" on:input={handleSearchInput} on:clear={() => searchResults = []}/>

{#each searchResults as replay}
    <ReplayPreview replay={replay} />
{/each}
