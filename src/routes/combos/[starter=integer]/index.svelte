<script lang="ts">
    import { page } from '$app/stores'
    import { routeToName, cardIdToName } from '$lib/utils/cards';
    import { Button, Loading } from 'carbon-components-svelte';
    import Add from 'carbon-icons-svelte/lib/Add.svelte'

    $: showExtenderSearch = false;
</script>

{#await cardIdToName(parseInt($page.params.starter))}
    <Loading />
{:then value}
    <h1>{value}</h1>
    <Button icon={Add} size="small" on:click={() => showExtenderSearch = !showExtenderSearch}>Add an extender</Button>

    {#if showExtenderSearch}

    {/if}
{/await}
