<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores'
    import { cardIdToName } from '$lib/utils/cards';
    import { Button, Loading } from 'carbon-components-svelte';
    import { nameToRoute } from '$utils/cards';

    import Add from 'carbon-icons-svelte/lib/Add.svelte'
    import CardSearchBox from '$components/CardSearchBox.svelte'

    $: showExtenderSearch = false;

    const onComboSelect = ({ detail: { selectedItem }}: CustomEvent) => {
        console.log('route:', nameToRoute(selectedItem.text));
        goto(`/combos/${$page.params.starter}/${nameToRoute(selectedItem.text)}`);
    }
</script>

{#await cardIdToName(parseInt($page.params.starter))}
    <Loading />
{:then value}
    <h1>{value}</h1>

    {#if showExtenderSearch}
        <CardSearchBox titleText="Extender" placeholder="Search an extender" onComboSelect={onComboSelect} />
    {:else}
        <Button class="extender-btn" icon={Add} size="small" on:click={() => showExtenderSearch = !showExtenderSearch}>Add an extender</Button>
    {/if}
{/await}

<style>
    :global(.extender-btn) {
        margin-top: 1rem;
    }
</style>
