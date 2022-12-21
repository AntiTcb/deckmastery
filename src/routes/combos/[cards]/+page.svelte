<script lang="ts">
    import type { PageData } from './$types'
    import type { Card } from '$supabase'

    import { goto } from '$app/navigation';
    import { page } from '$app/stores'
    import { nameToRoute } from '$utils/urlHelper';
    import CardSearchBox from '$components/CardSearchBox.svelte'
    import ComboList from '$components/ComboList.svelte';
    import Icon from '@iconify/svelte';
    import { getUser } from '@lucia-auth/sveltekit/client';

    const user = getUser();

    $: showExtenderSearch = false;

    export let data : PageData;
    let { cards } = data;

    const onComboSelect = async (e: Card) => {
        goto(`/combos/${$page.params.cards}+${nameToRoute(e.name as string)}`, { invalidateAll: true });
        showExtenderSearch = false;
    }
</script>

<svelte:head>
    <title>{cards.map(c => c.name).join(' & ')} Combos | Deck Mastery</title>
</svelte:head>

{#key showExtenderSearch}
    <h2 class="mb-5">{cards.map(c => c.name).join(' & ')}</h2>
    {#if showExtenderSearch}
        <CardSearchBox titleText="Add a card" placeholder="Search for another card in the combo" onSelectRow={onComboSelect} />
    {:else}
        <span class="flex flex-col lg:flex-row lg:justify-evenly gap-2">
            <button class="btn bg-tertiary-500 btn-base ring-2 ring-primary-500 ring-inset text-white rounded-lg" on:click={() => showExtenderSearch = !showExtenderSearch}>Add a card to combo search</button>
            {#if $user}
                <a href="/combos/new/?cards={cards.map(c => c.name)}" class="btn bg-green-500 btn-base ring-2 ring-green-500 ring-inset !text-white rounded-lg">
                    <span><Icon icon="fluent:add-12-filled"/></span>
                    <span>Submit a new combo</span>
                </a>
            {/if}
        </span>
    {/if}
    <ComboList cardIds={cards.map(c => c.id)} />
{/key}
