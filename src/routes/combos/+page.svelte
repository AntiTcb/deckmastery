<script lang="ts">
    import { nameToRoute } from '$utils/urlHelper';
    import { goto } from '$app/navigation';

    import CardSearchBox from '$components/CardSearchBox.svelte'

    const onComboSelect = async ({ detail: { selectedItem } }: CustomEvent) => {
        await goto(`/combos/${nameToRoute(selectedItem.text)}`);
    }
</script>

<svelte:head><title>Combos | Deck Mastery</title></svelte:head>

<CardSearchBox titleText="Starter Card" placeholder="Search for a starter card" onComboSelect={onComboSelect} />
