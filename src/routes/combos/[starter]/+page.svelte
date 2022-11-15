<script lang="ts">
    import type { PageData } from './$types'

    import { goto } from '$app/navigation';
    import { page } from '$app/stores'
    import { nameToRoute } from '$utils/urlHelper';
    import CardSearchBox from '$components/CardSearchBox.svelte'
    import ComboList from '$components/ComboList.svelte';
    import Icon from '@iconify/svelte';

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

<h2 class="mb-5">{starter.name}</h2>
{#if showExtenderSearch}
    <CardSearchBox titleText="Extender" placeholder="Search an extender" onSelectRow={onComboSelect} />
{:else}
    <span class="inline-flex flex-col gap-2">
        <a href="/combos/{$page.params.starter}/new" class="btn bg-green-500 btn-base ring-2 ring-green-500 ring-inset !text-white rounded-lg">
            <span><Icon icon="fluent:add-12-filled"/></span>
            <span>Create new Combo</span>
        </a>
        <button class="btn bg-tertiary-500 btn-base ring-2 ring-primary-500 ring-inset text-white rounded-lg" on:click={() => showExtenderSearch = !showExtenderSearch}>Add a card to combo</button>
    </span>
{/if}

<ComboList starter={starter} />
