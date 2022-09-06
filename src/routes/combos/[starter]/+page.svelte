<script lang="ts">
    import type { PageData } from './$types'

    import { goto } from '$app/navigation';
    import { page } from '$app/stores'
    import { nameToRoute } from '$utils/urlHelper';
    import { Button } from 'carbon-components-svelte';

    import Add from 'carbon-icons-svelte/lib/Add.svelte'
    import CardSearchBox from '$components/CardSearchBox.svelte'
    import ComboList from '$components/ComboList.svelte';

    $: showExtenderSearch = false;

    export let data : PageData;
    let { starter } = data;

    const onComboSelect = ({ detail: { selectedItem }}: CustomEvent) => {
        goto(`/combos/${$page.params.starter}/${nameToRoute(selectedItem.text)}`);
    }
</script>

<svelte:head>
    <title>{starter.name} Combos | Deck Mastery</title>
</svelte:head>

<h1>{starter.name}</h1>

{#if showExtenderSearch}
    <CardSearchBox titleText="Extender" placeholder="Search an extender" onComboSelect={onComboSelect} />
{:else}
    <Button class="extender-btn" icon={Add} size="small" on:click={() => showExtenderSearch = !showExtenderSearch}>Add a card to combo</Button>
{/if}

<ComboList starter={starter} />

<style>
    :global(.extender-btn) {
        margin-top: 1rem;
    }
</style>
