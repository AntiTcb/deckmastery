<script lang="ts">
    import { nameToRoute } from '$utils/urlHelper';
    import { goto } from '$app/navigation';
    import CardSearchBox from '$components/CardSearchBox.svelte'
    import type { DeckMastery } from 'src/app';

    const onSelectRow = (e: DeckMastery.Card) => {
        goto(`/combos/search/${nameToRoute(e.name)}`);
    }
</script>

<svelte:head><title>Combos | Deck Mastery</title></svelte:head>

<CardSearchBox titleText="Let's start off your combo!" placeholder="Search for a starter card" onSelectRow={onSelectRow} />
