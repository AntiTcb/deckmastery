<script lang="ts">
    import type { PageData } from './$types'

    import { goto } from '$app/navigation';
    import { page } from '$app/stores'
    import { nameToRoute } from '$utils/urlHelper';
    import CardSearchBox from '$components/CardSearchBox.svelte'
    import ComboList from '$components/ComboList.svelte';

    $: showExtenderSearch = false;

    export let data : PageData;
    let { starter } = data;

    const onComboSelect = ({ detail: { name }}: CustomEvent) => {
        goto(`/combos/${$page.params.starter}+${nameToRoute(name)}`);
    }
</script>

<svelte:head>
    <title>{starter.name} Combos | Deck Mastery</title>
</svelte:head>

<h2>{starter.name}</h2>

{#if showExtenderSearch}
    <CardSearchBox titleText="Extender" placeholder="Search an extender" onSelectRow={onComboSelect} />
{:else}
    <button class="btn bg-ternary-500 btn-base ring-2 ring-primary-500 ring-inset text-white rounded-lg" on:click={() => showExtenderSearch = !showExtenderSearch}>Add a card to combo</button>
{/if}

<ComboList starter={starter} />
