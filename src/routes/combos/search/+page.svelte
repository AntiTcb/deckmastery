<script lang="ts">
    import { nameToRoute } from '$utils/urlHelper';
    import { goto } from '$app/navigation';
    import CardSearchBox from '$components/CardSearchBox.svelte'
    import type { Card } from '$supabase';
    import { onMount } from 'svelte';
    import { page } from '$app/stores'
    import { toastStore } from '@skeletonlabs/skeleton';

    const onSelectRow = (e: Card) => {
        goto(`/combos/search/${nameToRoute(e.name)}`);
    }

    onMount(() => {
        if ($page.url.searchParams.has('deleted')) {
            toastStore.trigger({
                message: 'Combo deleted',
                autohide: true,
                timeout: 2000,
                classes: 'bg-green-500'
            });
        }
    });
</script>

<svelte:head><title>Combos | Deck Mastery</title></svelte:head>

<CardSearchBox titleText="Let's start off your combo!" placeholder="Search for a starter card" onSelectRow={onSelectRow} />
