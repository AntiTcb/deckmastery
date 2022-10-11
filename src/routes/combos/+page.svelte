<script lang="ts">
    import { nameToRoute } from '$utils/urlHelper';
    import { goto } from '$app/navigation';

    import CardSearchBox from '$components/CardSearchBox.svelte'

    const onSelectRow = ({ detail: { name } }: CustomEvent) => {
        goto(`/combos/${nameToRoute(name)}`);
    }
</script>

<svelte:head><title>Combos | Deck Mastery</title></svelte:head>

<CardSearchBox titleText="Let's start off your combo!" placeholder="Search for a starter card" onSelectRow={onSelectRow} />
