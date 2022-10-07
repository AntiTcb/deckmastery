<script lang="ts">
    import { nameToRoute } from '$utils/urlHelper';
    import { goto } from '$app/navigation';

    import CardSearchBox from '$components/CardSearchBox.svelte'

    const onComboSelect = ({ detail: { selectedItem } }: CustomEvent) => {
        goto(`/combos/${nameToRoute(selectedItem.name)}`);
    }
</script>

<svelte:head><title>Combos | Deck Mastery</title></svelte:head>

<CardSearchBox titleText="Let's start off your combo!" placeholder="Search for a starter card" onComboSelect={onComboSelect} />
